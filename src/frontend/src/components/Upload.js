import React from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./uploader.css";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.props.passInfo(info.file);

      this.setState({
        imageUrl: info.file.response.link,
        loading: false,
      });
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload a Cover Image</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="image"
        listType="picture-card"
        className="cover-uploader"
        showUploadList={false}
        action="/experience/v1/uploadImage/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
