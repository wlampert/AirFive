import React from "react";
import Layout from "../components/Layout";
import Button from "../components/UI/Button";
export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <div style={{ padding: "10rem 0 10rem 0" }}>
          <h3> 404 Page Not Found</h3>
          <br></br>
          <h1 style={{ paddingBottom: "2rem" }}>
            Woah there, looks like you ended up in the wrong neck of the woods.
          </h1>
          <Button to="/">Take me Home</Button>
        </div>
      </Layout>
    );
  }
}
