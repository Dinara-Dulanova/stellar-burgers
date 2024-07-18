import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../../components/protected-route';
import { RootState, useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredients';
import { useSelector } from 'react-redux';
import { fetchFeeds } from '../../services/slices/feeds';

const App = () => {
  const ingredientsState = useSelector((state: RootState) => state.ingredients);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
    // dispatch(fetchFeeds());
  }, [dispatch]);

  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        {/* <Route path="/login" element={<ProtectedRoute><ListPage /></ProtectedRoute>} /> */}
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        {/* <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        /> */}

        <Route element={<ProtectedRoute accessRoles={[]} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          {/* <Route path='/profile/orders/:number' element={
              // <Modal title='test' children='<OrderInfo />' >
              //   <OrderInfo />
              // </Modal>
            } /> */}
        </Route>

        {
          /* <Route path='/feed/:number' element={
            <Modal>
              <OrderInfo />
            </Modal>
          } />*/

          <Route path='*' element={<NotFound404 />} />
        }
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}

      {/* <AppHeader />
    <ConstructorPage /> */}
    </div>
  );
};

export default App;
