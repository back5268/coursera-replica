import { useState } from 'react';

export const SendMessage = ({ id, parentId }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  return (
    <div className="flex gap-2 items-center">
      <div className="h-[32px] w-[32px]">
        <div className="h-[32px] w-[32px] rounded-full bg-black bg-cover" style={{ backgroundImage: `url('')` }}></div>
      </div>
      <form className="w-full">
        <input
          type="search"
          className="w-full py-1 block flex-auto rounded border border-solid border-neutral-300 bg-transparent 
          bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none 
          transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 
          focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 
          dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Viết bình luận ..."
        />
      </form>
    </div>
  );
};
