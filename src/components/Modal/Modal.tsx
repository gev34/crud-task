//REDUX
import { useDispatch } from "react-redux";
import { deleteAdAction } from "../../redux/slices/userInfoSlice";
//CSS
import "./modal.scss";

type StatusType = "createdAd" | "editedAd" | "deletedAd" | undefined;

interface ModalProps {
  status: StatusType;
  declarationId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const Modal = ({
  status,
  declarationId,
  isOpen,
  onClose,
  onDelete,
}: ModalProps) => {
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  const handleDeleteAd = () => {
    declarationId && dispatch(deleteAdAction(declarationId));
    onDelete();
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        {status === "createdAd" && (
          <h1>You have successfully created an ad!</h1>
        )}
        {status === "editedAd" && <h1>You have successfully edited an ad!</h1>}
        {status === "deletedAd" && (
          <div className="deleteContainer">
            <h1>Are you sure you want to delete this ad?</h1>
            <div className="deleteButtons">
              <button onClick={handleDeleteAd}>YES</button>
              <button onClick={onClose}>NO</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
