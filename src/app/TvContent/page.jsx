import React from 'react'
import HeroSection from '@/src/components/HeroSection/HeroSection'
import TopRatedContent from '@/src/components/CompContent/TopRatedContent/page'
import TrendingContent from '@/src/components/CompContent/TrendingContent/page'
import OnAirContent from '@/src/components/CompContent/OnAirSeries/page'
import PopularMovie from '@/src/components/CompContent/PopularContent/PopularMovie'
import AiringTv from '@/src/components/CompContent/AiringTv/page'

const page = () => {
    return (
        <div>
            <HeroSection content={'tv'} lastSlice={1} />
            <PopularMovie content={'tv'} />
            <TopRatedContent content={'tv'}/>
            <TrendingContent content={'tv'}/>
            <AiringTv content={'tv'} />
            <OnAirContent />

        </div>
    )
}

export default page
