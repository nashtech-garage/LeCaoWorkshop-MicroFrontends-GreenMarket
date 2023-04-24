import React from "react";
import DepartmentsDropdown from "./components/departments-dropdown/departments-dropdown.component";
import HeroSearch from "./components/hero-footer/hero-footer.component";

export default function Root(props) {
    return (
        <div className="row">
            <div className="col-lg-9"><HeroFooter/></div>
        </div>
    );
}
