import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { ModalType } from '@/enums/modalType';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Modal = ({
  children,
  modalType,
  setModalType,
}: {
  children: React.ReactNode;
  modalType: ModalType;
  setModalType: (arg: ModalType) => void;
}): React.ReactPortal => {
  return ReactDOM.createPortal(
    modalType !== ModalType.null ? (
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
      </>
    ) : null,
    document.querySelector('#modal-root')
  );
};

export default Modal;
