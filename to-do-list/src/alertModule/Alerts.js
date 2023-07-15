import { useState } from "react";
import Alert from "./Alert";
import './style.css'
function Alerts () {

    const [alertList, setAlertList] = useState([
        {mode: 'success', message: 'success message'},
        {mode: 'error', message: 'error message'},
    ]);

    return(
        <div className='alerts-container'>
            <div>
                {alertList.map(alert => <Alert alert={alert}/>)}
            </div>
        </div>
    )
}

export default Alerts;

