import React, {useEffect, useState} from "react";
import SlideToggle from "react-slide-toggle"
import Styles from "../../root.module.css";
import CategoryService from "../../services/CategoryService"
import {Link} from "react-router-dom";

export default function DepartmentsDropdown(props) {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const rootConfigUrl = process.env.URL_ROOT_CONFIG;
    
    let isCollapseCategories = !props.configs.expandCategoriesOnPages.includes(window.location.pathname);
    const [collapseRandId, setCollapseRandId] = useState(0); // Random number to trigger collapse event of SlideToggle component
    
    useEffect(() => {
        CategoryService.getCategories()
            .then((data) => setCategories(data))
            .catch((exception) => {
                console.error(`${process.env.APP_NAME}: ${exception}`);
            });
    }, []);

    return (
        <SlideToggle collapsed={isCollapseCategories} collapseEvent={ collapseRandId }  duration={400} render={({toggle, setCollapsibleElement}) => (
            <div className={Styles.hero__categories}>
                <div className={Styles.hero__categories__all} onClick={toggle}>
                    <i className="fa fa-bars"></i>
                    <span>All departments</span>
                </div>
                <ul ref={setCollapsibleElement}>
                    {categories.map((category: ICategory, index: number) => (
                        <li key={index}>
                            <Link onClick={() => setCollapseRandId(Date.now())} to={`${rootConfigUrl}/shop?id=${category.id}`}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )}/>
    );
}