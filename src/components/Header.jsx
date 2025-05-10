//Matilde - Log In funktion
//Katinka - Layout
"use client";
import { useClerk, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
//import { usePathname } from "next/navigation";

const Header = () => {
  // const pathname = usePathname();
  // const isHome = pathname === "/";
  // const isProducts = pathname === "/products";
  return (
    <header className="flex items-center justify-between py-5 px-8 sm:py-6 sm:px-10 md:py-8 md:px-12 lg:py-10 lg:px-14 hover:bg-[rgba(255,255,255,0.5)]">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src="/imgs/logo_header.svg"
          alt="header logo"
          width={70}
          height={70}
          className="sm:w-[100px] sm:h-[100px]"
        />
        <div className=" leading-[1.2] hidden sm:block sm:text-lg md:text-xl">
          MODERNIA<br></br>CURATORS
        </div>
      </Link>
      <HeaderNav />
    </header>
  );
};

const HeaderNav = () => {
  const { openSignIn } = useClerk();
  return (
    <nav className="flex items-center gap-5 sm:gap-8 text-lg sm:text-xl md:text-2xl">
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
    </nav>
  );
};

export default Header;
