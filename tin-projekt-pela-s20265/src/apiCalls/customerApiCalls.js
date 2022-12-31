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

export function addCustomerApiCall(customer) {
  const customerString = JSON.stringify(customer);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: customerString
  };
  const promise = fetch(customersBaseUrl, options);
  return promise;
}

export function updateCustomerApiCall(customerId, customer) {
  const url = `${customersBaseUrl}/${customerId}`;
  const customerString = JSON.stringify(customer);
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: customerString
  };
  const promise = fetch(url, options);
  return promise;
}
