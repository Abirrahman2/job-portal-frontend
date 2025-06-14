'use client'
import React from 'react';
import BlurText from '../ui/Home/BlurText';
const page = () => {
      const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
    return (
    <div className="min-h-screen pt-10">
      <div className="max-w-5xl mx-auto ml-10">
        <BlurText
          text="WELCOME TO JOB PORTAL"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-5xl text-orange-500 mb-8 translate-x-130"
        />
      </div>
     

    </div>
   
    );
};

export default page;