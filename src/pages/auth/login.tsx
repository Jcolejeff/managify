import LoginForm from 'components/general/loginForm';
import logo from 'assets/svg/logo.svg';
import tasks from 'assets/svg/login/earn.svg';
import reminders from 'assets/svg/login/staff.svg';
import progress from 'assets/svg/login/business.svg';
import tick from 'assets/svg/login/tick-circle.png';

const LoginPage = () => {
  return (
    <main className='w-full  h-full '>
      <section className='w-full grid grid-cols-[1fr_1fr] '>
        <div className='pt-10 pb-6 container px-container-base lg:px-container-lg xl:px-container-xl  relative max-w-[1000px]'>
          <img src={logo} alt='' className='-ml-4' />
        </div>
        <div className='pt-10 pb-6 md:bg-primary-2'></div>
      </section>

      <section className='w-full  h-full grid grid-cols-[1fr]  md:grid-cols-[1fr_1fr] '>
        <div className='h-full order-2 md:order-1 py-10 md:py-0'>
          <div className='container px-container-base lg:px-container-lg xl:px-container-xl relative max-w-[1000px]'>
            <h1 className='font-bold text-[1.4rem] md:text-[2rem]'>Hi there, see what’s new</h1>
            <p className='text-gray-500 text-[1rem] mt-4'>
              Here’s how Managify helps you organize your daily tasks and boost your productivity
            </p>
            <aside className='grid w-full grid-cols-1 gap-6 py-10'>
              <div className='flex gap-6'>
                <img src={tasks} alt='' />
                <div className='flex flex-col justify-between py-2'>
                  <h5 className='font-semibold text-lg text-gray-500'>Organize Your Tasks</h5>
                  <p className='text-sm text-gray-400'>
                    Easily create and manage your daily to-do lists, ensuring you never miss a task.
                  </p>
                </div>
              </div>
              <div className='flex gap-6'>
                <img src={reminders} alt='' />
                <div className='flex flex-col justify-between py-2'>
                  <h5 className='font-semibold text-lg text-gray-500'>Set Reminders</h5>
                  <p className='text-sm text-gray-400'>
                    Set reminders for important tasks and deadlines to stay on top of your schedule.
                  </p>
                </div>
              </div>
              <div className='flex gap-6 bg-gray-100 px-4 py-2 rounded-2xl -ml-3'>
                <img src={progress} alt='' />
                <div className='flex items-center'>
                  <div className='flex flex-col justify-between py-2'>
                    <h5 className='font-semibold text-lg'>Track Your Progress</h5>
                    <p className='text-[0.8rem] md:text-sm'>
                      Monitor your progress and check off completed tasks to see how much you've
                      accomplished.
                    </p>
                  </div>
                  <img src={tick} alt='' className='w-[1.5rem] h-[1.5rem]' />
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className='w-full h-full py-12 md:py-0 bg-primary-2 order-1 md:order-2'>
          <div className='container px-container-base lg:px-container-lg xl:px-container-xl  relative max-w-[1000px]'>
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
