import React, {useEffect, useState} from "react";
import styles from "../../root.module.css";
import ContactPhone from "../contact-phone/contact-phone.component";
import CategoryService from "../../services/CategoryService";
import Configuration from "../../../app.configuration.json";
import { useForm, SubmitHandler } from "react-hook-form";

export default function HeroSearch() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const { 
        register, 
        handleSubmit 
    } = useForm<ISearchFormInput>();
    
    useEffect(() => {
        CategoryService.getCategories()
            .then((data) => setCategories(data))
            .catch((exception) => {
                console.error(`${Configuration.appName}: ${exception}`);
            });
    }, []);
    
    const onSubmit: SubmitHandler<ISearchFormInput> = formData => {
        // Process parameters, security and handle call api here when search page available
        // For temporary, we will redirect by URL only
        window.location.href = `/search?categoryId=${formData.categoryId}&keyword=${ encodeURIComponent(formData.keyword) }`
    };
    
    return (
        <div className={styles.hero__search}>
            <div className={styles.hero__search__form}>
                {/* Don't define action, method here. We should be handling these in the onSubmit event*/}
                {/* This is a feature of react-form-hook */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.hero__search__categories} >
                        <select aria-label="category-select" {...register("categoryId")}>
                            <option value="0">All Categories</option>
                            {categories.map((category: ICategory, index: number) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="text" placeholder="What do you need?" {...register("keyword", { required: true })} />
                    <button type="submit" className={styles.hero__search__site__btn}>SEARCH</button>
                </form>
            </div>
            <ContactPhone/>
        </div>
    );
}