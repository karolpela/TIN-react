import React from 'react';
import { withTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls';
import {
  getRepairByIdApiCall,
  addRepairApiCall,
  updateRepairApiCall,
  getRepairStatuses as getRepairStatusesApiCall
} from '../../apiCalls/repairApiCalls';
import { getServicesApiCall } from '../../apiCalls/serviceApiCalls';
import formMode, { formValidationKeys } from '../../helpers/formHelper';
import { checkRequired, checkTextLengthRange } from '../../helpers/validationCommon';
import FormButtons from '../form/FormButtons';
import FormInput from '../form/FormInput';
import FormSelect from '../form/FormSelect';

class RepairForm extends React.Component {
  constructor(props) {
    super(props);
    const currentFormMode = this.props.match.params.repairId ? formMode.EDIT : formMode.NEW;

    this.state = {
      allEmployees: [],
      allowedStatuses: [],
      openServices: [],
      repair: {
        serviceId: '',
        employeeId: '',
        problem: '',
        status: 'zgłoszona' // default value
      },
      errors: {
        serviceId: '',
        employeeId: '',
        problem: '',
        status: ''
      },
      formMode: currentFormMode,
      redirect: false,
      error: null
    };
  }

  componentDidMount = () => {
    const currentFormMode = this.state.formMode;
    this.fetchOpenServices();
    this.fetchAllEmployees();
    if (currentFormMode === formMode.EDIT) {
      this.fetchRepairStatuses();
      this.fetchRepairDetails();
    }
  };

  fetchRepairStatuses = () => {
    getRepairStatusesApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              message: data.message
            });
          } else {
            this.setState({
              allowedStatuses: data.map((s) => ({
                // eslint-disable-next-line no-unused-labels
                _id: s
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

  fetchAllEmployees = () => {
    getCustomersApiCall(['employee'])
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              message: data.message
            });
          } else {
            this.setState({
              allEmployees: data.map((e) => e),
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

  fetchOpenServices = () => {
    getServicesApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              message: data.message
            });
          } else {
            this.setState({
              openServices: data
                .filter((s) => ['nowy', 'w trakcie'].includes(s.status))
                .map((s) => s),
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

  fetchRepairDetails = () => {
    getRepairByIdApiCall(this.props.match.params.repairId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              message: data.message
            });
          } else {
            this.setState({
              repair: data,
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
    const repair = { ...this.state.repair };
    repair[name] = value;

    const errorMessage = this.validateField(name, value);
    const errors = { ...this.state.errors };
    errors[name] = errorMessage;

    this.setState({
      repair: repair,
      errors: errors
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      const repair = this.state.repair;
      const currentFormMode = this.state.formMode;

      let promise, response;

      if (currentFormMode === formMode.NEW) {
        promise = addRepairApiCall(repair);
      } else if (currentFormMode === formMode.EDIT) {
        console.log(repair);
        const repairId = this.props.match.params.repairId;
        promise = updateRepairApiCall(repairId, repair);
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

    if (fieldName === 'serviceId') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }

    if (fieldName === 'employeeId') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }

    if (fieldName === 'problem') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
        errorMessage = formValidationKeys.len_2_60;
      }
    }

    if (fieldName === 'status') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkTextLengthRange(fieldValue, 2, 20)) {
        errorMessage = formValidationKeys.len_2_20;
      }
    }

    return errorMessage;
  };

  validateForm = () => {
    const repair = this.state.repair;
    const errors = this.state.errors;

    for (const fieldName in repair) {
      const fieldValue = repair[fieldName];
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
          ? t('repair.form.add.confirm.text')
          : t('repair.form.edit.confirm.text');

      return <Navigate to="/repairs" state={{ notice: { message: notice, type: 'success' } }} />;
    }

    const errorsSummary = this.hasErrors() ? t('form.validation.messages.hasErrors') : '';
    const fetchError = this.state.error ? t('form.validation.messages.fetchError') : '';
    const pageTitle =
      this.state.formMode === formMode.NEW
        ? t('repair.form.add.pageTitle')
        : t('repair.form.add.pageTitle');

    const globalErrorMessage = errorsSummary || fetchError || this.state.message;

    return (
      <main>
        <h2>{pageTitle}</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <FormSelect
            label={t('repair.fields.employee')}
            options={this.state.allEmployees}
            display={['firstName', 'lastName']}
            required
            error={this.state.errors.employeeId}
            name="employeeId"
            onChange={this.handleChange}
            value={this.state.repair.employeeId ?? ''}
          />
          <FormSelect
            label={t('repair.fields.service')}
            options={this.state.openServices}
            display={['_id', 'type', 'equipment.type', 'equipment.purpose', 'equipment.size']}
            required
            error={this.state.errors.serviceId}
            name="serviceId"
            onChange={this.handleChange}
            value={this.state.repair.serviceId ?? ''}
          />
          <FormInput
            type="text"
            label={t('repair.fields.problem')}
            required
            error={this.state.errors.problem}
            name="problem"
            placeholder="2-60 chars"
            onChange={this.handleChange}
            value={this.state.repair.problem ?? ''}
          />
          {this.state.formMode === formMode.EDIT && (
            <FormSelect
              label={t('repair.fields.status')}
              options={this.state.allowedStatuses}
              display={['_id']}
              required
              error={this.state.errors.status}
              name="status"
              onChange={this.handleChange}
              value={this.state.service.status ?? ''}
            />
          )}
          <FormButtons
            formMode={this.state.formMode}
            formType="repair"
            error={globalErrorMessage}
            cancelPath="/repairs"
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

export default withTranslation()(withRouter(RepairForm));
