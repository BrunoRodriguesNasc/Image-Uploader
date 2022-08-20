import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDropzone } from 'react-dropzone';
import { storage } from './../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';

const Box = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [link, setLink] = useState('');
    const [style, setStyle] = useState({
        opacity: 'opacity-0',
    });
    const textAreaRef = useRef(null);

    const getLink = useCallback(fileRef => {
        getDownloadURL(fileRef).then(url => setLink(url));
    }, []);

    const uploadImage = useCallback(async (file) => {
        const fileName = v4();
        const fileRef = ref(storage, `images/${fileName}`);
        uploadBytes(fileRef, file).then(() => {
            setIsLoading(false);
            setFiles([file]);
            getLink(fileRef);
        }).catch(error => {
            console.log(error);
        });

    }, [getLink]);

    const onDrop = useCallback(acceptedFiles => {
        setIsLoading(true);
        setFiles(acceptedFiles.map(file => {
            Object.assign(file, { preview: URL.createObjectURL(file) })
            return uploadImage(file);
        }));
    }, [uploadImage]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const thumbs = files.map(file => (
        <div key={file.name}>
            <div >
                <img
                    className="rounded-xl w-80 h-56"
                    alt="thumbnail"
                    key={file.preview}
                    src={file.preview}
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));
    const copyLink = (e) => {
        e.preventDefault();
        textAreaRef.current.select();
        navigator.clipboard.writeText(textAreaRef.current.value);
        setStyle({
            display: 'flex',
            opacity: 'opacity-1',
        })

        setTimeout(() => {
            setStyle({
                opacity: 'opacity-0',
            });

        }, 1500);
    }

    return (
        <>
            <div className={`100px h-[100px] ${style.opacity} transition-opacity duration-300`}>
                <div className={`h-[50px] w-[200px] bg-[#F6F8FB] rounded-xl font-Poppins text-gray2 flex items-center text-center justify-center`}>
                    Copied link
                    <span className=" px-2 material-symbols-rounded text-[#219653] text-[24px]">
                        check_circle
                    </span>
                </div>
            </div>
            {isLoading ?
                <div className="w-[400.36px] h-[143.57px] flex flex-col shadow-custom rounded-xl justify-evenly items-center">
                    <span className="w-full px-[32px] font-Poppins font-medium text-lg text-gray2 tracking-tight">Uploading...</span>
                    <div className="w-[340.71px] h-[6px] bg-[#F2F2F2] overflow-hidden relative rounded-md before:rounded-md before:content-[''] before:left-[-50%] before:h-[6px] before:absolute before:w-[100px] before:bg-[#2F80ED] before:animate-lineAnim"></div>
                </div> :
                <div className={`h-128 w-98 shadow-custom rounded-xl ${isLoading ? 'hidden' : 'flex'} flex-col items-center justify-around`}>
                    <div className="h-20 flex justify-around flex-col items-center m-2.5">
                        {files.length === 0 ?
                            <><h2 className="text-lg font-Poppins tracking-tight text-gray2 font-medium">Upload your image</h2>
                                <span className="text-xs font-Poppins text-gray3 font-medium tracking-tight">File should be Jpeg, Png,...</span>
                            </>
                            :
                            <>
                                <span className="material-symbols-rounded text-[#219653] text-[35px]">
                                    check_circle
                                </span>
                                <h2 className="font-Poppins font-medium text-lg text-gray2 text-center tracking-tight">Uploaded Successfully!</h2>
                            </>}
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
                    {files.length === 0 ?
                        <div className="h-1/5 flex items-center justify-around flex-col">
                            <div  {...getRootProps()} className="font-Poppins text-gray4 text-xs font-medium tracking-tight">Or</div>
                            <input {...getInputProps()} type="file" id="upload" hidden />
                            <label className="w-[101px] flex justify-center text-center h-[32px] text-white rounded-lg font-Noto font-medium tracking-tight items-center bg-[#2F80ED]" htmlFor="upload">Choose File</label>
                        </div>
                        : <div className="w-[338px] h-[34px] border-2 bg-[#F6F8FB] rounded-lg flex justify-around flex-col items-center">
                            <form className="w-full flex justify-between">
                                <input className="w-full rounded-lg px-[7.2px] text-[8px] font-Poppins text-gray2 bg-[#F6F8FB]" ref={textAreaRef} defaultValue={link} />
                                <button className="w-[74px] h-[30px] bg-[#2F80ED] rounded-lg text-[8px] text-white font-medium" onClick={copyLink}>Copy Link</button>
                            </form>
                        </div>}
                </div>
            }
        </>
    )
}

export default Box;