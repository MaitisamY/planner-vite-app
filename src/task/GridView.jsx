import { useEffect, useState, Fragment } from 'react'
import { 
  BsTrash, 
  BsPencil, 
  BsX, 
  BsCheckAll 
} from 'react-icons/bs'
// import { useToDoFunctions } from '@/app/useToDoFunctions' 
import { getTasks } from '@/app/lib/data'
import { MdCheck, MdCheckBoxOutlineBlank } from 'react-icons/md'
export default function GridView({ 
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

    // const {
    //   tasks,
    // } = useToDoFunctions();
    const [tasks, setTasks] = useState([]);
    const [fadeIn, setFadeIn] = useState(false);
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
          }, 500);
    
          return () => clearTimeout(timeout);
    }, [tasks]);

    return (
      tasks.map((task) => (
        <div key={task.id} className={`grid-view fade-grid-view ${fadeIn ? 'fade-in' : ''}`}>
          {task.type === 'text' ? (
            <Fragment>
              <label className={task.status === 'completed' ? 'line-through' : ''}>
                {' ' + task.task}
              </label>
              <p>
                {task.updatedDate
                  ? `Updated on: ${task.updatedDate}`
                  : `Created on: ${task.date}`}
              </p>
              <p>Due on: {task.due_date}</p>
            </Fragment>
          ) : (
            <Fragment>
              {task.checklist.map((item) => (
                <div key={item.id}>
                  <label className={item.status === 'completed' ? 'line-through' : ''}>
                    {' ' + item.item}
                  </label>
                </div>
              ))}
              <p>Due on: {task.due_date}</p>
            </Fragment>
          )}
        </div>
      ))
    );
    
    // return (
    //   tasks.map((task) => (
    //     <div key={task.id} className={`grid-view fade-grid-view ${fadeIn ? 'fade-in' : ''}`}>
    //       {editingTasks[task.id] ? (
    //         <form onSubmit={(e) => handleEditFormSubmit(e, task.id)}>
    //           <h3>Edit task</h3>
    //           {task.type === 'text' ? (
    //             <textarea
    //               name={`task-${task.id}`}
    //               id={`task-${task.id}`}
    //               value={taskChanges[task.id]}
    //               type="text"
    //               rows="6"
    //               onChange={(e) => handleTaskChanges(e, task.id)}
    //               placeholder="Edit your task here"
    //               autoFocus
    //             ></textarea>
    //           ) : (
    //             <>
    //               {task.checklist.map((item) => (
    //                 <div key={item.id}>
    //                   <input
    //                     name={`task-${item.id}`}
    //                     id={`task-${item.id}`}
    //                     value={taskChanges[item.id]}
    //                     type="checkbox"
    //                     onChange={(e) => handleTaskChanges(e, item.id)}
    //                   />
    //                   <label htmlFor={`task-${item.id}`}>{item.item}</label>
    //                 </div>
    //               ))}
    //             </>
    //           )}
    //           {taskError.id === task.id && <h6 className="error">{taskError.error}</h6>}
    //           <h3>Edit due date</h3>
    //           <input type="date" value={dueDate} onChange={handleDueDateChange} />
    //           {dateError.id === task.id && <h6 className="error">{dateError.error}</h6>}
    //           <p className="text-center">Modifying on: {new Date().toDateString()}</p>
    //           <div className="task-btns">
    //             <button 
    //               title="Update" 
    //               className="task-common-btn common-btn-theme" 
    //               type="submit"
    //             >
    //               <BsCheckAll />
    //             </button>
    //             <button
    //               onClick={() => stopEditing(task.id)}
    //               title="Cancel editing"
    //               className="task-common-btn common-btn-theme"
    //             >
    //               <BsX />
    //             </button>
    //           </div>
    //         </form>
    //       ) : (
    //         <>
    //           {task.type === 'text' ? (
    //             <>
    //               <label className={task.status === 'completed' ? 'line-through' : ''}>
    //                 {' ' + task.task}
    //               </label>
    //               <p>
    //                 {task.updatedDate
    //                   ? `Updated on: ${task.updatedDate}`
    //                   : `Created on: ${task.date}`}
    //               </p>
    //               <p>Due on: {task.dueDate}</p>
    //             </>
    //           ) : (
    //             <>
    //               {task.checklist.map((item) => (
    //                 <div key={item.id}>
    //                   <input
    //                     type="checkbox"
    //                     checked={item.status === 'completed'}
    //                     readOnly
    //                   />
    //                   <label className={item.status === 'completed' ? 'line-through' : ''}>{item.item}</label>
    //                 </div>
    //               ))}
    //               <p>Due on: {task.dueDate}</p>
    //             </>
    //           )}
    //           <div className="task-btns">
    //             <button
    //               onClick={() => markTask(task.id)}
    //               title={
    //                 task.status === 'completed'
    //                   ? 'Mark as pending'
    //                   : 'Mark as completed'
    //               }
    //               className="task-common-btn common-btn-theme"
    //             >
    //               {task.status === 'completed' ? (
    //                 <MdCheckBoxOutlineBlank />
    //               ) : (
    //                 <MdCheck />
    //               )}
    //             </button>
    //             <button
    //               onClick={() => (setStatus(task.status), startEditing(task.id))}
    //               title="Edit"
    //               className="task-common-btn edit-btn-theme"
    //             >
    //               <BsPencil />
    //             </button>
    //             <button
    //               title="Delete"
    //               onClick={() => deleteTask(task.id)}
    //               className="task-common-btn delete-btn-theme"
    //             >
    //               <BsTrash />
    //             </button>
    //           </div>
    //         </>
    //       )}
    //     </div>
    //   ))
    //     )
}