import { useEffect, useState } from 'react'
import {
  BsTrash, 
  BsPencil, 
  BsX, 
  BsCheckAll,
  BsToggleOn,
  BsToggleOff
} from 'react-icons/bs'
import { useToDoFunctions } from '@/app/useToDoFunctions'
export default function ListView({ 
  filteredTasks, 
  startEditing, 
  editingTasks, 
  taskChanges, 
  dueDate, 
  dateError, 
  taskError, 
  handleEditFormSubmit, 
  stopEditing, 
  handleDueDateChange, 
  handleTaskChanges, 
  deleteTask, 
  setStatus, 
  markTask 
}) {

    const {
      tasks,
    } = useToDoFunctions();

    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
      // Add a small delay before applying the fade-in effect
      const timeout = setTimeout(() => {
      setFadeIn(true);
      }, 500);

      return () => clearTimeout(timeout);
    }, []);
    return (
      tasks.map((task) => (
          <div key={task.id} className={`list-view fade-list-view ${fadeIn ? 'fade-in' : ''}`}>
              {editingTasks[task.id] ? (
                <form onSubmit={(e) => handleEditFormSubmit(e, task.id)}>
                  <h3>Edit task</h3>
                  <textarea
                    name={`task-${task.id}`}
                    id={`task-${task.id}`}
                    value={taskChanges[task.id]}
                    type="text"
                    rows="2"
                    onChange={(e) => handleTaskChanges(e, task.id)}
                    placeholder="Edit your task here"
                    autoFocus
                  ></textarea>
                  {taskError.id === task.id && <h6 className="error">{taskError.error}</h6>}
                  <h3>Edit due date</h3>
                  <div className="edit-task-row-2">
                    <div>
                    <input type="date" value={dueDate} onChange={handleDueDateChange} />
                    </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                      <button 
                        title="Update" 
                        className="task-common-btn common-btn-theme" 
                        type="submit"
                      >
                        <BsCheckAll />
                      </button>
                      <button
                        onClick={() => stopEditing(task.id)}
                        title="Cancel editing"
                        className="task-common-btn common-btn-theme"
                      >
                        <BsX />
                      </button>
                    </div>
                  </div>
                  {dateError.id === task.id && <h6 className="error">{dateError.error}</h6>}
                </form>
              ) : (
                <>
                  <h2 className={task.status === 'completed' ? 'line-through' : ''}>
                    {/* <input
                      title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => markTask(task.id)}
                    /> */}
                    <span 
                      onClick={() => markTask(task.id)}
                      title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                    >
                      {task.status === 'completed' ? <BsToggleOn size={25} /> : <BsToggleOff size={25} />}
                    </span>
                    <i>{' ' + task.task}</i>
                  </h2>
                  <div className="task-btns">
                    <div>
                      <p>
                        {task.updatedDate
                          ? `Updated on: ${task.updatedDate}`
                          : `Created on: ${task.date}`}
                      </p> 
                      {/* <p id="pipe"> | </p>  */}
                      <p>Due on: {task.dueDate}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                      <button
                        onClick={() => (setStatus(task.status), startEditing(task.id))}
                        title="Edit"
                        className="task-common-btn edit-btn-theme"
                      >
                        <BsPencil />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => deleteTask(task.id)}
                        className="task-common-btn delete-btn-theme"
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </div>
                </>
              )}  
          </div>
        ))
    );
}