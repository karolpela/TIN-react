import React from 'react';
import { withTranslation } from 'react-i18next';
import { loginApiCall } from '../../apiCalls/authApiCalls';
import { formValidationKeys } from '../../helpers/formHelper';
import withRouter from '../../helpers/routerHelper';
import { checkRequired } from '../../helpers/validationCommon';
import FormButtons from '../form/FormButtons';
import FormInput from '../form/FormInput';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        phoneNo: '',
        password: ''
      },
      errors: {
        phoneNo: '',
        password: ''
      },
      error: '',
      message: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const user = { ...this.state.user };
    user[name] = value;

    const errorMessage = this.validateField(name, value);
    const errors = { ...this.state.errors };
    errors[name] = errorMessage;

    this.setState({
      user: user,
      errors: errors
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validateForm();
    const navigate = this.props.router.navigate;
    if (isValid) {
      const user = this.state.user;
      let response;
      loginApiCall(user)
        .then((res) => {
          response = res;
          return res.json();
        })
        .then(
          (data) => {
            if (response.status === 200) {
              if (data.token) {
                const userString = JSON.stringify(data);
                this.props.handleLogin(userString);
                navigate(-1);
              }
            } else if (response.status === 401) {
              console.log(401);
              this.setState({ message: data.message });
            }
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }
  };

  validateField = (fieldName, fieldValue) => {
    let errorMessage = '';

    if (fieldName === 'phoneNo') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }
    if (fieldName === 'password') {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }
    return errorMessage;
  };
  validateForm = () => {
    const user = this.state.user;
    const errors = this.state.errors;

    for (const fieldName in user) {
      const fieldValue = user[fieldName];
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
    const errorsSummary = this.hasErrors() ? t('form.validation.messages.hasErrors') : '';
    const fetchError = this.state.error ? t('form.validation.messages.fetchError') : '';
    const globalErrorMessage = errorsSummary || fetchError || this.state.message;

    return (
      <main>
        <h2>{t('auth.pageTitle')}</h2>
        <form className="form" method="post" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            label={t('customer.fields.phoneNo')}
            required
            error={this.state.errors.phoneNo}
            name="phoneNo"
            onChange={this.handleChange}
            value={this.state.user.phoneNo ?? ''}
          />
          <FormInput
            type="password"
            label={t('customer.fields.password')}
            required
            error={this.state.errors.password}
            name="password"
            onChange={this.handleChange}
            value={this.state.user.password ?? ''}
          />
          <FormButtons error={globalErrorMessage} submitButtonLabel={t('form.actions.login')} />
        </form>
      </main>
    );
  }
}

export default withRouter(withTranslation()(LoginForm));
