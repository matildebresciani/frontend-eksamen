const PopUpBase = ({children}) => {
    return (         
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-400 cursor-default">
          <div className="bg-white rounded-lg p-6 shadow-lg min-w-[320px] max-w-[95vw] max-h-[90vh] overflow-auto">
            {children}
          </div>
        </div>
     );
}
 
export default PopUpBase;