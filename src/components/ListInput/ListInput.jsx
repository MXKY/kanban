import React from "react";
import styles from "./ListInput.module.scss";

export default class ListInput extends React.Component {
    render() {
        const { props } = this;

        return (
            <input ref={props.inputRef} className={styles.list_input} placeholder="Enter task name" onKeyDown={props.onEnterDown} />
        );
    }
}