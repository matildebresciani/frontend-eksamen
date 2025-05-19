const PopUpBase = ({children}) => {
    return (         
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-100">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
            {children}
          </div>
        </div>
     );
}
 
export default PopUpBase;