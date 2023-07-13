import { BsCheckLg , BsTrash3Fill } from 'react-icons/bs';
import './style.css';


function HeaderRow({ selecteAllState, onSelectAll, onCheckAll, onDeleteAll }){
    
    return (
        <div className="table-row-container"> 
            <input id='checkbox-all' className='tb-fd-selector' type='checkbox' onChange={onSelectAll} checked={selecteAllState}></input>
            <div className='tb-fd-index header'>#</div>
            <div className='tb-fd-description header'>Task</div>
            <button 
                className='tb-fd-btn' 
                title='check selected tasks'
                onClick={onCheckAll}>
                <BsCheckLg/>
            </button>
            <button 
                className='tb-fd-btn' 
                title='delete selected tasks'
                onClick={onDeleteAll}>
                <BsTrash3Fill/>
            </button>
        </div>
    );
}

export default HeaderRow;