import { useState } from 'react'
import { formatDateToInput } from './DateUtil' 

export const usePopupFunctions = () => {

    const generateTaskId = () => {
        const timestamp = new Date().getTime();
        return `task_${timestamp}`;
    }

    const [inputError, setInputError] = useState(null);
    const [noteError, setNoteError] = useState(null);
    const [dateError, setDateError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(formatDateToInput(new Date().toDateString()));
    const todayDateString = new Date().toDateString();
    const [textOrChecklist, setTextOrChecklist] = useState(null);
    const [toDo, setToDo] = useState({
        id: generateTaskId(),
        type: 'text', // Default type is text
        task: '', // Task text
        date: '', // Date information
        updatedDate: '', // Updated date information
        dueDate: '', // Due date information
        status: '', // Status information
        checklist: [], // Array to hold checklist items
    });
    const [notes, setNotes] = useState({
        id: generateTaskId(),
        note: '',
        date: '',
        updatedDate: '',
        dueDate: '',
        status: '',
    });

    const handleTaskOrChecklistChange = (name) => {
        setTextOrChecklist(name);
    }

    const handleNotesChange = (e) => {
        const { name, value } = e.target
        setNotes({
            ...notes,
            [name]: value
        });
    }

    const handleChange = (itemId, value, fieldName) => {
        setToDo(prevToDo => {
            if (fieldName === 'text') {
                return {
                    ...prevToDo,
                    task: value
                };
            } else if (fieldName === 'dueDate') {
                return {
                    ...prevToDo,
                    dueDate: value
                };
            } else {
                const updatedChecklist = prevToDo.checklist.map(item => {
                    if (item.id === itemId) {
                        return { ...item, item: value };
                    }
                    return item;
                });
                return {
                    ...prevToDo,
                    checklist: updatedChecklist
                };
            }
        });
    };
    
    const handleFormSubmit = async (e, type) => {
        e.preventDefault();
        console.log('Form submitted:', type);
        
        // Performing validations for text tasks
        if (type === 'text') {
            if (toDo.task === "") {
                setInputError("Task cannot be empty!");
                return;
            } else if (toDo.task.length < 6) {
                setInputError("Task must be at least 6 characters long!");
                return;
            } else if (toDo.task.length > 125) {
                setInputError("Task must be at most 125 characters long!");
                return;
            }
        }

        let dueDateFormat; 

        // Performing validations for due date
        if (toDo.dueDate !== todayDateString) {
            const formattedDate = new Date(toDo.dueDate).toDateString();
            if (new Date(formattedDate) < new Date(new Date().setHours(0, 0, 0, 0))) {
                setDateError("Due date cannot be in the past!");
                return;
            }
        }

        dueDateFormat = formatDateToInput(toDo.dueDate)
    
    
        // Handling submission for different types of tasks
        if (type === 'text') {
            // Handling text task submission
            const taskData = {
                type: 'text',
                task: toDo.task,
                date: todayDateString,
                dueDate: dueDateFormat,
                status: 'pending'
            };
            setToDo(taskData);
            const createdTask = await createTask(taskData);
            console.log('Task data:', createdTask);
        } else if (type === 'checklist') {
            // Handle checklist task submission
            const updatedChecklist = toDo.checklist.map(item => {
                // Validate each checklist item and populate error messages
                if (!item.item) {
                    return { ...item, error: "Item cannot be empty!" };
                } else {
                    const itemId = generateTaskId();
                    return { id: itemId, item: item.item, status: 'pending' };
                }
            });
    
            // Check if any errors exist in the checklist
            const hasErrors = updatedChecklist.some(item => item.error);
    
            if (hasErrors) {
                // Set the checklist with error messages
                setToDo(prevToDo => ({
                    ...prevToDo,
                    checklist: updatedChecklist
                }));
                return;
            }

            
            // No errors, proceed with adding the checklist task
            const taskData = {
                type: 'checklist',
                date: todayDateString,
                dueDate: dueDateFormat,
                checklist: updatedChecklist
            };
            const createdTask = await createTask(taskData);
            console.log('Created Task:', createdTask);
        }
        handlePopup();
    };

    const createChecklistItem = () => {
        setToDo(prevToDo => {
            let checklist = prevToDo.checklist || []; // Initialize checklist as an empty array if it's not defined
            if (!Array.isArray(checklist)) {
                // Handle the case where checklist is defined but not an array
                console.error('Checklist is not an array:', checklist);
                checklist = []; // Initialize checklist as an empty array
            }
            return {
                ...prevToDo,
                type: 'checklist', // Change type to checklist
                checklist: [
                    ...checklist,
                    { id: generateTaskId(), item: '', status: '', error: '' } // Add a new checklist item
                ]
            };
        });
    };
    
    
    // Function to remove a checklist item by id
    const removeChecklistItem = (itemId) => {
        setToDo(prevToDo => ({
            ...prevToDo,
            checklist: prevToDo.checklist.filter(item => item.id !== itemId) // Remove the checklist item with the specified id
        }));
    };

    return {
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
        setTextOrChecklist,
        handleNotesChange,
        handleChange,
        handleFormSubmit,
        handleTaskOrChecklistChange,
        createChecklistItem,
        removeChecklistItem
    };
}