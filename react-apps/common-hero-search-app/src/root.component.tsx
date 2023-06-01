import React from "react";
import DepartmentsDropdown from "./components/departments-dropdown/departments-dropdown.component";
import HeroSearch from "./components/hero-search/hero-search.component";
import { BrowserRouter } from "react-router-dom";
export default function Root() {
    const departmentDropdownConfig: IDepartmentDropdownConfig = {
      expandCategoriesOnPages: ["/", "/index.html"]
    };

    return (
        <BrowserRouter>
            <div className="row">
                <div className="col-lg-3"><DepartmentsDropdown configs={departmentDropdownConfig}/></div>
                <div className="col-lg-9"><HeroSearch/></div>
            </div>
        </BrowserRouter>
    );
}
