import { createPortal } from 'react-dom';
import { RxCross1 } from 'react-icons/rx';
import './style.css';
import todoServerAPI from '../../api/todoServerAPI';
function CreateNewTaskModal({isShow, onClose, onAlert}) {    
    
    const handleSubmit = async (e) => {
        // prevent reloading
        e.preventDefault();
        
        // read form data
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        
        if (formJson.description === '') {
            return;
        }

        try {
            await todoServerAPI.post(
                '/todo/add-task',
                {
                    description: formJson.description, 
                }
            );
            onAlert({mode: 'success', message: 'Successfully create new task'});
            onClose();
        } catch (error) {
            const message = `Failed to create new task: ${error.message}`;
            onAlert({mode: 'error', message: message})
        }
    }

    if (!isShow) {
        return null;
    }
    
    return createPortal(
        <>
            <div className='overlay' onClick={onClose}></div>
            <div className="modal-container">
                <div className="modal-title">
                    <h2>Create New Task
                        <button className='close-btn' onClick={onClose}>
                            <RxCross1 className='btn-icon'/>
                        </button>                
                    </h2>
                </div>
                <div className='modal-form-container'>
                    <form className='modal-form' method='post' onSubmit={handleSubmit}>
                        <label>Task Description</label>
                        <input type="text" name="description" placeholder='task description ...'/>
                        <button className="submit-btn" name='submit' type='submit' >Create</button>  
                    </form>
                </div>            
            </div>
        </>
    , document.getElementById('portal'))
}

export default CreateNewTaskModal;