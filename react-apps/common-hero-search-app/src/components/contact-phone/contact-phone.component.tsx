import React from "react";
import styles from "../../root.module.css";

export default function ContactPhone() {
    return (
        <div className={styles.hero__search__phone}>
            <div className={styles.hero__search__phone__icon}>
                <i className="fa fa-phone"></i>
            </div>
            <div className={styles.hero__search__phone__text}>
                <h5>+65 11.188.888</h5>
                <span>support 24/7 time</span>
            </div>
        </div>
    );
}