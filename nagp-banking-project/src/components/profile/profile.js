import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";

import "../login/login.css";
import { Redirect } from "react-router";
import { connect } from "react-redux";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  componentDidMount() {}

  render() {
    let authenticated = localStorage.getItem("authenticated") !== "yes";
    return (
      <span>
        {authenticated ? (
          <Redirect to="/" />
        ) : (
          <div className="Login">
            <div className="one">
              <h1>My Profile</h1>
            </div>
            <br />
            <br />
            {this.state.user == null ? (
              "Loading..."
            ) : (
              <div>
                <Table
                  className={"table-borderless"}
                  style={{
                    width: "40%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <tbody >
                    <tr style={{ bordered: false }}>
                      <td style={{ textAlign: "left" }}>Name</td>
                      <td style={{ textAlign: "left" }}>
                        {this.state.user.username}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Account Number</td>
                      <td style={{ textAlign: "left" }}>
                        {this.state.user.account_number}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Date of Birth</td>
                      <td style={{ textAlign: "left" }}>
                        {this.state.user.dob}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Address</td>
                      <td style={{ textAlign: "left" }}>
                        {this.state.user.city}, {this.state.user.state}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>State</td>
                      <td style={{ textAlign: "left" }}>
                        {this.state.user.state}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>City</td>
                      <td style={{ textAlign: "left" }}>
                        {this.state.user.city}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Gender</td>
                      <td style={{ textAlign: "left" }}>
                        {this.state.user.gender}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>Account Type</td>
                      <td style={{ textAlign: "left" }}>
                        {this.state.user.account_type}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        )}
      </span>
    );
  }
}

export default connect((state) => ({
  user: state.user.user,
}))(Profile);
