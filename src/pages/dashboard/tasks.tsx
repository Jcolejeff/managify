import { useEffect, useState } from 'react';
import { CheckCircle, TrashIcon, X } from 'lucide-react';

interface Iprops {
  switchTab: (tab: string) => void;
  handleComplete: (tab: string) => void;
  data: string[];
}
interface items {
  id: number;
  name: string;
  level: string;
  description: string;
  number_of_titles: number;
}

const TaskListAndInput = () => {
  const checkIcon = (level: string) => {
    if (level === 'High') {
      return 'HighLevel';
    }

    if (level === 'Low') {
      return 'LowLevel';
    }
    return 'MediumLevel';
  };

  const [allKeywords, setAllKeywords] = useState<items[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<items[]>([]);
  const [removedKeywords, setRemovedKeywords] = useState<items[]>([]);
  const addToSelected = (item: items) => {
    const tempArr = allKeywords.filter((i) => i.id !== item.id);
    setAllKeywords(tempArr);
    const tempSelected = [...selectedKeywords, item];
    setSelectedKeywords(tempSelected);
  };
  const removeFromSelected = (item: items) => {
    const tempArr = selectedKeywords.filter((i) => i.id !== item.id);
    setSelectedKeywords(tempArr);
    const tempSelected = [...allKeywords, item];
    setAllKeywords(tempSelected);
  };

  return (
    <section className='grid h-full w-full grid-cols-2 gap-4'>
      {/* generated keywords tabs */}
      <div className=' flex h-full flex-col  gap-4  rounded-lg   border border-gray-100 p-6 shadow-lg '>
        <div className='mb-2 mt-3 flex flex-col  border-b px-1 pb-4'>
          <h2 className='text-xl font-semibold'>Todo List of Tasks</h2>
          <h3 className='text-sm text-gray-600'>Here you your tasks to complete</h3>
        </div>
        <div className=' grid grid-cols-2 gap-4'>
          {allKeywords.map((item, index: number) => {
            return (
              <button
                onClick={() => addToSelected(item)}
                key={index}
                className='flex flex-col gap-3 rounded-lg border border-gray-100 px-4 py-4 shadow-md '
              >
                <p className='font-bold'> {item.name}</p>
                <div className='flex w-full justify-between'>
                  <span className='flex items-center gap-1'>
                    <CheckCircle size={16} />
                    <p className='text-gray-400'>{item.number_of_titles}</p>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* selected keywords tab */}
      <div className=' flex h-full flex-col  gap-4  rounded-lg border border-gray-100  p-6   shadow-lg '>
        <div className='mb-2 mt-3 flex flex-col  border-b px-1 pb-4'>
          <h2 className='text-xl font-semibold'>Completed Tasks</h2>
          <h3 className=' text-sm text-gray-600'>Here are Your Completed Tasks</h3>
        </div>
        <div className=' grid grid-cols-1 gap-4'>
          {selectedKeywords.map((item, index: number) => {
            return (
              <button
                onClick={() => removeFromSelected(item)}
                key={index}
                className='flex flex-col gap-3 rounded-lg border border-gray-100 px-4 py-4 shadow-md '
              >
                <div className='flex w-full justify-between'>
                  <p className='font-bold'> {item.name}</p>
                  <X size={16} className='cursor-pointer' />
                </div>
                <div className='flex w-full justify-between'>
                  <span className='flex items-center gap-1'>
                    <CheckCircle size={16} />

                    <p className='text-gray-400'>{item.number_of_titles}</p>
                  </span>
                  <span className='flex items-center gap-1'>
                    <p className='text-gray-500'>{item.level}</p>
                  </span>
                </div>
                <div className='w-full'>
                  <p className='text-start text-xs'>
                    {item.number_of_titles} Articles generated | Target: 5
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {selectedKeywords.length > 0 && (
          <div className='flex w-full items-center justify-between gap-4'>
            <button
              disabled={true}
              type='button'
              className='shadow-9 group invisible mt-9 flex w-max items-center justify-center gap-2 rounded-[6px] bg-white px-3 py-1 transition-all duration-300 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:px-6 md:py-2'
            >
              <span className='whitespace-nowrap text-sm font-[500] leading-[24px] tracking-[0.4px] text-primary-1'>
                {`Previous`}
              </span>
            </button>

            <button className='group mt-9 flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-4 py-1 transition-all duration-300 ease-in-out hover:opacity-90 md:px-6 md:py-2'>
              <span className='text-sm font-[500]  leading-[24px] tracking-[0.4px] text-white'>
                {`Proceed`}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskListAndInput;
