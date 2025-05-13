//Kopi af Maja's kode (DENNE HAR SMÅ ÆNDRINGER LAVET AF KATINKA FOR AT KOBLE TIL singleArtwork)

"use client";
import { useRef } from "react";
// import ArtCart from "./ArtCart";
import TestArtCart from "./TestArtCart";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

const TestGallery = () => {
  const scrollRef = useRef();
  const { eventId } = useParams();
  const [event, setEvent] = useState();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const eventResponse = await fetch(
          `https://server-gititgirls.onrender.com/events/${eventId}`
        );
        const eventData = await eventResponse.json();
        console.log("Fetched Event Data:", eventData); // Log event data

        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching artwork:", error);
      }
    };

    fetchArtwork();
  }, [eventId]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <div
        ref={scrollRef}
        className="flex items-center justify-start space-x-6 overflow-x-auto px-10 snap-x scroll-smooth w-full"
      >
        {/* {Array.from({ length: event?.artworkIds?.length || 0 }).map(
          (_, idx) => (
            <ArtCart key={idx} index={idx} />
          )
        )} */}
        {/*//Lagt til af Katinka */}
        {event?.artworkIds?.map((artworkId, idx) => (
          //   <ArtCart key={idx} artworkId={artworkId} />
          //   <TestArtCart key={idx} artworkId={artworkId} />
          <TestArtCart key={idx} artworkId={artworkId} eventId={eventId} />
        ))}
      </div>

      <div className="flex items-center space-x-8">
        <button
          onClick={() => scroll("left")}
          className="text-gray-700 hover:text-black transition transform hover:scale-110"
        >
          <IoArrowBackCircleOutline size={50} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="text-gray-700 hover:text-black transition transform hover:scale-110"
        >
          <IoArrowForwardCircleOutline size={50} />
        </button>
      </div>
    </div>
  );
};

export default TestGallery;
