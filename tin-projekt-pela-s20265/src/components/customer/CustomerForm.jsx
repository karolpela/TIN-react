import React from 'react';
import { withTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import {
  getCustomerByIdApiCall,
  addCustomerApiCall,
  updateCustomerApiCall
} from '../../apiCalls/customerApiCalls';
import { isEmployee } from '../../helpers/authHelper';
import formMode, { formValidationKeys } from '../../helpers/formHelper';
import { checkRequired, checkTextLengthRange, checkPhoneNo } from '../../helpers/validationCommon';
import FormButtons from '../form/FormButtons';
import FormInput from '../form/FormInput';

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    const currentFormMode = this.props.match.params.customerId ? formMode.EDIT : formMode.NEW;

    this.state = {
      customer: {
        firstName: '',
        lastName: '',
        phoneNo: '',
        password: ''
      },
      errors: {
        firstName: '',
        lastName: '',
        phoneNo: '',
        password: ''
      },
      formMode: currentFormMode,
      redirect: false,
      error: null
    };
  }

  componentDidMount = () => {
    const currentFormMode = this.state.formMode;
    if (currentFormMode === formMode.EDIT) {
      this.fetchCustomerDetails();
    }
  };

  fetchCustomerDetails = () => {
    getCustomerByIdApiCall(this.props.match.params.customerId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              message: data.message
            });
          } else {
            data.password = '';
            this.setState({
              customer: data,
              message: null
            });
          }
          this.setState({
            isLoaded: true
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const customer = { ...this.state.customer };
    customer[name] = value;

    const errorMessage = this.validateField(name, value);
    const errors = { ...this.state.errors };
    errors[name] = errorMessage;

    this.setState({
      customer: customer,
      errors: errors
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      const customer = this.state.customer;
      const currentFormMode = this.state.formMode;

      let promise, response;

      if (currentFormMode === formMode.NEW) {
        promise = addCustomerApiCall(customer);
      } else if (currentFormMode === formMode.EDIT) {
        console.log(customer);
        const customerId = this.props.match.params.customerId;
        promise = updateCustomerApiCall(customerId, customer);
      }

      if (promise) {
        promise
          .then((data) => {
            response = data;
            if (response.status === 201 || response.status === 500) {
              return data.json();
            }
          })
          .then(
            (data) => {
              if (!response.ok && response.status === 500) {
                console.log(data);
                for (const i in data) {
                  const errorItem = data[i];
                  const errorMessage = errorItem.message;
                  const fieldName = errorItem.path;
                  const errors = { ...this.state.errors };
                  errors[fieldName] = errorMessage;
                  this.setState({
                    errors: errors,
                    error: null
                  });
                }
              } else {
                this.setState({ redirect: true });
              }
            },
            (error) => {
              this.setState({ error }), console.log(error);
            }
          );
      }
    }
  };

  validateField = (fieldName, fieldValue) => {
    let errorMessage = '';

    if (fieldName === 'firstName') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkTextLengthRange(fieldValue, 2, 20)) {
        errorMessage = formValidationKeys.len_2_20;
      }
    }

    if (fieldName === 'lastName') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkTextLengthRange(fieldValue, 2, 40)) {
        errorMessage = formValidationKeys.len_2_40;
      }
    }

    if (fieldName === 'phoneNo') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkPhoneNo(fieldValue)) {
        errorMessage = formValidationKeys.isPhoneNo;
      }
    }

    if (this.state.formMode == formMode.NEW && fieldName === 'password') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }

    return errorMessage;
  };

  validateForm = () => {
    const customer = this.state.customer;
    const errors = this.state.errors;

    for (const fieldName in customer) {
      const fieldValue = customer[fieldName];
      const errorMessage = this.validateField(fieldName, fieldValue);
      errors[fieldName] = errorMessage;
    }
    this.setState({
      errors: errors
    });

    let valid = !this.hasErrors();
    return valid;
  };

  hasErrors = () => {
    const errors = this.state.errors;
    for (const errorField in this.state.errors) {
      if (errors[errorField].length > 0) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { t } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      const currentFormMode = this.state.formMode;
      const notice =
        currentFormMode === formMode.NEW
          ? t('customer.form.add.confirm.text')
          : t('customer.form.edit.confirm.text');

      return <Navigate to="/customers" state={{ notice: { message: notice, type: 'success' } }} />;
    }

    const errorsSummary = this.hasErrors() ? t('form.validation.messages.hasErrors') : '';
    const fetchError = this.state.error ? t('form.validation.messages.fetchError') : '';
    const pageTitle =
      this.state.formMode === formMode.NEW
        ? t('customer.form.add.pageTitle')
        : t('customer.form.edit.pageTitle');

    const globalErrorMessage = errorsSummary || fetchError || this.state.message;

    return (
      <main>
        <h2>{pageTitle}</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            label={t('customer.fields.firstName')}
            required
            error={this.state.errors.firstName}
            name="firstName"
            placeholder={'2-20 ' + t('form.chars')}
            onChange={this.handleChange}
            value={this.state.customer.firstName ?? ''}
          />
          <FormInput
            type="text"
            label={t('customer.fields.lastName')}
            required
            error={this.state.errors.lastName}
            name="lastName"
            placeholder={'2-40 ' + t('form.chars')}
            onChange={this.handleChange}
            value={this.state.customer.lastName ?? ''}
          />
          <FormInput
            type="text"
            label={t('customer.fields.phoneNo')}
            required
            error={this.state.errors.phoneNo}
            name="phoneNo"
            placeholder={'9 ' + t('form.digits')}
            onChange={this.handleChange}
            value={this.state.customer.phoneNo ?? ''}
          />
          {isEmployee() && this.state.formMode === formMode.NEW && (
            <FormInput
              type="password"
              label={t('customer.fields.password')}
              required
              error={this.state.errors.password}
              name="password"
              placeholder={t('customer.fields.password')}
              onChange={this.handleChange}
              value={this.state.customer.password ?? ''}
            />
          )}
          <FormButtons
            formMode={this.state.formMode}
            formType="customer"
            error={globalErrorMessage}
            cancelPath="/customers"
          />
        </form>
      </main>
    );
  }
}

export function withRouter(Children) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

export default withTranslation()(withRouter(CustomerForm));
