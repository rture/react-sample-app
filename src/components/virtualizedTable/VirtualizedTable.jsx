import React from "react";
import { Table, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";

const VirtualizedTable = ({ rows, ...props }) => (
  <AutoSizer disableHeight>
    {({ width }) => (
      <Table width={width} rowGetter={({ index }) => rows[index]} {...props} />
    )}
  </AutoSizer>
);

export default VirtualizedTable;
