import React from 'react'
import '../Css/HomeScreen.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import imageOne from '../assets/images/slider-badag.jpg'
import imageTwo from '../assets/images/slider-scale.jpg'
import imageThree from '../assets/images/slider-scales.jpg'
import imageFour from '../assets/images/slider-badging.jpg'

function ImageSlider() {


    let settings = {
        dots:true,
        Infinite:true,
        speed: 500,
        slidesToShow : 1,
        slidesToScroll:1,
        autoplay: true,
        centerMode: true,
        centerPadding:'5%',
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
    }
   
  return (
    
      // eslint-disable-next-line react/jsx-no-undef
      <Slider className='Slider' {...settings}>

        <div className='Wrap'>
            <a>
            <img src={imageOne} alt="" />
            </a>
        </div>


        <div className='Wrap'>
            <a>
            <img src={imageTwo} alt="" /> 
            </a>
        </div>


        <div className='Wrap'>
            <a>
            <img src={imageThree} alt="" />
            </a>
        </div>


        <div className='Wrap'>
            <a>
            <img src={imageFour} alt="" />  
            </a>
        </div>


      </Slider>
   
  )
}

export default ImageSlider
