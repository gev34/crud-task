//REDUX
import { useSelector } from "react-redux";
import { StateProps } from "../../redux/interface/ReduxStateInterface";
//COMPONENTS
import Form from "../Form/Form";
//CSS
import "./declarations.scss";

const Declarations: React.FC = () => {
  const declerationData = useSelector(
    (state: StateProps) => state.userInfoReducer.declarationData
  );

  return (
    <div className="adsData">
      {declerationData.length ? (
        declerationData.map((declaration) => (
          <Form
            key={declaration.id}
            addedTitle={declaration.title}
            addedText={declaration.adText}
            addedPhone={declaration.phone}
            addedCity={declaration.city}
            declarationId={declaration.id}
          />
        ))
      ) : (
        <h1>You have no ads</h1>
      )}
    </div>
  );
};

export default Declarations;
