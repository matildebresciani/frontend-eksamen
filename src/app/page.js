//Katinka

"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import IndexTextContent from "@/components/IndexTextContent";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useScroll, useTransform, motion } from "motion/react";

// Initialt billede hentes server-side
async function fetchRandomImage() {
  try {
    const res = await fetch(
      "https://api.smk.dk/api/v1/art/search?keys=modernisme&offset=0&rows=100",
      { cache: "no-store" }
    );
    const data = await res.json();

    const images = data.items
      .map((item) => item.image_thumbnail)
      .filter((url) => url);

    if (images.length > 0) {
      return images[Math.floor(Math.random() * images.length)];
    }
  } catch (err) {
    console.error("Fejl ved hentning af billede:", err);
  }

  return "/imgs/index.png";
}

export default function Home() {
  const [imageUrl, setImageUrl] = useState("/imgs/index.png");

  useEffect(() => {
    // Hent første billede ved load
    fetchRandomImage().then((url) => setImageUrl(url));
  }, []);

  const handleNewImage = async () => {
    const newImage = await fetchRandomImage();
    setImageUrl(newImage);
  };

  const { scrollY } = useScroll();
  const topButtonOpacity = useTransform(scrollY, [0, 150, 350], [1, 1, 0]);
  const topButtonTranslateY = useTransform(scrollY, [0, 400], [0, -50]);
  const contentOpacity = useTransform(scrollY, [300, 700, 1200], [0, 1, 0]);
  const contentTranslateY = useTransform(scrollY, [400, 800], [50, 0]);

  return (
    <div className="mt-50 mb-150">
      <Image
        src={imageUrl}
        alt="Tilfældigt kunstværk fra SMK's API"
        height={1033}
        width={1440}
        className="fixed top-0 left-0 w-full h-screen object-cover z-[-1] transition-transform duration-[8000ms] ease-in-out hover:scale-110"
      />
      <div className="flex flex-col items-center ">
        <motion.div
          style={{ opacity: topButtonOpacity, y: topButtonTranslateY }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="flex flex-col sm:flex-row items-center sm:gap-8 text-lg sm:text-xl md:text-2xl"
          >
            <Button variant="transparent" onClick={handleNewImage}>
              UDFORSK MODERNISMENS VÆRKER
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        // style={{ opacity, y: translateY }}
        style={{ opacity: contentOpacity, y: contentTranslateY }}
        className="flex justify-center items-center w-full mt-100"
      >
        <IndexTextContent>
          <div className="flex flex-col sm:flex-row items-center sm:gap-8 text-lg sm:text-xl md:text-2xl mt-5 sm:mt-8 justify-center">
            <Link href="/events">
              <Button variant="transparent">SE EVENTS</Button>
            </Link>
            <SignedOut>
              <Button variant="CTA">LOG IND</Button>
            </SignedOut>
            <SignedIn>
              <Button variant="CTA">OPRET EVENT</Button>
            </SignedIn>
          </div>
        </IndexTextContent>
      </motion.div>
    </div>
  );
}

//Første udkast af kode
// import Button from "@/components/Button";
// import IndexTextContent from "@/components/IndexTextContent";
// import { SignedIn, SignedOut } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div>
//       <Image
//         src="/imgs/index.png"
//         alt="index photo"
//         height={1033}
//         width={1440}
//         className="fixed top-0 left-0 w-full h-screen object-cover z-[-1] transition-transform duration-[8000ms] ease-in-out hover:scale-110"
//       ></Image>
//       <div className="flex flex-col items-center">
//         <IndexTextContent></IndexTextContent>
//         <div className="flex flex-col sm:flex-row items-center sm:gap-8 text-lg sm:text-xl md:text-2xl">
//           <Link href="/events">
//             <Button variant="transparent">SE EVENTS</Button>
//           </Link>
//           <SignedOut>
//             <Button variant="CTA">LOG IND</Button>
//             {/* OBS denne LOG IND BUTTON skal aktiveres! */}
//           </SignedOut>
//           <SignedIn>
//             <Button variant="CTA">OPRET EVENT</Button>
//           </SignedIn>
//         </div>
//       </div>
//     </div>
//   );
// }
