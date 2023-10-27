class accountHelpers {
  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getToken = (token = 'token') => localStorage.getItem(token);

  static getUser = () => JSON.parse(localStorage.getItem('user'));

  static removeLocalStorage() {
    localStorage.clear();
    sessionStorage.clear();
  }
}

export default accountHelpers;
