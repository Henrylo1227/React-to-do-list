import { MdOutlineAdd } from 'react-icons/md'
import './style.css';

function AddNewTaskBtn ({onAddTask}) {
    return (
    <div id='add-new-task-btn-container'>
        <button 
                className='add-new-task-btn'
                title='add new task'
                onClick={onAddTask}>
            <MdOutlineAdd/>
        </button>
    </div>
    )
}

export default AddNewTaskBtn;