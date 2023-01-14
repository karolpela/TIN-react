export function getCurrentUser() {
  const u = localStorage.getItem('user');
  console.log(u);
  return JSON.parse(localStorage.getItem('user'));
}

export function isAuthenticated() {
  const user = getCurrentUser();
  if (user) {
    return true;
  }
  return false;
}
