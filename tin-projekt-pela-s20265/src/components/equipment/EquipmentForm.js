import React from 'react';
import { Link } from 'react-router-dom';

class EquipmentForm extends React.Component {
  render() {
    return (
      <main>
        <h2>new eq</h2>
        <form className="form">
          <label htmlFor="type">
            tp:
            <abbr title="required" aria-label="required"></abbr>
          </label>
          <input type="text" name="" id="" placeholder="" value="" />
          <span id="errorType" className="errors-text"></span>

          <label htmlFor="purpose">
            pr:
            <abbr title="required" aria-label="required"></abbr>
          </label>
          <input type="text" name="" id="" placeholder="" value="" />
          <span id="errorPurpose" className="errors-text"></span>

          <label htmlFor="size">
            sz:
            <abbr title="required" aria-label="required"></abbr>
          </label>
          <input type="number" name="" id="" placeholder="" value="" />
          <span id="errorSize" className="errors-text"></span>

          <div className="formButtons">
            <p id="errorsSummary" className="errors-text">
              <input type="submit" className="form-button-submit" value="add" />
              <Link to="/equipments" className="form-button-cancel">
                cn
              </Link>
            </p>
          </div>
        </form>
      </main>
    );
  }
}

export default EquipmentForm;
