import React from 'react';
import { TECarousel, TECarouselItem } from 'tw-elements-react';

const Carousel = ({ items = [] }) => {
  return (
    <>
      <TECarousel showControls showIndicators ride="carousel" className='w-full'>
        <div className="relative w-full h-80 overflow-hidden after:clear-both after:block after:content-['']">
          <TECarouselItem
            itemID={1}
            className="relative float-left h-80 -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <img src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg" className="block w-full" alt="..." />
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              <h5 className="text-xl">First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </TECarouselItem>
        </div>
      </TECarousel>
    </>
  );
};

export default Carousel;