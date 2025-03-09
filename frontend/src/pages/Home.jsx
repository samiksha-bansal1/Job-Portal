import FeatureCompanies from '@/components/FeatureCompanies'
import HeroSection from '@/components/HeroSection'
import LatestJobs from '@/components/LatestJobs'
import React from 'react'

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeatureCompanies />
      <LatestJobs />
    </>
  )
}

export default Home