import { LOGIN_REQUEST } from '../actions/auth';
import accountHelpers from '../../helpers/utils/accountHelpers';

const initialState = {
  isAuth: !!accountHelpers.getToken(),
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST.SUCCESS: {
      accountHelpers.setToken(payload.data.token);

      return {
        ...state,
        isAuth: true,
      };
    }

    default:
      return state;
  }
};

export default reducer;
