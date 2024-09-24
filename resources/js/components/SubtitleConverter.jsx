import React, { useState } from 'react'

const SubtitleConverter = () => {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send the YouTube link to the Laravel backend
      const response = await axios.post('/api/extract-subtitles', { link });
      console.log('response', response)
      setVideoData(response.data);
    } catch (error) {
      console.error('Error fetching subtitles:', error);
    }

    setLoading(false);
  };


  return (
    <div className='max-w-7xl mx-auto'>
      <div className='mx-4 md:mx-0 my-8'>
        <form onSubmit={handleSubmit}>
          <div className='md:flex gap-2 justify-center'>
            <input 
              type='search' 
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className='dark:bg-black dark:text-white focus:outline-none focus:border-[#03a87c] text-black border px-3 py-2 w-full md:w-1/2 rounded' 
              placeholder='Enter a link to download subtitles. Ex: https://youtu.be/rN7yhDl1cuk' 
              required
            />
            <div className='flex justify-center'>
              <button type="submit" className='px-5 py-2 bg-[#03a87c] rounded my-4 md:my-0'>
                <span className='font-semibold text-white'>
                  {loading ? 'Loading...' : 'Download'}
                </span>
              </button>
            </div>
          </div>
        </form>

        {/* Show video details and download options after extraction */}
        {videoData && !loading && (
          <div className='mt-6 text-center'>
            {/* Video Thumbnail and Info */}
            <div className='flex flex-col items-center'>
              <img src={videoData.video.thumbnail} alt="Video Thumbnail" className='w-64 rounded-md mb-4' />
              <h3 className='font-semibold text-lg mb-2 dark:text-white'>{videoData.video.title}</h3>
              <p className='dark:text-gray-300 text-gray-600'>Duration: {videoData.video.duration}</p>
            </div>

            {/* Subtitle Download Options */}
            <div className='flex flex-col items-center mt-4'>
              <a href={videoData.srt} download className='text-[#03a87c] font-semibold'>Download SRT</a>
              <a href={videoData.txt} download className='text-[#03a87c] font-semibold'>Download Text</a>
              <button 
                className='mt-4 text-[#03a87c] font-semibold' 
                onClick={() => alert(videoData.raw)}>View Raw Subtitles
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SubtitleConverter