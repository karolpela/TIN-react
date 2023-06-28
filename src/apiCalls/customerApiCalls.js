import { createOptions } from '../helpers/authHelper';

const customersBaseUrl = 'http://localhost:3000/api/customers';

export function getCustomersApiCall(roles) {
  const url = roles
    ? `${customersBaseUrl}?${roles.map((r) => 'role=' + r).join('&')}`
    : customersBaseUrl;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

export function getCustomersRolesApiCall() {
  const url = `${customersBaseUrl}/roles`;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

export function getCustomerByIdApiCall(customerId) {
  const url = `${customersBaseUrl}/${customerId}`;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

export function addCustomerApiCall(customer) {
  const customerString = JSON.stringify(customer);
  const options = createOptions('POST', customerString);
  const promise = fetch(customersBaseUrl, options);
  return promise;
}

export function updateCustomerApiCall(customerId, customer) {
  delete customer.password;
  const url = `${customersBaseUrl}/${customerId}`;
  const customerString = JSON.stringify(customer);
  const options = createOptions('PUT', customerString);
  const promise = fetch(url, options);
  return promise;
}

export function deleteCustomerApiCall(customerId) {
  const url = `${customersBaseUrl}/${customerId}`;
  const options = createOptions('DELETE', null);
  const promise = fetch(url, options);
  return promise;
}

//== Rentals ==//

export function getCustomerRentalByIdApiCall(customerId, rentalId) {
  const url = `${customersBaseUrl}/${customerId}/rentals/${rentalId}`;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

//==Repairs==//

export function getEmployeeRepairByIdApiCall(userId, repairId) {
  const url = `${customersBaseUrl}/${userId}/repairs/${repairId}`;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

export function addEmployeeRepairApiCall(userId, repair) {
  const url = `${customersBaseUrl}/${userId}/repairs`;
  const repairString = JSON.stringify(repair);
  const options = createOptions('POST', repairString);
  const promise = fetch(url, options);
  return promise;
}

export function updateEmployeeRepairApiCall(repairId, userId, repair) {
  const url = `${customersBaseUrl}/${userId}/repairs/${repairId}`;
  const repairString = JSON.stringify(repair);
  const options = createOptions('PUT', repairString);
  const promise = fetch(url, options);
  return promise;
}
