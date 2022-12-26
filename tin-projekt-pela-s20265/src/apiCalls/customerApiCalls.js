import { customerList, customerDetailsList } from './customerApiMockData';

export function getCustomersApiCall() {
  return customerList;
}

export function getCustomerByIdApiCall(custId) {
  const customer = customerDetailsList.find((cust) => cust._id === custId);
  return customer;
}
