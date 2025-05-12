//bruges til "se event" (på event card) og "læs mere" (på art card)
//animation på pil ved hover
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const BtnWithArrow = ({href, children}) => {
    return ( 
        <div className="flex justify-between items-center gap-2">
            {children}
            <FaArrowRight size={18} />
        </div>
     );
}
 
export default BtnWithArrow;