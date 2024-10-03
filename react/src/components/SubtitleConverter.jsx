import React, { useState } from 'react'
import '../css/loading.css';
import SubtitleApis from '../apis/SubtitleApis';
import { FiDownload } from 'react-icons/fi';

const SubtitleConverter = () => {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoData(null);
    setErrorMessage('')
    const res = await SubtitleApis.save({link});
    // console.log('response', res)
    if (res.success) {
      setVideoData(res.data);
    } else {
      setErrorMessage(res.errors);
      // setTimeout(() => {
      //   setErrorMessage('');
      // }, 4000)
    }

    setLoading(false);
  };


  return (
    <div className='max-w-7xl mx-auto'>
      <div className='mx-4 md:mx-0 my-8'>
        {loading ?
          <div className='grid justify-center my-4'>
            <div className="loader"></div>
          </div>
        : ''}
        <form onSubmit={handleSubmit}>
          <div className='md:flex gap-2 justify-center'>
            <input 
              type='search' 
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className='dark:bg-black dark:text-white focus:outline-none focus:border-[#008b66] text-black border px-3 py-2 w-full md:w-1/2 rounded' 
              placeholder='Enter a link to download subtitles. Ex: https://youtu.be/rN7yhDl1cuk' 
              required
            />
            <div className='flex justify-center'>
              <button type="submit" className='px-5 py-2 bg-[#008b66] rounded my-4 md:my-0'>
                <span className='font-semibold text-white'>
                  {loading ? 'Loading...' : 'Download'}
                </span>
              </button>
            </div>
          </div>
        </form>

        {errorMessage ?
          <div className='text-center my-4'>
            <div className='text-red-500'>{errorMessage}</div>
          </div>
        : ''}
        {/* Show video details and download options after extraction */}
        {videoData && !loading && (
          <div className='mt-6 text-center'>
            {/* Video Thumbnail and Info */}
            <div className='md:flex gap-4'>
              <img src={videoData.video.thumbnail} alt="Video Thumbnail" className='md:w-64 rounded-md mb-4' />
              <div className='text-left dark:mt-4'>
                <h3 className='font-semibold text-lg mb-2 dark:text-white'>{videoData.video.title}</h3>
                <p className='dark:text-gray-300 text-gray-600'>Duration: {videoData.video.duration}</p>
              </div>
            </div>

            {/* Subtitle Download Options */}
            <div className='flex gap-2 mt-4'>
              <a href={videoData.srt} download className='flex gap-1 p-2 rounded items-center border border-[#008b66] text-[#008b66] font-semibold'><FiDownload className=' text-green-600 text-xl' /> <span className='bg-[#008b66] text-white px-2 py-1 rounded-lg text-xs'>SRT</span> </a>
              <a href={videoData.txt} download className='flex gap-1 p-2 rounded items-center border border-[#008b66] text-[#008b66] font-semibold'><FiDownload className=' text-green-600 text-xl' /> <span className='bg-[#008b66] text-white px-2 py-1 rounded-lg text-xs'>TXT</span></a>
              <button 
                className='flex gap-1 p-2 rounded items-center border border-[#008b66] text-[#008b66] font-semibold' 
                onClick={() => alert(videoData.raw)}><FiDownload className=' text-green-600 text-xl' /> <span className='bg-[#008b66] text-white px-2 py-1 rounded-lg text-xs'>RAW</span>
              </button>
              <div className='dark:text-white grid items-center md:ml-2'>English (auto generated)</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SubtitleConverter