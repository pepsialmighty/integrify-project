export const initialState = {
  userData: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER_INFO':
      return {
        ...state,
        userData: [action.userInfo],
      };

    default:
      return state;
  }
};

export default reducer;
