import {useEffect, useState} from 'react';
import todoServerAPI from '../api/todoServerAPI';
import Row from "./component/row";
import HeaderRow from './component/headerRow';

import getSelectedTaskId from './selector';

function Table () {

    // vairables

    // hooks
    const [isSelectAll, setIsSelectAll] = useState(false);
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

    const handleToggleSelectAll = () => {
        const newIsSelectAll = !isSelectAll;
        const newTaskCollection = taskCollection.slice();
        newTaskCollection.forEach( task =>{
            task.selectedState = newIsSelectAll;
        })
        setTaskCollection(newTaskCollection);
        setIsSelectAll(newIsSelectAll);

    }

    const handleCheckAllBtnClick = async () => {
        const {taskIdList, checkState} = getSelectedTaskId(taskCollection);
        if (taskIdList.length === 0){
            return;
        }
        try {
            await todoServerAPI.post(
                (!checkState) ? '/todo/check-a-list-of-task' : '/todo/uncheck-a-list-of-task',
                {
                    taskIdList: taskIdList,
                });
            await fetchTableContent();
            setIsSelectAll(false);
        } catch (error) {
            console.trace(error.message);
        }
    }

    const handleDeleteAllBtnClick = async () => {
        const {taskIdList} = getSelectedTaskId(taskCollection);
        if (taskIdList.length === 0){
            return;
        }
        try {
            await todoServerAPI.post(
                '/todo/remove-a-list-of-task',
                {
                    taskIdList: taskIdList,
                });
            await fetchTableContent();
            setIsSelectAll(false);
        } catch (error) {
            console.error(error.message);
        }
        
    }

    const handleToggleSelect = (index) => {
        // check or uncheck the checkbox selecter of a row
        const newTaskCollection = taskCollection.slice();
        newTaskCollection[index].selectedState = !taskCollection[index].selectedState;
        setTaskCollection(newTaskCollection);
    }

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
        <>
            <div className='table-header'>
                <HeaderRow
                    selecteAllState={isSelectAll}
                    onSelectAll={handleToggleSelectAll}
                    onCheckAll={handleCheckAllBtnClick}
                    onDeleteAll={handleDeleteAllBtnClick}    
                />
            </div>
            <div className='table-content'>
                {taskCollection.map((record, index) => {
                    const { taskId, selectedState, checkState, description } = record;
                    return(
                        <Row 
                            key={taskId}
                            index={index}
                            task={{taskId, selectedState, checkState, description}}
                            onToggleSelect={()=>handleToggleSelect(index)}
                            onCheck={()=>handleCheckBtnClick(index)}
                            onDelete={()=>handleDelBtnClick(index)}
                        />)}
                        )}
            </div>
        </>

    );
}

export default Table;