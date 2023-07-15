import { BsCheckLg , BsTrash3Fill } from 'react-icons/bs';
import './style.css';


function HeaderRow({ selecteAllState, onSelectAll, onCheckAll, onDeleteAll }){
    
    return (
        <div className="row">
            <div className='header-container'>
                <input id='checkbox-all' className='tb-fd checkbox' type='checkbox' onChange={onSelectAll} checked={selecteAllState}></input>
                <div className='tb-fd header'>#</div>
                <div className='description header'>Task</div>
                <button 
                    className='tb-fd check-selected btn' 
                    title='check selected tasks'
                    onClick={onCheckAll}>
                    <BsCheckLg className='btn-icon'/>
                </button>
                <button 
                    className='tb-fd delete-selected btn' 
                    title='delete selected tasks'
                    onClick={onDeleteAll}>
                    <BsTrash3Fill className='btn-icon'/>
                </button>
            </div>
        </div>

    );
}

export default HeaderRow;