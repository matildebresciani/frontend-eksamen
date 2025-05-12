//Matilde
import { LuMapPin } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import BtnWithArrow from "../BtnWithArrow";

const EventCard = ({event}) => {
    
    return ( 
        <Link href={`/events/${event.id}`}>
    <div className="group/card flex gap-4 pb-4 my-4 max-w-[818px] border-b-2 border-black">
        <figure className="bg-primary-red w-[159px] h-[174px] shrink-0">
        </figure>
        <div>
        <div className="flex justify-between">
            <h3 className="uppercase !text-primary-red">{new Date(event.date).toLocaleDateString("da-DK", {
            weekday: "long",
            day: "numeric",
            month: "long"
            })}</h3>
            <div className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 ease-in-out">
            <BtnWithArrow>SE EVENT</BtnWithArrow>
            </div>
        </div>
            <p className="italic font-medium">"{event.title}"</p>
            <p className="font-bold">Kl. 10.00</p>
            <div className="flex flex-row items-center gap-1">
                <LuMapPin className="text-primary-red" />
                <p>{event.location.name}, {event.location.address}</p>
            </div>
            <p className="line-clamp-3">
            {event.description}
            </p>
        </div>
    </div>
    </Link> );
}
 
export default EventCard;