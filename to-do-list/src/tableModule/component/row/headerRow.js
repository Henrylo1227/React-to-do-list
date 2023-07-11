import './style.css';

function HeaderRow({ selecteAllState, onSelectAll, onCheckAll, onDeleteAll }){
    
    return (
        <div className="table-row-container"> 
            <input id='checkbox-all' className='tb-fd-selector' type='checkbox' onChange={onSelectAll} checked={selecteAllState}></input>
            <div className='tb-fd-index header'>#</div>
            <div className='tb-fd-description header'>Task</div>
            <button className='tb-fd-checkbtn header' onClick={onCheckAll}>check selected</button>
            <button className='tb-fd-delbtn header' onClick={onDeleteAll}>delete selected</button>
        </div>
    );
}

export default HeaderRow;