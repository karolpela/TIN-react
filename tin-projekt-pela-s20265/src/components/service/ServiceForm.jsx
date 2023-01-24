import React from 'react';
import { withTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import { getEquipmentApiCall } from '../../apiCalls/equipmentApiCalls';
import {
  getServiceByIdApiCall,
  addServiceApiCall,
  updateServiceApiCall,
  getServiceTypesApiCall
} from '../../apiCalls/serviceApiCalls';
import formMode, { formValidationKeys } from '../../helpers/formHelper';
import { checkRequired } from '../../helpers/validationCommon';
import FormButtons from '../form/FormButtons';
import FormSelect from '../form/FormSelect';

class ServiceForm extends React.Component {
  constructor(props) {
    super(props);
    const currentFormMode = this.props.match.params.serviceId ? formMode.EDIT : formMode.NEW;

    this.state = {
      allowedTypes: [],
      allEquipment: [],
      service: {
        equipmentId: '',
        type: ''
      },
      errors: {
        equipmentId: '',
        type: ''
      },
      formMode: currentFormMode,
      redirect: false,
      error: null
    };
  }

  componentDidMount = () => {
    const currentFormMode = this.state.formMode;
    this.fetchServiceTypes();
    this.fetchAllEquipment();
    if (currentFormMode === formMode.EDIT) {
      this.fetchServiceDetails();
    }
  };

  fetchServiceTypes = () => {
    getServiceTypesApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              message: data.message
            });
          } else {
            this.setState({
              allowedTypes: data.map((t) => ({
                // eslint-disable-next-line no-unused-labels
                _id: t
              })),
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

  fetchServiceDetails = () => {
    getServiceByIdApiCall(this.props.match.params.serviceId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              message: data.message
            });
          } else {
            this.setState({
              service: data,
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
    const service = { ...this.state.service };
    service[name] = value;

    const errorMessage = this.validateField(name, value);
    const errors = { ...this.state.errors };
    errors[name] = errorMessage;

    this.setState({
      service: service,
      errors: errors
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      const service = this.state.service;
      const currentFormMode = this.state.formMode;

      let promise, response;

      if (currentFormMode === formMode.NEW) {
        promise = addServiceApiCall(service);
      } else if (currentFormMode === formMode.EDIT) {
        console.log(service);
        const serviceId = this.props.match.params.serviceId;
        promise = updateServiceApiCall(serviceId, service);
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

    if (fieldName === 'equipmentId') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }

    if (fieldName === 'type') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!this.state.allowedTypes.map((t) => t._id).includes(fieldValue)) {
        errorMessage = formValidationKeys.illegalValue;
      }
    }

    return errorMessage;
  };

  validateForm = () => {
    const service = this.state.service;
    const errors = this.state.errors;

    for (const fieldName in service) {
      const fieldValue = service[fieldName];
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
          ? t('service.form.add.confirm.text')
          : t('service.form.edit.confirm.text');

      return <Navigate to="/services" state={{ notice: { message: notice, type: 'success' } }} />;
    }

    const errorsSummary = this.hasErrors() ? t('form.validation.messages.hasErrors') : '';
    const fetchError = this.state.error ? t('form.validation.messages.fetchError') : '';
    const pageTitle =
      this.state.formMode === formMode.NEW
        ? t('service.form.add.pageTitle')
        : t('service.form.add.pageTitle');

    const globalErrorMessage = errorsSummary || fetchError || this.state.message;

    return (
      <main>
        <h2>{pageTitle}</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <FormSelect
            label={t('service.fields.equipment')}
            options={this.state.allEquipment}
            display={['type', 'purpose', 'size']}
            required
            error={this.state.errors.equipmentId}
            name="equipmentId"
            onChange={this.handleChange}
            value={this.state.service.equipmentId ?? ''}
          />
          <FormSelect
            label={t('service.fields.type')}
            options={this.state.allowedTypes}
            display={['_id']}
            required
            error={this.state.errors.type}
            name="type"
            onChange={this.handleChange}
            value={this.state.service.type ?? ''}
          />
          <FormButtons
            formMode={this.state.formMode}
            formType="service"
            error={globalErrorMessage}
            cancelPath="/services"
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

export default withTranslation()(withRouter(ServiceForm));
