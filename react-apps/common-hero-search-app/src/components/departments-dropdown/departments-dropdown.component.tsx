import React, {useEffect, useState} from "react";
import SlideToggle from "react-slide-toggle"
import Styles from "../../root.module.css";
import Configuration from "../../../app.configuration.json"
import CategoryService from "../../services/CategoryService"

export default function DepartmentsDropdown(props) {
    const [categories, setCategories] = useState<ICategory[]>([]);

    const currentLocation: Location = props.configs.location;
    const isCollapseCategories: Boolean = !props.configs.expandCategoriesOnPages.includes(currentLocation.pathname);

    useEffect(() => {
        CategoryService.getCategories()
            .then((data) => setCategories(data))
            .catch((exception) => {
                console.error(`${Configuration.appName}: ${exception}`);
            });
    }, []);

    return (
        <SlideToggle collapsed={isCollapseCategories} duration={400} render={({toggle, setCollapsibleElement}) => (
            <div className={Styles.hero__categories}>
                <div className={Styles.hero__categories__all} onClick={toggle}>
                    <i className="fa fa-bars"></i>
                    <span>All departments</span>
                </div>
                <ul ref={setCollapsibleElement}>
                    {categories.map((category: ICategory, index: number) => (
                        <li key={index}>
                            <a href={`/category/${category.id}`}>{category.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        )}/>
    );
}