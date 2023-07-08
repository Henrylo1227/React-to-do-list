import './style.css';

function Row({ task, onCheck, onDelete, ...props}) {
    const checkStateClassName = task.checkState ? 'tb-fd-description checked' : 'tb-fd-description';
    return (
        <div className='table-row-container'>
            <input className='tb-fd-selector' type='checkbox'></input>
            <div className='tb-fd-index'>{task.index+1}</div>
            <div className={checkStateClassName}>{task.description}</div>
            <button className='tb-fd-checkbtn' onClick={onCheck}>check</button>
            <button className='tb-fd-delbtn' onClick={onDelete}>del</button>
        </div>
        );
}

export default Row;