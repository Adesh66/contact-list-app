import React from "react";
import { FaSearch, FaChevronLeft, FaPlus } from "react-icons/fa";
function Header(props) {
  return (
    <header className={"top-header " + (props.isheaderFixed ? "fixed": "")}>
      <div className="title-sec">
        <button className="btn btn-icon" onClick={props.backButtonHandler}>
          <FaChevronLeft />
        </button>
        <div className="header-title">{props.title}</div>
      </div>
      {!props.isAddOption && <div className="actions">
        <button className="btn btn-icon">
          <FaSearch />
        </button>
        <button className="btn btn-icon">
          <FaPlus />
        </button>
      </div>}
    </header>
  );
}

export default Header;
