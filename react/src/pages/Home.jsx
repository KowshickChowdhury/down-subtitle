import React from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { FaCopy, FaRegStar } from 'react-icons/fa'
import { FiDownload } from 'react-icons/fi'
import youtubeImg from '../../../public/images/youtube.png'
import { MdEdit } from 'react-icons/md'

const Home = () => {
  return (
    <div className='max-w-7xl mx-auto dark:text-white'>
        <div className='grid md:grid-cols-2 mx-4'>
            <div className='my-4'>
                <div className='flex gap-2 items-center justify-center text-2xl font-bold'>
                    <FiDownload className='text-4xl text-green-600 font-bold' /> Download Subtitles
                </div>
                <div className='my-8'>
                    <p>DownSub is a FREE <span className='bg-[#0cf28f33]'>web application that can download subtitles directly</span> from Youtube, VIU, Viki, Vlive and more. We supports downloading all subtitles/captions formats such as: SRT, TXT, VTT.</p>
                    <p>DownSub doesn't force our user to download or install any type of extensions or third party software. We provide an online method to download subtitles by just entering the URL of the video and clicking Download.</p>
                </div>
            </div>
            <div className='my-4'>
                <div className='flex gap-2 items-center justify-center text-2xl font-bold'>
                    <FaRegStar className='text-4xl text-green-600 font-bold' /> Recent Updates
                </div>
                <div className='grid justify-center my-8'>
                    <div className='flex gap-2'>
                        <div className=' text-xs font-bold text-white px-2 bg-[#008b66] rounded grid items-center'>ADDED</div>
                        <div className='flex gap-1'>
                            <img src={youtubeImg} alt="" />
                            <div className='text-[#008b66] font-semibold'>Youtube</div>
                        </div>
                        <p className='ml-4'>Supported</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='mt-8'>
            <div className='flex gap-1 items-center justify-center text-2xl font-bold'>
                <AiOutlineExclamationCircle className='text-green-600 text-2xl' /> How to use
            </div>
            <div className='grid md:grid-cols-2 mx-4 my-4'>
                <div className='my-4'>
                    <div className='flex gap-2 items-center justify-center text-2xl font-bold mb-3'>
                        <FaCopy className='text-4xl text-green-600 font-bold' /> copy-paste
                    </div>
                    <div className='my-8'>
                        <ol>
                            <li>1. <span className='font-bold'>Paste</span> the link of video you want to download subtitles.</li>
                            <li>2. Click <span className='font-bold'>Download</span> button to begin extracting subtitles.</li>
                            <li>3. Select the subtitles format and language you want to download, then click <span className='font-bold'>Download</span> button.</li>
                        </ol>
                    </div>
                </div>
                <div className='my-4'>
                    <div className='flex gap-2 items-center justify-center text-2xl font-bold mb-3'>
                        <MdEdit className=' text-4xl text-green-600 font-bold' /> Tricks
                    </div>
                    <div className='grid justify-center my-8'>
                        <p><span>Add <span className="text-red-500 font-bold">subtitle.to/</span>  before the URL and press <strong>Enter</strong>  <br /></span><img width="300px" src="https://downsub.com/img/trick1.jpg" /><br/><span>Or add <span className="text-red-500 font-bold">subtitle.to/</span>  between the URL and press <strong>Enter</strong>  <br/></span><img width="300px" src="https://downsub.com/img/trick1.jpg" /></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home