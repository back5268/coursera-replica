import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { convertFileToUrl } from '@lib/utils';
import { FiUpload } from 'react-icons/fi';
import { Button } from '../uiCore';
import { BiTrash } from 'react-icons/bi';

const FileUploader = ({ data, setData = () => {}, label }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(data);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      setData(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="card flex flex-col cursor-pointer">
      {label && <label className="inline-block pl-[0.15rem] hover:cursor-pointer mb-2">{label}</label>}
      <input {...getInputProps()} className="cursor-pointer" />
      <div className="card">
        {fileUrl ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="h-40 w-40 bg-cover rounded-md" style={{ backgroundImage: `url(${fileUrl})` }}></div>
            <span className="truncate w-full">{fileUrl}</span>
            <div className="flex gap-2 items-center justify-center">
              <div {...getRootProps()}><Button label="Thay đổi" /></div>
              <Button className="px-6" severity="danger" onClick={() => setFile(null)}>
                <BiTrash size={16} />
              </Button>
            </div>
          </div>
        ) : (
          <div {...getRootProps()} className="flex justify-center flex-col gap-4 text-center items-center p-2">
            <FiUpload size={32} />
            <span>Drag and Drop file</span>
            <span className="text-center font-semibold dark:text-neutral-200">OR</span>
            <Button className="px-6" label="Browse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
