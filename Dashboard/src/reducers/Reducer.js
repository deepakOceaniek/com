export const initialState = null;
export const reducer = (state, action) => {
  if (action.type === "PHARMACY") {
    return action.payload;
  }
  return state;
};
