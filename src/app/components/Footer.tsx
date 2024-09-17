'use client';
import Link from 'next/link';
import React from 'react'
import { SlSocialGithub } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";

const Footer = () => {
  return (
    <div className='fixed bottom-0 left-0 h-[150px] min-w-[350px]  w-full bg-gradient-to-t from-black from-[50%] overflow-y-hidden'>
      <div className='h-full  flex flex-col gap-[4%] max-w-[1400px] mx-auto '>
        <div className='flex justify-center items-end gap-[4%] h-[40%]'>
          <Link href={"https://github.com/Preston-C89-Chen"}  target={"_blank"}>
            <SlSocialGithub className="size-[20px] text-white icon-hover"/>
          </Link>
          <Link href={"https://www.linkedin.com/in/preston-chen-b2459853//"}  target={"_blank"}>
            <SlSocialLinkedin className="size-[20px] text-white icon-hover"/>
          </Link>
          <Link href={"https://x.com/Ludiculous89"}  target={"_blank"}>
            <SlSocialTwitter className="size-[20px] text-white icon-hover"/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer