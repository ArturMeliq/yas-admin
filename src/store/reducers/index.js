import { combineReducers } from 'redux';
import auth from './auth';
import business from './business';

const rootReducer = combineReducers({
  auth,
  business,
});
export default rootReducer;
