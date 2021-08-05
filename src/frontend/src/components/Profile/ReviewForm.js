import React from "react";
import Layout from "../LayoutHome";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { faStar, farStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  callLoginApi,
  setLoggedIn,
  setLoginError,
  setLoginPending,
  setLoginSuccess,
} from "../../actions/loginState";
import axios from "axios";
import qs from "qs";
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

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stars: 5 };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitFailed = this.onSubmitFailed.bind(this);
    this.callReviewApi = this.callReviewApi.bind(this);
  }

  callReviewApi(description, rating, cookie, username, callback) {
    const REVIEW_URL = "/experience/v1/createReview/";
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    setTimeout(() => {
      axios({
        method: "post",
        url: REVIEW_URL,
        data: qs.stringify({
          cookie: cookie,
          description: description,
          rating: rating,
          profile: username,
          date: date,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((res) => {
        return callback(res.data);
      });
    }, 10);
  }

  onSubmit(values) {
    this.callReviewApi(
      values.description,
      this.state.stars,
      this.props.cookies.cookies.LoginToken,
      this.props.username,
      (i) => {
        window.location.reload();
      }
    );

    // this.props.dispatch(setLoginPending(true));
    // this.props.dispatch(setLoginSuccess(false));
    // this.props.dispatch(setLoginError(null));
    // callLoginApi(values.email, values.password, (response) => {
    //   this.props.dispatch(setLoginPending(false));
    //   if (response instanceof Error) {
    //     this.props.dispatch(setLoginError(response));
    //   } else {
    //     this.props.dispatch(setLoginSuccess(true));
    //     this.props.dispatch(setLoggedIn(true, response.username));
    //     this.props.cookies.set("LoginToken", response.token, { path: "/" });
    //   }
    // });
  }

  updateStars(e) {
    this.setState({
      stars: e + 1,
    });
  }

  onSubmitFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  render() {
    return (
      <>
        <br />
        {this.props.name ? (
          <h3>Leave a Review for {this.props.name}</h3>
        ) : (
          <h3>Leave a Review for {this.props.username}</h3>
        )}
        <br />
        <div style={{ display: "inline-block", paddingRight: ".33rem" }}>
          {[...Array(this.state.stars)].map((i, item) => (
            <FontAwesomeIcon
              className="plus-icon inl-blk fa-lg"
              style={{ color: "#E71676" }}
              icon={faStar}
              onClick={() => this.updateStars(item)}
            />
          ))}
          {this.state.stars < 5 &&
            [...Array(5 - this.state.stars)].map((i, item) => (
              <FontAwesomeIcon
                className="plus-icon inl-blk fa-lg"
                icon={faStar}
                onClick={() => this.updateStars(this.state.stars + item)}
              />
            ))}
        </div>
        <br /> <br />
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
            label={"Tell us about your experience"}
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          {/* may implement later if additional time for cookie settings */}
          {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

          {/* {this.props.isLoginPending && <div>Please wait...</div>}
          {this.props.isLoginSuccess && <div>Success.</div>}
          {this.props.loginError && <div>{this.props.loginError.message}</div>} */}
          <Form.Item style={{ paddingTop: "1rem" }} {...tailLayout}>
            <Button
              style={{
                color: "white",

                border: "none",
                fontWeight: 700,
                borderRadius: "2px",
                background: "#E71676",
                boxShadow: "none",
              }}
              type="primary"
              htmlType="submit"
            >
              Submit Review
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

export default withCookies(connect(mapStateToProps)(ReviewForm));
