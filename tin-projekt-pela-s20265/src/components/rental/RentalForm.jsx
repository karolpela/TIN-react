import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {
  getRentalByIdApiCall,
  addRentalApiCall,
  updateRentalApiCall
} from '../../apiCalls/rentalApiCalls';
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls';
import { getEquipmentApiCall } from '../../apiCalls/equipmentApiCalls';
import formMode, { formValidationKeys } from '../../helpers/formHelper';
import {
  checkRequired,
  checkDate,
  checkDateIfAfter,
  checkDateIfAfterOrEqual
} from '../../helpers/validationCommon';
import FormButtons from '../form/FormButtons';
import FormInput from '../form/FormInput';
import FormSelect from '../form/FormSelect';
import { getFormattedDate } from '../../helpers/dateHelper';
import { withTranslation } from 'react-i18next';

class RentalForm extends React.Component {
  constructor(props) {
    super(props);
    const currentFormMode = this.props.match.params.rentalId ? formMode.EDIT : formMode.NEW;

    this.state = {
      allCustomers: [],
      allEquipment: [],
      rental: {
        customerId: '',
        equipmentId: '',
        startDate: '',
        endDate: ''
      },
      errors: {
        customerId: '',
        equipmentId: '',
        startDate: '',
        endDate: ''
      },
      formMode: currentFormMode,
      redirect: false,
      error: null
    };
  }

  componentDidMount = () => {
    const currentFormMode = this.state.formMode;
    this.fetchAllCustomers();
    this.fetchAllEquipment();
    if (currentFormMode === formMode.EDIT) {
      this.fetchRentalDetails();
    }
  };

  fetchAllCustomers = () => {
    getCustomersApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              message: data.message
            });
          } else {
            this.setState({
              allCustomers: data.map((c) => c),
              message: null
            });
          }
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  };

  fetchAllEquipment = () => {
    getEquipmentApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              message: data.message
            });
          } else {
            this.setState({
              allEquipment: data.map((c) => c),
              message: null
            });
          }
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  };

  fetchRentalDetails = () => {
    getRentalByIdApiCall(this.props.match.params.rentalId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              message: data.message
            });
          } else {
            this.setState({
              rental: data,
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
    const rental = { ...this.state.rental };
    rental[name] = value;

    const errorMessage = this.validateField(name, value);
    const errors = { ...this.state.errors };
    errors[name] = errorMessage;

    this.setState({
      rental: rental,
      errors: errors
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      const rental = this.state.rental;
      const currentFormMode = this.state.formMode;

      let promise, response;

      if (currentFormMode === formMode.NEW) {
        promise = addRentalApiCall(rental);
      } else if (currentFormMode === formMode.EDIT) {
        console.log(rental);
        const rentalId = this.props.match.params.rentalId;
        promise = updateRentalApiCall(rentalId, rental);
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

    let nowDate = new Date(),
      month = '' + (nowDate.getMonth() + 1),
      day = '' + nowDate.getDate(),
      year = nowDate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (fieldName === 'customerId') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }

    if (fieldName === 'equipmentId') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }

    if (fieldName === 'startDate') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkDate(fieldValue)) {
        errorMessage = formValidationKeys.isDate;
      } else if (checkDateIfAfterOrEqual(fieldValue, nowString)) {
        errorMessage = formValidationKeys.notInFuture;
      }
    }

    if (fieldName === 'endDate' && fieldValue) {
      if (!checkDate(fieldValue)) {
        errorMessage = formValidationKeys.isDate;
      } else if (!checkDateIfAfter(fieldValue, this.state.rental['startDate'].slice(0, 10))) {
        errorMessage = formValidationKeys.afterOrEqualToStartDate;
      }
    }

    return errorMessage;
  };

  validateForm = () => {
    const rental = this.state.rental;
    const errors = this.state.errors;

    for (const fieldName in rental) {
      const fieldValue = rental[fieldName];
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
          ? t('rental.form.add.confirm.text')
          : t('rental.form.edit.confirm.text');

      return <Navigate to="/rentals" state={{ notice: notice }} />;
    }

    const errorsSummary = this.hasErrors() ? t('form.validation.messages.hasErrors') : '';
    const fetchError = this.state.error ? t('form.messages.fetchError') : '';
    const pageTitle =
      this.state.formMode === formMode.NEW
        ? t('rental.form.add.pageTitle')
        : t('rental.form.edit.pageTitle');

    const globalErrorMessage = errorsSummary || fetchError || this.state.message;

    return (
      <main>
        <h2>{pageTitle}</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <FormSelect
            label={t('rental.fields.customer')}
            options={this.state.allCustomers}
            display={['firstName', 'lastName']}
            required
            error={this.state.errors.customerId}
            name="customerId"
            onChange={this.handleChange}
            value={this.state.rental.customerId ?? ''}
          />
          <FormSelect
            label={t('rental.fields.equipment')}
            options={this.state.allEquipment}
            display={['type', 'purpose', 'size']}
            required
            error={this.state.errors.equipmentId}
            name="equipmentId"
            onChange={this.handleChange}
            value={this.state.rental.equipmentId ?? ''}
          />
          <FormInput
            type="date"
            label={t('rental.fields.startDate')}
            required
            error={this.state.errors.startDate}
            name="startDate"
            onChange={this.handleChange}
            value={this.state.rental.startDate ? getFormattedDate(this.state.rental.startDate) : ''}
          />
          <FormInput
            type="date"
            label={t('rental.fields.endDate')}
            error={this.state.errors.endDate}
            name="endDate"
            onChange={this.handleChange}
            value={this.state.rental.endDate ? getFormattedDate(this.state.rental.endDate) : ''}
          />
          <FormButtons
            formMode={this.state.formMode}
            formType="rental"
            error={globalErrorMessage}
            cancelPath="/rentals"
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

export default withTranslation()(withRouter(RentalForm));
