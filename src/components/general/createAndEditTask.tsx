import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from 'helper/utils';
import { Button } from 'components/shadcn/ui/button';
import { Calendar } from 'components/shadcn/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/shadcn/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from 'components/shadcn/ui/popover';
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
  dueDate: Date;
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
const FormSchema = z.object({
  dueDate: z.date({
    required_error: 'A date of birth is required.',
  }),
  name: z.string({
    required_error: 'A name is required.',
  }),
});

export function CreateAndEditTask({ trigger, isEdit, tasks, setTasks, taskId, task }: iProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dueDate: task?.dueDate || new Date(),
      name: task?.name || '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isEdit) {
      // edit task
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, name: data.name, dueDate: data.dueDate };
        }
        return task;
      });
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else {
      // create task
      const newTask = {
        id: Math.random(),
        name: data.name,
        dueDate: data.dueDate,
        description: 'This is a description',
        number_of_titles: 0,
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    }
    setOpen(false);
  }

  return (
    <Dialog onOpenChange={() => setOpen(!open)} open={open}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Task' : 'Create Task'}</DialogTitle>
          <DialogDescription>{isEdit ? 'Edit your task' : 'Create a new task'}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <Label>Name</Label>
                  <Input {...field} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='dueDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Due Date </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
