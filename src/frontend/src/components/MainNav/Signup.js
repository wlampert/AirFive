import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
// import Button from "./UI/Button";
import { Modal, Button } from "antd";
import SignupForm from "./SignupForm";

const Alternate = {
  backgroundColor: "#fff",
  border: "1px solid #fff",
  color: "#DA1677",
  padding: "0 2rem",
  height: "42px",
  boxShadow: "0 1px 3px rgba(50, 50, 93, 0.2)",
  borderRadius: "20px",
};
const Normal = {
  background: "rgb(254,54,65)",
  background:
    "linear-gradient(90deg, rgba(254,54,65,1) 0%, rgba(254,54,145,1) 100%)",
  border: "1px solid rgb(254,54,65)",
  color: "#fff",
  padding: "0 2rem",
  height: "42px",
  boxShadow: "0 1px 3px rgba(50, 50, 93, 0.2)",
  borderRadius: "20px",
};

export default class Signup extends React.Component {
  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <>
        <Button
          style={this.props.alternate ? Alternate : Normal}
          onClick={this.showModal}
        >
          Sign Up
        </Button>

        <Modal
          centered
          visible={visible}
          onOk={this.handleOk}
          footer={null}
          width={420}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <SignupForm />
          {/* <p>Already have an account? Log in</p> */}
        </Modal>
      </>
    );
  }
}
