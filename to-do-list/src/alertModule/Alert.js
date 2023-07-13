import './style.css';
import LoadingSpinner from '../util/loadingSpinner/loadingSpinner';

function Alert({ alert }) {
    if ( alert === null ) {
        return;
    }

    const {mode, message} = alert;
    const alertClassName = `alert ${mode}` // error, success

    return (
        <>
            <div className='alert-container'>
                <div className={alertClassName}>
                    {(mode==='status') && <LoadingSpinner/>}
                    {message}
                </div>
            </div>
        </>
    )
}

export default Alert;