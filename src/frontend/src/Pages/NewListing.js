import React from "react";
import NewListingForm from "../components/NewListingForm";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import OffsetGrid from "../components/UI/OffsetGrid";
class NewListing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <Layout>
        <div style={{ padding: "0 0 10rem 0" }}>
          {this.props.listingCompleted ? (
            <>
              <h1> Thanks!</h1>
              <h2>Your listing has been created.</h2>
            </>
          ) : (
            <OffsetGrid left={<NewListingForm />} right="" />
          )}
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    cookies: ownProps.cookies,
    listingCompleted: state.handlingListings.isListingSuccess,
  };
};

export default connect(mapStateToProps)(NewListing);
