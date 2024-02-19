/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { BsXLg, BsArrowLeft, BsDash, BsPlus } from 'react-icons/bs'
import { usePopupFunctions } from '../handlers/usePopupFunctions'
export default function Popup({ closer, close }) {
    
    const {
        toDo,
        inputError,
        setInputError,
        dateError,
        selectedDate,
        todayDateString,
        textOrChecklist,
        handleChange,
        handleFormSubmit,
        handleTaskOrChecklistChange,
        createChecklistItem,
        removeChecklistItem
    } = usePopupFunctions();

    useEffect(() => {
        // Check if newTask is defined and has a task property
        if (toDo.task) {
            // Check task length and set input error accordingly
            toDo.task.length > 125 ? setInputError("Task must be at most 125 characters long!") : setInputError(null);
        }
    }, [toDo]);

    return (
        <div id="popup" className="popup" onClick={(e) => close(e)}>
            <div id="add-task" className="add-task">
                <a onClick={closer} className="close"><BsXLg /></a>
                <h2>Add New Task</h2>
                {
                    textOrChecklist === 'text' ? (
                        <>
                            <a onClick={() => handleTaskOrChecklistChange(null)} className="back"><BsArrowLeft /></a>
                            <form onSubmit={(e) => handleFormSubmit(e, 'text')}>
                                <textarea 
                                    type="text" 
                                    placeholder="Write your task here" 
                                    rows="5" 
                                    value={toDo && toDo.task} 
                                    onChange={(e) => handleChange(null, e.target.value, 'text')} 
                                    spellCheck="false" 
                                    autoComplete="off"
                                    autoFocus
                                >
                                </textarea>
                                <h6>
                                    <span>
                                        (<i className={toDo.task && toDo.task.length === 0 || toDo.task.length < 6 ? 'danger' : 
                                            toDo.task.length > 125 ? 'danger' : ''}>
                                            {toDo.task && toDo.task.length < 1 ? 0 : toDo.task.length}
                                        </i>/125)
                                    </span>
                                </h6>
                                {inputError && <h4>{inputError}</h4>}
                                <p>
                                    Select date 
                                    <input 
                                        type="date" 
                                        defaultValue={selectedDate} 
                                        onChange={(e) => handleChange(null, e.target.value, 'dueDate')} 
                                        required 
                                    />
                                </p>
                                {dateError && <h4>{dateError}</h4>}
                                <h5>Default date: {todayDateString}</h5>
                                <button type="submit">Create</button>
                            </form>
                        </>
                    ) : textOrChecklist === 'checklist' ? (
                        <>
                            <form onSubmit={(e) => handleFormSubmit(e, 'checklist')}>
                                <a onClick={() => handleTaskOrChecklistChange(null)} className="back"><BsArrowLeft /></a>
                                <ul style={{ 
                                    width: 'auto',
                                    display: 'flex', 
                                    alignItems: 'flex-start', 
                                    justifyContent: 'center', 
                                    flexDirection: 'column', 
                                    gap: '20px',
                                    listStyleType: 'initial'
                                }}>
                                    {toDo.type === 'checklist' && toDo.checklist.length > 0 ? ( // Check if checklist is not empty
                                        toDo.checklist.map((item, index) => (
                                            <li key={item.id}>
                                                <input 
                                                    name='checklist' 
                                                    type="text" 
                                                    id={item.id} 
                                                    value={item.item} 
                                                    onChange={(e) => handleChange(item.id, e.target.value, 'checklist')} 
                                                    placeholder={`Checklist item ${index + 1}`}
                                                />
                                                {item.error && <h4>{item.error}</h4>}
                                                {(index + 1) !== 1 &&  (
                                                    <a 
                                                        style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '12px' }}
                                                        onClick={() => removeChecklistItem(item.id)}
                                                    >
                                                        Remove
                                                    </a>
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        `Use the button below to add checklist items` // Render a message if checklist is empty
                                    )}
                                    <a className="add-checklist-item" onClick={createChecklistItem}><BsPlus size={35} /></a>
                                </ul>
                                {
                                    toDo.type === 'checklist' && toDo.checklist.length >= 1 && (
                                        <button type="submit">Create</button>
                                    )
                                }
                            </form>
                        </>
                    ) : (
                        <div className="selection">
                            <button type="button" onClick={() => handleTaskOrChecklistChange('checklist')}>Checklist</button>
                            <button type="button" onClick={() => handleTaskOrChecklistChange('text')}>Text</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}