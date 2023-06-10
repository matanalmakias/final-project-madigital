import React from "react";

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-content">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
