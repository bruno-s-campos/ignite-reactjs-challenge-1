import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

function newRandomId() {
  return Number(Math.random().toString().slice(2, 11));
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle === '' || newTaskTitle === null || newTaskTitle === undefined) {
      return;
    }

    const newTask: Task = {
      id: newRandomId(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskCompletion(id: number) {
    const taskId = tasks.findIndex(task => task.id === id);
    if (taskId === -1) {
      return;
    }

    const newTask = {
      ...tasks[taskId],
      isComplete: !tasks[taskId].isComplete,
    };
    const newTasks = [...tasks.slice(0, taskId), newTask, ...tasks.slice(taskId + 1)];
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const taskId = tasks.findIndex(task => task.id === id);
    if (taskId === -1) {
      return;
    }

    const newTasks = [...tasks.slice(0, taskId), ...tasks.slice(taskId + 1)];
    setTasks(newTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}