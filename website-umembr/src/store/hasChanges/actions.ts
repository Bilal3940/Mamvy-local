export const TOGGLE_HAS_CHANGES = "TOGGLE_HAS_CHANGES";
export const SET_HAS_CHANGES = "SET_HAS_CHANGES";

export const toggleHasChanges = () => ({
  type: TOGGLE_HAS_CHANGES,
});

export const setHasChanges = (value:any) => ({
  type: SET_HAS_CHANGES,
  payload: value,
});
