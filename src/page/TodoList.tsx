import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import axios from '../services/axios';

function TodoList() {
  // const navigate = useNavigate()
  // const dispatch = useAppDispatch();
  const [tasks, setTasks] = useState<Array<string>>([])
  const initApp = useCallback(async () => {
      await axios.get('/getTasks')
      .then((res)=>{
        setTasks(["A","B","C"]);
      })
      .catch((err)=>{
        console.log('err',err)
      })
    },
    [],
  )

  useEffect(() => {
    initApp();
  },[])

  return (
    <div>TodoList
      <Link to={'/'} >Go Home</Link>
      {(tasks.length > 0)&&tasks.map((item,idx) => (<div key={idx}>{item}</div>))}
    </div>
  )
}

export default TodoList