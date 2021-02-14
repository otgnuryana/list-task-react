import { useState, useEffect} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTask] = useState([])

  useEffect(() => {
    const getTask = async () => {
      const tasksFromServer = await fetchTask()
      setTask(tasksFromServer)
    }

    getTask()
  }, [])

  // Fetch Task
  const fetchTask = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task Reminder
  const fetchTasks = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async task => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTask([...tasks, data])

    // const id = Math.floor(Math.random() * 1000 + 1)
    // const newTask = { id, ...task }
    // setTask([...tasks, newTask])
  }
  // Delete Task
  const deleteTask = async (id) => {
    // server side
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    // client side
    setTask(tasks.filter(task => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async id => {
    const taskToToggle = await fetchTasks(id)
    const updTask = {... taskToToggle, reminder: !taskToToggle.reminder}
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask),
    })
    
    const data = await res.json()


    setTask(tasks.map(task => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask} title="List Task" />
        <Route path="/" exact render={(proops) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}

            {tasks.length > 0 ? <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} /> : 'No task'}
          </>
        )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}


export default App;
