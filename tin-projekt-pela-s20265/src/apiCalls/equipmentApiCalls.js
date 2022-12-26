import { equipmentList, equipmentDetailsList } from './equipmentApiMockData';

export function getEquipmentApiCall() {
  return equipmentList;
}

export function getCustomerByIdApiCall(eqId) {
  const eq = equipmentDetailsList.find((eq) => eq._id === eqId);
  return eq;
}
