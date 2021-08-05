import React from "react";
import Layout from "./LayoutHome";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import axios from "axios";
import qs from "qs";
import styled from "@emotion/styled";
import { Form, InputNumber, Button, Input } from "antd";
// import {
//   setListingError,
//   setListingPending,
//   setListingSuccess,
// } from "../actions/listings";
// import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { withCookies } from "react-cookie";

const Padder = styled("div")`
  padding: 2rem 0;
`;

// const layout = {
//   labelCol: {
//     span: 0,
//   },
//   wrapperCol: {
//     span: 0,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 0,
//     span: 16,
//   },
// };

const CREATELISTING_URL = "/experience/v1/createListing/";

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image_id: null };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailed = this.onSubmitFailed.bind(this);
  }

  onSubmit(values) {
    // this.props.dispatch(login(values.username, values.password));

    console.log("Booked.. sort of");
    // this.props.dispatch(setListingPending(true));
    // this.props.dispatch(setListingSuccess(false));
    // this.props.dispatch(setListingError(null));

    // axios({
    //   method: "post",
    //   url: CREATELISTING_URL,
    //   data: qs.stringify({
    //     title: values.title,
    //     short_description: values.description,
    //     long_description: values.long_description,
    //     date: values.date,
    //     duration: values.duration,
    //     group_size: values.group_size,
    //     price: values.price,
    //     type: values.category,
    //     cookie: this.props.cookies.get("LoginToken"),
    //     image_id: this.state.image_id,
    //   }),
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    //   },
    // }).then((res) => {
    //   this.props.dispatch(setListingPending(false));
    //   if (res.data.created === true) {
    //     this.props.dispatch(setListingSuccess(true));
    //   } else {
    //     this.props.dispatch(
    //       setListingError("Listing not created. Please upload an image.")
    //     );
    //   }
    // });
  }

  onSubmitFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  render() {
    return (
      <Padder>
        <Form
          name="basic"
          size="large"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onSubmit}
          onFinishFailed={this.onSubmitFailed}
        >
          <Form.Item
            name="price"
            initialValues={{
              remember: true,
            }}
            style={{
              display: "block",
              width: "100%",
              marginRight: 8,
            }}
          >
            <InputNumber
              default={1}
              size="medium"
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value} adults`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          {/*     
          {this.props.isListingPending && <div>Please wait...</div>}
          {this.props.isListingSuccess && <div>Success.</div>}
          {this.props.listingError && <div>{this.props.listingError}</div>} */}
          <Form.Item style={{ paddingTop: ".25rem" }}>
            <Button
              style={{
                color: "white",
                height: "60px",
                width: "100%",
                fontWeight: "700",
                backgroundColor: "#E71676",
                border: "none",
                borderRadius: "50px",
              }}
              type="primary"
              htmlType="submit"
            >
              Book Now
            </Button>
          </Form.Item>
        </Form>
      </Padder>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isListingPending: state.handlingListings.isListingPending,
    isListingSuccess: state.handlingListings.isListingSuccess,
    listingError: state.handlingListings.listingError,
  };
};

export default withCookies(connect(mapStateToProps)(BookingForm));
