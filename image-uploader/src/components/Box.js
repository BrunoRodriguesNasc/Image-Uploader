import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';

const Box = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

        setIsLoading(true);
    }, []);

    const thumbs = files.map(file => (
        <div key={file.name}>
            <div >
                <img
                    className="w-80 h-56 object-contain"
                    alt="thumbnail"
                    src={file.preview}
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);


    return (
        <>
            {isLoading ?
                <div className="w-[400.36px] h-[143.57px] flex flex-col shadow-custom rounded-xl justify-evenly items-center">
                    <span className="w-full px-[32px] font-Poppins font-medium text-lg text-gray2 tracking-tight">Uploading...</span>
                    <div className="w-[340.71px] h-[6px] bg-[#F2F2F2] overflow-hidden relative rounded-md before:rounded-md before:content-[''] before:left-[-50%] before:h-[6px] before:absolute before:w-[100px] before:bg-[#2F80ED] before:animate-lineAnim"></div>
                </div> :
                <div className={`h-128 w-98 shadow-custom rounded-xl ${isLoading ? 'hidden' : 'flex'} flex-col items-center justify-around`}>
                    <div className="h-20 flex justify-around flex-col items-center m-2.5">
                        <h2 className="text-lg font-Poppins tracking-tight text-gray2 font-medium">Upload your image</h2>
                        <span className="text-xs font-Poppins text-gray3 font-medium tracking-tight">File should be Jpeg, Png,...</span>
                    </div>

                    <span {...getRootProps()}>
                        <input {...getInputProps()} />
                        {thumbs.length > 0 ? thumbs :
                            <div className={`flex w-80 h-56 border border-dashed border-blueB bg-gray1 rounded-xl justify-evenly items-center flex-col`}>
                                <div className="w-[114.13px] h-[88.24px] bg-img bg-center" />
                                <div className="text-xs font-Poppins font-medium tracking-tight text-gray4" dr>
                                    Drag & Drop your image here
                                </div>
                            </div>
                        }
                    </span>
                    <div className="h-1/5 flex items-center justify-around flex-col">
                        <div className="font-Poppins text-gray4 text-xs font-medium tracking-tight">Or</div>
                        <button className="w-[101px] h-[32px] bg-[#2F80ED] text-white rounded-lg font-Noto text-xs font-medium tracking-tight">Choose a file</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Box;