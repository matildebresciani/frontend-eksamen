//Kopi af Maja's kode (DENNE HAR SMÅ ÆNDRINGER LAVET AF KATINKA FOR AT KOBLE TIL singleArtwork)

"use client";
import { useRef } from "react";
// import ArtCart from "./ArtCart";
import TestArtCart from "./TestArtCart";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoArrowForward,
  IoArrowBack,
} from "react-icons/io5";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "motion/react";

const TestGallery = ({ event, eventId }) => {
  const scrollRef = useRef();
  // const { eventId } = useParams();
  // const [event, setEvent] = useState();

  // useEffect(() => {
  //   const fetchArtwork = async () => {
  //     try {
  //       const eventResponse = await fetch(`https://server-gititgirls.onrender.com/events/${eventId}`);
  //       const eventData = await eventResponse.json();
  //       console.log("Fetched Event Data:", eventData); // Log event data

  //       setEvent(eventData);
  //     } catch (error) {
  //       console.error("Error fetching artwork:", error);
  //     }
  //   };

  //   fetchArtwork();
  // }, [eventId]);

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
      <div
        ref={scrollRef}
        className="flex items-center justify-start space-x-4 overflow-x-auto px-10 snap-x w-full scrollbar-hide pb-6"
      >
        {/*//Lagt til af Katinka */}
        {event?.artworkIds?.map((artworkId, idx) => (
          <TestArtCart key={idx} artworkId={artworkId} eventId={eventId} />
        ))}
      </div>

      <div className="flex items-center space-x-8 ">
        <motion.button
          onClick={() => scroll("left")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="text-gray-700 hover:text-black"
        >
          <IoArrowBack
            size={50}
            className="w-9 sm:w-10 md:w-11 lg:w-12 h-auto"
          />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.1 }}
          onClick={() => scroll("right")}
          className="text-gray-700 hover:text-black"
        >
          <IoArrowForward
            size={50}
            className="w-9 sm:w-10 md:w-11 lg:w-12 h-auto"
          />
        </motion.button>
      </div>
    </div>
  );
};

export default TestGallery;
