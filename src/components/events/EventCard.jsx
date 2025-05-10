//Matilde
import { LuMapPin } from "react-icons/lu";
import Image from "next/image";

const EventCard = ({event}) => {
    return ( <div className="flex gap-4 my-8 pb-8 max-w-[818px] border-b-2 border-black">
        <figure className="bg-primary-red w-[159px] h-[174px] shrink-0">
        </figure>
        <div>
        <h3 className="uppercase">{new Date(event.date).toLocaleDateString("da-DK", {
            weekday: "long",
            day: "numeric",
            month: "long"
            })}</h3>
            <p className="italic">"{event.title}"</p>
            <p className="font-bold">Kl. 10.00</p>
            <div className="flex flex-row items-center gap-1">
                <LuMapPin className="text-primary-red" />
                <p>{event.location.name}, {event.location.address}</p>
            </div>
            <p className="line-clamp-3">
            {event.description}
            </p>
        </div>
    </div> );
}
 
export default EventCard;