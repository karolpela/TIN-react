import React from 'react';
import { Link } from 'react-router-dom';

class CustomerForm extends React.Component {
  render() {
    return (
      <main>
        <h2>new emp</h2>
        <form className="form">
          <label htmlFor="firstName">
            fn:
            <abbr title="required" aria-label="required"></abbr>
          </label>
          <input type="text" name="" id="" placeholder="" value="" />
          <span id="error" className="errors-text"></span>

          <label htmlFor="lastName">
            ln:
            <abbr title="required" aria-label="required"></abbr>
          </label>
          <input type="text" name="" id="" placeholder="" value="" />
          <span id="error" className="errors-text"></span>

          <label htmlFor="phoneNo">
            pn:
            <abbr title="required" aria-label="required"></abbr>
          </label>
          <input type="text" name="" id="" placeholder="" value="" />
          <span id="error" className="errors-text"></span>

          <div className="formButtons">
            <p id="errorsSummary" className="errors-text">
              <input type="submit" className="form-button-submit" value="add" />
              <Link to="/customers" className="form-button-cancel">
                cn
              </Link>
            </p>
          </div>
        </form>
      </main>
    );
  }
}

export default CustomerForm;
