import React, {useState, useEffect} from 'react'
import HistoryApis from '../apis/HistoryApis';
import { LuHistory } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import moment from 'moment';

export const History = () => {
  const[histories, setHistories] = useState();
  
  useEffect(() => {
    getHistories();
  }, [])

  const getHistories = async() => {
    const res = await HistoryApis.index();
    console.log('res', res)
    if (res.success) {
      setHistories(res.data);
    }
  }

  const handleDelete = async (historyId) => {
    // console.log('historyId', historyId)
    const shouldDelete = window.confirm("Are you sure you want to delete this history?");

        if (shouldDelete) {
            const res = await HistoryApis.delete(historyId);
            if (res.success) {
                // setMessage(res.data.message);
                // setTimeout(() => {
                //     setMessage('');
                // }, 2000);
                getHistories();
            }
        } else {
            // User clicked "Cancel" or closed the dialog
            console.log("Delete canceled");
        }
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='border dark:border-slate-600 dark:bg-[#161616] bg-white p-4 rounded my-4'>
        <div className='flex items-center text-xl font-semibold justify-center mt-2'>
          <LuHistory className=' text-[#008b66] text-3xl' /> <span className='dark:text-white text-black font-bold text-2xl'>History</span>
        </div>
        <div className='grid justify-center mt-4'>
          <p className='dark:text-white text-black font-normal italic'>History of downloaded subtitles</p>
        </div>
        <div className='grid justify-center my-4'>
          <button className='dark:text-[#008b66] px-6 font-medium border border-[#008b66] rounded'>Clear All</button>
        </div>
        <div className='mt-8 md:mx-48'>
          {histories?.map((history) => (
            <div key={history.id} className='flex gap-16 items-center justify-between mb-8'>
              <div className='dark:text-white text-black border dark:border-white border-black px-5 py-1 font-medium rounded uppercase text-sm'>{history.source}</div>
              <div className='text-[#008b66] cursor-pointer underline'>{history.title}</div>
              <div className='dark:text-white text-black italic'>{moment(history.updated_at).format('M/D/YYYY, h:mm:ss A')}</div>
              <FaTrash className='text-red-500 cursor-pointer'  onClick={() => handleDelete(history.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
