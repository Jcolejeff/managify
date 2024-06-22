import { useEffect, useState } from 'react';
import { CheckCircle, Edit, TrashIcon, X } from 'lucide-react';
import { CreateAndEditTask } from 'components/general/createAndEditTask';
import { formatDate } from 'date-fns';

interface Iprops {
  switchTab: (tab: string) => void;
  handleComplete: (tab: string) => void;
  data: string[];
}
interface items {
  id: number;
  name: string;
  dueDate: Date;
  description: string;
  number_of_titles: number;
}
const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    return JSON.parse(tasks);
  }
  return [];
};
const getCompletedTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('completedTasks');
  if (tasks) {
    return JSON.parse(tasks);
  }
  return [];
};

const TaskListAndInput = () => {
  const [allTasks, SetAllTask] = useState<items[]>(getTasksFromLocalStorage() || []);
  const [completedTasks, setCompletedTasks] = useState<items[]>(
    getCompletedTasksFromLocalStorage() || [],
  );
  const addToSelected = (item: items) => {
    const tempArr = allTasks.filter((i) => i.id !== item.id);
    SetAllTask(tempArr);
    const tempSelected = [...completedTasks, item];
    setCompletedTasks(tempSelected);
  };
  const removeFromSelected = (item: items) => {
    const tempArr = completedTasks.filter((i) => i.id !== item.id);
    setCompletedTasks(tempArr);
    const tempSelected = [...allTasks, item];
    SetAllTask(tempSelected);
  };

  return (
    <section className='grid h-full w-full grid-cols-2 gap-4'>
      {/* generated keywords tabs */}
      <div className=' flex h-full flex-col  gap-4  rounded-lg   border border-gray-100 p-6 shadow-lg '>
        <div className='mb-2 mt-3 flex flex-col  border-b px-1 pb-4'>
          <h2 className='text-xl font-semibold'>Todo List of Tasks</h2>
          <h3 className='text-sm text-gray-600'>Here you your tasks to complete</h3>
          <CreateAndEditTask
            tasks={allTasks}
            setTasks={SetAllTask}
            isEdit={false}
            trigger={
              <button className='group mt-9 flex items-center justify-center gap-2 rounded-[6px] bg-primary-1 px-4 py-1 transition-all duration-300 ease-in-out hover:opacity-90 md:px-6 md:py-2'>
                <span className='text-sm font-[500]  leading-[24px] tracking-[0.4px] text-white'>
                  {`Create Task`}
                </span>
              </button>
            }
          />
        </div>
        <div className=' grid gap-4'>
          {allTasks.map((item, index: number) => {
            return (
              <button
                key={index}
                className='flex flex-col gap-3 rounded-lg border border-gray-100 px-4 py-4 shadow-md '
              >
                <p className='font-bold capitalize'> {item.name}</p>
                <div className='flex w-full justify-between'>
                  <span className='flex items-center gap-1'>
                    <p className='text-gray-500'>{formatDate(item.dueDate, 'dd/MM/yyyy')}</p>
                  </span>
                </div>
                <div className='flex w-full justify-between'>
                  <span className='flex items-center gap-1'>
                    <CheckCircle size={20} onClick={() => addToSelected(item)} />
                  </span>
                  <CreateAndEditTask
                    tasks={allTasks}
                    setTasks={SetAllTask}
                    isEdit={true}
                    taskId={item.id}
                    task={item}
                    trigger={
                      <button className='group flex items-center justify-center gap-2 rounded-[6px]  transition-all duration-300 ease-in-out hover:opacity-90 px-2'>
                        <Edit size={20} className='' />
                      </button>
                    }
                  />
                  <TrashIcon
                    size={20}
                    className='cursor-pointer fill-red-600 text-red-800'
                    onClick={() => {
                      const tempArr = allTasks.filter((i) => i.id !== item.id);
                      SetAllTask(tempArr);
                    }}
                  />
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
          {completedTasks.map((item, index: number) => {
            return (
              <button
                onClick={() => removeFromSelected(item)}
                key={index}
                className='flex flex-col gap-3 rounded-lg border border-gray-100 px-4 py-4 shadow-md '
              >
                <div className='flex w-full justify-between'>
                  <p className='font-bold capitalize'> {item.name}</p>
                  <X size={16} className='cursor-pointer' />
                </div>
                <div className='flex w-full justify-between'>
                  <span className='flex items-center gap-1'>
                    <p className='text-gray-500'>{formatDate(item.dueDate, 'dd/MM/yyyy')}</p>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TaskListAndInput;
