import React from "react";
import Layout from "../LayoutHome";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import logo from "../../assets/logo.svg";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import {
  setSignupError,
  setSignupPending,
  setSignupSuccess,
  callSignupApi,
} from "../../actions/signup";
import { callLoginApi, setLoggedIn } from "../../actions/loginState";
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

const LogoStyle = {
  height: "2em",
  verticalAlign: "middle",
};
const LogoHolder = {
  padding: "2rem",
  textAlign: "center",
  margin: "0 auto",
};

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailed = this.onSubmitFailed.bind(this);
  }

  onSubmit(values) {
    this.props.dispatch(setSignupPending(true));
    this.props.dispatch(setSignupSuccess(false));
    this.props.dispatch(setSignupError(null));
    callSignupApi(values.username, values.email, values.password, (error) => {
      this.props.dispatch(setSignupPending(false));
      if (!error) {
        this.props.dispatch(setSignupSuccess(true));
        callLoginApi(values.email, values.password, (response) => {
          if (response instanceof Error) {
            console.log(response);
          } else {
            this.props.dispatch(setLoggedIn(true, response.username));
            this.props.cookies.set("LoginToken", response.token, { path: "/" });
          }
        });
      } else {
        this.props.dispatch(setSignupError(error));
      }
    });
  }

  onSubmitFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  render() {
    return (
      <>
        <div style={LogoHolder}>
          <img src={logo} style={LogoStyle} />
        </div>

        <Form
          {...layout}
          name="basic"
          size="large"
          layout="vertical"
          initialValues={{
            remember: false,
          }}
          onFinish={this.onSubmit}
          onFinishFailed={this.onSubmitFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* may implement later if additional time for cookie settings */}
          {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
          {this.props.isSignupPending && <div>Please wait...</div>}
          {this.props.isSignupSuccess && <div>Success.</div>}
          {this.props.signupError && (
            <div>{this.props.signupError.message}</div>
          )}
          <Form.Item style={{ paddingTop: "1rem" }} {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                color: "white",

                border: "none",

                borderRadius: "2px",
                background: "#C634B9",
                boxShadow: "none",
              }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignupPending: state.signup.isSignupPending,
    isSignupSuccess: state.signup.isSignupSuccess,
    signupError: state.signup.signupError,
  };
};

export default withCookies(connect(mapStateToProps)(SignupForm));
