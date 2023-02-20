import React, { useState } from "react";
import { ReactComponent as UserLogo } from "../../assets/user-avatar.svg";
import { ReactComponent as MenuArrow } from "../../assets/menu-arrow.svg";
import UserMenuButtons from "../UserMenuButtons/UserMenuButtons";
import styles from "./UserMenu.module.scss";

export default function UserMenu() {
    const [opened, setOpened] = useState(false);

    function onMenuClick() {
        setOpened(!opened);
    }

    return (
        <div className={styles.menu} onClick={onMenuClick}>
            <UserLogo className={styles.logo} />
            <MenuArrow className={opened ? styles.arrow_opened : styles.arrow}/>
            {opened && <UserMenuButtons />}
        </div>
    );
}