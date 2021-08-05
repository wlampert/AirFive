import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
// import Button from "./UI/Button";
import { Modal, Button } from "antd";
import LoginForm from "./LoginForm";

const Alternate = {
  backgroundColor: "transparent",
  border: "1px solid #fff",
  color: "#fff",
  padding: "0 2rem",
  height: "42px",

  borderRadius: "20px",
};

const Normal = {
  backgroundColor: "#fff",
  border: "1px solid #fff",
  color: "#DA1677",
  padding: "0 2rem",
  height: "42px",
  boxShadow: "0 1px 3px rgba(50, 50, 93, 0.2)",
  borderRadius: "20px",
};

export default class Login extends React.Component {
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
          Login
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
          <LoginForm />
        </Modal>
      </>
    );
  }
}
