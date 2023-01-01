import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import formMode from '../../helpers/formHelper';

function FormButtons(props) {
  const { t } = useTranslation();
  const formType = props.formType;
  const submitButtonLabel =
    props.formMode === formMode.NEW
      ? t(`${formType}.form.add.btnLabel`)
      : t(`${formType}.form.edit.btnLabel`);

  return (
    <div className="form-buttons">
      <p id="errorsSummary" className="errors-text">
        {props.error}
      </p>
      <input type="submit" className="form-button-submit" value={submitButtonLabel} />
      <Link to={props.cancelPath} className="form-button-cancel">
        {t('form.actions.cancel')}
      </Link>
    </div>
  );
}

export default FormButtons;
