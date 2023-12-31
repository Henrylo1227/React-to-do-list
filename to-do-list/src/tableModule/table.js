import {useEffect, useState} from 'react';
import todoServerAPI from '../api/todoServerAPI';

import Row from "./component/row/row";
import HeaderRow from './component/row/headerRow';
import AddNewTaskBtn from './component/addNewTaskBtn/addNewTaskBtn';
import getSelectedTaskId from './component/selector/selector';
import CreateNewTaskModal from './modal/createNewTaskModal';

import Alerts from '../alertModule/Alerts';

import './style.css'

function Table () {

    // vairables

    // hooks
    const [isShowCreateTaskModal, setIsCreateTaskModal] = useState(false); 
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [taskCollection, setTaskCollection] = useState([]);
    const [alertList, setAlertList] = useState([]);

    // functions

    const addNewAlert = ({mode, message}) => {
        const newAlertList = alertList;
        newAlertList.push({mode, message});
        setAlertList(newAlertList);
    }

    const handleCloseAlert = (index) => {
        const newAlertList = alertList.slice(0, index);
        setAlertList(newAlertList.concat(alertList.slice(index+1)));
    }

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
            const message = `Failed to fetch data from server: ${error.message}`;
            console.error(message);
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

    const handleCheckSekectedBtnClick = async () => {
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
            addNewAlert({mode: 'success', message: `Successfully ${!checkState? 'check':'uncheck'} selected task`});
        } catch (error) {
            const message = `Failed to check selected task : ${error.message}`;
            addNewAlert({mode: 'error', message: message});
            console.trace(message);
        }
    }

    const handleDeleteSelectedBtnClick = async () => {
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
                addNewAlert({mode: 'success', message: `Successfully deleted task`});
            } catch (error) {
                const message = `Failed to delete selected task : ${error.message}`;
                addNewAlert({mode: 'error', message: message});
                console.trace(message);
            }
            
    }

    const handleToggleSelect = (index) => {
        // check or uncheck the checkbox selecter of a row
        const newTaskCollection = taskCollection.slice();
        newTaskCollection[index].selectedState = !taskCollection[index].selectedState;
        setTaskCollection(newTaskCollection);
    }

    const handleCheckBtnClick = async (index) => {
        const mode = taskCollection[index].checkState? 'uncheck' : 'check';
        // modify the check state of the task
        try {
            await todoServerAPI.post(
                '/todo/check-a-task', { taskId: taskCollection[index].taskId,}
                );
            // reload the update to date content from server
            await fetchTableContent();
            addNewAlert({mode: 'success', message: `Successfully ${mode}ed task`});
        } catch (error) {
            const message = `Failed to ${mode} task : ${error.message}`;
            addNewAlert({mode: 'error', message: message});
            console.trace(message);
        }
    }

    const handleDelBtnClick = async (index) => {
        // remove the task from the database
        try {
            await todoServerAPI.post(
                '/todo/remove-a-task', { taskId: taskCollection[index].taskId,}
            );
            // reload the update to date content from server
            await fetchTableContent();
            addNewAlert({mode: 'success', message: `Successfully deleted task`});
        } catch (error) {
            const message = `Failed to delete task : ${error.message}`;
            addNewAlert({mode: 'error', message: message});
            console.trace(message);
        }
    }

    useEffect( () => {
        fetchTableContent();
    }, [isShowCreateTaskModal]);

    return (
        <div className='table'> 
            <AddNewTaskBtn onAddTask={()=>setIsCreateTaskModal(true)}/>
            <Alerts alertList={alertList} onCloseAlert={handleCloseAlert}/>
            <div className='table-wrapper'>
                <div className='table-header'>
                    <HeaderRow
                        selecteAllState={isSelectAll}
                        onSelectAll={handleToggleSelectAll}
                        onCheckAll={handleCheckSekectedBtnClick}
                        onDeleteAll={handleDeleteSelectedBtnClick}    
                    />
                </div>
                <hr/>
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
                <CreateNewTaskModal 
                    isShow={isShowCreateTaskModal} 
                    onClose={()=>setIsCreateTaskModal(false)} 
                    onAlert={(e)=>addNewAlert(e)}/>
            </div>
             
        </div>

    );
}

export default Table;