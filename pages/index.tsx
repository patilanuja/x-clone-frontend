import { Inter } from "next/font/google";
import { useCallback, useState } from "react";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import Xlayout from "@/components/Feedcard/Layout/XLayout";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import FeedCard from "@/components/Feedcard";
import { Tweet } from "@/gql/graphql";

const inter = Inter({ subsets: ["latin"] });




export default function Home() {
  const { user } = useCurrentUser();

  const { tweets = [] } = useGetAllTweets();
  const { mutateAsync } = useCreateTweet();

  
  const [content, setContent] = useState("");


  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type","file")
    input.setAttribute("accept", "image/*")
    input.click();
  }, [])

  const handleCreateTweet = useCallback(async () => {
    await mutateAsync({
      content,
    });
    setContent("");
  }, [mutateAsync, content]);




  

  return (
    <div className={inter.className}>
      <Xlayout>
      <div>
          <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-1">
                {user?.profileImageURL && (
                  <Image
                    className="rounded-full"
                    src={user?.profileImageURL}
                    alt="user-image"
                    height={50}
                    width={50}
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                  placeholder="What's happening?"
                  rows={3}
                ></textarea>
                {/* {imageURL && (
                  <Image
                    src={imageURL}
                    alt="tweet-image"
                    width={300}
                    height={300}
                  />
                )} */}
                <div className="mt-2 flex justify-between items-center">
                  <BiImageAlt onClick={handleSelectImage} className="text-xl" />
                  <button
                    onClick={handleCreateTweet}
                    className="bg-[#1d9bf0] font-semibold text-sm py-2 px-4 rounded-full"
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
      </Xlayout>
  </div>
  );
}
