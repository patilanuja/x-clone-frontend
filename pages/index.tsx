import Image from "next/image";
import { FaRegBookmark, FaRegEnvelope, FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { Inter } from "next/font/google";
import { PiBell } from "react-icons/pi";import { HiOutlineUser } from "react-icons/hi";
import FeedCard from "@/components/Feedcard";
import { LuMoreHorizontal } from "react-icons/lu";


const inter = Inter({ subsets: ["latin"] });

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
  
  

]

export default function Home() {
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen px-40">
        <div className="col-span-3 pt-1 ">
            <div className="text-2xl hover:bg-gray-600 rounded-full p-4 h-fit w-fit cursor-pointer transition-all">
              <FaXTwitter />
            </div>
            <div className="mt-4 text-xl font-semibold pr-4">
              <ul>
                {sidebarMenuItems.map(item =>( 
                  <li className="flex justify-start items-center gap-3 hover:bg-gray-600 rounded-full px-5 py-2 w-fit cursor-pointer mt-2" key={item.title}> 
                    <span className="text-2xl">{item.icon}</span> 
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 px-3 font-semibold">
                  <button className="bg-[#1d9bf0] p-3 rounded-full w-full text-lg mt-5">Post</button>
              </div>
            </div>
        </div>
        <div className="col-span-6 border-l-[1px] border-r-[1px] border-r-gray-600 h-screen overflow-scroll hide-scrollbar border-l-gray-600 ">
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
                <FeedCard/>
        </div>
        <div className="col-span-3"></div>
      </div>
  </div>
  );
}
