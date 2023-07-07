//COMPONENTS
import Form from "../../Form/Form";
//CSS
import "./newAd.scss";

const NewAd: React.FC = () => {
  return (
    <div className="newAdContainer">
      <div className="newAd">New Ad</div>
      <Form />
    </div>
  );
};

export default NewAd;
