import './style.css';
function AddNewTaskBtn ({onAddTask}) {
    return (
    <>
        <button className='add-new-task-btn' onClick={onAddTask}>Add New Task</button>
    </>
    )
}

export default AddNewTaskBtn;