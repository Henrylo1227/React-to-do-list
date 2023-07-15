import { BsCheck2 , BsTrash3 } from 'react-icons/bs';
import './style.css';

function Row({ index, task, onToggleSelect, onCheck, onDelete, ...props}) {
    const { selectedState, checkState, description } = task;
    const checkStateClassName = checkState ? 'description checked' : 'description';
    return (
        <div className='row'>
            <div className='record-container'>

                <input id={`checkbox-${index}`} className='tb-fd checkbox' type='checkbox' onChange={onToggleSelect} checked={selectedState}></input>
                <div className='tb-fd'>{index+1}</div>
                <div className={checkStateClassName}>{description}</div>
                <button className='tb-fd check btn' title='check task' onClick={onCheck}>
                    <BsCheck2 className='btn-icon'/>
                </button>
                <button className='tb-fd delete btn' title='delete task' onClick={onDelete}>
                    <BsTrash3 className='btn-icon'/>
                </button>
            </div>
        </div>
        );
}

export default Row;