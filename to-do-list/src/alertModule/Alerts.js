import Alert from "./Alert";
import './style.css'

function Alerts ({ alertList, onCloseAlert}) {
    return(
        <div className='alerts-container'>
                {alertList.map( (alert, index) => <Alert key={index} alert={alert} onClose={()=>onCloseAlert(index)} /> )}
        </div>
    )
}

export default Alerts;

