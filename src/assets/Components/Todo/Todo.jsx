import React from 'react'
import "./Todo.scss"
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import { ToastContainer, toast } from 'react-toastify';



export default function Todo() {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [task, setTask] = useState([]);

  // console.log(task);
  const addTask=()=>{
    const newTask={
      id:uuidv4(),
      taskName:taskName,
      deadline :taskDate,
    }
    if(taskName.trim().length===0 || taskDate.trim().length===0){
      toast.error('Pleas fill the task',{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    }else{
    setTask([...task,newTask])
    setTaskName("")
    setTaskDate("")
      toast.success('Success added',{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
  }
  }
  const deleteTask=(id)=>{
    const filterTask=task.filter((el)=>{
      return el.id!==id;
    })
    setTask(filterTask)
    toast.info('Deleted',{
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
  }



  return (
    <>
      <ToastContainer/>

      <div className="card w-50 p-2 mx-auto mt-5">
        <input
          type="text"
          className='form-control '
          placeholder='enter task name'
          value={taskName}
          onChange={(e) => 
            setTaskName(e.target.value)
          }
        />
        <input
          type="date"
          className='form-control mt-4'
          value={taskDate}
          onChange={(e)=>{
            setTaskDate(e.target.value)
          }}
        />

        <button 
        className="btn btn-success w-50 mx-auto mt-5"
        onClick={()=>{
          addTask()
        }}
        >ADD TASK</button>
      </div>
      <table className="table table-striped shadow table-bordered mx-auto mt-5 w-50">
        <thead>
          <tr><th>Id</th><th>Task Name</th> <th>Deadline</th><th>Delete</th></tr>
        </thead>
        <tbody>
          {
            task.length > 0 ? task.map((e,i) => {
              return (
                <tr key={e.id}>
                  <td>{i+1}</td>
                  <td>{e.taskName}</td>
                  <td>{e.deadline}</td>
                  <td>
                    <button 
                  className='btn btn-danger'
                  onClick={()=>{
                    deleteTask(e.id)
                  }}
                  >Delete</button>
                  </td>
                </tr>

              );
            }) : "Not Found"
          }
        </tbody>
      </table>

    </>
  )
}

