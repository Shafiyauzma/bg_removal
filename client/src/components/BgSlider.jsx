import React, { useState } from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'

const BgSlider = () => {

    const [sliderPosition,setSliderPosition] = useState(50)

    const handleSliderChange = (e) =>{
        setSliderPosition(e.target.value)
    }

  return (
    <motion.div 
     initial={{ opacity:0.2,y:100 }} 
     transition={{ duration:1 }}
     whileInView={{ opacity:1,y:0 }}
     viewport={{ once: true }}
     className='pb-10 md:py-15 mx-2'
    >
        {/* Title */}
        <h1 className='mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg-text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent '>
            Remove Background With High <br/> Quality and Accuracy
        </h1>

        <div className='relative w-full max-w-3xl overflow-hidden m-auto rounded-xl mb-12'>
            {/* background image to get image first half percentage */}
            <img  src={assets.image_w_bg} style={{clipPath:`inset(0 ${100.2-sliderPosition}% 0 0)`}} alt="" />

            {/* for ground image to get 2nd half image */}
            <img className='absolute top-0 left-0 w-full h-full' src={assets.image_wo_bg} style={{clipPath:`inset(0 0 0 ${sliderPosition}%)`}} alt="" />

            {/* slider */}
            <input className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider' type="range" min={0} max={100} value={sliderPosition} onChange={handleSliderChange} />

        </div>

      
    </motion.div>
  )
}

export default BgSlider
