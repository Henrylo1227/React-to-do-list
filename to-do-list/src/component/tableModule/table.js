import {useState} from 'react';

import Row from "./row";
function Table () {

    const [taskCollection, setTaskCollection] = useState(
        [
            {taskId:'01', selectedState: false, checkState: false, description: 'task1'},
            {taskId:'02', selectedState: false, checkState: false, description: 'task2'},
            {taskId:'04', selectedState: false, checkState: false, description: 'task3'},
            {taskId:'07', selectedState: false, checkState: false, description: 'task4'},
        ]
    )

    const handleCheckBtnClick = index => {
        // todo async server update
        
        // local update
        const newCollection = [...taskCollection];
        newCollection[index].checkState = !(newCollection[index].checkState);
        setTaskCollection(newCollection);
    }

    const handleDelBtnClick = (index) => {
        // todo async server update 

        // local update
        const upperCollection = taskCollection.slice(0, index);
        const lowerCollection = taskCollection.slice(index+1);
        const newCollection = upperCollection.concat(lowerCollection);
        setTaskCollection(newCollection);
    }   

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