import React, { PropsWithChildren, useEffect } from "react";

interface ModalType {
  show: boolean;
  size?: "md" | "lg";
}

const Modal = ({
  show,
  size = "md",
  children,
}: PropsWithChildren<ModalType>) => {
  useEffect(() => {
    if (show) {
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    }
  }, [show]);

  return (
    <>
      {show && (
        <div className="modal-backdrop">
          <div className="modal fade">
            <div className={`modal-dialog modal-${size}`}>
              <div className="modal-content">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
