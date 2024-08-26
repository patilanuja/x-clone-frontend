import React from 'react';
import Image from 'next/image';
import { FiMessageCircle, FiUpload } from 'react-icons/fi';
import { AiOutlineRetweet } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa6';
import { Tweet } from '@/gql/graphql';

interface FeedCardPropps {
    data: Tweet
}

const FeedCard: React.FC<FeedCardPropps> = (props) => {
    const {data} = props
    return (
        <div className='border border-l-0 border-r-0 border-b-0 border-gray-600 p-5 hover:bg-gray-900 transition-all cursor-pointer'>
            <div className='grid grid-cols-12'>
                <div className='col-span-1'>
                    { data.author?.profileImageURL && <Image  className="rounded-full" src={data.author.profileImageURL} alt='user-image' height={50} width={50} />}
                </div>
                <div className='col-span-11 px-3'>
                    <h5>{data.author?.firstName} {data.author?.lastName}</h5>
                    <p>{data.content}</p>
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