// import { useSelector} from '../services/store';
// import { isAuthCheckedSelector, userDataSelector } from '../services/store/selectors';
import { Navigate } from 'react-router';

export const ProtectedRoute = ({ children }: any) => {
  let isAuthChecked = false;
  return children;
  //     const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  //     const user = useSelector(userDataSelector); // userDataSelector — селектор получения пользователя из store

  //   if (!isAuthChecked) { // пока идёт чекаут пользователя, показываем прелоадер
  //     return <Preloader />;
  //   }

  //   if (!user) { // если пользователя в хранилище нет, то делаем редирект
  //     return <Navigate replace to='/login'/>;
  //   }
};
