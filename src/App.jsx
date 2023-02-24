import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

export default function App() {
  const [tasks, setTasks] = useState(loadTasks());
  const [activeTasks, setActiveTasks] = useState(tasks.filter(x => x.list === "backlog").length);
  const [finishedTasks, setFinishedTasks] = useState(tasks.filter(x => x.list === "finished").length);

  useEffect(() => {
    saveTasks();
  });

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const data = JSON.parse(localStorage.getItem("tasks"));
    
    if (!data)
      return [];
    else
      return data;
  }
  
  const onAddBacklogTask = (task) => {
    setActiveTasks(activeTasks + 1);
    
    setTasks(tasks.concat([task]));
  }

  const onAddReadyTask = (taskId) => {
    setActiveTasks(activeTasks - 1);

    editTaskList(taskId, "ready");
  }

  const onAddProgressTask = (taskId) => {
    editTaskList(taskId, "in progress");
  }

  const onAddFinishedTask = (taskId) => {
    setFinishedTasks(finishedTasks + 1);
    
    editTaskList(taskId, "finished");
  }

  const onChangeDesc = (taskId, desc) => {
    console.log(`Task ${taskId} description updated: ${desc}`);

    editTaskDesc(taskId, desc);
  }

  const editTaskList = (taskId, listName) => {
    console.log(`Task ${taskId} list updated => ${listName}`);

    setTasks(tasks.map((task) => (
      task.id === taskId
        ? { ...task, lastTransferDate: Date.now(), list: listName }
        : task
    )));
  }

  const editTaskDesc = (taskId, desc) => {
    setTasks(tasks.map((task) => (
      task.id === taskId
        ? { ...task, desc: desc }
        : task
    )));
  }

  const deleteTask = (taskId, listName) => {
    const arrCopy = Array.from(tasks);
  
    const objWithIdIndex = arrCopy.findIndex((x) => x.id === taskId);
    arrCopy.splice(objWithIdIndex, 1);

    if (listName === "backlog") 
      setActiveTasks(activeTasks - 1);
    else if (listName === "finished")
      setFinishedTasks(finishedTasks - 1);

    setTasks(arrCopy);
  }

  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="*" element=
            <Main 
              data={tasks} 
              onAddBacklogTask={onAddBacklogTask} 
              onAddReadyTask={onAddReadyTask} 
              onAddProgressTask={onAddProgressTask}
              onAddFinishedTask={onAddFinishedTask} 
              onChangeDesc={onChangeDesc}
              onDeleteTask={deleteTask}
            />
          />
        </Routes>
      </BrowserRouter>

      <Footer activeTasks={activeTasks} finishedTasks={finishedTasks} />
    </>
  );
}
