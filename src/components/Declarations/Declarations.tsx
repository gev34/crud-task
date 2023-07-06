//REDUX
import { useSelector } from "react-redux";
import { StateProps } from "../../redux/interface/ReduxStateInterface";
//COMPONENTS
import Form from "../Form/Form";
//CSS
import "./declarations.css";

const Declarations: React.FC = () => {
  const declerationData = useSelector(
    (state: StateProps) => state.userInfoReducer.declarationData
  );

  return (
    <div className="adsData">
      {declerationData.map((declaration, index) => (
        <Form
          key={index}
          addedTitle={declaration.title}
          addedText={declaration.adText}
          addedPhone={declaration.phone}
          addedCity={declaration.city}
          declarationId={declaration.id}
        />
      ))}
    </div>
  );
};
export default Declarations;
