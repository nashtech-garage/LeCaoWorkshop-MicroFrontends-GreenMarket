import ContactApp from "./components/contact-app/contact-app.component";
import styles from "./root.module.css";
export default function Root(props) {
    return (
        <div>
            <div className="col-lg-12"><ContactApp/></div>
        </div>
    );
}
