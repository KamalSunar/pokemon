import React from "react";
import Modal from "./modal";

interface InfoModalType {
  isModalOpen: boolean;
  closeModal: () => void;
}

const InfoModal = ({ isModalOpen, closeModal }: InfoModalType) => {
  return (
    <div>
      <Modal show={isModalOpen} size="md">
        <div className="modal-body modal-info">
          <h5>
            Maximum pokemon selection reached. Please remove any pokemon from
            your team to select this one.
          </h5>
          <div className="text-center mt-4">
            <button
              className="button button-primary"
              onClick={() => {
                closeModal();
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InfoModal;
