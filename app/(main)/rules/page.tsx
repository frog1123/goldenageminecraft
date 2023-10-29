import { Subnav } from '@/components/navbar/subnav';
import { NextPage } from 'next';

const RulesPage: NextPage = () => {
  return (
    <div className='grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto'>
      <Subnav />
      <p>rules page</p>
    </div>
  );
};

export default RulesPage;
