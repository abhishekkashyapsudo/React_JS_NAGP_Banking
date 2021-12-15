import axios from "axios";
import { connect } from "react-redux";
import Home from "../home/home";

const mapStateToProps = (state) => {
  let data = {
    user: state.user,
  };
  return data;
};

const getUserFromDB = () => (dispatch, getState) => {
  axios
    .get(
      "http://localhost:3010/users?username=" +
        localStorage.getItem("username").toUpperCase()
    )
    .then((data) => {
      dispatch({ type: "SET_USER", payload: data.data[0] });
    });
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () =>
    dispatch({
      type: "LOG_OUT",
    }),
  setUser: () => dispatch(getUserFromDB()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
