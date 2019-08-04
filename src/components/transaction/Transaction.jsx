import React from "react";
import {transactions} from "../../data.json";
import classNames from "classnames";

const Transaction = props => {
  const { params } = props.match;
  const selectedTransaction = (transactions || []).find(item => item.account === params.id);
  return (
    <div className={classNames(props.className)}>
      <h3>Transaction {params.id}</h3>
      <hr />
      <p>
        <span className="title">Account No.:</span>
        {selectedTransaction.account}
      </p>
      <p>
        <span className="title">Account Name:</span>
        {selectedTransaction.accountName}
      </p>
      <p>
        <span className="title">Currency Code:</span>
        {selectedTransaction.currencyCode}
      </p>
      <p>
        <span className="title">Amount:</span>
        {selectedTransaction.amount}
      </p>
      <p>
        <span className="title">Transaction Type:</span>
        {selectedTransaction.transactionType}
      </p>
    </div>
  );
};
export default Transaction;
