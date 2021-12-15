import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Table } from "react-bootstrap";

import "../login/login.css";
import axios from "axios";
import { Redirect } from "react-router";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";

class Transact extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      transactionType: "",
      amount: 0,
      decsription:"",
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.transact = this.transact.bind(this);
  }

  // will update this everytime as we might need the updated balance.
  componentDidMount() {
    axios
      .get(
        "http://localhost:3010/users?username=" +
          localStorage.getItem("username").toUpperCase()
      )
      .then((result) => {
        this.setState({ user: result.data[0] });
      })
      .catch((error) => console.log(error));
  }

  handleChange(event) {
    console.log(event.target.value);

    if (this.state.user.balance < 10000 && event.target.value === "Withdrawal") {
      this.setState({
        ...this.state,
        transactionType: event.target.value,
        error: "Not allowed: Balance is less than 10000",
      });
    } else {
      this.setState({
        ...this.state,
        transactionType: event.target.value,
        error: "",
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  transact(event) {
    if (this.state.transactionType === "") {
      this.setState({
        ...this.state,
        error: "Please select a transaction type.",
      });
      return;
    } else {
      this.setState({
        ...this.state,
        error: "",
      });
    }
    if (this.state.description === "") {
      this.setState({
        ...this.state,
        error: "Description can't be empty.",
      });
      return;
    } else {
      this.setState({
        ...this.state,
        error: "",
      });
    }
    if (
      this.state.user.balance < 10000 &&
      this.state.transactionType === "Withdrawal"
    ) {
      this.setState({
        ...this.state,
        error: "Not allowed: Balance is less than 10000",
      });
      return;
    } else {
      this.setState({
        ...this.state,
        error: "",
      });
    }

    if (this.state.amount <= 0) {
      this.setState({
        ...this.state,
        error: "Amount must be greater than 0.",
      });
      return;
    } else {
      this.setState({
        ...this.state,
        error: "",
      });
    }

    if (
      this.state.amount > this.state.user.balance &&
      this.state.transactionType === "Withdrawal"
    ) {
      this.setState({
        ...this.state,
        error: "Insufficient balance to complete the request.",
      });
      return;
    } else {
      this.setState({
        ...this.state,
        error: "",
      });
    }
    let balance =
      this.state.transactionType === "Deposit"
        ? this.state.user.balance + parseInt(this.state.amount)
        : this.state.user.balance - this.state.amount;
    let data = {
      id: this.state.user.username,
      username: this.state.user.username,
      dob: this.state.user.dob,
      gender: this.state.user.gender,
      account_number: this.state.user.account_number,
      account_type: this.state.user.account_type,
      state: this.state.user.state,
      city: this.state.user.city,
      password: this.state.user.password,
      balance: balance,
    };

    // update the balance in json-server
    axios
      .put("http://localhost:3010/users/" + this.state.user.username, data)
      .then((result) => {
        this.addTransaction();
        if (this.state.transactionType === "Withdrawal") {
          toast("Withdrawal operation complete.");
        } else if (this.state.transactionType === "Deposit") {
          toast("Deposit operation complete.");
        }
        this.setState({
          ...this.state,
          user: result.data,
        });
      })
      .catch((error) => console.log(error));
  }

  addTransaction(){
    let date = new Date();
    let transactionData = {
      username: this.state.user.username,
      transactionType: this.state.transactionType,
      amount: this.state.amount,
      date: date.getDay()+"-"+date.getMonth()+"-"+date.getFullYear(),
      description:this.state.description,

    };
    axios
      .post("http://localhost:3010/transactions", transactionData)
      .then((result) => {
        
      })
      .catch((error) => console.log(error));
  }
  componentDidUpdate() {}

  render() {
    let authenticated = localStorage.getItem("authenticated") !== "yes";

    return (
      <span>
        {authenticated ? (
          <Redirect to="/" />
        ) : (
          <div>
            <div className="Login">
              <div
                className="one"
                style={{ border: "black 2px solid",  display: "inline-block" }}
              >
                <h1 style={{ margin: "20px" }}>
                  <b>Withdraw/Deposit</b>
                </h1>
              </div>
              <br />
              <br />
            </div>
            {this.state.user == null ? (
              "Loading..."
            ) : (
              <Form
                style={{ textAlign: "left", fontSize: "0.8rem" }}
                onSubmit={this.handleSubmit}
              >
                <div
                  style={{
                    border: "black 2px solid",
                    marginLeft: "20%",
                    marginRight: "20%",
                    borderRadius:50
                  }}
                >
                  <Table
                    className={"table-borderless"}
                    style={{
                      width: "80%",
                      margin: "20px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <tbody>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ textAlign: "left" }}>
                          Select Transaction Type
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <Form.Group size="sm" controlId="gender">
                            <div className="radio-buttons">
                              <input
                                id="Withdrawal"
                                value="Withdrawal"
                                name="transact"
                                type="radio"
                                onChange={this.handleChange}
                              />
                              <b>Withdrawal</b> &nbsp;
                              <br />
                              <br />
                              <input
                                id="Deposit"
                                value="Deposit"
                                name="transact"
                                type="radio"
                                onChange={this.handleChange}
                              />
                              <b>Deposit</b> &nbsp;
                            </div>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ textAlign: "left" }}>Current Balance</td>
                        <td style={{ textAlign: "left" }}>
                          &#8377;{" "}
                          <Form.Label style={{ color: "black" }}>
                            <b>{this.state.user.balance}</b>
                          </Form.Label>
                        </td>
                      </tr>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ textAlign: "left" }}>
                          Description
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <Form.Group size="sm" controlId="account_number">
                          <Form.Control as="textarea" rows={3} 
                          onChange={(e) =>
                            this.setState({
                              ...this.state,
                              description: e.target.value,
                            })
                          }
                          placeholder="Description"/>
                            
                            <Form.Label style={{ color: "red" }}>
                              {this.state.error}
                            </Form.Label>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr style={{ verticalAlign: "middle" }}>
                        <td style={{ textAlign: "left" }}>
                          Transaction Amount
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <Form.Group size="sm" controlId="account_number">
                            <Form.Control
                              type="number"
                              onChange={(e) =>
                                this.setState({
                                  ...this.state,
                                  amount: e.target.value,
                                })
                              }
                              placeholder="Amount in Rupees"
                            />
                            <Form.Label style={{ color: "red" }}>
                              {this.state.error}
                            </Form.Label>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td style={{ textAlign: "right" }}>
                          <Button
                            block="true"
                            size="md"
                            type="button"
                            style={{ marginRight: "10%" }}
                            onClick={this.transact}
                          >
                            Submit
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Form>
            )}
          </div>
        )}
        <ToastContainer />
      </span>
    );
  }
}
export default Transact;
