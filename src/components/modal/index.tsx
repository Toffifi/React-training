import './style.scss';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { ModalType } from '@/enums/modalType';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Modal = ({
  children,
  setModalType,
}: {
  children: React.ReactNode;
  setModalType: (arg: ModalType) => void;
}): React.ReactPortal => {
  const [modalContainer] = useState(document.createElement('div'));

  useEffect(() => {
    const modalRoot = document.querySelector('#modal-root');
    modalRoot.appendChild(modalContainer);
    return function cleanup() {
      modalRoot.removeChild(modalContainer);
    };
  }, [modalContainer]);

  return ReactDOM.createPortal(
    <>
      <div
        className="modal-overlay"
        onClick={() => setModalType(ModalType.null)}
      />
      <div className="modal">
        <IconButton
          className="close-modal"
          onClick={() => setModalType(ModalType.null)}
        >
          <CloseIcon />
        </IconButton>
        <div className="modal-body">{children}</div>
      </div>
    </>,
    modalContainer
  );
};

export default Modal;
