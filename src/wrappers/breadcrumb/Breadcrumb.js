import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Breadcrumbs } from "react-breadcrumbs-dynamic";

const Breadcrumb = ({category,pageId}) => {
  return (
    <div className="breadcrumb-area pt-35 pb-35 bg-gray-3">
      <div className="container">
        <div className="breadcrumb-content text-center row">
			<div className="col-4">
				{category !== undefined && (<span><a onClick={() => window.history.back()}>REGRESAR</a></span>)}
			</div>
			<div className="col-8">
				<Breadcrumbs
					separator={<span>/</span>}
					item={NavLink}
					finalItem={"span"}
				/>
			</div>

        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
