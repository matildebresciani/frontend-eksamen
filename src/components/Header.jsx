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
    <header className="flex items-center justify-between py-10 px-14 hover:bg-[rgba(255,255,255,0.5)]">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src="/imgs/logo_header.svg"
          alt="header logo"
          width={100}
          height={100}
        />
        <p className="leading-[1.2]">
          MODERNIA<br></br>CURATORS
        </p>
      </Link>
      <HeaderNav />
    </header>
  );
};

const HeaderNav = () => {
  const { openSignIn } = useClerk();
  return (
    <nav className="flex items-center gap-8">
      <Link href="/events">SE EVENTS</Link>
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
