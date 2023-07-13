import { MdOutlineAdd } from 'react-icons/md'
import './style.css';

function AddNewTaskBtn ({onAddTask}) {
    return (
    <>
        <button 
                className='add-new-task-btn'
                title='add new task'
                onClick={onAddTask}>
            <MdOutlineAdd/>
        </button>
    </>
    )
}

export default AddNewTaskBtn;