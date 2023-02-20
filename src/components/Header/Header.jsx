import React from "react";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Header.module.scss";

export default function Header(props) {
    return (
        <div className={styles.header}>
            <h1 className={styles.text_logo}>Awesome Kanban Board</h1>
            <UserMenu />
        </div>
    );
}