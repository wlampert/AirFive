import React from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import Sidebar from "../components/Profile/Sidebar";
import OffsetGrid from "../components/UI/OffsetGrid";
import Content from "../components/Profile/Content";
import axios from "axios";
import qs from "qs";
import { withCookies } from "react-cookie";
import { callProfileApi } from "../actions/profile";
import styled from "@emotion/styled";
import UploadAvatar from "../components/UploadAvatar";
import Avatar from "../components/UI/Avatar";
import { Form, Input, Button, Checkbox, Upload } from "antd";
const Label = styled("h4")`
  font-size: 1.15rem;
`;
const Info = styled("div")`
  font-size: 1.1rem;
  padding: 0.25rem 0;
`;
const Edit = styled("h4")`
  font-size: 1.1rem;
  padding: 0.25rem 0;
  color: #e71676;
  text-decoration: underline;
`;
const Padder = styled("div")`
  padding: 2rem 0;
`;

const Enlarger = styled("div")`
  & > div {
    width: 80px;
    height: 80px;
  }

  & > div > img {
    vertical-align: middle;
  }
  display: inline-block;
`;

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { username: null, data: null };
    this.callEditProfileApi = this.callEditProfileApi.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.formatter = this.formatter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.callAvatarEdit = this.callAvatarEdit.bind(this);
  }

  componentWillMount() {
    if (this.props.username) {
      callProfileApi(this.props.username, (response) => {
        this.setState({
          address: response.user.address,
          description: response.user.description,
          email: response.user.email,
          name: response.user.name,
          phone_number: response.user.phone_number,
          username: response.user.username,
        });
      });
    }
  }
  onSubmit(values) {
    var key = Object.keys(values)[0];
    var data = values[key];
    this.handleEditProfile(this.props.cookies.cookies.LoginToken, key, data);
  }

  callEditProfileApi(cookie, key, value, callback) {
    const EDITPROFILE_URL = "/experience/v1/profile/update/";
    setTimeout(() => {
      axios({
        method: "post",
        url: EDITPROFILE_URL,
        data: qs.stringify({
          cookie: cookie,
          [key]: value,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((res) => {
        return callback(res.data);
      });
    }, 10);
  }

  callAvatarEdit(cookie, id, callback) {
    const EDITAVATAR_URL = "/experience/v1/profile/avatar/upload/";
    setTimeout(() => {
      axios({
        method: "post",
        url: EDITAVATAR_URL,
        data: qs.stringify({
          cookie: cookie,
          image_id: id,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((res) => {
        return callback(res.data);
      });
    }, 10);
  }

  handleEditProfile(cookie, key, data) {
    this.callEditProfileApi(cookie, key, data, (response) => {
      console.log(response);
    });
  }

  // componentDidMount() {
  //   callProfileApi(this.props.username, (response) => {
  //     this.setState({
  //       address: response.user.address,
  //       description: response.user.description,
  //       email: response.user.email,
  //       name: response.user.name,
  //       phone_number: response.user.phone_number,
  //       username: response.user.username,
  //     });
  //   });
  // }
  componentWi(prevState) {
    if (prevState !== this.state) {
      callProfileApi(this.props.username, (response) => {
        this.setState({
          address: response.user.address,
          description: response.user.description,
          email: response.user.email,
          name: response.user.name,
          phone_number: response.user.phone_number,
          username: response.user.username,
        });
      });
    }
  }

  componentWillUpdate(prevProps) {
    if (prevProps.username !== this.props.username && this.props.username) {
      callProfileApi(this.props.username, (response) => {
        this.setState({
          address: response.user.address,
          description: response.user.description,
          email: response.user.email,
          name: response.user.name,
          phone_number: response.user.phone_number,
          username: response.user.username,
        });
      });
    }
  }

  passInfo(info) {
    this.setState({ image_id: info.response.image_id });
    this.callAvatarEdit(
      this.props.cookies.cookies.LoginToken,
      info.response.image_id,
      (i) => {
        console.log(i);
      }
    );
  }

  formatter(input) {
    if (input == null || input == "") {
      return "None set.";
    } else {
      return input;
    }
  }

  render() {
    return (
      <Layout>
        {this.props.username && (
          <>
            <Padder />
            <OffsetGrid
              left={
                <>
                  <h2>Edit Profile Settings</h2>

                  <div style={{ display: "flex" }}>
                    <Enlarger>
                      <Avatar username={this.props.username} />
                    </Enlarger>
                    <UploadAvatar
                      passInfo={this.passInfo.bind(this)}
                      style={{ display: "inline-block" }}
                    />
                  </div>
                  <br />
                  {[
                    ["Username", this.props.username, "username"],
                    ["Email", this.state.email, "email"],
                    ["Name", this.state.name, "name"],
                    ["Description", this.state.description, "description"],
                    ["City", this.state.address, "address"],
                    ["Phone Number", this.state.phone_number, "phone_number"],
                  ].map((i, item) => (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <Label>{i[0]}</Label>
                          <Info>{this.formatter(i[1])}</Info>
                        </div>
                        {item !== 0 && item !== 1 && (
                          <Form
                            name={i[0]}
                            layout="inline"
                            style={{ paddingTop: "1rem" }}
                            initialValues={{ remember: true }}
                            onFinish={this.onSubmit}
                            // onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                          >
                            <Form.Item name={i[2]}>
                              {i[0] == "Description" ? (
                                <Input.TextArea
                                  style={{ width: "25vw" }}
                                  rows={5}
                                />
                              ) : (
                                <Input />
                              )}
                            </Form.Item>

                            <Form.Item>
                              <Button
                                type="primary"
                                style={{
                                  color: "#E71676",
                                  border: "1px solid #E71676",
                                  background: "transparent",
                                }}
                                htmlType="submit"
                              >
                                Update
                              </Button>
                            </Form.Item>
                          </Form>
                        )}
                        {/* <Edit>Edit</Edit> */}
                      </div>

                      <hr />
                    </>
                  ))}
                </>
              }
              right=""
            />
          </>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.user.username,
    cookies: ownProps.cookies,
  };
};
export default withCookies(connect(mapStateToProps)(EditProfile));
