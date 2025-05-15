//Matilde
// Katinka - responsivitet (der er installeret container queries til tailwind css)
import { LuMapPin } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import BtnWithArrow from "../BtnWithArrow";
import useEventStore from "@/app/store/eventStore";
import { useEffect } from "react";
import { useClerk, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import EditIcon from "../edit_create_event/EditIcon";

const EventCard = ({ event }) => {
  const setDate = useEventStore((state) => state.setDate);
  const formattedDate = useEventStore((state) => state.formattedDate);

  useEffect(() => {
    setDate(event.date);
  }, [event.date]);

  return (
    <Link href={`/events/${event.id}`}>
      <div className="group/card container max-w-[818px] border-b-2 border-black pb-4 my-4 [container-type:inline-size]">
        <div className="flex justify-between items-center">
          <h3 className="uppercase !text-primary-red ">{formattedDate}</h3>

          {/* Mobile: altid synlig*/}
          <div className="cq-[min-width:640px]:hidden">
            <BtnWithArrow>SE EVENT</BtnWithArrow>
          </div>

          {/* Desktop: hover */}
          <div className="hidden cq-[min-width:640px]:block opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 ease-in-out">
            <BtnWithArrow>SE EVENT</BtnWithArrow>
          </div>
        </div>

        {/* Content layout ændres baseret på container width */}
        <div className="flex flex-row-reverse sm:flex-row cq-[min-width:640px]:grid cq-[min-width:640px]:grid-cols-[159px_1fr] gap-4 mt-2 items-start">
          {/* Figure */}
          <figure className="bg-primary-red w-[119px] h-[134px] shrink-0 cq-[min-width:640px]:w-[159px] cq-[min-width:640px]:h-[174px]"></figure>

          {/* Text */}
          <div className="flex flex-col gap-1">
            <p className="italic font-medium">"{event.title}"</p>
            <p className="font-bold">Kl. 10.00</p>

            <div className="flex flex-row items-center gap-1">
              <LuMapPin className="text-primary-red" />
              <p>
                {event.location.name}, {event.location.address}
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <p className="line-clamp-3 flex-1">{event.description}</p>
              <div className="flex justify-end shrink-0">
                <SignedIn>
                  <EditIcon />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>

    // <Link href={`/events/${event.id}`}>
    //   <div className="group/card flex flex-row-reverse sm:flex-row  gap-4 pb-4 my-4 max-w-[818px] border-b-2 border-black">
    //     <figure className="bg-primary-red w-[119px] h-[134px] sm:w-[159px] sm:h-[174px] shrink-0"></figure>
    //     <div>
    //       <div className="flex justify-between span">
    //         <h3 className="uppercase !text-primary-red ">{formattedDate}</h3>
    //         <div className=" opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 ease-in-out">
    //           <BtnWithArrow>SE EVENT</BtnWithArrow>
    //         </div>
    //       </div>

    //       <p className="italic font-medium">"{event.title}"</p>
    //       <p className="font-bold">Kl. 10.00</p>
    //       <div className="flex flex-row items-center gap-1">
    //         <LuMapPin className="text-primary-red" />
    //         <p>
    //           {event.location.name}, {event.location.address}
    //         </p>
    //       </div>
    //       <div className="flex items-end gap-4">
    //         <p className="line-clamp-3">{event.description}</p>
    //         <div className="flex justify-end">
    //           <SignedIn>
    //             <EditIcon />
    //           </SignedIn>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
  );
};

export default EventCard;
