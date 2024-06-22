import Notification from 'assets/svg/profile/icon.svg';
import logo from 'assets/svg/logo.svg';
import img1 from 'assets/svg/profile/noti1.svg';
import img2 from 'assets/svg/profile/noti2.svg';
import img3 from 'assets/svg/profile/noti3.svg';
import comingSoon from 'assets/svg/profile/coming.svg';
import errorImage from 'assets/svg/not-found.svg';
import { useQuery } from '@apollo/client';
import { firstCharsOfWords } from 'helper/utils';
import ContentLoader from 'components/general/ContentLoader';
import { COMPANY_QUERY } from 'apolloClient/queries';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserFromLocalStorage } from 'helper/utils';
import TaskListAndInput from './tasks';

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <main className='w-full  h-full '>
      <section className='w-full grid border-b '>
        <div className='pt-6 pb-4 container px-container-base lg:px-container-lg xl:px-container-xl  relative max-w-[1700px]'>
          <a href='/'>
            <img src={logo} alt='' className='-m-4' />
          </a>
        </div>
      </section>

      <section className='w-full container px-container-base pb-[8rem] pt-6 lg:px-container-lg xl:px-container-xl  relative max-w-[1700px]  h-full 2xl:max-h-[900px]  '>
        <div className='grid grid-cols-[1fr] md:grid-cols-[2.3fr_1fr] gap-8   h-full'>
          {/*  */}
          <div className='w-full'>
            <TaskListAndInput />
          </div>

          {/*  */}
          <div className='w-full flex flex-col justify-center py-[4rem]  px-6 bg-primary-3 rounded-lg'>
            <div className='bg-red-100/60 px-3 mb-12 py-1 rounded-full w-fit'>
              <img src={comingSoon} alt='' />
            </div>
            <div className='p-6 flex flex-col gap-4 mb-10 bg-white'>
              <img src={img1} alt='' />
              <img src={img2} alt='' />
              <img src={img3} alt='' />
            </div>
            <div className='flex flex-col items-center gap-4'>
              <img src={Notification} alt='' />

              <p className='text-lg text-center lg:max-w-[80%] text-gray-500'>
                Receive notifcations about your performance, efficiency reviews and a lot more
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
