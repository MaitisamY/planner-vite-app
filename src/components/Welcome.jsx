/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { usePopupFunctions } from '../handlers/usePopupFunctions'
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon
  } from 'react-share'

export default function Welcome({ opener }) {

    const shareUrl = 'https://next-to-do-app-nu.vercel.app/';
    const shareMessage = `I use this app to maintain my daily tasks. Check out the app At:`;

    const {
        toDo,
        notes,
        inputError,
        setInputError,
        noteError,
        setNoteError,
        dateError,
        selectedDate,
        todayDateString,
        textOrChecklist,
        handleNotesChange,
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
        if(notes.note){
            notes.note.length > 1000 ? setNoteError("Note must be at most 1000 characters long!") : setNoteError(null);
        }
    }, [toDo, notes]);

    return (
        <> 
            <div className="welcome">
                <h2>
                    Welcome
                </h2>
                <h3>PLANNER is a simple and easy to use daily tasks maintainer app.</h3>
                <div className="add-task">
                <h3>Start creating tasks by selecting one of the below</h3>
                <div className="selection">
                    <button 
                        className={`selector ${textOrChecklist === 'checklist' ? 'active' : ''}`}
                        type="button" 
                        onClick={() => handleTaskOrChecklistChange('checklist')}
                    >
                        Checklist
                    </button>
                    <button 
                        className={`selector ${textOrChecklist === 'text' ? 'active' : ''}`}
                        type="button" 
                        onClick={() => handleTaskOrChecklistChange('text')}
                    >
                        Text Task
                    </button>
                    <button 
                        className={`selector ${textOrChecklist === 'notes' ? 'active' : ''}`}
                        type="button" 
                        onClick={() => handleTaskOrChecklistChange('notes')}
                    >
                        Notes
                    </button>
                </div>
                {
                    textOrChecklist === 'text' ? (
                        <>
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
                                        (<i className={toDo.task && toDo.task.length === 0 || toDo.task.length < 6 ? 'lighter' : 
                                            toDo.task.length > 125 ? 'lighter' : ''}>
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
                                <button className="btn" type="submit">Create</button>
                            </form>
                        </>
                    ) : textOrChecklist === 'checklist' ? (
                        <>
                            <form onSubmit={(e) => handleFormSubmit(e, 'checklist')}>
                                <ul>
                                    {toDo.type === 'checklist' && toDo.checklist.length > 0 ? ( // Check if checklist is not empty
                                        toDo.checklist.map((item, index) => (
                                            <li key={item.id}>
                                                <input 
                                                    name='checklist' 
                                                    type="text" 
                                                    id={item.id} 
                                                    value={item.item} 
                                                    onChange={(e) => handleChange(item.id, e.target.value, 'checklist')} 
                                                    placeholder={`Enter checklist item ${index + 1}`}
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
                                    <a className="add-checklist-item" onClick={createChecklistItem}>+</a>
                                </ul>
                                {
                                    toDo.type === 'checklist' && toDo.checklist.length >= 1 && (
                                        <button className="btn" type="submit">Create</button>
                                    )
                                }
                            </form>
                        </>
                    ) : textOrChecklist === 'notes' ? (
                        <>
                            <form onSubmit={(e) => handleFormSubmit(e, 'text')}>
                                <textarea 
                                    className="notes"
                                    name="note"
                                    type="text" 
                                    placeholder="Write your task here" 
                                    rows="4" 
                                    value={notes && notes.note} 
                                    onChange={handleNotesChange} 
                                    spellCheck="false" 
                                    autoComplete="off"
                                    autoFocus
                                >
                                </textarea>
                                <h6>
                                    <span>
                                        (<i className={notes.note && notes.note.length === 0 || notes.note.length < 50 ? 'lighter' : 
                                            notes.note.length > 1000 ? 'lighter' : ''}>
                                            {notes.note && notes.note.length < 1 ? 0 : notes.note.length}
                                        </i>/1000)
                                    </span>
                                </h6>
                                {noteError && <h4>{noteError}</h4>}
                                <button className="btn" type="submit">Create</button>
                            </form>
                        </>
                    ) : null
                }
                </div>    
            </div>
            <div className="share-icons-container">
                <h4>Share our app on social media</h4>
                <div className="share-buttons">
                    <FacebookShareButton url={shareUrl} quote={shareMessage}>
                        <FacebookIcon title="Share on Facebook" className="fb" size={28} />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} title={shareMessage}>
                        <TwitterIcon title="Share on Twitter" className="tw" size={28} />
                    </TwitterShareButton>
                    <LinkedinShareButton url={shareUrl} summary={shareMessage}>
                        <LinkedinIcon title="Share on LinkedIn" className="in" size={28} />
                    </LinkedinShareButton>
                    <WhatsappShareButton url={shareUrl} title={shareMessage}>
                        <WhatsappIcon title="Share on WhatsApp" className="wa" size={28} />
                    </WhatsappShareButton>
                </div>
            </div>
        </>
    )
}