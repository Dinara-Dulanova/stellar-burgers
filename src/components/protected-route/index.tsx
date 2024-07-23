// import { useSelector} from '../services/store';
// import { isAuthCheckedSelector, userDataSelector } from '../services/store/selectors';
import { Navigate } from 'react-router';
import { useSelector } from '../../services/store';
import { RequestStatus } from '@utils-types';
import { Preloader } from '../ui/preloader';
import { useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector((store) => store.user.status); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const user = useSelector((store) => store.user.loginUserError); // userDataSelector — селектор получения пользователя из store

  const location = useLocation();

  if (isAuthChecked === RequestStatus.Loading) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // если пользователь на странице авторизации и данные есть в хранилище
    // return <Navigate replace to='/list' />;
    const from = location.state.from || { pathname: '/' };

    const backgroundLocation = location.state.from.state || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }

  return children;
};
