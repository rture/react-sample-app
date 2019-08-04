import React, { Component } from "react";
import { Column } from "react-virtualized";
import VirtualizedTable from "../../components/virtualizedTable/VirtualizedTable";
import Paginator from "../../components/paginator/Paginator";
import { transactions as allTransactions } from "../../data.json";
import { Link } from "react-router-dom";
import FilterList from "../filterList/FilterList";
import { initFilters, reset, setPage, scroll, reload } from "../../actions";
import { connect } from "react-redux";
import "./style.scss";

const ITEMS_PER_PAGE = 30;
const HEADER_HEIGHT = 30;
const ROW_HEIGHT = 40;
const TABLE_HEIGHT = ROW_HEIGHT * ITEMS_PER_PAGE + HEADER_HEIGHT;
// keeping data in the local instead of redux state for performance reasons
// Promise is NOT in use because of the data is static source
let _dataSource = [...allTransactions];

class Transactions extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(
      initFilters({
        accountNames: this.defaultFilters("accountName"),
        transactionTypes: this.defaultFilters("transactionType"),
        rowCount: allTransactions.length
      })
    );
  }

  componentWillReceiveProps() {
    this.updateFilteredTransactions();
  }

  updateFilteredTransactions = () => {
    const accountNameFilters = this.getActiveFilters("accountNames");
    const transactionTypeFilters = this.getActiveFilters("transactionTypes");
    let data = [...allTransactions];
    if (accountNameFilters.length > 0) {
      data = data.filter(item => accountNameFilters.includes(item.accountName));
    }
    if (transactionTypeFilters.length > 0) {
      data = data.filter(item =>
        transactionTypeFilters.includes(item.transactionType)
      );
    }
    _dataSource = data;
    const { dispatch } = this.props;
    dispatch(reload());
  };

  defaultFilters = (attributeName) => {
    return allTransactions
      .map(item => item[attributeName])
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(item => ({ name: item, selected: false }))
      .sort((a, b) => (a.name > b.name ? 1 : -1));
  };

  getActiveFilters = (filterPropName) => {
    return (
      (this.props[filterPropName] &&
        this.props[filterPropName]
          .filter(item => item.selected === true)
          .map(item => item.name)) ||
      []
    );
  };

  handleRowsScroll = ({ stopIndex }) => {
    const { dispatch } = this.props;
    dispatch(scroll(stopIndex));
  };

  handlePageChange = page => {
    const { dispatch } = this.props;
    dispatch(setPage(page));
  };

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    return (
      <Link
        className="link"
        to={`/transaction/${allTransactions[rowIndex].account}`}
      >
        <u>{allTransactions[rowIndex].account}</u>
      </Link>
    );
  };

  reset = () => {
    const { dispatch } = this.props;
    dispatch(reset());
  };

  render() {
    const rowCount = _dataSource.length;
    const pageCount = Math.ceil(rowCount / ITEMS_PER_PAGE);
    const rowGetter = ({ index }) => _dataSource[index];

    return (
      <>
        <h2>My transactions</h2>
        <hr />
        <div className="grid-container">
          <div>
            <FilterList filter="accountName" title="Account Name" />
            <br />
            <FilterList filter="transaction" title="Transaction Type" />
            <br />
            <button onClick={this.reset}>Reset</button>
          </div>
          <div>
            <Paginator
              pageCount={pageCount}
              currentPage={this.props.page}
              onPageChange={this.handlePageChange}
            />
            <VirtualizedTable
              rowHeight={ROW_HEIGHT}
              headerHeight={HEADER_HEIGHT}
              height={TABLE_HEIGHT}
              rowClassName="row"
              rowCount={rowCount}
              rowGetter={rowGetter}
              onRowsRendered={this.handleRowsScroll}
              scrollToIndex={this.props.scrollToIndex}
              scrollToAlignment="start"
            >
              <Column
                label="Account"
                dataKey="account"
                width={100}
                cellRenderer={this.cellRenderer}
              />
              <Column label="account Name" dataKey="accountName" width={250} />
              <Column label="currency" dataKey="currencyCode" width={100} />
              <Column label="amount" dataKey="amount" width={100} />
              <Column
                label="transaction type"
                className="row-column"
                dataKey="transactionType"
                width={200}
              />
            </VirtualizedTable>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  accountNames: state.filters.accountNames,
  transactionTypes: state.filters.transactionTypes,
  page: state.filters.page,
  scrollToIndex: state.filters.scrollToIndex
});

export default connect(mapStateToProps)(Transactions);
