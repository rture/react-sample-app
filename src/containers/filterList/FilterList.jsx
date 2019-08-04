import { connect } from "react-redux";
import { setFilter } from "../../actions";
import FilterList from "../../components/filterList/FilterList";

const mapStateToProps = (state, ownProps) => ({
  filters:
    ownProps.filter === "accountName"
      ? state.filters.accountNames
      : state.filters.transactionTypes
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: e => dispatch(setFilter(e))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterList);
