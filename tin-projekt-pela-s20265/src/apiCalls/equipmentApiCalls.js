import { createOptions } from '../helpers/authHelper';

const equipmentBaseUrl = 'http://localhost:3000/api/equipment';

export function getEquipmentApiCall() {
  const options = createOptions('GET', null);
  const promise = fetch(equipmentBaseUrl, options);
  return promise;
}

export function getEquipmentByIdApiCall(equipmentId) {
  const url = `${equipmentBaseUrl}/${equipmentId}`;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

export function addEquipmentApiCall(equipment) {
  const equipmentString = JSON.stringify(equipment);
  const options = createOptions('POST', equipmentString);
  const promise = fetch(equipmentBaseUrl, options);
  return promise;
}

export function updateEquipmentApiCall(equipmentId, equipment) {
  const url = `${equipmentBaseUrl}/${equipmentId}`;
  const equipmentString = JSON.stringify(equipment);
  const options = createOptions('PUT', equipmentString);
  const promise = fetch(url, options);
  return promise;
}

export function deleteEquipmentApiCall(equipmentId) {
  const url = `${equipmentBaseUrl}/${equipmentId}`;
  const options = createOptions('DELETE', null);
  const promise = fetch(url, options);
  return promise;
}
