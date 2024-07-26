// import { useSelector} from '../services/store';
// import { isAuthCheckedSelector, userDataSelector } from '../services/store/selectors';
import { useSelector } from '../../services/store';
import { RequestStatus } from '@utils-types';
import { Preloader } from '../ui/preloader';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector((store) => store.user.status); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  const user = useSelector((store) => store.user.userData); // userDataSelector — селектор получения пользователя из store

  const location = useLocation();
  const from = location.state?.from || '/';

  if (isAuthChecked === RequestStatus.Loading) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // если пользователь на странице авторизации и данные есть в хранилище
    return <Navigate to={from} />;
  }

  return children;
};
