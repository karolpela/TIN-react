import React from 'react';
import { Link } from 'react-router-dom';
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls';
import { getEquipmentApiCall } from '../../apiCalls/equipmentApiCalls';

class RentalForm extends React.Component {
  render() {
    const allCustomers = getCustomersApiCall();
    const allEquipment = getEquipmentApiCall();

    return (
      <main>
        <h2>new rent</h2>
        <form className="form">
          <label htmlFor="customer">
            cust:
            <abbr title="required" aria-label="required">
              *
            </abbr>
          </label>
          <select id="customer" name="custId" required>
            <option value="">-- sel emp---</option>
            {allCustomers.map((cust) => (
              <option
                key={cust._id}
                value={cust._id}
                label={cust.firstName + ' ' + cust.lastName}
              ></option>
            ))}
            <span id="errorCustomer" className="errors-text"></span>
          </select>
          <label htmlFor="equipment">
            eq:
            <abbr title="required" aria-label="required">
              *
            </abbr>
          </label>
          <select id="equipment" name="eqId" required>
            <option value="">-- sel eq---</option>
            {allEquipment.map((eq) => (
              <option
                key={eq._id}
                value={eq._id}
                label={eq.type + ' ' + eq.purpose + ' ' + eq.size}
              ></option>
            ))}
            <span id="errorEquipment" className="errors-text"></span>
          </select>
          <label htmlFor="startDate">
            st:
            <abbr title="required" aria-label="required">
              *
            </abbr>
          </label>
          <input type="date" id="startDate" name="startDate" value="" />
          <span id="errorStartDate" className="errors-text"></span>
          <label htmlFor="endDate">end:</label>
          <input type="date" id="endDate" name="endDate" value="" />
          <span id="errorEndDate" className="errors-text"></span>
        </form>

        <div className="form-buttons">
          <p id="errorsSummary" className="errors-text"></p>
          <input type="submit" className="form-button-submit" value="add" />
          <Link to="/rentals" className="form-button-cancel">
            cn
          </Link>
        </div>
      </main>
    );
  }
}

export default RentalForm;
