import React from 'react'

export default function Content() {
  return (
    <div className='bg-[#050505] py-8 px-12 h-full w-full flex flex-col justify-between'>
        <Section1 />
    </div>
  )
}

const Section1 = () => {
    return (
        <div>
            <Nav />
        </div>
    )
}

const Section2 = () => {
    return (
        <div className='flex justify-between items-end'>
            <h1 className='text-[14vw] leading-[0.8] mt-10'>Sticky Footer</h1>
            <p>©copyright</p>
        </div>
    )
}

const Nav = () => {
    return (
        <div className='flex h-[400px] justify-center items-center gap-12 w-auto'>
            <div className='flex flex-col gap-2 text-xl xl:text-2xl text-white'>
                <h3 className='mb-2 uppercase text-[#ffffff80]'>About</h3>
                <p>Home</p>
                <p>Projects</p>
                <p>Our Mission</p>
                <p>Contact Us</p>
            </div>
            <div className='flex flex-col gap-2 text-xl xl:text-2xl text-white'>
                <h3 className='mb-2 uppercase text-[#ffffff80]'>Education</h3>
                <p>News</p>
                <p>Learn</p>
                <p>Certification</p>
                <p>Publications</p>
            </div>
        </div>
    )
}