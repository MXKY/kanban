import React from "react";
import { ReactComponent as PlusSVG } from "../../assets/plus.svg";
import styles from "./AddCardButton.module.scss";

export default function AddCardButton(props) {
    return (
        <>
            {(props.disabled && 
                <div className={styles.parent} onClick={props.onClick}>
                    <PlusSVG className={styles.plus} />
                    <button className={styles.button}>Add card</button>
                </div>) 
                ||
                <div className={styles.parent_disabled}>
                    <PlusSVG className={styles.plus} />
                    <button className={styles.button} disabled>Add card</button>
                </div>}
        </>
    );
}