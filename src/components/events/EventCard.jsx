import { LuMapPin } from "react-icons/lu";
import Link from "next/link";
import BtnWithArrow from "../BtnWithArrow";
import { SignedIn } from "@clerk/nextjs";
import EditIcon from "../edit_create_event/EditIcon";
import { formatDate } from "@/utils/formatDate";
import DeleteBtn from "../edit_create_event/Delete";
import { useRouter } from "next/navigation";


const EventCard = ({ event, onDeleted, onEdit }) => {
    
const router = useRouter();
  const formattedDate = formatDate(event.date);

  const handleCardClick = () => {
    router.push(`/events/${event.id}`);
  };

  return (
    
      <div onClick={handleCardClick} className="group/card container max-w-[818px] border-b-2 border-black pb-4 my-4 [container-type:inline-size] cursor-pointer">
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

        <div className="flex flex-row-reverse sm:flex-row cq-[min-width:640px]:grid cq-[min-width:640px]:grid-cols-[159px_1fr] gap-4 mt-2 items-start">
          <figure className="bg-primary-red w-[119px] h-[134px] shrink-0 cq-[min-width:640px]:w-[159px] cq-[min-width:640px]:h-[174px]"></figure>

          <div className="flex flex-col gap-1 w-full">
            <p className="italic font-medium">"{event.title}"</p>
            <p className="font-bold">Kl. 10.00</p>

            <div className="flex flex-row items-center gap-1">
              <LuMapPin className="text-primary-red" />
                <p>
                {event.location?.name && event.location?.address
                ? `${event.location.name}, ${event.location.address}`
                : "Lokation ikke tilgængelig"}
                </p>
            </div>
            

            <div className="flex justify-between gap-4">
              <p className="line-clamp-3 flex-1">{event.description}</p>
              <div className="flex justify-end shrink-0 items-end gap-4" onClick={(e) => e.stopPropagation()}>
                <SignedIn>
                    <DeleteBtn eventId={event.id} onDeleted={onDeleted} />
                    <EditIcon event={event} onEdit={onEdit} />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EventCard;
