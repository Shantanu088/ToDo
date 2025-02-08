import { useEffect, useState } from "react";
import './ToDo.css';


export default function ToDoList() {

    const [task,setTask] = useState([]);
    const [title ,setTitle] = useState("");
    const [description ,setDescription] = useState("");
    const [editTaskId ,setEditTaskId] = useState();
    const [filter,setFilterType] = useState("");
    const AddTask = ()=>{

        console.log(title);
        console.log(description);
        
        const newTask = {
            id : Date.now(),
            title : title,
            description : description,
            completed : false
        };
        
        setTask([...task,newTask]);
       
        setDescription("");
        setTitle("");
        console.log(task);
    };

    useEffect(()=>{
        localStorage.setItem("tasks",JSON.stringify(task))
    },[task]);

    const deleteTask = (id)=> {
      const updatedTasks=task.filter((t)=>t.id !== id);
       setTask(updatedTasks);
       localStorage.setItem("tasks",JSON.stringify(updatedTasks));
    }

    const saveTask= (updId, updTitle, updDescription,upStatus)=>{
        // setEditTaskId(0);
        const updatedTasks = task.map((t)=>
            t.id===updId ?  
                {...t,title:updTitle, description:updDescription, completed:upStatus}
            : t

        )
        setTask(updatedTasks);
        console.log(updatedTasks);
        
        setEditTaskId(null);
        setDescription("");
        setTitle("");
    }

    const updateTaskStatus =(id)=>{
        const updatedStatus= task.map((e)=>
        e.id===id  ? {...e, completed:!e.completed}:e
        )
        console.log(updatedStatus);
        
        setTask(updatedStatus);
        setEditTaskId(null);
    }

    const filterTasks =()=>{
        if(filter==="completed"){
           return task.filter((e)=>(
                e.completed===true
            ))
        }

         if(filter==="pending"){
            return task.filter((e)=>(
                e.completed===false
            ))
        }

         
            return task;
        
    }

    return(
        <div className="layout">
        <>
        
        <div className="inputField">
            Task Title : <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            Task Description : <input type="text" placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            Add Task : <button onClick={AddTask}>Submit</button>
         </div>
            <button onClick={()=>setFilterType("completed")}>completed</button>
            <button onClick={()=>setFilterType("pending")}>pending</button>
            <button onClick={()=>setFilterType("all")}>all</button>
        <ul>
            {filterTasks().map((e)=>{
                return(
                    <div className="taskEdit">
                <li key={e.id} >
                    {editTaskId === e.id ? (
                        <div className={`taskList ${e.completed ? "task-completed" : "task-pending"}`}>
                            Task Title :<input type="text" defaultValue={e.title} onChange={(t)=>e.title= t.target.value}></input>
                            Task Description :<input defaultValue={e.description} onChange={(t) =>e.description= t.target.value}></input>
                            <button onClick={()=>{saveTask(e.id,e.title,e.description,e.completed)}}>Save</button>
                            {/* <input type="checkbox"  defaultChecked={e.completed} onChange={()=>updateTaskStatus(e.id)}></input> */}
                        </div>
                    ) : (
                    <div className={`taskList ${e.completed ? "task-completed" : "task-pending"}`}>
                    <p>Task Title :{e.title}</p>
                    <p>Task Description :{e.description}</p>
                    <button onClick={()=>{deleteTask(e.id)}}>Delete</button>
                    <button onClick={()=>{setEditTaskId(e.id)}}>Edit</button>
                    <input type="checkbox" checked={e.completed} onChange={()=>updateTaskStatus(e.id)}></input>
                    </div>
                    ) }
                </li>
                </div>
                );
            })}
        </ul>
        
        </>
        </div>
    );
}