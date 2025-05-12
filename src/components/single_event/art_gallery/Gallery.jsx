"use client";
//maja

import { useRef } from "react";
import ArtCart from "./ArtCart";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";

const images = ["/dummy1.jpg", "/dummy2.jpg", "/dummy3.jpg", "/dummy4.jpg"];

const Gallery = () => {
  // useRef opretter en reference til galleriet (den scrollbare container)
  const scrollRef = useRef();

  // Denne funktion bruges til at scrolle galleriet enten til venstre eller højre (fordi den skulle have to forskellige evner/funktioner)
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        // Hvis direction er "left", scroll -300px. Ellers scroll +300px (højre).
        left: direction === "left" ? -300 : 300,
        behavior: "smooth", // Smooth scroll-animation
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      {/* Scrollbart galleri med billeder */}
      {/* Ref'en kobles til denne div, så vi kan scrolle den med knapperne */}
      <div ref={scrollRef} className="flex items-center justify-start space-x-6 overflow-x-auto px-10 snap-x scroll-smooth w-full">
        {/* Her looper vi gennem billederne og viser en ArtCart for hvert billede giver hvert artcart et unikt key ved at sige idx. (idx står for index så du giver egentlig bare hvert artcart et unikt index nr key smth)*/}
        {images.map((img, idx) => (
          <ArtCart key={idx} src={img} alt={`Artwork ${idx + 1}`} />
        ))}
      </div>

      {/* Knapper til at scrolle galleriet */}
      <div className="flex items-center space-x-8">
        {/* Venstre pil — kalder scroll("left") */}
        <button onClick={() => scroll("left")} className="text-gray-700 hover:text-black transition transform hover:scale-110">
          <IoArrowBackCircleOutline size={50} />
        </button>

        {/* Højre pil — kalder scroll("right") */}
        <button onClick={() => scroll("right")} className="text-gray-700 hover:text-black transition transform hover:scale-110">
          <IoArrowForwardCircleOutline size={50} />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
