import React, {useCallback} from 'react'
import {Button, Hr, Link} from "@components/uiCore";
import {useDropzone} from "react-dropzone";
import {BiTrash} from "react-icons/bi";

export const UploadFiles = (props) => {
    const {
        files = [], setFiles, label
    } = props


    const removeFile = (item) => {
        setFiles(files.filter((f) => f !== item))
    }

    const onDrop = useCallback(
        (acceptedFiles) => {
            setFiles(pre => [...pre, ...acceptedFiles])
        }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <div className={'p-2'}>
            <div className="card flex flex-col cursor-pointer">
                <div className={'flex justify-between items-center mb-2'}>
                    {label && <label className="font-semibold mb-2">{label}</label>}
                    <div className={'flex gap-2'}>
                        <Button severity="danger" className={'!px-4'} onClick={() => setFiles([])}>
                            <BiTrash size={16}/>
                        </Button>
                        <div {...getRootProps()} >
                            <Button label={'Chọn files'}/>
                        </div>
                    </div>
                </div>
                <Hr/>
                <input {...getInputProps()} className="cursor-pointer"/>
                {files?.length > 0 ?
                    <div className="flex justify-center flex-col gap-4 text-left mt-4">
                        {files.map((f, index) => (
                            <div key={index} className={'card flex items-center justify-between'}>
                                <Link>{f.name || f}</Link>
                                <Button severity="danger" className={'!px-4'} onClick={() => removeFile(f)}>
                                    <BiTrash size={16}/>
                                </Button>
                            </div>
                        ))
                        } </div> : <div {...getRootProps()} className="text-center p-2 font-semibold mt-4">
                        <span>Drag and Drop file</span>
                    </div>
                }
            </div>
        </div>
    )
}
export default UploadFiles