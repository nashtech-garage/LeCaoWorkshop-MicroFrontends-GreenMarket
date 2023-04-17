import React from "react";
import DepartmentsDropdown from "./components/departments-dropdown/departments-dropdown.component";
import HeroSearch from "./components/hero-search/hero-search.component";

export default function Root(props) {
    return (
        <div className="row">
            <div className="col-lg-3"><DepartmentsDropdown configs={props}/></div>
            <div className="col-lg-9"><HeroSearch/></div>
        </div>
    );
}
