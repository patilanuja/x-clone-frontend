import { useCurrentUser } from "@/hooks/user";
import { FaRegBookmark, FaRegEnvelope, FaXTwitter } from "react-icons/fa6";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi";
import { LuMoreHorizontal } from "react-icons/lu";
import { PiBell } from "react-icons/pi";

import Image from "next/image";
import {  useCallback } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import toast, {Toaster} from 'react-hot-toast'
import { graphqlClient } from "@/clients/api";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface XSidebarButton {
    title: string;
    icon: React.ReactNode;
  }
  
  const sidebarMenuItems: XSidebarButton[] = [
    {
      title: 'Home',
      icon: <GoHomeFill />,
    },
    {
      title: 'Explore',
      icon: <GoSearch />,
    },
    {
      title: 'Notifications',
      icon: <PiBell />,
    },
    {
      title: 'Messages',
      icon: <FaRegEnvelope />,
    },
    {
      title: 'Bookmarks',
      icon: <FaRegBookmark />,
    },
    {
      title: 'Profile',
      icon: <HiOutlineUser />,
    },
    {
      title: 'More Options',
      icon: <LuMoreHorizontal />
      ,
    },
  
  ];

interface XlayoutProps {
    children?: React.ReactNode;
  }
  



  
const Xlayout: React.FC<XlayoutProps> = (props) => {

    const { user } = useCurrentUser();
    const queryClient = useQueryClient();


    const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
        const googleToken = cred.credential;
        console.log('Google Token:', googleToken);
        if (!googleToken) return toast.error('google token not found');
          
          const {verifyGoogleToken} = await graphqlClient.request(
            verifyUserGoogleTokenQuery, {token: googleToken}
          );
    
          toast.success('Verified Success')
          console.log(verifyGoogleToken)
    
          if (verifyGoogleToken) 
            window.localStorage.setItem('__x_token', verifyGoogleToken)
    
          await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    
    }, [queryClient]);
    
    return (
        <div className="grid grid-cols-12 h-screen w-screen sm:px-40">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
            <div>
                        <div className="text-2xl hover:bg-gray-600 rounded-full p-4 h-fit w-fit cursor-pointer transition-all">
              <FaXTwitter />
            </div>
                    <div className="mt-4 text-xl font-semibold pr-4">
                    <ul>
                        {sidebarMenuItems.map(item =>( 
                        <li className="flex justify-start items-center gap-3 hover:bg-gray-600 rounded-full px-5 py-2 w-fit cursor-pointer mt-2" key={item.title}> 
                            <span className=" text-2xl">{item.icon}</span> 
                            <span className=" hidden sm:inline">{item.title}</span>
                        </li>
                        ))}
                    </ul>
                    <div className="mt-5 px-3 font-semibold">
                        <button className="hidden sm:block bg-[#1d9bf0] p-3 rounded-full w-full text-lg mt-5">Post</button>
                        <button className="block sm:hidden bg-[#1d9bf0] p-3 rounded-full w-full text-lg mt-5"><FaXTwitter /></button>
                    </div>
                    {user && (
                        <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
                        {user && user.profileImageURL && <Image className="rounded-full" src={user?.profileImageURL} alt={"user-image"} height={50}
                            width={50}></Image>}
                            <div className=" gap-2 flex">
                                <h3 className="hidden sm:block text-xl">{user?.firstName} {user?.lastName}</h3>
                            </div>
                        </div> 
                    )}
                    
                    </div>
            </div>
        </div>
        <div className="col-span-10 sm:col-span-6 border-l-[1px] border-r-[1px] border-r-gray-600 h-screen overflow-scroll hide-scrollbar border-l-gray-600 ">
         {props.children}
        </div>
        <div className="col-span-0 sm:col-span-3 p-5">
          {!user && (<div className="border p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-lg"> New to X?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle}></GoogleLogin>
          </div>
          )}
        </div>
      </div>
    )
}

export default Xlayout;