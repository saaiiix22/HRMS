import React from 'react'
import IntroCard from '../../components/introCard/IntroCard'
import QuickNotes from '../../components/quickNotes/QuickNotes'
import EventCarousel from "../../components/eventCarousel/EventCarousel";
import CardContainer from '../../components/cardContainer/CardContainer'
import MoneyProjection from '../../components/money/MoneyProjection'

const Dashboard = () => {
  
  return (
    <div className=' w-full mt-4 grid grid-cols-12 gap-3'>
      <div className="col-span-3">
        <div className="grid grid-col-12 gap-3">
          <div className="col-span-12">
            <IntroCard />
          </div>
          <div className="col-span-12">
            <QuickNotes />
          </div>
        </div>

      </div>
      <div className="col-span-9">
        
          <div className="grid grid-cols-12 gap-3 ">
              <div className="col-span-12">
                <EventCarousel/>   
                <CardContainer/>
                <MoneyProjection/>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Dashboard