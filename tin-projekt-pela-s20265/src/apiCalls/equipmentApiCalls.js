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

export function addEquipmentApiCall(equipment) {
  const equipmentString = JSON.stringify(equipment);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: equipmentString
  };
  const promise = fetch(equipmentBaseUrl, options);
  return promise;
}

export function updateEquipmentApiCall(equipmentId, equipment) {
  const url = `${equipmentBaseUrl}/${equipmentId}`;
  const equipmentString = JSON.stringify(equipment);
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: equipmentString
  };
  const promise = fetch(url, options);
  return promise;
}
