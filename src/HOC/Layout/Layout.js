import React from "react";
import * as classes from "./Layout.module.css";

const Layout = (props) => {
  return <div className={classes.Layout}>{props.children}</div>;
};
export default Layout;
