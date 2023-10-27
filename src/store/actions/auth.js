import Api from '../../Api/Api';
import { define } from '../redux-request';

export const LOGIN_REQUEST = define('LOGIN_REQUEST');

export function loginRequest(data) {
  return LOGIN_REQUEST.request(() => Api.login(data));
}
