//Matilde - Log In funktion
//Katinka - Layout
"use client";
import { useClerk, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Button from "./Button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-10 px-6">
      <Link href="/" className="flex">
        <div>Logo</div>
        <h1>MODERNIA CURATORS</h1>
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
        <Button variant="primary" onClick={() => openSignIn()}>
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
