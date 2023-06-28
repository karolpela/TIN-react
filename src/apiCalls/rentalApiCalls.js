import { createOptions } from '../helpers/authHelper';

const rentalsBaseUrl = 'http://localhost:3000/api/rentals';

export function getRentalsApiCall() {
  const options = createOptions('GET', null);
  const promise = fetch(rentalsBaseUrl, options);
  return promise;
}

export function getRentalByIdApiCall(rentalId) {
  const options = createOptions('GET', null);
  const url = `${rentalsBaseUrl}/${rentalId}`;
  const promise = fetch(url, options);
  return promise;
}

export function getRentalsByCustomerCall(userId) {
  const options = createOptions('GET', null);
  const url = `${rentalsBaseUrl}/customer/${userId}`;
  const promise = fetch(url, options);
  return promise;
}

export function addRentalApiCall(rental) {
  const rentalString = JSON.stringify(rental);
  const options = createOptions('POST', rentalString);
  const promise = fetch(rentalsBaseUrl, options);
  return promise;
}

export function updateRentalApiCall(rentalId, rental) {
  const url = `${rentalsBaseUrl}/${rentalId}`;
  const rentalString = JSON.stringify(rental);
  const options = createOptions('PUT', rentalString);
  const promise = fetch(url, options);
  return promise;
}

export function deleteRentalApiCall(rentalId) {
  const url = `${rentalsBaseUrl}/${rentalId}`;
  const options = createOptions('DELETE', null);
  const promise = fetch(url, options);
  return promise;
}
