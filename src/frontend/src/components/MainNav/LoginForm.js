import React from "react";
import Layout from "../LayoutHome";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import {
  callLoginApi,
  setLoggedIn,
  setLoginError,
  setLoginPending,
  setLoginSuccess,
} from "../../actions/loginState";
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

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailed = this.onSubmitFailed.bind(this);
  }

  onSubmit(values) {
    this.props.dispatch(setLoginPending(true));
    this.props.dispatch(setLoginSuccess(false));
    this.props.dispatch(setLoginError(null));
    callLoginApi(values.email, values.password, (response) => {
      this.props.dispatch(setLoginPending(false));
      if (response instanceof Error) {
        this.props.dispatch(setLoginError(response));
      } else {
        this.props.dispatch(setLoginSuccess(true));
        this.props.dispatch(setLoggedIn(true, response.username));
        this.props.cookies.set("LoginToken", response.token, { path: "/" });
      }
    });
  }

  onSubmitFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  render() {
    return (
      <>
        <h2 style={{ paddingBottom: "1.5rem", paddingTop: "1rem" }}>Login</h2>
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

          {this.props.isLoginPending && <div>Please wait...</div>}
          {this.props.isLoginSuccess && <div>Success.</div>}
          {this.props.loginError && <div>{this.props.loginError.message}</div>}
          <Form.Item style={{ paddingTop: "1rem" }} {...tailLayout}>
            <Button
              style={{
                color: "white",

                border: "none",

                borderRadius: "2px",
                background: "#C634B9",
                boxShadow: "none",
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
    isLoginPending: state.handlingLogin.isLoginPending,
    isLoginSuccess: state.handlingLogin.isLoginSuccess,
    loginError: state.handlingLogin.loginError,
    token: state.user.token,
  };
};

export default withCookies(connect(mapStateToProps)(LoginForm));
