import React, { Component } from "react";
import axios from "axios";
import Head from "../NodalOffComponents/Head";
import "./style/active.css";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import SideNavBar from "../NodalOffComponents/SideNavBar";
import DeptHead from "./DeptHead";
import { Input, InputGroupText, InputGroupAddon, InputGroup } from "reactstrap";

class Active extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activecases: [],
      value: "",
      actid: null,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleAct = this.handleAct.bind(this);
  }

  handleSearch(val) {
    axios
      .post("https://indiancourt.azurewebsites.net/search/" + this.props.location.state.dept, {
        query: val,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          activecases: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  handleChange = async (e) => {
    this.handleSearch(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  componentDidMount() {
    axios
      .get(
        "https://indiancourt.azurewebsites.net/department/users/cases/active/" +
          this.props.location.state.dept
      )
      .then((res) => {
        this.setState({
          activecases: res.data,
        });
      });
  }

  handleAct(id) {
    this.setState({
      actid: id,
    });
  }

  render() {
    if (this.state.actid) {
      this.props.history.push({
        pathname: "/" + localStorage.getItem("deptId") + "/casepg",
        state: { info: this.state.actid },
      });
    }
    const act = this.state.activecases.map((active) => {
      return (
        <div className="row">
          <div className="col-12 col-xl-4">
            <div
              className="card act1"
              onClick={() => this.handleAct(active._id)}
            >
              <p className="card-title act2">{active.name}</p>
              <div className="card-body act3">
                <div>
                  <p className="act4">Type : {active.type}</p>
                </div>

                <div className="row" style={{marginLeft:'0vh'}}>
                  <p style={{wordSpacing:'4px'}} className="act4"> Facts : </p>
                  <span className="fact">{active.facts.substring(0, 70)} ...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    console.log(this.state.activecases);
    return (
      <div>
        <DeptHead name="Active Cases" />

        <div className="act8">
          <InputGroup className="actssearch-label">
            <Input
              className="ssearchinp"
              value={this.state.value}
              name="search-input"
              placeholder="Search..."
              onChange={(e) => this.handleChange(e)}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText style={{ width: "40px",marginTop:'-6.1vh',height:'5.2vh',boxShadow:'0px 0px 1px 1px rgb(220,220,220)' }}>
                <i className="fa fa-search search-icon" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <div className="row">{act}</div>{" "}
        </div>
      </div>
    );
  }
}

export default Active;