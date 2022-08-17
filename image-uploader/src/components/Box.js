const Box = () => {
    return (
        <div className="h-128 w-98 shadow-custom rounded-xl flex flex-col items-center justify-around">
            <div className="h-20 flex justify-around flex-col items-center m-2.5">
                <h2 className="text-lg font-Poppins tracking-tight text-gray2 font-medium">Upload your image</h2>
                <span className="text-xs font-Poppins text-gray3 font-medium tracking-tight">File should be Jpeg, Png,...</span>
            </div>
            <div className="w-80 h-56 border border-dashed border-blueB bg-gray1 rounded-xl flex justify-evenly items-center flex-col">
                <div className="w-[114.13px] h-[88.24px] bg-img bg-center"/>
                <div className="text-xs font-Poppins font-medium tracking-tight text-gray4">
                    Drag & Drop your image here
                </div>
            </div>
            <div className="h-1/5 flex items-center justify-around flex-col">
                <div className="font-Poppins text-gray4 text-xs font-medium tracking-tight">Or</div>
                <button className="w-[101px] h-[32px] bg-[#2F80ED] text-white rounded-lg font-Noto text-xs font-medium tracking-tight">Choose a file</button>
            </div>
        
        </div>
    )
}

export default Box;