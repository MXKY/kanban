import React from "react";
import AddCardButton from "../AddCardButton/AddCardButton";
import ListInput from "../ListInput/ListInput";
import { isEmptyOrWhitespace } from "../../stringFormatter";
import createTask from "../../taskFabric";
import ListSelect from "../ListSelect/ListSelect";
import styles from "./List.module.scss";

export default class List extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { isEdit: false };

        this.inputRef = React.createRef();
        this.submitBtnRef = React.createRef();
    }

    onAddButtonClick = () => {
        const { inputRef, submitBtnRef } = this;

        this.setState({ isEdit: true });

        setTimeout(() => {
            inputRef.current.focus();
            submitBtnRef.current.scrollIntoView();
        }, 0);
    }

    onSubmitButtonClick = (e) => {
        if (e.code !== undefined && e.code !== "Enter")
            return;

        this.inputValueProcessing();

        this.setState({ isEdit: false })
    }

    inputValueProcessing() {
        const { props } = this;
        let value = this.inputRef.current.value;

        if (props.name === "Backlog") {
            if (isEmptyOrWhitespace(value)) {
                this.inputRef.current.focus();
                this.inputRef.current.value = "";
                return;
            }
            
            if (value.length > 100) 
                value = value.substr(0, 97) + "...";

            const task = createTask(value);

            props.onAddTask(task);
        } else {
            props.onAddTask(parseInt(value));
        }
    }

    render() {
        const { inputRef, submitBtnRef, onSubmitButtonClick, onAddButtonClick, props } = this;
        const { isEdit } = this.state;

        return (
            <div className={styles.parent}>
                <span>{props.name}</span>

                {props.children}

                {(props.name === "Backlog" &&
                    <>{isEdit && <ListInput inputRef={inputRef} onEnterDown={onSubmitButtonClick} />}</>)
                ||(
                    <>{isEdit && <ListSelect inputRef={inputRef} listBoxElements={props.dependentList} />}</>
                )}

                {isEdit && 
                    <button 
                        ref={submitBtnRef} 
                        className={styles.submit_button} 
                        onClick={onSubmitButtonClick}
                    >Submit</button>
                }

                {!isEdit && 
                    <AddCardButton 
                        listName={props.name.toLowerCase()} 
                        onClick={onAddButtonClick} 
                        disabled={!props.dependentList || props.dependentList.length > 0} 
                    />
                }
            </div>
        );
    }
}