import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import styles from "./Task.module.scss";
import TaskOpened from "./TaskOpened";

export default function Task(props) {
    const id = props.id;
    const name = props.name;
    let desc = props.desc;

    const [isOpen, setOpen] = useState(false);

    const match = useMatch("/tasks/:id");

    useEffect(() => {
        window.scrollTo(0, 0);

        if (match)
            if (match.params.id === id + "")
                setOpen(true);
    }, [id, match]);

    const сlickHandler = () => {
        setOpen(!isOpen);

        if (isOpen) {
            saveDesc();
        }
    }

    const escapeButtonHandler = (e) => {
        if (e.code === "Escape") {
            setOpen(false);
            saveDesc();
            window.history.pushState("", "", "/");
        }
    }

    const changeDescHandler = (e) => {
        if (e.target.value === desc) return;

        desc = e.target.value;
    }

    const saveDesc = () => {
        if (desc === undefined || props.desc === desc) return;

        props.onChangeDesc(id, desc);
    }

    const deleteTask = () => {
        props.onDeleteTask(id);
    }
               
    return (
        <>
            {(isOpen &&
            <>
                <div className={styles.background}></div>
                <div className={styles.parent}>
                    <div className={styles.task_active}>
                        <span className={styles.name}>{name}</span>
                        <Cross className={styles.cross} />
                    </div>
                </div>

                <Routes>
                    <Route path={"/tasks/" + id} element={<TaskOpened id={id} name={name} desc={desc} crossClickHandler={сlickHandler} escapeButtonHandler={escapeButtonHandler} changeDescHandler={changeDescHandler} />} />
                </Routes>
            </>)
            || 
            <>
                <Link to={"/tasks/" + id} className={styles.link}>
                    <div className={styles.parent} onKeyDown={escapeButtonHandler}>
                        <div className={styles.task} onClick={сlickHandler}>
                            <div className={styles.title_wrapper}>
                                <span className={styles.name}>{name}</span>
                                <Cross className={styles.cross} onClick={deleteTask} />
                            </div>
                        </div>
                    </div>
                </Link>
            </>}
        </>
    );
}