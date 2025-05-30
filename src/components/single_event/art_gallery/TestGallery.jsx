//Maja (ændringer af KAtinka for at koble til singleArtwork)
//Denne komponent viser en galleri med kunstværker relateret til et event.

"use client";
import { useRef } from "react";
import TestArtCart from "./TestArtCart";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { motion } from "motion/react";

//scrollRef bruges til at referere til det element der skal scrolle
//bestemmer om der skal scrolles til venstre eller højre
const TestGallery = ({ event, eventId }) => {
  const scrollRef = useRef();
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
      <div ref={scrollRef} className="flex items-center justify-start space-x-4 overflow-x-auto px-10 snap-x w-full scrollbar-hide pb-6">
        {/* Renderer TestArtCart komponenten for hvert artworkId i event.artworkIds */}
        {event?.artworkIds?.map((artworkId, idx) => (
          <TestArtCart key={idx} artworkId={artworkId} eventId={eventId} />
        ))}
      </div>
      {/* Navigation knapper til at scrolle gennem galleriet med animation */}
      <div className="flex items-center space-x-8 ">
        <motion.button onClick={() => scroll("left")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.1 }} className="text-gray-700 hover:text-black">
          <IoArrowBack size={50} className="w-9 sm:w-10 md:w-11 lg:w-12 h-auto" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.1 }} onClick={() => scroll("right")} className="text-gray-700 hover:text-black">
          <IoArrowForward size={50} className="w-9 sm:w-10 md:w-11 lg:w-12 h-auto" />
        </motion.button>
      </div>
    </div>
  );
};

export default TestGallery;
