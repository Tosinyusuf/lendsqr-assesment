import React from "react";
import { FilterIcon } from "../icons";

type TableProps = {
  openFilter: () => void;
};

const TableHead = ({ openFilter }: TableProps) => {
  return (
    <div className="tableHead">
      <p>
        Organization
        <button onClick={() => openFilter()}>
          <FilterIcon />
        </button>
      </p>
      <p>
        Username
        <button onClick={() => openFilter()}>
          <FilterIcon />
        </button>
      </p>
      <p>
        Email
        <button onClick={() => openFilter()}>
          <FilterIcon />
        </button>
      </p>
      <p>
        Phone Number
        <button onClick={() => openFilter()}>
          <FilterIcon />
        </button>
      </p>
      <p>
        Date joined
        <button onClick={() => openFilter()}>
          <FilterIcon />
        </button>
      </p>
      <p>
        Status
        <button onClick={() => openFilter()}>
          <FilterIcon />
        </button>
      </p>
    </div>
  );
};

export default TableHead;
