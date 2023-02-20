import React from "react";
import styles from "./Footer.module.scss";

export default function Footer(props) {
    return (
        <div className={styles.footer}>
            <div className={styles.stats}>
                <span className={styles.text}>Active tasks: {props.activeTasks}</span>
                <span className={styles.text}>Finished tasks: {props.finishedTasks}</span>
            </div>
            <span className={styles.text}>Kanban board by Max Podgorniy, {new Date().getFullYear()}</span>
        </div>
    );
} 