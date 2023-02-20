import React from "react";
import styles from "./UserMenuButtons.module.scss";

export default function UserMenuButtons() {
    return (
        <div className={styles.parent}>
            <button className={styles.button}>Profile</button>
            <button className={styles.button}>Log Out</button>
        </div>
    );
}