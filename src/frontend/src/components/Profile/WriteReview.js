import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Modal } from "antd";

import ReviewForm from "./ReviewForm";

const Button = styled(Link)`
  font-weight: 700;
  color: #e71676;
  padding: 0.75rem;
  border: 1px solid #e71676;
  border-radius: 50px;
  transition: 0.3s background-color ease;

  &:hover {
    background-color: #e71676;
    color: #fff;
  }
`;

export default class WriteReview extends React.Component {
  constructor(props) {
    super(props);
  }

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
    const { visible, confirmLoading, ModalText, stars } = this.state;
    return (
      <>
        <Button onClick={this.showModal}>Write Review</Button>

        <Modal
          centered
          visible={visible}
          onOk={this.handleOk}
          footer={null}
          width={600}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <ReviewForm name={this.props.name} username={this.props.username} />
          {/* <p>{this.props.description}</p>
        <p style={{ color: "#7C7C7C" }}>{this.props.date}</p> */}
        </Modal>
      </>
    );
  }
}
