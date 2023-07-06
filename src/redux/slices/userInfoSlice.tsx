import { v4 as uuidv4 } from "uuid";

const initialState = {
  declarationData: [],
};
interface userInfoActionProps {
  type: string;
  declaration: {
    declarationTitle: string;
    declarationText: string;
    userPhone: string;
    userCity: string;
    declarationId?: string;
  };
}
export const userInfoSlice = (
  state = initialState,
  action: userInfoActionProps
) => {
  switch (action.type) {
    case "ADD_NEW_DECLARATION":
      return {
        ...state,
        declarationData: [...state.declarationData, action.declaration],
      };
    case "EDIT_DECLARATION":
      return {
        ...state,
        declarationData: state.declarationData.map(
          (declaration: {
            title: string;
            phone: string;
            city: string;
            adText: string;
            id: string | undefined;
          }) =>
            declaration.id === action.declaration.declarationId
              ? action.declaration
              : declaration
        ),
      };
      // case "DELETE_DECLARATION":
      //   return {
      //     ...state,
      //     declarationData:state.declarationData.filter((declaration: {
      //       title: string;
      //       phone: string;
      //       city: string;
      //       adText: string;
      //       id: string | undefined;
      //     }) => {
      //       declaration.id !== action.declaration.declarationId
      //     })
      //   }
    default:
      return state;
  }
};

export const newDeclararionAction = (declaration: object) => {
  return {
    type: "ADD_NEW_DECLARATION",
    declaration: {
      ...declaration,
      id: uuidv4(),
    },
  };
};
export const editAdAction = (declaration: {
  title: string;
  phone: string;
  city: string;
  adText: string;
  id: string | undefined;
}) => {
  return {
    type: "EDIT_DECLARATION",
    declaration: {
      ...declaration,
      declarationId: declaration.id,
    },
  };
};
export const deleteAdAction = (declarationId:string) => {
  return {
    type: "DELETE_DECLARATION",
    declarationId
  };
};

