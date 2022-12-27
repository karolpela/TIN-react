const equipmentBaseUrl = 'http://localhost:3000/api/equipment';

export function getEquipmentApiCall() {
  const promise = fetch(equipmentBaseUrl);
  return promise;
}

export function getEquipmentByIdApiCall(equipmentId) {
  const url = `${equipmentBaseUrl}/${equipmentId}`;
  const promise = fetch(url);
  return promise;
}
