import { useCallback, useState } from 'react';
import { TiFolderOpen } from 'react-icons/ti';
import { MdSend } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
import { Link } from '@components/uiCore';
import { IoMdClose } from 'react-icons/io';

export const SendMessage = ({ id, parentId }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <div className="flex gap-2">
      <div className="h-[32px] w-[32px]">
        <div className="h-[32px] w-[32px] rounded-full bg-black bg-cover" style={{ backgroundImage: `url('')` }}></div>
      </div>
      <form onSubmit={onSubmit} className="w-full relative">
        <input {...getInputProps()} className="cursor-pointer" />
        <input
          type="search"
          className="w-full py-1 block flex-auto rounded border border-solid border-neutral-300 bg-transparent 
          bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none 
          transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 
          focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 
          dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Viết bình luận ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex gap-3 absolute top-2 right-2">
          <div {...getRootProps()} className="cursor-pointer">
            <TiFolderOpen size={20} />
          </div>
          <button type="submit">
            <MdSend size={20} />
          </button>
        </div>
        {file && (
          <div className="p-2 bg-primary-50 rounded-md mt-2 flex justify-between items-center">
            <Link>{file.name}</Link>
            <button type="button" className="cursor-pointer" onClick={() => setFile(null)}>
              <IoMdClose size={20} />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
