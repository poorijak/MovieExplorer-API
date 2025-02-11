import React from 'react'
import HeroSection from '@/src/components/HeroSection/HeroSection'
import TopRatedContent from '@/src/components/CompContent/TopRatedContent/page'
import TrendingContent from '@/src/components/CompContent/TrendingContent/page'
import UpComingContent from '@/src/components/CompContent/UpComingContent/page'
import PopularMovie from '@/src/components/CompContent/PopularContent/PopularMovie'
import NowComingContent from '@/src/components/CompContent/NowComingContent/page'

const page = () => {
    return (
        <div>
            <HeroSection content={'movie'} lastSlice={1} />
            <PopularMovie content={'movie'} />
            <TopRatedContent content={'movie'}/>
            <TrendingContent content={'movie'}/>
            <UpComingContent content={'movie'}/>
            <NowComingContent content={'movie'}/>

        </div>
    )
}

export default page