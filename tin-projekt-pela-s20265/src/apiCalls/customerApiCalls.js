const customersBaseUrl = 'http://localhost:3000/api/customers';

export function getCustomersApiCall() {
  const promise = fetch(customersBaseUrl);
  return promise;
}

export function getCustomerByIdApiCall(customerId) {
  const url = `${customersBaseUrl}/${customerId}`;
  const promise = fetch(url);
  return promise;
}
