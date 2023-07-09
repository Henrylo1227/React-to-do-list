import {useEffect, useState} from 'react';
import todoServerAPI from '../../api/todoServerAPI';
import Row from "./row";

function Table () {

    // vairables

    // hooks
    const [taskCollection, setTaskCollection] = useState([]);

    // functions
    const fetchTableContent = async () => {
        // Get all existing table content from the server
        try {
            const response = await todoServerAPI.get('/todo/all-task');
            const newTaskList = response.data;
            const newTaskCollection = []
            newTaskList.forEach( task => {
                const newTask = {
                    taskId: task.task_id,
                    selectedState: false,
                    checkState: task.check_state,
                    description: task.description,
                }
                newTaskCollection.push(newTask);
            });
            setTaskCollection(newTaskCollection);
        } catch (error) {
            console.error(error.message);
        }
    }

    // event handlers
    const handleCheckBtnClick = async (index) => {
        // modify the check state of the task
        try {
            await todoServerAPI.post(
                '/todo/check-a-task', { taskId: taskCollection[index].taskId,}
            );
        } catch (error) {
            console.error(error.message);
        }
        // reload the update to date content from server
        await fetchTableContent();
    }

    const handleDelBtnClick = async (index) => {
        // remove the task from the database
        try {
            await todoServerAPI.post(
                '/todo/remove-a-task', { taskId: taskCollection[index].taskId,}
            );
        } catch (error) {
            console.error(error.message);
        }
        // reload the update to date content from server
        await fetchTableContent();
    }

    useEffect( () => {
        fetchTableContent();
    }, []);

    return (
        <div className='table-content'>
            {taskCollection.map((record, index) => {
                return(
                    <Row 
                        key={record.taskId}
                        task={{ index: index, checkState: record.checkState, description: record.description,}}
                        onCheck={()=>handleCheckBtnClick(index)}
                        onDelete={()=>handleDelBtnClick(index)}/>)}
                )}
        </div>

    );
}

export default Table;