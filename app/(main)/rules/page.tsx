import { Subnav } from '@/components/navbar/subnav';
import { ClipboardList } from 'lucide-react';
import { NextPage } from 'next';

const RulesPage: NextPage = () => {
  return (
    <div className='grid grid-flow-row gap-2 w-full sm:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto'>
      <Subnav />
      <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2'>
        <div className='grid grid-cols-[max-content_auto] gap-1 place-items-center w-max'>
          <ClipboardList className='w-4 h-4 text-zinc-500' />
          <span className='uppercase text-xs font-bold text-zinc-500'>RULES</span>
        </div>
        todo: add rules
      </div>
    </div>
  );
};

export default RulesPage;
