'use client';
import Link from 'next/link';
import React from 'react'
import { SlSocialGithub } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";

const FooterSwiss = () => {
  return (
    <footer className='py-12 border-t-2 border-swiss-black'>
      <div className='swiss-grid'>
        <div className='col-span-12 md:col-span-4'>
          <h3 className='header-caps text-sm mb-4'>Get in Touch</h3>
          <a
            href="mailto:pchen415@gmail.com"
            className="text-base hover:text-swiss-red transition-colors duration-200"
          >
            pchen415@gmail.com
          </a>
        </div>

        <div className='col-span-12 md:col-span-4'>
          <h3 className='header-caps text-sm mb-4'>Connect</h3>
          <div className='flex gap-6'>
            <Link
              href={"https://github.com/Preston-C89-Chen"}
              target={"_blank"}
              className="hover:text-swiss-red transition-colors duration-200"
            >
              <SlSocialGithub className="w-6 h-6" />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/preston-chen-b2459853/"}
              target={"_blank"}
              className="hover:text-swiss-red transition-colors duration-200"
            >
              <SlSocialLinkedin className="w-6 h-6" />
            </Link>
            <Link
              href={"https://x.com/Ludiculous89"}
              target={"_blank"}
              className="hover:text-swiss-red transition-colors duration-200"
            >
              <SlSocialTwitter className="w-6 h-6" />
            </Link>
          </div>
        </div>

        <div className='col-span-12 md:col-span-4'>
          <h3 className='header-caps text-sm mb-4'>Currently</h3>
          <p className="text-sm text-gray-9">
            Available for Frontend Design Engineer roles
          </p>
        </div>
      </div>

      <div className='swiss-grid mt-12'>
        <div className='col-span-12'>
          <div className='divider-swiss'></div>
          <p className='text-xs text-gray-7 text-center'>
            © {new Date().getFullYear()} Preston Chen. Made carefully.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSwiss
