import { useState, useEffect, lazy, Suspense } from 'react'
import { formatDateToInput, formatDateToOriginalFormat } from './DateUtil'
const GridView = lazy(() => import('./active/GridView'))
const ListView = lazy(() => import('./active/ListView'))
import { getTasks, createTask } from '@/app/lib/data'

export default function Task({ views, markTask, deleteTask, editTask }) {
  const [editingTasks, setEditingTasks] = useState({});
  const [taskChanges, setTaskChanges] = useState({});
  const [status, setStatus] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [dateError, setDateError] = useState({ id: '', error: ''});
  const [taskError, setTaskError] = useState({ id: '', error: ''});
  const [fadeIn, setFadeIn] = useState(false);
  const [tasks, setTasks] = useState([]);
    
  const todayDateString = new Date().toDateString();
  // const filteredTasks = tasks.filter((task) => new Date(task.dueDate) >= new Date(todayDateString));

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleTaskChanges = (e, id) => {
    const { value } = e.target;
    setTaskChanges((prevTaskChanges) => ({
      ...prevTaskChanges,
      [id]: value,
    }));
  };

  const startEditing = (id) => {
    setEditingTasks((prevEditingTasks) => ({
      ...prevEditingTasks,
      [id]: true,
    }));

    setTaskChanges((prevTaskChanges) => ({
      ...prevTaskChanges,
      [id]: tasks.find((task) => task.id === id)?.task,
    }));

    setStatus(tasks.find((task) => task.id === id)?.status); // Set status

    const formattedDueDate = formatDateToInput(tasks.find((task) => task.id === id)?.dueDate);
    setDueDate(formattedDueDate); // Set due date

    setTimeout(() => {
      const textarea = document.getElementById(`task-${id}`);
      if (textarea) {
        textarea.focus();
        // Set the selection range to the end of the text
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }
    }, 0);
  };

  const stopEditing = (id) => {
    setEditingTasks({
      ...editingTasks,
      [id]: false,
    });
    setTaskError({ id: '', error: ''});
    setDateError({ id: '', error: ''});
  };

  const handleEditFormSubmit = (e, id) => {
    e.preventDefault();
    const formattedDueDate = formatDateToOriginalFormat(dueDate);
    const dueDateObj = new Date(formattedDueDate);

    if (taskChanges[id].length === 0) {
      setTaskError({
        ...taskError,
        id: id,
        error: 'Task cannot be empty!',
      });
    } else if (taskChanges[id].length < 6) {
      setTaskError({
        ...taskError,
        id: id,
        error: 'Task must be at least 6 characters long!',
      });
    } else if (taskChanges[id].length > 125) {
      setTaskError({
        ...taskError,
        id: id,
        error: 'Task must be at most 125 characters long!',
      });
    } else if (dueDateObj < new Date(new Date().setHours(0, 0, 0, 0))) {
      setDateError({
        ...dateError,
        id: id,
        error: 'Due date cannot be in the past!',
      });
    } else {
      editTask(id, taskChanges[id], formattedDueDate, status);
      stopEditing(id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const tasksData = await getTasks();
            setTasks(tasksData);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    fetchData();

    const timeout = setTimeout(() => {
      setFadeIn(true);
      }, 1000);

      return () => clearTimeout(timeout);
}, []);

  return (
    <Suspense fallback={<div 
      className="text-light font-manrope text-center" 
      style={{ fontSize: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading...</div>}>
      {tasks.length > 0 ? (
        views === 0 ? (
          <GridView
            markTask={markTask}
            deleteTask={deleteTask}
            startEditing={startEditing}
            editingTasks={editingTasks}
            taskChanges={taskChanges}
            dueDate={dueDate}
            dateError={dateError}
            taskError={taskError}
            handleEditFormSubmit={handleEditFormSubmit}
            stopEditing={stopEditing}
            handleDueDateChange={handleDueDateChange}
            handleTaskChanges={handleTaskChanges}
            setStatus={setStatus}
          />
        ) : (
          <ListView
            filteredTasks={tasks}
            markTask={markTask}
            deleteTask={deleteTask}
            startEditing={startEditing}
            editingTasks={editingTasks}
            taskChanges={taskChanges}
            dueDate={dueDate}
            dateError={dateError}
            taskError={taskError}
            handleEditFormSubmit={handleEditFormSubmit}
            stopEditing={stopEditing}
            handleDueDateChange={handleDueDateChange}
            handleTaskChanges={handleTaskChanges}
            setStatus={setStatus}
          />
        )
      ) : (
        <div className={`fade-effect ${fadeIn ? 'fade-in' : ''}`}>
          <h3 className="text-light font-manrope">Your tasks will show up here.</h3>
        </div>
      )}
    </Suspense>
  );
}
