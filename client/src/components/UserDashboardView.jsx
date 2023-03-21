import React from 'react'
import EventsCards from "./EventsCards.jsx"
import EventsNearMe from "./EventsNearMe.jsx"

function UserDashboardView() {
  return (
    <div className='user-dashboard'>
      <h1>User Dashboard</h1>
      <h3>hello, I am user called , this where all my sterff goes</h3>

         <h2>My Events</h2>
        <EventsCards
      
        /> 


        <h2>Events Near Me</h2>
        <EventsNearMe
        
        />




    </div>
  )
}

export default UserDashboardView
