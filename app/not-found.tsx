import { NextPage } from 'next';
import NotFound from '@/components/page-not-found';

const NotFoundPage: NextPage = () => {
  return <NotFound message='Page not found :/' />;
};

export default NotFoundPage;
