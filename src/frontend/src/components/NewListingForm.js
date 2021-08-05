import React from "react";
import Layout from "./LayoutHome";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import axios from "axios";
import moment from "moment";
import qs from "qs";
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  TimePicker,
  Slider,
  Button,
  Rate,
  Checkbox,
  DatePicker,
  Row,
  Col,
  Input,
} from "antd";
import Upload from "./Upload";
import {
  setListingError,
  setListingPending,
  setListingSuccess,
} from "../actions/listings";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { withCookies } from "react-cookie";

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 0,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 16,
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const CREATELISTING_URL = "/experience/v1/createListing/";

class NewListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image_id: null };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailed = this.onSubmitFailed.bind(this);
    // this.onChange = this.onChange.bind(this);
    // this.onOk = this.onOk.bind(this);
  }

  onSubmit(values) {
    // this.props.dispatch(login(values.username, values.password));

    console.log("The createlisting api is running");
    console.log(JSON.stringify(values));
    this.props.dispatch(setListingPending(true));
    this.props.dispatch(setListingSuccess(false));
    this.props.dispatch(setListingError(null));

    axios({
      method: "post",
      url: CREATELISTING_URL,
      data: qs.stringify({
        title: values.title,
        short_description: values.description,
        long_description: values.long_description,
        date: String(values.date),
        duration: values.duration,
        group_size: values.group_size,
        price: values.price,
        type: values.category,
        cookie: this.props.cookies.get("LoginToken"),
        image_id: this.state.image_id,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((res) => {
      console.log(JSON.stringify(res));
      this.props.dispatch(setListingPending(false));
      if (res.data.created === true) {
        this.props.dispatch(setListingSuccess(true));
      } else {
        this.props.dispatch(
          setListingError("Listing not created. Please upload an image.")
        );
      }
    });
  }

  onSubmitFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  // onChange(value, dateString) {
  //   console.log("Selected Time: ", value);
  //   console.log("Formatted Selected Time: ", dateString);
  // }

  // onOk(value) {
  //   console.log("onOk: ", value);
  // }

  passInfo(info) {
    this.setState({ image_id: info.response.image_id });
  }
  render() {
    return (
      <>
        <h5 style={{ paddingBottom: "1.5rem", paddingTop: "1rem" }}>
          Create a New Listing
        </h5>
        <Form
          {...layout}
          name="basic"
          size="large"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onSubmit}
          onFinishFailed={this.onSubmitFailed}
        >
          <h2 style={{ paddingBottom: "1rem" }}>Host an Event on Airfive</h2>

          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload passInfo={this.passInfo.bind(this)} />
          </Form.Item>

          <h2 style={{ paddingTop: "4rem" }}>Describe Your Event</h2>
          <Form.Item
            label="Title"
            name="title"
            size="large"
            style={{
              display: "inline-block",
              width: "100%",
              marginRight: 8,
            }}
            rules={[
              {
                required: true,
                message: "Please input a title!",
              },
            ]}
          >
            <Input
              style={{
                fontSize: "33px",
                padding: ".5rem 1rem",
                fontWeight: 700,
              }}
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            style={{
              display: "inline-block",
              width: "calc(22% - 5px)",
              marginRight: 8,
            }}
            rules={[
              {
                required: true,
                message: "Please select a category.",
              },
            ]}
          >
            <Select>
              <Select.Option value={0}>Social</Select.Option>
              <Select.Option value={1}>Talk</Select.Option>
              <Select.Option value={2}>Workshop</Select.Option>
              <Select.Option value={3}>Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            style={{
              display: "inline-block",

              marginRight: 8,
            }}
            rules={[
              {
                required: true,
                message: "Please input a price.",
              },
            ]}
          >
            <InputNumber
              defaultValue={1000}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Date and Time"
            name="date"
            style={{
              display: "inline-block",
              marginRight: 8,
            }}
            initialValues={{
              remember: true,
            }}
            rules={[
              {
                required: true,
                message: "Please input a date and time.",
              },
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              // onChange={this.onChange()}
              // onOk={this.onOk()}
            />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            initialValues={{
              remember: true,
            }}
            style={{
              display: "inline-block",
              marginRight: 8,
            }}
          >
            <InputNumber
              defaultValue={1}
              formatter={(value) =>
                `${value} hour`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            label="Max Group Size"
            name="group_size"
            style={{
              display: "inline-block",
              marginRight: 8,
            }}
            rules={[
              {
                required: true,
                message: "Please input a description of the event.",
              },
            ]}
          >
            <InputNumber defaultValue={100} min={0} max={100} />
          </Form.Item>
          <Form.Item
            label="Short Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input a description of the service.",
              },
            ]}
          >
            <Input.TextArea style={{ fontSize: "1.25rem" }} rows={2} />
          </Form.Item>
          <Form.Item
            label="What will the event consist of?"
            name="long_description"
            rules={[
              {
                required: true,
                message: "Please input a description of the event.",
              },
            ]}
          >
            <Input.TextArea rows={10} />
          </Form.Item>

          {this.props.isListingPending && <div>Please wait...</div>}
          {this.props.isListingSuccess && <div>Success.</div>}
          {this.props.listingError && <div>{this.props.listingError}</div>}
          <Form.Item style={{ paddingTop: "1rem" }} {...tailLayout}>
            <Button
              style={{
                color: "white",
                backgroundColor: "black",
                border: "none",
              }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
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

export default withCookies(connect(mapStateToProps)(NewListingForm));
