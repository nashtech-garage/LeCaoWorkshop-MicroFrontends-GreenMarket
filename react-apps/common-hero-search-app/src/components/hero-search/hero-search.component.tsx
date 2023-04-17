import React from "react";
import styles from "../../root.module.css";
import ContactPhone from "../contact-phone/contact-phone.component";

export default function HeroSearch() {
    return (
        <div className={styles.hero__search}>
            <div className={styles.hero__search__form}>
                <form action="#">
                    <div className={styles.hero__search__categories}>
                        All Categories <span className="arrow_carrot-down"></span>
                    </div>
                    <input type="text" placeholder="What do yo u need?"/>
                    <button type="submit" className="site-btn">SEARCH</button>
                </form>
            </div>
            <ContactPhone/>
        </div>
    );
}