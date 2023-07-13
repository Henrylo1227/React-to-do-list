import { BsCheck2 , BsTrash3 } from 'react-icons/bs';
import './style.css';

function Row({ index, task, onToggleSelect, onCheck, onDelete, ...props}) {
    const { selectedState, checkState, description } = task;
    const checkStateClassName = checkState ? 'tb-fd-description checked' : 'tb-fd-description';
    return (
        <div className='table-row-container'>
            <input id={`checkbox-${index}`}className='tb-fd-selector' type='checkbox' onChange={onToggleSelect} checked={selectedState}></input>
            <div className='tb-fd-index'>{index+1}</div>
            <div className={checkStateClassName}>{description}</div>
            <button className='tb-fd-btn' title='check task' onClick={onCheck}>
                <BsCheck2/>
            </button>
            <button className='tb-fd-btn' title='delete task' onClick={onDelete}>
                <BsTrash3/>
            </button>
        </div>
        );
}

export default Row;