import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserHistory } from "history";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./login.css";
import axios from "axios";
import { Redirect } from "react-router";
import { FormSelect } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Signup(props) {
  const CustomInput = React.forwardRef((props, ref) => {
    return (
      <CustomDatePickDiv style={{ textAlign: "right" }}>
        <label
          onClick={props.onClick}
          ref={ref}
          style={{ width: "94%", textAlign: "left" }}
        >
          {props.value || props.placeholder}
        </label>
        <FontAwesomeIcon icon={faCalendarAlt} onClick={props.onClick} />
      </CustomDatePickDiv>
    );
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [dob, setDOB] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [account_type, setAccountType] = useState("");
  const [state, setStateVal] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [e_username, setUsernameError] = useState("");
  const [e_password, setPasswordError] = useState("");
  const [e_confirm_password, setConfirmPasswordError] = useState("");
  const [e_dob, setDOBError] = useState("");
  const [e_account_number, setAccountNumberError] = useState("");
  const [e_account_type, setAccountTypeError] = useState("");
  const [e_state, setStateError] = useState("");
  const [e_city, setCityError] = useState("");
  const [e_gender, setGenderError] = useState("");
  const [error, setError] = useState("");
  const history = createBrowserHistory({ forceRefresh: true });

  const CustomDatePickDiv = styled.div`
    background-color: white;
    border: solid 0.1em #cbd4c9;
    border-radius: 0.25em;
    padding: 0.3em 1.6em 0 1.6em;
  `;

  function validateForm() {
    let valid = true;
    resetErrors();
    if (username.length < 4) {
      setUsernameError(
        username.length === 0
          ? "Username can't be empty"
          : "Username must have at least 4 characters."
      );
      valid = false;
    }
    let dt = new Date(dob);

    if (isNaN(dt.getTime())) {
      setDOBError("Please select your DOB.");
      valid = false;
    }
    if (gender !== "Male" && gender !== "Female" && gender !== "Other") {
      setGenderError("Please select a Gender.");
      valid = false;
    }
    if (state === "") {
      setStateError("Please select a valid State.");
      valid = false;
    }
    if (city === "") {
      setCityError("Please select a valid City.");
      valid = false;
    }
    if (account_type === "") {
      setAccountTypeError("Please select a valid Account Type.");
      valid = false;
    }
    if (account_number.length < 5) {
      setAccountNumberError(
        account_number.length === 0
          ? "Account Number can't be empty"
          : "Account number must have at least 5 numbers."
      );
    }
    if (password.length < 5) {
      setPasswordError(
        password.length === 0
          ? "Password can't be empty"
          : "Password must have at least 5 characters."
      );
      valid = false;
    }

    if (password !== confirm_password) {
      setConfirmPasswordError("Password and Confirm Password does not match.");
      valid = false;
    }

    return valid;
  }
  let cities = [];

  if (state === "Punjab") {
    cities.push(<option key="Amritsar">Amritsar</option>);
  } else if (state === "Haryana") {
    cities.push(<option key="Gurgaon">Gurgaon</option>);
  } else if (state === "Uttar Pradesh") {
    cities.push(<option key="Meerut">Meerut</option>);
  } else if (state === "Rajasthan") {
    cities.push(<option key="Jaipur">Jaipur</option>);
  }

  function signup() {
    axios
      .get("http://localhost:3010/users?username=" + username.toUpperCase())
      .then((result) => {
        if (result.data.length > 0) {
          setError("A user with the passed username already exists.");
        } else {
          register();
        }
      })
      .catch((error) => setError(error));
  }

  function register() {
    let dt = new Date(dob);
    let date = dt.getDate() + "-" + dt.getMonth() + "-" + dt.getFullYear();

    let data = {
      id: username.toUpperCase(),
      username: username.toUpperCase(),
      dob: date,
      gender: gender,
      account_number: account_number,
      account_type: account_type,
      state: state,
      city: city,
      password: password,
      balance: 0,
    };

    axios
      .post("http://localhost:3010/users", data)
      .then((result) => {
        toast("User added successfully.");
        toast("Please login to continue.");
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch((error) => setError(error));
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      signup();
    }
  }
  function handleChange(event) {
    setGender(event.target.value);
  }

  function reset(event) {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setDOB("");
    setAccountNumber("");
    setAccountType("");
    setStateVal("");
    setCity("");
    setGender("");
    resetErrors();
  }

  function resetErrors() {
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setDOBError("");
    setAccountNumberError("");
    setAccountTypeError("");
    setStateError("");
    setCityError("");
    setGenderError("");
    setError("");
  }

  if (localStorage.getItem("authenticated") === "yes") {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="Login">
        <Form
          style={{ textAlign: "left", fontSize: "0.8rem" }}
          onSubmit={handleSubmit}
        >
          <div className="one">
            <h1>Bank Account Register</h1>
          </div>
          <br />
          <Form.Group size="sm" controlId="username">
            <Form.Control
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <Form.Label style={{ color: "red" }}>{e_username}</Form.Label>
          </Form.Group>

          <Form.Group size="sm" controlId="dob" style={{ marginBottom: "4%" }}>
            <DatePicker
              dateFormat="dd-MM-yyyy"
              selected={dob}
              showMonthDropdown
              showYearDropdown
              placeholderText="DOB"
              value={dob}
              placeHolderTextStyle={{ textAlign: "left", color: "#cc0000" }}
              onChange={(date) => setDOB(date)}
              placeholder="DOB"
              customInput={<CustomInput />}
            />
            <Form.Label style={{ color: "red" }}>{e_dob}</Form.Label>
          </Form.Group>

          <Form.Group size="sm" controlId="gender">
            <div className="radio-buttons">
              <b>Gender:</b> &nbsp;
              <input
                id="Male"
                value="Male"
                name="gender"
                type="radio"
                onChange={handleChange}
              />
              Male &nbsp;
              <input
                id="female"
                value="Female"
                name="gender"
                type="radio"
                onChange={handleChange}
              />
              Female&nbsp;
              <input
                id="other"
                value="Other"
                name="gender"
                type="radio"
                onChange={handleChange}
              />
              Other
            </div>
            <Form.Label style={{ color: "red" }}>{e_gender}</Form.Label>
          </Form.Group>

          <Form.Group size="sm" controlId="account_number">
            <Form.Control
              type="number"
              value={account_number}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Account Number"
            />
            <Form.Label style={{ color: "red" }}>{e_account_number}</Form.Label>
          </Form.Group>

          <Form.Group size="sm" controlId="account_type">
            <FormSelect
              value={account_type}
              placeholder="Account Type"
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="">Account type</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </FormSelect>
            <Form.Label style={{ color: "red" }}>{e_account_type}</Form.Label>
          </Form.Group>

          <Form.Group size="sm" controlId="state">
            <FormSelect
              value={state}
              placeholder="Select State"
              onChange={(e) => setStateVal(e.target.value)}
            >
              <option value="">Select State</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Rajasthan">Rajasthan</option>
            </FormSelect>
            <Form.Label style={{ color: "red" }}>{e_state}</Form.Label>
          </Form.Group>

          <Form.Group size="sm" controlId="city">
            <FormSelect
              value={city}
              id="city"
              placeholder="Select City"
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select City</option>

              {cities}
            </FormSelect>
            <Form.Label style={{ color: "red" }}>{e_city}</Form.Label>
          </Form.Group>

          <Form.Group size="sm" controlId="password">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Form.Label style={{ color: "red" }}>{e_password}</Form.Label>
          </Form.Group>
          <Form.Group size="sm" controlId="confirm_passsord">
            <Form.Control
              type="password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            <Form.Label style={{ color: "red" }}>
              {e_confirm_password}
            </Form.Label>
          </Form.Group>

          <Form.Label style={{ color: "red" }}>{error}</Form.Label>
          <div style={{ textAlign: "center" }}>
            <Button
              block="true"
              size="lg"
              type="submit"
              style={{ marginRight: "4%" }}
            >
              Register
            </Button>
            <Button block="true" size="lg" type="reset" onClick={reset}>
              Reset
            </Button>
            <ToastContainer />
          </div>
        </Form>
      </div>
    );
  }
}
