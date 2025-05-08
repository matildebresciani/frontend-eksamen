//Matilde - Log In funktion
"use client";
import { useClerk, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Button from "./Button";
import Link from "next/link";

const Header = () => {
    const { openSignIn } = useClerk();
    return ( <header className="flex items-center justify-between py-10 px-6">
      <div>Logo</div>
      <div className="flex items-center gap-8">
        <Link href="/events">SE EVENTS</Link>
      <SignedOut>
        <Button variant="primary" onClick={() => openSignIn()}>
          LOG IND
        </Button>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
        <Link href="/create-event">
          <Button variant="primary">OPRET EVENT</Button>
        </Link>
        <UserButton/>
        </div>
      </SignedIn>
      </div>
    </header> );
}
 
export default Header;