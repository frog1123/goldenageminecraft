import Navbar from '@/components/navbar/navbar';
import { NextPage } from 'next';

const MainLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='w-full h-screen'>
      <Navbar />
      <div className='py-20'>{children}</div>
    </div>
  );
};

export default MainLayout;
