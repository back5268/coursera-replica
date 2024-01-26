import React from 'react';
import { TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter } from 'tw-elements-react';
import Button from './Button';

const Modal = (props) => {
  const { title, show, setShow = () => {}, children, size = "xl", ...prop } = props;

  return (
    <TEModal show={show} setShow={setShow} staticBackdrop>
      <TEModalDialog size={size} {...prop}>
        <TEModalContent>
          <TEModalHeader>
            <h2 className="font-semibold uppercase leading-normal text-neutral-800 dark:text-neutral-200 my-2">{title}</h2>
            <button type="button" className="cursor-pointer" onClick={() => setShow(false)} aria-label="Close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </TEModalHeader>
          {children}
          {/* <TEModalFooter className="flex gap-2">
            <Button label="Hủy" severity="secondary" onClick={() => setShow(false)} />
            <Button type="submit" label="Xác nhận" />
          </TEModalFooter> */}
        </TEModalContent>
      </TEModalDialog>
    </TEModal>
  );
};

export default Modal;
