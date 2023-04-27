import React, {useEffect, useLayoutEffect, useState} from "react";
import Styles from "../../root.module.css";
import CategoryService from "../../services/CategoryService"
import {Link, useLocation } from "react-router-dom";

export default function DepartmentsDropdown(props) {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const rootConfigUrl = process.env.URL_ROOT_CONFIG;
    const location = useLocation();
    const IsExpandCategoryMenu = (): Boolean => props.configs.expandCategoriesOnPages.includes(location.pathname);
    
    const [expanded, setExpanded] = useState(IsExpandCategoryMenu());

    useLayoutEffect(() => {
        // Refresh state toggle category menu whenever url change
        setExpanded(IsExpandCategoryMenu());
    }, [location])
    
    useEffect(() => {
        CategoryService.getCategories()
            .then((data) => setCategories(data))
            .catch((exception) => {
                console.error(`${process.env.APP_NAME}: ${exception}`);
            });
    }, []);

    return (
        <div className={Styles.hero__categories}>
            <div className={Styles.hero__categories__all} onClick={() => setExpanded(!expanded)}>
                <i className="fa fa-bars"></i>
                <span>All departments</span>
            </div>
            {
                <ul className={ expanded 
                        ? `${Styles.hero__categories__menu__content} ${Styles.hero__categories__menu__content__show}` 
                        : `${Styles.hero__categories__menu__content}`}>
                    {categories.map((category: ICategory, index: number) => (
                        <li key={index}>
                            <Link to={`${rootConfigUrl}/shop?id=${category.id}`}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}