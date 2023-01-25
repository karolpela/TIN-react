import { createOptions } from '../helpers/authHelper';

const repairsBaseUrl = 'http://localhost:3000/api/repairs';

export function getRepairsApiCall() {
  const options = createOptions('GET', null);
  const promise = fetch(repairsBaseUrl, options);
  return promise;
}

export function getRepairByIdApiCall(repairId) {
  const url = `${repairsBaseUrl}/${repairId}`;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

export function getRepairStatuses() {
  const url = `${repairsBaseUrl}/statuses`;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

export function getRepairRentalByIdApiCall(repairId, rentalId) {
  const url = `${repairsBaseUrl}/${repairId}/rentals/${rentalId}`;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

export function addRepairApiCall(repair) {
  const repairString = JSON.stringify(repair);
  const options = createOptions('POST', repairString);
  const promise = fetch(repairsBaseUrl, options);
  return promise;
}

export function updateRepairApiCall(repairId, repair) {
  const url = `${repairsBaseUrl}/${repairId}`;
  const repairString = JSON.stringify(repair);
  const options = createOptions('PUT', repairString);
  const promise = fetch(url, options);
  return promise;
}
