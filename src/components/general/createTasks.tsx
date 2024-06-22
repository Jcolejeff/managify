import { Button } from '../shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn/ui/dialog';
import { Input } from '../shadcn/input';
import { Label } from '../shadcn/ui/label';
import { useState } from 'react';
interface items {
  id: number;
  name: string;
  dueDate: string;
  description: string;
  number_of_titles: number;
}
interface iProps {
  trigger: JSX.Element;
  isEdit: boolean;
  tasks: items[];
  setTasks: React.Dispatch<React.SetStateAction<items[]>>;
  taskId?: number;
  task?: items;
}
export function CreateAndEditTask({ trigger, isEdit, tasks, setTasks, taskId, task }: iProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(task?.name || '');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === '') return;
    if (isEdit) {
      // edit task
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, name: value };
        }
        return task;
      });
      setTasks(updatedTasks);
    } else {
      // create task
      const newTask = {
        id: Math.random(),
        name: value,
        dueDate: 'High',
        description: 'This is a description',
        number_of_titles: 0,
      };
      setTasks([...tasks, newTask]);
    }
    setValue('');
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={() => setOpen(!open)} open={open}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Task' : 'Create Task'}</DialogTitle>
          <DialogDescription>{isEdit ? 'Edit your task' : 'Create a new task'}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input id='name' value={value} onChange={handleChange} className='col-span-3' />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>{isEdit ? 'Save Changes' : 'Create Task'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
