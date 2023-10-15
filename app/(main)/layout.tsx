import Navbar from '@/components/navbar';
import { NextPage } from 'next';

const MainLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='w-full h-screen'>
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
