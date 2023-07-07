const initialState = {
  isUserAdsPage: false,
};
interface userPostsActionProps {
  type: string;
  isUserAdsPage: boolean;
}

export const userPostsSlice = (
  state = initialState,
  action: userPostsActionProps
) => {
  switch (action.type) {
    case "USER_POSTS_PAGE":
      return {
        ...state,
        isUserAdsPage: action.isUserAdsPage,
      };
    default:
      return state;
  }
};

export const userPostsPageAction = (isUserAdsPage: boolean) => {
  return {
    type: "USER_POSTS_PAGE",
    isUserAdsPage,
  };
};
