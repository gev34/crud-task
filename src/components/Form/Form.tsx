import React, { useCallback, useEffect, useState } from "react";
//COMPONENTS
import Modal from "../Modal/Modal";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  editAdAction,
  newDeclararionAction,
} from "../../redux/slices/userInfoSlice";
import { StateProps } from "../../redux/interface/ReduxStateInterface";
//ICONS
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
//CSS
import "./form.scss";

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
  declarationId = "",
}) => {
  const [form, setForm] = useState({
    title: addedTitle,
    adText: addedText,
    phone: addedPhone,
    city: addedCity,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createdAd, setCreatedAd] = useState(false);
  const [deletedAd, setDeletedAd] = useState(false);

  const dispatch = useDispatch();
  const isUserAdsPage = useSelector(
    (state: StateProps) => state.userPostsReducer.isUserAdsPage
  );
  const [editing, setEditing] = useState(isUserAdsPage);
  const updateField = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    },
    [form]
  );

  useEffect(() => {
    setForm({
      title: addedTitle,
      adText: addedText,
      phone: addedPhone,
      city: addedCity,
    });
  }, [addedTitle, addedText, addedPhone, addedCity]);

  const creatingAd = () => {
    setForm({ title: "", adText: "", phone: "", city: "" });
    setCreatedAd(true);
  };

  const deletingAd = () => {
    setDeletedAd(true);
    setModalIsOpen(true);
    setEditing(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!deletedAd) {
      const action = isUserAdsPage
        ? editAdAction({ ...form, id: declarationId })
        : newDeclararionAction(form);
      dispatch(action);
      if (!isUserAdsPage) creatingAd();
      else setEditing(true);
    }
    setModalIsOpen(true);
  };
  const disabledFields = () => {
   return  editing || deletedAd
  }
  const modalStatus = () => {
    if (createdAd) return "createdAd";
    else if (editing && !deletedAd) return "editedAd";
    else if (deletedAd) return "deletedAd";
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {isUserAdsPage && (
          <div className="iconsContainer">
            <AiFillEdit onClick={() => setEditing(false)} />
            <AiFillDelete onClick={deletingAd} />
          </div>
        )}
        <label>
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={updateField}
            required
            maxLength={140}
            disabled={disabledFields()}
          />
        </label>
        <label>
          Ad Text
          <textarea
            name="adText"
            value={form.adText}
            onChange={updateField}
            maxLength={300}
            disabled={disabledFields()}
          />
        </label>
        <label>
          Phone
          <input
            type="text"
            name="phone"
            placeholder="+374 (ХХ) ХХХХХХ"
            value={form.phone}
            onChange={updateField}
            required
            disabled={disabledFields()}
            pattern="\+374 ?\(\d{2}\) ?\d{3} ?\d{3}"
          />
        </label>
        <label>
          City
          <select
            name="city"
            value={form.city}
            onChange={updateField}
            disabled={disabledFields()}
          >
            <option value="">-- select an option --</option>
            {cities.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <button disabled={disabledFields()} type="submit">
          {isUserAdsPage ? "Save" : "Submit"}
        </button>
      </form>
      {modalIsOpen && (
        <Modal
          status={modalStatus()}
          declarationId={declarationId}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          onDelete={() => setEditing(true)}
        />
      )}
    </>
  );
};

export default Form;
