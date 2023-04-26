import HeroFooter from "./components/hero-footer/hero-footer.component";
import styles from "./root.module.css";
export default function Root(props) {
    return (
        <div className={styles["footer"]}>
            <div className="col-lg-12"><HeroFooter/></div>
        </div>
    );
}
