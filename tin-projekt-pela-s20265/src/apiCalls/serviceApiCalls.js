import { createOptions } from '../helpers/authHelper';

const servicesBaseUrl = 'http://localhost:3000/api/services';

export function getServicesApiCall() {
  const options = createOptions('GET', null);
  const promise = fetch(servicesBaseUrl, options);
  return promise;
}

export function getServiceTypesApiCall() {
  const url = `${servicesBaseUrl}/types`;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

export function getServiceByIdApiCall(serviceId) {
  const url = `${servicesBaseUrl}/${serviceId}`;
  const options = createOptions('GET', null);
  const promise = fetch(url, options);
  return promise;
}

export function addServiceApiCall(service) {
  const serviceString = JSON.stringify(service);
  const options = createOptions('POST', serviceString);
  const promise = fetch(servicesBaseUrl, options);
  return promise;
}

export function updateServiceApiCall(serviceId, service) {
  const url = `${servicesBaseUrl}/${serviceId}`;
  const serviceString = JSON.stringify(service);
  const options = createOptions('PUT', serviceString);
  const promise = fetch(url, options);
  return promise;
}

export function deleteServiceApiCall(serviceId) {
  const url = `${servicesBaseUrl}/${serviceId}`;
  const options = createOptions('DELETE', null);
  const promise = fetch(url, options);
  return promise;
}
