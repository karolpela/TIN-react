export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function isAuthenticated() {
  const user = getCurrentUser();
  if (user) {
    return true;
  }
  return false;
}

export function isEmployee() {
  const user = getCurrentUser();
  if (!user) return false;

  if (user.role === 'employee' || user.role === 'admin') {
    return true;
  }
  return false;
}

export function isAdmin() {
  const user = getCurrentUser();
  if (!user) return false;
  if (user.role === 'admin') {
    return true;
  }
  return false;
}

export function createOptions(method, body) {
  const user = getCurrentUser();
  let token = user?.token;

  if (method === 'POST' || method === 'PUT') {
    return {
      method: method,
      headers: {
        'Content-Type': 'application-json',
        Authorization: 'Bearer ' + token
      },
      body: body
    };
  } else {
    return {
      method: method,
      headers: {
        'Content-Type': 'application-json',
        Authorization: 'Bearer ' + token
      }
    };
  }
}
