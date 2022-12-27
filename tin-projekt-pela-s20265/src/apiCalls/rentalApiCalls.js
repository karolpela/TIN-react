const rentalsBaseUrl = 'http://localhost:3000/api/rentals';

export function getRentalsApiCall() {
  const promise = fetch(rentalsBaseUrl);
  return promise;
}

export function getRentalByIdApiCall(rentalId) {
  const url = `${rentalsBaseUrl}/${rentalId}`;
  const promise = fetch(url);
  return promise;
}
