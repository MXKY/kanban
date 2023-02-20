import React from "react";
import styles from "./ListSelect.module.scss";

export default class ListSelect extends React.Component {
    render() {
        const { props } = this;
        
        return (
            <select ref={props.inputRef} className={styles.select}>
                {props.listBoxElements.map(x => 
                    <option key={x.props.id} value={x.props.id}>{x.props.name}</option>
                )}
            </select>
        );
    }
} 