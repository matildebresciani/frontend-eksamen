//Matilde - Log In funktion
//Katinka - Layout
"use client";
import { useClerk, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isEvents = pathname === "/events";

  const headerBaseClasses = "w-full z-[200]";
  const headerPositionClass = isHome || isEvents ? "sticky top-0" : "relative";
  const headerBgClass = isEvents ? "bg-white" : "bg-transparent";

  const navBaseClasses =
    "flex items-center justify-between px-8 py-5 sm:py-6 sm:px-12 md:py-8 md:px-20 lg:py-10 lg:px-30";
  const navHoverClass = isHome
    ? "hover:bg-[rgba(255,255,255,0.5)] transition-colors duration-300"
    : "";

  //Over her har jeg fået hjælp af chatten til at lave transparent baggrund på isHome

  return (
    <header
      className={`${headerBaseClasses} ${headerPositionClass} ${headerBgClass}`}
    >
      <nav className={`${navBaseClasses} ${navHoverClass}`}>
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/imgs/logo_header.svg"
            alt="header logo"
            width={70}
            height={70}
            className="sm:w-[100px] sm:h-[100px]"
          />
          <div className="leading-[1.2] hidden sm:block sm:text-lg md:text-xl">
            MODERNIA
            <br />
            CURATORS
          </div>
        </Link>
        <HeaderNav />
      </nav>
    </header>
  );
};

// const Header = () => {
//   const pathname = usePathname();
//   const isHome = pathname === "/";
//   const isEvents = pathname === "/events";
//   return (
//     <header
//       className={`w-full z-[200] bg-transparent ${
//         isHome ? "sticky top-0 left-0" : "relative"
//       }, ${isEvents ? "sticky top-0 bg-white" : "relative bg-white"}`}
//     >
//       <nav className="flex items-center justify-between px-8 py-5 sm:py-6 sm:px-12 md:py-8 md:px-20 lg:py-10 lg:px-30 sm:hover:bg-[rgba(255,255,255,0.5)]">
//         <Link href="/" className="flex items-center gap-4">
//           <Image
//             src="/imgs/logo_header.svg"
//             alt="header logo"
//             width={70}
//             height={70}
//             className="sm:w-[100px] sm:h-[100px]"
//           />
//           <div className=" leading-[1.2] hidden sm:block sm:text-lg md:text-xl">
//             MODERNIA<br></br>CURATORS
//           </div>
//         </Link>
//         <HeaderNav />
//       </nav>
//     </header>
//   );
// };

const HeaderNav = () => {
  const { openSignIn } = useClerk();
  return (
    <div className="flex items-center gap-5 sm:gap-8 text-lg sm:text-xl md:text-2xl">
      <Link href="/events" className="hover:underline">
        SE EVENTS
      </Link>
      <SignedOut>
        <Button variant="CTA" onClick={() => openSignIn()}>
          LOG IND
        </Button>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <Link href="/create-event">
            <Button variant="primary" className="">
              OPRET EVENT
            </Button>
          </Link>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
