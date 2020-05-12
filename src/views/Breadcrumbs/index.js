import React from "react";
import { Link } from "react-router-dom";
const Breadcrumbs = ({ crumbs }) => {
  // Don't render a single breadcrumb.
  // if (crumbs.length <= 1) {
  //   return null;
  // }
  return (
    <div style={{width:'200px',backgroundColor:'red'}}>
      {/* Link back to any previous steps of the breadcrumb. */}
      {crumbs.map(({ title, path }, key) =>
        key + 1 === crumbs.length ? (
          <span key={key}>
            {title}
          </span>
        ) : (
          <Link key={key} to={path}>
            {title}
          </Link>
        )
      )}
    </div>
  );
};
export default Breadcrumbs;