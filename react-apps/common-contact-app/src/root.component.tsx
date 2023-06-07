import ContactApp from "./components/contact-app/contact-app.component";
import styles from "./root.module.css";

export default function Root(props) {
    return (
        <section className={styles.contact}>
            <ContactApp />
        </section>
    );
}
