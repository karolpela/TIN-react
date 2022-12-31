import { Link } from 'react-router-dom';
import formMode from '../../helpers/formHelper';

function FormButtons(props) {
  const submitButtonLabel = props.formMode === formMode.NEW ? 'add' : 'edit';

  return (
    <div className="form-buttons">
      <p id="errorsSummary" className="errors-text">
        {props.error}
      </p>
      <input type="submit" className="form-button-submit" value={submitButtonLabel} />
      <Link to={props.cancelPath} className="form-button-cancel">
        cancel
      </Link>
    </div>
  );
}

export default FormButtons;
