import React from 'react';
import { withTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import {
  getEquipmentByIdApiCall,
  addEquipmentApiCall,
  updateEquipmentApiCall
} from '../../apiCalls/equipmentApiCalls';
import formMode from '../../helpers/formHelper';
import { checkRequired, checkTextLengthRange, checkShoeSize } from '../../helpers/validationCommon';
import FormButtons from '../form/FormButtons';
import FormInput from '../form/FormInput';

class EquipmentForm extends React.Component {
  constructor(props) {
    super(props);
    const currentFormMode = this.props.match.params.equipmentId ? formMode.EDIT : formMode.NEW;

    this.state = {
      equipment: {
        type: '',
        purpose: '',
        size: ''
      },
      errors: {
        type: '',
        purpose: '',
        size: ''
      },
      formMode: currentFormMode,
      redirect: false,
      error: null
    };
  }

  componentDidMount = () => {
    const currentFormMode = this.state.formMode;
    if (currentFormMode === formMode.EDIT) {
      this.fetchEquipmentDetails();
    }
  };

  fetchEquipmentDetails = () => {
    getEquipmentByIdApiCall(this.props.match.params.equipmentId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              message: data.message
            });
          } else {
            this.setState({
              equipment: data,
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
    const equipment = { ...this.state.equipment };
    equipment[name] = value;

    const errorMessage = this.validateField(name, value);
    const errors = { ...this.state.errors };
    errors[name] = errorMessage;

    this.setState({
      equipment: equipment,
      errors: errors
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      const equipment = this.state.equipment;
      const currentFormMode = this.state.formMode;

      let promise, response;

      if (currentFormMode === formMode.NEW) {
        promise = addEquipmentApiCall(equipment);
      } else if (currentFormMode === formMode.EDIT) {
        console.log(equipment);
        const equipmentId = this.props.match.params.equipmentId;
        promise = updateEquipmentApiCall(equipmentId, equipment);
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

    if (fieldName === 'type') {
      if (!checkRequired(fieldValue)) {
        errorMessage = 'field required';
      } else if (!checkTextLengthRange(fieldValue, 2, 12)) {
        errorMessage = 'Pole powinno zawierać od 2 do 12 znaków';
      }
    }

    if (fieldName === 'purpose') {
      if (!checkRequired(fieldValue)) {
        errorMessage = 'field required';
      } else if (!checkTextLengthRange(fieldValue, 2, 20)) {
        errorMessage = 'Pole powinno zawierać od 2 do 20 znaków';
      }
    }

    if (fieldName === 'size') {
      if (!checkRequired(fieldValue)) {
        errorMessage = 'field required';
      } else if (!checkShoeSize(fieldValue)) {
        errorMessage = 'Pole powinno zawierać rozmiar, np. 40 lub 40.5';
      }
    }

    return errorMessage;
  };

  validateForm = () => {
    const equipment = this.state.equipment;
    const errors = this.state.errors;

    for (const fieldName in equipment) {
      const fieldValue = equipment[fieldName];
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
          ? t('equipment.form.add.confirm.text')
          : t('equipment.form.edit.confirm.text');

      return <Navigate to="/equipment" state={{ notice: notice }} />;
    }

    const errorsSummary = this.hasErrors() ? t('form.messages.hasErrors') : '';
    const fetchError = this.state.error ? t('form.messages.fetchError') : '';
    const pageTitle =
      this.state.formMode === formMode.NEW
        ? t('equipment.form.add.pageTitle')
        : t('equipment.form.edit.pageTitle');

    const globalErrorMessage = errorsSummary || fetchError || this.state.message;

    return (
      <main>
        <h2>{pageTitle}</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            label={t('equipment.fields.type')}
            required
            error={this.state.errors.type}
            name="type"
            placeholder="2-12 chars"
            onChange={this.handleChange}
            value={this.state.equipment.type ?? ''}
          />
          <FormInput
            type="text"
            label={t('equipment.fields.purpose')}
            required
            error={this.state.errors.purpose}
            name="purpose"
            placeholder="2-20 chars"
            onChange={this.handleChange}
            value={this.state.equipment.purpose ?? ''}
          />
          <FormInput
            type="text"
            label={t('equipment.fields.size')}
            required
            error={this.state.errors.size}
            name="size"
            placeholder="e.g. 40 or 40.5"
            onChange={this.handleChange}
            value={this.state.equipment.size ?? ''}
          />
          <FormButtons
            formMode={this.state.formMode}
            formType="equipment"
            error={globalErrorMessage}
            cancelPath="/equipment"
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

export default withTranslation()(withRouter(EquipmentForm));
