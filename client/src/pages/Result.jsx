import React from 'react'
import { assets } from '../assets/assets'

const Result = () => {
  return (
    <div className='mx-4 my-3 lg:mx:44 mt-14 min-h-[75vh]'>

      <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm sm:gap-12'>

        {/*..........IMage container........... */}

        <div className='flex flex-col sm:grid grid-cols-2 gap-4 lg:ml-14'>
          {/*............... Left side.......... */}
          <div>
            <p className='font-semibold text-gray-600 mb-2'>
              Original
            </p>
            <img width={500} className='bg-layer rounded-md border' src={assets.image_w_bg} alt="" />
          </div>

          {/*............... Right side.......... */}
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-600 mb-2'>
              Background Removed
            </p>
            <div className='rounded-md border-gray-300 h-full relative bg-layer overflow-hidden'>
              <img width={500} className='rounded-md border' src={assets.image_wo_bg} alt="" />
              {/* <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2'> */}
              {/* Loader */}
                {/* <div className='border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin'></div> */}
              {/* </div> */}
            </div>
          </div>
        </div>

        {/* ...........Buttons............ */}

        <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
          <button className='px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700'>
            Try another Image
          </button>
          <a className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700' href="">
            Download Image
          </a>

        </div>

      </div>
       
    </div>
  )
}

export default Result