import React from "react";
import classNames from "classnames";
import "./style.scss";

const FilterList = ({ filters, title, onChange, ...props}) => (
  <div className={classNames("filter", props.className)}>
    <div className="title">{title}</div>
    {filters &&
      filters.map((filter, key) => (
        <div key={key}>
          <label className="filter-row">
            <input
              type="checkbox"
              name={filter.name}
              checked={filter.selected}
              onChange={onChange}
            />
            {filter.name}
          </label>
        </div>
      ))}
  </div>
);

export default FilterList;
