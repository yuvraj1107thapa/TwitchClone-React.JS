import Streams from "../API/Streams";
import history from "../history";

export const signIn = (userid) => {
  return {
    type: "SIGN_IN",
    payload: userid,
  };
};

export const signOut = (userid) => {
  return {
    type: "SIGN_OUT",
    payload: userid,
  };
};

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await Streams.post("/streams", { ...formValues, userId });
    dispatch({
      type: "CREATE_STREAM",
      payload: response.data,
    });
    history.push("/");
  };
};

export const fetchStream = (id) => {
  return async (dispatch) => {
    const response = await Streams.get(`/streams/${id}`);
    dispatch({
      type: "FETCH_STREAM",
      payload: response.data,
    });
  };
};

export const fetchStreams = () => {
  return async (dispatch) => {
    const response = await Streams.get("/streams");
    dispatch({
      type: "FETCH_STREAMS",
      payload: response.data,
    });
  };
};

export const editStream = (id, formValues) => {
  return async (dispatch) => {
    const response = await Streams.patch(`/streams/${id}`, formValues);
    dispatch({
      type: "EDIT_STREAM",
      payload: response.data,
    });
    history.push("/");
  };
};

export const deleteStream = (id) => {
  return async (dispatch) => {
    await Streams.delete(`/streams/${id}`);
    dispatch({
      type: "DELETE_STREAM",
      payload: id,
    });
    history.push("/");
  };
};
