//Katinka - Layout
import Button from "@/components/Button";
import IndexTextContent from "@/components/IndexTextContent";
import Image from "next/image";
import Link from "next/link";
import ArtworkList from "@/components/edit_create_event/ArtworkList";

export default function Home() {
  return (
    <div>
      <ArtworkList></ArtworkList>
      <Image
        src="/imgs/index.png"
        alt="index photo"
        height={1033}
        width={1440}
        className="fixed top-0 left-0 w-full h-screen object-cover z-[-1] transition-transform duration-[8000ms] ease-in-out hover:scale-110"
      ></Image>
      <div className="flex flex-col items-center">
        <IndexTextContent></IndexTextContent>
        <div className="flex items-center gap-8">
          <Link href="/events">
            <Button variant="primary">SE EVENTS</Button>
          </Link>
          <Button variant="CTA">LOG IND</Button>
          {/* OBS denne LOG IND BUTTON skal aktiveres! */}
        </div>
      </div>
    </div>
  );
}
