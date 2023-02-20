import { Link } from "react-router-dom";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import styles from "./Task.module.scss";

export default function TaskOpened(props) {
    const name = props.name;
    let desc = props.desc;
    
    return (
        <div className={styles.parent_opened} onKeyDown={props.escapeButtonHandler}>
            <div className={styles.task}>
                <div className={styles.title_wrapper}>
                    <span className={styles.name}>{name}</span>
                    <Link to="/" className={styles.link} onClick={props.crossClickHandler}>
                        <Cross className={styles.cross} />
                    </Link>
                </div>
                <textarea className={styles.textarea} defaultValue={desc ? desc : "This task has no description."} onChange={props.changeDescHandler}></textarea>
            </div>
        </div>
    );
}