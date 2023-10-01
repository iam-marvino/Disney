// import React from 'react'
import '../Css/HomeScreen.css'
import viewersOne from '../assets/images/viewers-disney.png'
import viewersTwo from '../assets/images/viewers-pixar.png'
import viewersThree from '../assets/images/viewers-marvel.png'
import viewersFour from '../assets/images/viewers-starwars.png'
import viewersFive from '../assets/images/viewers-national.png'

import videoOne from '../assets/videos/1564674844-disney.mp4'
import videoTwo from '../assets/videos/1564676714-pixar.mp4'
import videoThree from '../assets/videos/1564676115-marvel.mp4'
import videoFour from '../assets/videos/1608229455-star-wars.mp4'
import videoFive from '../assets/videos/1564676296-national-geographic.mp4'


function Viewers() {
  return (
    <div className='viewers'>

     <div className='viewersContainer'>

      <div className='viewersItem'>
        <img src={viewersOne} alt="" />

        <video autoPlay={true} loop={true} playsInline={true} muted={true}>
            <source src={videoOne} type='video/mp4' />
        </video>

      </div>

      <div className='viewersItem'>
        <img src={viewersTwo} alt="" />

        <video autoPlay={true} loop={true} playsInline={true} muted={true}>
            <source src={videoTwo} type='video/mp4' />
        </video>

      </div>

      <div className='viewersItem'>
        <img src={viewersThree} alt="" />

        <video autoPlay={true} loop={true} playsInline={true} muted={true}>
            <source src={videoThree} type='video/mp4' />
        </video>

      </div>

      <div className='viewersItem'>
        <img src={viewersFour} alt="" />

        <video autoPlay={true} loop={true} playsInline={true} muted={true}>
            <source src={videoFour} type='video/mp4' />
        </video>

      </div>

      <div className='viewersItem'>
        <img src={viewersFive} alt="" />

        <video autoPlay={true} loop={true} playsInline={true} muted={true}>
            <source src={videoFive} type='video/mp4' />
        </video>

      </div>
      </div>
    </div>
  )
}

export default Viewers
