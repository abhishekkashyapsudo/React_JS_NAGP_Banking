import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl, InputGroup, Table } from "react-bootstrap";
import "../login/login.css";
import { Redirect } from "react-router";
import Paper from "@material-ui/core/Paper";

import {
  Grid,
  VirtualTable,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch, faShare } from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      columns: [
        { name: "transactionType", title: "Transaction Type" },
        { name: "amount", title: "Transaction Amount" },
        { name: "date", title: "Transaction Date" },
        { name: "description", title: "Description" },
      ],
      rows: [],
      search: null,
    };
  }

  componentDidMount() {
    this.props.setUser();
    this.updateSearchValue("");
  }

  updateSearchValue(value) {
    if (this.state.search !== value) {
      axios
        .get(
          "http://localhost:3010/transactions?username=" +
            localStorage.getItem("username").toUpperCase() +
            "&description_like=" +
            value
        )
        .then((result) => {
          console.log(result.data);
          this.setState({
            ...this.state,
            rows: result.data,
            search: value,
          });
        })
        .catch((error) => console.log(error));
    }
  }

  componentDidUpdate() {
    this.user = this.props.user.user;
    if (this.state.user && this.state.user.username == null) {
      this.setState({
        ...this.state,
        user: this.user,
      });
    }
  }

  render() {
    let authenticated = localStorage.getItem("authenticated") !== "yes";

    return (
      <span>
        {authenticated ? (
          <Redirect to="/" />
        ) : (
          <div>
            <div></div>
            <br />
            <br />
            <Table style={{ width: "98%" }}>
              <tbody>
                <td style={{ width: "30%" }}>
                  <div
                    
                    style={{
                      border: "black 1px solid",
                      display: "inline-block",
                      marginTop:'25%',
                      marginBottom:'25%',
                      width:'80%'
                    }}
                  >
                    <h4 style={{float:'left'}}>
                      <b>Current balance</b>
                    </h4>
                    <br/>
                    <br/>
                    <br/>
                    <h4 style={{float:'center'}}>&#8377;{this.state.user.balance}</h4>
                    <span style={{float:'right'}}><FontAwesomeIcon icon={faShare} /></span>
                  </div>
                </td>
                <td style={{ width: "68%" , border:'1px solid black', marginRight:'2%'}}>
                  <div>
                    <u style={{ marginLeft: "20%", fontWeight: "bold" }}>
                      My Transactions
                    </u>
                    <span
                      style={{
                        textAlign: "right",
                        marginLeft: "30%",
                        display: "inline-block",
                      }}
                    >
                      <Form.Group>
                        <InputGroup>
                          <span
                            style={{
                              marginTop: "2%",
                              marginRight: "-10%",
                              zIndex: 999,
                            }}
                          >
                            <FontAwesomeIcon icon={faSearch} />
                          </span>
                          <FormControl
                            style={{
                              borderRadius: 50,
                              width: "300px",
                              paddingLeft: "13%",
                            }}
                            type="text"
                            placeholder="Search transactions by Description"
                            onChange={(e) =>
                              this.updateSearchValue(e.target.value)
                            }
                            className="login-input"
                          />
                        </InputGroup>
                      </Form.Group>
                    </span>

                    <Paper style={{ marginTop: 10 }}>
                      <Grid
                        rows={this.state.rows}
                        columns={this.state.columns}
                        getRowId={(row) => row.id}
                      >
                        <VirtualTable height={310}/>
                        <b>
                          <TableHeaderRow />
                        </b>
                      </Grid>
                    </Paper>
                  </div>
                </td>
              </tbody>
            </Table>
          </div>
        )}
      </span>
    );
  }
}

export default Home;
