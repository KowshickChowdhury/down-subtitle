import React, { useState, useEffect } from 'react';
import '../../css/profile.css';
import CommentApis from '../apis/CommentApis';
import moment from 'moment';

const Comments = ({ loading, user }) => {
    const [isShow, setIsShow] = useState(false);
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        getComments();
    }, [])

    const getComments = async() => {
        const res = await CommentApis.index();
        if (res.success) {
            setAllComments(res.data);
        }
    }

    const handleShowSection = ()=> {
        setIsShow(!isShow)
    }
    console.log('comment', comment)
    const handleCommentSave = async() => {
        const res = await CommentApis.save(comment );
        if (res.success) {
            getComments();
        }
    }

    const handleCommentChange = (e)=> {
        setComment(e.target.value)
    }

  return (
    <div>
        {loading ? (
            <div className='font-bold flex justify-center'>
                Loading...
            </div>
            ) : (
            <div>
                <div className='flex gap-4 my-4'>
                    <div>
                        {user?.avatar ? (
                            <img
                                src={user ? user.avatar : ''}
                                className="w-12 rounded-2xl cursor-pointer"
                                alt=""
                            />
                        ) : (
                            <div className='avatar'>
                                G
                            </div>
                        )}
                    </div> 
                    <div className='w-full'>
                        <textarea value={comment} onChange={handleCommentChange} className={`w-full h-20 ${isShow ? 'rounded-t-md' : 'rounded-md'} p-4 dark:bg-gray-600 bg-gray-200 dark:text-white focus:outline-none`} onClick={handleShowSection} placeholder='Join the discussion'></textarea>
                        {isShow && (
                            <div className='grid justify-end border rounded-b-md dark:border-gray-500 -mt-[6px] p-1'>
                                {token ? (
                                    <button onClick={handleCommentSave} className='px-3 py-1 bg-[#008b66] rounded-2xl text-sm font-bold text-white'>Comment</button>
                                ) 
                                :
                                (
                                    <div className='mx-2 dark:text-gray-300'>Do you want to comment? Please Login First!</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className='my-8'>
                    {allComments?.map((allcomment) => (
                        <div key={allcomment.id} className='flex gap-4 my-4'>
                            <div>
                                <img src={allcomment.user.avatar} alt="" className='w-12 rounded-2xl' />
                            </div>
                            <div>
                                <div className='text-[#008b66] font-bold'>{allcomment.user.name}</div>
                                <div className='text-gray-400 text-xs'>{moment(allcomment.user.created_at).fromNow()}</div>
                                <div className='my-2'>{allcomment.comments}</div>
                            </div>
                        </div>
                        
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default Comments