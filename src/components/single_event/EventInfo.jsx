//Maja
import { LuMapPin, LuClock4 } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";

const Eventinfo = () => {
  return (
    <div>
      <h1 className="font-bold text-center">Eventets navn</h1>
      <p className="text-center">Eventets beskrivelse</p>
      <div className="flex flex-row justify-evenly ">
        <div className="flex flex-col items-center">
          <div>
            <FiCalendar size={90} />
          </div>
          <div className="font-semibold text-gray-500">11. November</div>
        </div>
        <div className="flex flex-col items-center">
          <div>
            <LuMapPin size={90} />
          </div>
          <div className="font-semibold text-gray-500">Engade 1, 1111 København</div>
        </div>
        <div className="flex flex-col items-center">
          <div>
            <LuClock4 size={90} />
          </div>
          <div className="font-semibold text-gray-500">18:00-20:00</div>
        </div>
      </div>
    </div>
  );
};

export default Eventinfo;
