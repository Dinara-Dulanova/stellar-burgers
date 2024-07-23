import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/user';
import { RequestStatus } from '@utils-types';
import { Navigate } from 'react-router-dom';
import { Preloader } from '../../components/ui/preloader';

export const Login: FC = () => {
  const dispatch = useDispatch();
  // const isAuthChecked = useSelector((store) => store.user.status);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // if (isAuthChecked === RequestStatus.Succes) {
  //   return <Navigate to={'/'} />;
  // }

  // if (isAuthChecked === RequestStatus.Loading) {
  //   return <Preloader />;
  // }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
