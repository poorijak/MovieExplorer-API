import { useRouter } from 'next/navigation';
import React from 'react'

export default function search() {

    const [search, setSearch] = useState('')
    const router = useRouter
    const handleSumit = (e) => {
        e.preventDefault();
        router.push(`search/${search}`)
    }

    return (
        <div>
            <form action="" className='flex items-center' onSubmit={handleSumit}>
                <input type="text" name="" id="" className='bg-transparent w-44 focus:outline-none' placeholder='search your keywords...' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className='text-gray-400 text-2xl font-medium  px-4 py-1.5 rounded-lg transition-transform  duration-300 hover:scale-105 hover:text-white'><FiSearch /></button>
            </form>
        </div>
    )
}
