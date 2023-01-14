import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import formMode from '../../helpers/formHelper';

function FormButtons(props) {
  const { t } = useTranslation();
  const formType = props.formType;
  const navigate = useNavigate();

  let submitButtonLabel;

  if (props.formMode === formMode.NEW) {
    submitButtonLabel = t(`${formType}.form.add.btnLabel`);
  } else if (props.formMode === formMode.EDIT) {
    submitButtonLabel = t(`${formType}.form.edit.btnLabel`);
  } else {
    submitButtonLabel = t(props.submitButtonLabel);
  }

  return (
    <div className="form-buttons">
      <p id="errorsSummary" className="errors-text">
        {props.error}
      </p>
      <input type="submit" className="form-button-submit" value={submitButtonLabel} />
      <button type="button" onClick={() => navigate(-1)} className="form-button-cancel">
        {t('form.actions.cancel')}
      </button>
    </div>
  );
}

export default FormButtons;
