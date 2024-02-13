import { Hr } from '@components/uiCore';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TERipple } from 'tw-elements-react';

const SearchSection = () => {
  const [value, setValue] = useState('');
  const courses = [];

  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) !isShow && setIsShow(true)
    else setIsShow(false);
  }, [value]);

  return (
    <div ref={ref} className="relative flex w-[400px] flex-wrap items-stretch">
      <input
        type="search"
        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon1"
        onFocus={() => value && setIsShow(true)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <TERipple color="light">
        <button
          className="relative z-[2] flex items-center rounded-r bg-primary px-4 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          type="button"
          id="button-addon1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </TERipple>

      <div
        className={`absolute right-0 mt-12 w-full bg-white shadow-xl rounded-sm transition-all z-50
          duration-300 ease-in-out transform ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="p-4 flex flex-col gap-1">
          {courses.length > 0 ? (
            <>
              <p className="text-sm">Kết quả tìm kiếm cho '{value}'</p>
              <Hr />
              <p className="uppercase font-medium mt-2 text-sm">Khóa học</p>
              <Hr />
              <div className="flex flex-col gap-1">
                {courses.length > 0 &&
                  courses.slice(0, 3).map((item, index) => {
                    return (
                      <Link to={`/courses/detail/${item.slug}`} key={index} className="flex gap-2 items-center text-sm p-2">
                        <div className="h-[32px] w-[32px]">
                          <div
                            className="h-[32px] w-[32px] rounded-full bg-black bg-cover"
                            style={{ backgroundImage: `url('${item.image}')` }}
                          ></div>
                          <p>{item.name}</p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
              <p className="uppercase font-medium mt-2 text-sm">Bài viết</p>
              <Hr />
              <div className="flex flex-col gap-1">
                {courses.length > 0 &&
                  courses.slice(0, 3).map((item, index) => {
                    return (
                      <Link to={`/courses/detail/${item.slug}`} key={index} className="flex gap-2 items-center text-sm p-2">
                        <div className="h-[32px] w-[32px]">
                          <div
                            className="h-[32px] w-[32px] rounded-full bg-black bg-cover"
                            style={{ backgroundImage: `url('${item.image}')` }}
                          ></div>
                          <p>{item.name}</p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </>
          ) : (
            <><p className="text-sm">Không tìm thấy kết quả cho '{value}'</p> <Hr /> </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
