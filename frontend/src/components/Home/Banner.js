import React from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";

const Banner = (props) => {
  
  const onSearchChange = (e) => {
    props.onSearchFilter(e.target.value, (page) => agent.Items.byTitle(e.target.value), agent.Items.byTitle(e.target.value))
  }
  
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span>A place to </span>
          <span id="get-part">get </span>
          <form>
            <input type="text" id="search-box" style={{width: "250px"}} name="term" onChange={onSearchChange}/>
          </form>
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
