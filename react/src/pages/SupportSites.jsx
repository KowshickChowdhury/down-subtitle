import React from 'react'
import { FaRegListAlt } from 'react-icons/fa'
import youtubeImg from '../../../public/images/youtube.png'

const SupportSites = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        <div className='mx-4'>
            <div className='flex items-center gap-1 justify-center'>
                <FaRegListAlt className='text-2xl text-green-600 font-bold' />
                <span className='text-2xl font-bold dark:text-white'>Supported Sites</span>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-6 gap-8 justify-between my-8'>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>
                <div className='flex gap-1'>
                    <img src={youtubeImg} alt="" />
                    <div className='text-[#008b66] font-semibold'>Youtube</div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default SupportSites