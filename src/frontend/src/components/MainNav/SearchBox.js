import React from "react";
import { Input } from "antd";
import { withRouter } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

// garrett implement an emotion class of alternate and pass it as a className to Search

// const Alternate = {
//   width: 400,
//   border: "1px solid rgba(255,255,255,0.5)",
//   height: "55px",
//   borderRadius: "5px",
//   backgroundColor: "transparent",
//   color: "#fff",
//   padding: "0 1rem",
// };

const { Search } = Input;

const Basic = ({ className, onSearch, placeholder, size }) => (
  <Search
    size={size}
    placeholder={placeholder}
    onSearch={onSearch}
    className={className}
  />
);

const Alternate = styled(Basic)`
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: 55px;
  border-radius: 5px;
  background-color: transparent;
  color: #fff;
  padding: 0 1rem;
  width: 400;
  margin: 0 7.5rem 0 1rem;
  & span {
    margin-top: 0.5rem;
    color: #fff;
  }
  & input {
    background: transparent;
    width: 400;
    color: #fff;
  }
`;

const Normal = styled(Basic)`
  border: 1px solid #efefef;
  height: 55px;
  border-radius: 5px;
  background-color: #fff;
  color: #fff;
  padding: 0 1rem;
  width: 400;
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.2);
  margin: 0 7.5rem 0 1rem;
  & span {
    margin-top: 0.5rem;
    color: #000;
  }
  & input {
    width: 400;
    color: #000;
  }
`;

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(query) {
    console.log("QUERY: " + query);
    this.props.history.push("/search?q=" + query);
  }

  render() {
    return (
      <>
        {this.props.alternate ? (
          <Alternate
            placeholder="Search"
            onSearch={(query) => this.handleSearch(query)}
            size="large"
          />
        ) : (
          <Normal
            placeholder="Search"
            onSearch={(query) => this.handleSearch(query)}
            size="large"
          />
        )}
      </>
    );
  }
}

export default withRouter(SearchBox);
