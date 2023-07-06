import './modal.css'
const Modal = ({ isOpen, onClose, children }:any) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className='overlay' onClick={onClose}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <button className='closeButton' onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
