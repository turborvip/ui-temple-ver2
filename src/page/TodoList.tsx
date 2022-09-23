import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../services/axios';

function TodoList() {
  // const navigate = useNavigate()
  // const [task, setTask] = useState()
  // const initApp = useCallback(async () => {
  //     await axios.get('/todo')
  //     .then((res)=>{
  //       setTask(res.data);
  //     })
  //     .catch((err)=>{
  //       // show toast err
  //     })
  //   },
  //   [],
  // )

  // useEffect(() => {
  //   initApp();
  // },[])

  return (
    <div>TodoList
      <Link to={'/'} >Go Home</Link>
    </div>
  )
}

export default TodoList