import './style.css';
import { RxCross1 } from 'react-icons/rx';

function Alert({ alert, onClose }) {
    if ( alert === null ) {
        return;
    }

    const {mode, message} = alert;
    const alertClassName = `alert ${mode}` // error, success, status

    return (
        <>
            <div className='alert-container'>
                <div className={alertClassName} >
                    {message}
                    <button className='remove-btn' onClick={onClose}>
                        <RxCross1 className='btn-icon'/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Alert;