import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feeds';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменную из стора */
  // const feeds = useSelector((state) => state.feed);
  const orders: TOrder[] = useSelector((state) => state.feed.feeds.orders);
  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
