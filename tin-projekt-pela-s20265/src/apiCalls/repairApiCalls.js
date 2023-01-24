import { createOptions } from '../helpers/authHelper';

const customersBaseUrl = 'http://localhost:3000/api/customers';

export function getCustomersApiCall() {
  const options = createOptions('GET', null);
  const promise = fetch(customersBaseUrl, options);
  return promise;
}

export function getCustomerByIdApiCall(customerId) {
  const url = `${customersBaseUrl}/${customerId}`;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

export function getCustomerRentalByIdApiCall(customerId, rentalId) {
  const url = `${customersBaseUrl}/${customerId}/rentals/${rentalId}`;
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
  const url = `${customersBaseUrl}/${customerId}`;
  const customerString = JSON.stringify(customer);
  const options = createOptions('PUT', customerString);
  const promise = fetch(url, options);
  return promise;
}
