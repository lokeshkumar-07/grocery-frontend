import React from 'react'
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram, AiFillLinkedin } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const socialLinks = [
  {
    path: 'https://www.youtube.com',
    icon: <AiFillYoutube className='group hover:text-white w-4 h-5' />
  },

  {
    path: 'https://www.youtube.com',
    icon: <AiFillLinkedin className='group hover:text-white w-4 h-5' />
  },

  {
    path: 'https://www.youtube.com',
    icon: <AiFillGithub className='group hover:text-white w-4 h-5' />
  },

  {
    path: 'https://www.youtube.com',
    icon: <AiOutlineInstagram className='group hover:text-white w-4 h-5' />
  },
]

const quickLinks01 = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/',
    display: 'About'
  },
  {
    path: '/',
    display: 'Service'
  },
  {
    path: '/',
    display: 'Blog'
  },
]

const quickLinks02 = [
  {
    path: '/admin',
    display: 'Admin Panel'
  },
  {
    path: '/',
    display: 'Be a Seller'
  },
  {
    path: '/',
    display: 'Best Selling'
  },
  {
    path: '/',
    display: 'Get a Option'
  },
]

const quickLinks03 = [
  {
    path: '/',
    display: 'Donate'
  },
  {
    path: '/',
    display: 'Contact Us'
  },
]



const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className='pb-16 pt-10'>
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <div className='flex'>
                <h1 className='font-bold text-[24px] text-yellow-400'>Grocery</h1> <h1 className='font-bold text-[24px] text-green-400'>It</h1>
            </div>
           
            <p className='text-[16px] leading-7 font-[400] text-textColor'>Copyright © {year} develped by Lokesh. All right reversed.</p>

            <div className='flex items-center gap-3 mt-4'>
              {socialLinks.map((link, index) => <Link to={link.path} key={index} className='w-9 h-9 border border-solid border-[#181a1e] 
              rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none'>{link.icon}</Link>)}
            </div>

          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700]'>Quick Links</h2>

            <ul>
              {quickLinks01.map((item, index) => <li key={index} className='mb-4 '>
              <Link className='text-[16px] leading-7 font-[400] text-textColor' to={item.path}>{item.display}</Link></li>)}
            </ul>

          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700]'>I want to:</h2>

            <ul>
              {quickLinks02.map((item, index) => <li key={index} className='mb-4 '>
              <Link className='text-[16px] leading-7 font-[400] text-textColor' to={item.path}>{item.display}</Link></li>)}
            </ul>
            
          </div>

          <div>
            <h2 className='text-[20px] leading-[30px] font-[700]'>Support</h2>

            <ul>
              {quickLinks03.map((item, index) => <li key={index} className='mb-4 '>
              <Link className='text-[16px] leading-7 font-[400] text-textColor' to={item.path}>{item.display}</Link></li>)}
            </ul>
            
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
