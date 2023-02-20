import React from "react";
import List from "../List/List";
import Task from "../Task/Task";
import styles from "./Main.module.scss";

export default class Main extends React.Component {
    render() {
        const { props } = this;

        const mapData = (listName) => {
            return props.data.filter(x => x.list === listName)
                .sort((a, b) => a.lastTransferDate - b.lastTransferDate)
                .map(x => 
                    <Task 
                        key={x.id} 
                        id={x.id} 
                        name={x.name} 
                        listName={x.list} 
                        desc={x.desc} 
                        onChangeDesc={props.onChangeDesc} 
                        onDeleteTask={props.onDeleteTask} 
                    />
                );
        } 

        const backlogList = mapData("backlog");

        const readyList = mapData("ready");

        const progressList = mapData("in progress");

        const finishedList = mapData("finished");

        return (
            <div className={styles.parent}>
                <div className={styles.lists_wrapper}>
                    <List name="Backlog" data={props.data} onAddTask={props.onAddBacklogTask}>
                        {backlogList}
                    </List>

                    <List name="Ready" dependentList={backlogList} onAddTask={props.onAddReadyTask}>
                        {readyList}
                    </List>

                    <List name="In Progress" dependentList={readyList} onAddTask={props.onAddProgressTask}>
                        {progressList}
                    </List>

                    <List name="Finished" dependentList={progressList} onAddTask={props.onAddFinishedTask}>
                        {finishedList}
                    </List>
                </div>
            </div>
        );
    }
}