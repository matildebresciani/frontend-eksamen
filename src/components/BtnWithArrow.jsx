//bruges til "se event" (på event card) og "læs mere" (på art card)
//pilen og animationen er udarbejdet med hjælp fra AI

const BtnWithArrow = ({children}) => {
    return ( 
        <>
        <div className="group flex justify-between items-center gap-2 text-primary-red transform">
            {children}
        <div className="relative h-1 w-6 transition-all duration-300 group-hover:w-10">
        <span className="absolute top-1/2 left-0 h-0.5 w-full bg-primary-red transform -translate-y-1/2" />
        <span className="absolute top-1/2 right-0 w-2 h-2 border-t-2 border-r-2 border-primary-red transform rotate-45 translate-y-[-50%]" />
      </div>
        </div>
        </>
     );
}
 
export default BtnWithArrow;