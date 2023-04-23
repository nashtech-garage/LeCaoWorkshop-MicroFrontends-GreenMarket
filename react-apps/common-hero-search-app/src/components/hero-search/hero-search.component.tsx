import React, {useEffect, useState} from "react";
import styles from "../../root.module.css";
import ContactPhone from "../contact-phone/contact-phone.component";
import CategoryService from "../../services/CategoryService";
import Configuration from "../../../app.configuration.json";

export default function HeroSearch() {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        CategoryService.getCategories()
            .then((data) => setCategories(data))
            .catch((exception) => {
                console.error(`${Configuration.appName}: ${exception}`);
            });
    }, []);
    
    return (
        <div className={styles.hero__search}>
            <div className={styles.hero__search__form}>
                <form action="#">
                    <div className={styles.hero__search__categories} >
                        <select aria-label="category-select">
                            <option value="0">All Categories</option>
                            {categories.map((category: ICategory, index: number) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="text" placeholder="What do you need?"/>
                    <button type="submit" className={styles.hero__search__site__btn}>SEARCH</button>
                </form>
            </div>
            <ContactPhone/>
        </div>
    );
}