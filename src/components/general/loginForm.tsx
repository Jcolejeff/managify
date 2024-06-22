import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from 'components/shadcn/ui/form';
import { Input } from 'components/shadcn/input';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-hot-toast';
import { useUserContext } from 'helper/hooks/useUserContext';
import { addUserToLocalStorage } from 'helper/utils';

const FormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Please enter a valid email.',
    })
    .email(),

  password: z.string({
    required_error: 'Password is required.',
  }),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { handleSetUser } = useUserContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'test@gmail.com',
      password: '12345',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.email !== 'test@gmail.com' || data.password !== '12345')
      return Toast.error('Invalid credentials');

    Toast.success('Login successful');
    const user = {
      id: Math.random().toString(),
      password: data.password,
      email: data.email,
    };
    handleSetUser(user);
    addUserToLocalStorage(user);
    navigate('/profile');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className='w-full h-full shadow-7 flex flex-col gap-6 md:gap-10 bg-white  p-6 px-7 md:px-[3rem] md:py-10 rounded-2xl  '>
          <div className='md:mb-6'>
            <h2 className='font-semibold text-[1.2rem] md:text-[1.5rem]'>
              Login to your dashboard
            </h2>
            <p className='text-gray-500 text-xs md:text-[0.8rem] '>
              Provide details to login to your account
            </p>
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <div className='relative'>
                  <label className='rounded-full font-semibold  text-sm '>Email</label>
                  <FormControl>
                    <Input
                      className=' text-secondary-3 py-6'
                      {...field}
                      value={field.value}
                      autoComplete='off'
                      onChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage className='text-xs mt-1' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='relative'>
                  <label className=' rounded-full font-semibold  text-sm '>Password</label>
                  <FormControl>
                    <Input
                      className=' text-secondary-3 py-6'
                      type='password'
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                      autoComplete='off'
                    />
                  </FormControl>
                </div>
                <FormMessage className='text-xs mt-1' />
              </FormItem>
            )}
          />

          <div className='flex items-center mt-4 md:mt-8 justify-center w-full gap-4'>
            <button
              type='submit'
              className='w-full rounded-full px-12 py-4 bg-primary-1  flex items-center justify-center gap-2 group hover:opacity-90 transition-all duration-300 ease-in-out'
            >
              <span className='font-[500] text-base  leading-[24px] tracking-[0.4px] text-white'>
                login
              </span>
            </button>
          </div>
        </section>
      </form>
    </Form>
  );
}
