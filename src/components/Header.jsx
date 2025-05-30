//Matilde - Log In funktion
//Katinka - Layout
//Header

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
        <Link href="/" className="flex  items-center gap-4">
          <Image
            src="/imgs/logo_header.svg"
            alt="header logo"
            width={70}
            height={70}
            className="lg:w-[100px] lg:h-[100px]"
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

const HeaderNav = () => {
  const { openSignIn } = useClerk();
  return (
    <div className="flex items-center gap-2 md:gap-4 text-sm sm:text-xl md:text-2xl">
      {/* Se Events - Mobilvisning (vises under sm) */}
      <div className="block sm:hidden">
        <Link href="/events">
          <Button variant="transparent">EVENTS</Button>
        </Link>
      </div>

      {/* Se Events - Desktopvisning */}
      <div className="hidden sm:block whitespace-nowrap">
        <Link href="/events">
          <Button variant="transparent">SE EVENTS</Button>
        </Link>
      </div>

      <SignedOut>
        <div>
          <Button variant="CTA" onClick={() => openSignIn()}>
            LOG IND
          </Button>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex gap-2 sm:gap-4 items-center">
          {/* Opret Event - Mobilvisning */}
          <Link href="/create-event" className="block sm:hidden">
            <Button variant="CTA">OPRET</Button>
          </Link>

          {/* Opret Event - Desktopvisning */}
          <Link
            href="/create-event"
            className="hidden sm:block whitespace-nowrap"
          >
            <Button variant="CTA">OPRET EVENT</Button>
          </Link>

          <div className="flex items-center justify-center">
            <UserButton />
          </div>
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
