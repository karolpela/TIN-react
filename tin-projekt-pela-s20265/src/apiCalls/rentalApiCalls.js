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

export function addRentalApiCall(rental) {
  const rentalString = JSON.stringify(rental);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: rentalString
  };
  const promise = fetch(rentalsBaseUrl, options);
  return promise;
}

export function updateRentalApiCall(rentalId, rental) {
  const url = `${rentalsBaseUrl}/${rentalId}`;
  const rentalString = JSON.stringify(rental);
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: rentalString
  };
  const promise = fetch(url, options);
  return promise;
}
