import React from 'react'
import { FaRegStar } from 'react-icons/fa'
import { FiDownload } from 'react-icons/fi'

const Home = () => {
  return (
    <div className='max-w-7xl mx-auto dark:text-white'>
        <div className='grid md:grid-cols-2 mx-4'>
            <div className='my-4'>
                <div className='flex gap-2 items-center justify-center text-2xl font-bold mb-3'>
                    <FiDownload className='text-4xl text-green-600 font-bold' /> Download Subtitles
                </div>
                <div>
                    <p>DownSub is a FREE <span className='bg-[#0cf28f33]'>web application that can download subtitles directly</span> from Youtube, VIU, Viki, Vlive and more. We supports downloading all subtitles/captions formats such as: SRT, TXT, VTT.</p>
                    <p>DownSub doesn't force our user to download or install any type of extensions or third party software. We provide an online method to download subtitles by just entering the URL of the video and clicking Download.</p>
                </div>
            </div>
            <div className='my-4'>
            <div className='flex gap-2 items-center justify-center text-2xl font-bold mb-3'>
                    <FaRegStar className=' text-4xl text-green-600 font-bold' /> Recent Updates
                </div>
                <div>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home