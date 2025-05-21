const PopUpBase = ({children}) => {
    return (         
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-400">
          <div className="bg-white rounded-lg p-6 shadow-lg min-w-sm max-w-fit w-full">
            {children}
          </div>
        </div>
     );
}
 
export default PopUpBase;