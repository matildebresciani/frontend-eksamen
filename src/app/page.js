"use client";

import { useEffect, useState, useRef } from "react";
import BtnWithArrow from "@/components/BtnWithArrow";
import { useClerk, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { fetchSelectedWorks } from "../api-mappe/SmkApiKald";
import { motion } from "framer-motion";

export default function Home() {
  const [works, setWorks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [fade, setFade] = useState(false); // Start med false!
  const intervalRef = useRef(null);

  const { openSignIn } = useClerk();

  // Hent værker på mount
  useEffect(() => {
    fetchSelectedWorks().then((data) => {
      console.log("FORSIDE DATA:", data);
      setWorks(data);
      setCurrentIndex(0);
      setFade(true); // Fade ind på første billede
    });
  }, []);

  // Auto skift billede hvert 10. sekund (10000 ms)
  useEffect(() => {
    if (works.length === 0) return;

    intervalRef.current = setInterval(() => {
      setPrevIndex(currentIndex);
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % works.length);
        setFade(true);
      }, 1200); // fade duration matcher transition
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, [works, currentIndex]);

  // Stop interval ved manuel klik, genstart efter klik
  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    setPrevIndex(currentIndex);
    setFade(false);
    setCurrentIndex(index); // Skift billeder med det samme
    setTimeout(() => {
      setFade(true);
    }, 10); // meget kort delay for at trigge fade

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setPrevIndex(index);
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % works.length);
        setFade(true);
      }, 1200);
    }, 10000);
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Baggrundsbilleder med smooth fade og pulse */}
      <div className="fixed inset-0 -z-10">
        {works.map((work, idx) => (
          <motion.div
            key={work.image}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity:
                idx === currentIndex && fade
                  ? 1
                  : idx === prevIndex && !fade
                  ? 1
                  : 0,
              // scale skal ALTID køre på det aktuelle billede
              scale: idx === currentIndex ? [1.05, 1, 1.05] : 1,
            }}
            transition={{
              opacity: { duration: 1.2 },
              scale: {
                duration: 8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }}
            style={{ pointerEvents: "none" }}
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              style={{ objectFit: "cover" }}
              priority={idx === currentIndex}
            />
          </motion.div>
        ))}
        {works.length === 0 && <div className="w-full h-full bg-gray-200" />}
      </div>

      {/* Overskrift og boks med tekst og knap */}
      <h1 className="!text-5xl md:!text-7xl lg:!text-8xl !font-semibold !text-white drop-shadow-lg uppercase text-left leading-none ml-4 mt-8">
        MODERNIA CURATORS
      </h1>
      <div className="relative z-10 flex flex-col items-end px-4 md:px-8 py-4 md:py-8 bg-white/40 rounded-sm max-w-xs md:max-w-2xl ml-4 shadow-lg backdrop-blur-lg">
        <p className="text-black !text-base md:!text-xl drop-shadow-md text-left mb-2 md:mb-4 w-full">
          Din platform til <b>modernistisk kunst</b> - tilmeld dig events med få
          klik.
        </p>
        <Link href="/events" className="self-end">
          <BtnWithArrow
            size="large"
            className="text-red-600 hover:text-red-800"
          >
            <span className="font-semibold text-lg md:text-2xl">SE EVENTS</span>
          </BtnWithArrow>
        </Link>
      </div>
      {/*artist navn og kunstværks titel som skifter med billederne */}
      <div
        className="
        fixed right-2
       sm:right-4 md:right-8
        bottom-25 md:bottom-12 lg:bottom-8
        z-30 bg-white/40 rounded-sm
        px-2 py-1 md:px-6 md:py-3
        shadow-lg backdrop-blur-lg
        flex flex-col items-start
        max-w-[140px] md:max-w-xs
        text-xs md:text-base
      "
      >
        <span className="italic text-primary-red text-xs md:text-lg leading-tight">
          “{works[currentIndex]?.title || "Ukendt titel"}”
        </span>
        <span className="font-semibold text-primary-red text-xs md:text-lg mt-1">
          af {works[currentIndex]?.artist || "Ukendt kunstner"}
        </span>
      </div>
      {/*Røde prikker i bunden til at se hvilken side man er på*/}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        {works.map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              aria-label={`Vis billede ${idx + 1}`}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors duration-300 focus:outline-none ${
                isActive
                  ? "bg-primary-red border-primary-red"
                  : "border-2 border-primary-red border-solid bg-transparent"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
