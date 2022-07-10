import React, { useState } from "react";
import logo from "../../imgs/logo.png";
import SearchBox from "./SearchBox";

const Banner = () => {
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);

  const showSearchBox = (event) => {
    setIsSearchBoxVisible(true);
  };

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part" onClick={showSearchBox}>
            A place to get
          </span>
          {isSearchBoxVisible && <SearchBox />}
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
