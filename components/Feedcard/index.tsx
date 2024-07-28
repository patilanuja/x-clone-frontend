import React from 'react';
import Image from 'next/image';
import { FiMessageCircle, FiUpload } from 'react-icons/fi';
import { AiOutlineRetweet } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa6';

const FeedCard: React.FC = () => {
    return (
        <div className='border border-l-0 border-r-0 border-b-0 border-gray-600 p-5 hover:bg-gray-900 transition-all cursor-pointer'>
            <div className='grid grid-cols-12'>
                <div className='col-span-1 '>
                    <Image  src='https://avatars.githubusercontent.com/u/42777296?v=4' alt='user-image' height={50} width={50} />
                </div>
                <div className='col-span-11 px-3'>
                    <h5>Anuja Patil</h5>
                    <p>we need version 6.4.2 so that we can use the new XTwitter logo.</p>
                    <div className='flex justify-between mt-5 text-xl items-center pr-2 w-[90%]'>
                        <div>
                            <FiMessageCircle />
                        </div>
                        <div>
                            <AiOutlineRetweet />
                        </div>
                        <div>
                            <FaRegHeart />
                        </div>
                        <div>
                            <FiUpload />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedCard;