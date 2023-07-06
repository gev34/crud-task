import React, { useEffect, useState } from "react";
//REDUX
import { useDispatch, useSelector } from "react-redux";
//INTERFACE
import {
  editAdAction,
  newDeclararionAction,
} from "../../redux/slices/userInfoSlice";
import { StateProps } from "../../redux/interface/ReduxStateInterface";
//ICONS
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
//CSS
import "./form.scss";
import Modal from "../Modal/Modal";

const cities = [
  "Yerevan",
  "Gyumri",
  "Dilijan",
  "Ijevan",
  "Tsaghkadzor",
  "Jermuk",
];

interface FormProps {
  addedTitle?: string;
  addedText?: string;
  addedPhone?: string;
  addedCity?: string;
  declarationId?: string;
}
const Form: React.FC<FormProps> = ({
  addedTitle = "",
  addedText = "",
  addedPhone = "",
  addedCity = "",
  declarationId,
}) => {
  const [title, setTitle] = useState("");
  const [adText, setAdText] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [editing, setEditing] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setTitle(addedTitle);
    setAdText(addedText);
    setPhone(addedPhone);
    setCity(addedCity);
  }, [addedTitle, addedText, addedPhone, addedCity]);

  const dispatch = useDispatch();
  const isUserAdsPage = useSelector(
    (state: StateProps) => state.userPostsReducer.isUserAdsPage
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUserAdsPage) {
      dispatch(editAdAction({ title, adText, phone, city, id: declarationId }));
      setEditing(true);
    } else {
      dispatch(newDeclararionAction({ title, adText, phone, city }));
    }
  };

  const isEditing = () => {
    return isUserAdsPage ? editing : false;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {isUserAdsPage && (
          <div className="iconsContainer">
            <AiFillEdit onClick={() => setEditing(false)} />
            <AiFillDelete onClick={() => setModalIsOpen(true)} />
          </div>
        )}
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={140}
            disabled={isEditing()}
          />
        </label>
        <label>
          Ad Text
          <textarea
            value={adText}
            onChange={(e) => setAdText(e.target.value)}
            maxLength={300}
            disabled={isEditing()}
          />
        </label>
        <label>
          Phone
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={isEditing()}
            //   pattern="^\+374 \(\d{2}\) \d{6}$"
          />
        </label>
        <label>
          City
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={isEditing()}
          >
            <option value="">-- select an option --</option>
            {cities.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">{isUserAdsPage ? "Save" : "Submit"}</button>
      </form>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <h1>Modal Content</h1>
        </Modal>
      )}
    </>
  );
};

export default Form;
