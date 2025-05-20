import PopUpBase from "../PopUpBaseLayout";
import { fetchDates, fetchLocations, EditEvent } from "@/api-mappe/EventsApiKald";
import { RxCross2 } from "react-icons/rx";

const EditEventPopUp = ({closePopup}) => {


    return ( <PopUpBase>
        <button onClick={closePopup}>
        <RxCross2></RxCross2>
        </button>
        <h4 className="uppercase">Rediger Event</h4>
        <div>Form</div>
    </PopUpBase> );
}
 
export default EditEventPopUp;