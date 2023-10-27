import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/icons/logo_icon/Asset.svg';
import classes from './login.module.scss';
import Input from '../../components/_common/Form/Input/Input';
import Button from '../../components/_common/Form/Button/Button';
import { loginRequest } from '../../store/actions/auth';
import Utils from '../../helpers/utils/utils';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [loginData, setData] = useState({
    login: '',
    password: '',
  });
  const [isLoading, setLoading] = useState(false);

  const { login, password } = loginData;

  useEffect(() => {
    if (isAuth) navigate('/', { replace: true });
  }, []);

  const changeLoginData = (path, value) => {
    setData((prev) => ({ ...prev, [path]: value }));
  };

  const adminLogin = async (e) => {
    e.preventDefault();
    let errorMsg = '';

    if (!login.trim() || !password.trim()) errorMsg = 'Email and password is required';
    else if (!Utils.isEmail(login)) errorMsg = 'Incorrect email or password';

    if (errorMsg) {
      toast.error(errorMsg);
    } else {
      setLoading(true);
      const { status } = await dispatch(loginRequest({ ...loginData, via: 'login' }));

      if (status === 'ok') {
        navigate('/', { replace: true });
      } else {
        toast.error('Incorrect email or password');
      }

      setLoading(false);
    }
  };

  return (
    <div className={classes.logIn_wrapper}>
      <div className={classes.logIn_header}>
        <Logo className={classes.logIn_logo} />
      </div>

      <div className={classes.logIn_main_content}>
        <h4>Log in to Yas</h4>
        <form onSubmit={adminLogin}>
          <Input
            className={classes.login_password_input}
            value={login}
            onChange={(value) => changeLoginData('login', value)}
            placeholder="Email address"
          />

          <Input
            value={password}
            className={classes.login_password_input}
            onChange={(value) => changeLoginData('password', value)}
            type="password"
            placeholder="Password"
          />

          <Button
            className={classes.login_button}
            disabled={isAuth}
            type="submit"
            loading={isLoading}
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
