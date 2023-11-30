import React, { useEffect, useState } from 'react'
import toast,{ Toaster } from 'react-hot-toast';
import { onMessageListner } from '../service/Firebase'



function Notification() {
    const [notification, setNotification] = useState({ title: '', body: '' })

    useEffect(() => {
        if(notification.title){
            notify()
        }
    }, [notification])
    
    const notify = () => toast(<TostDisplay/>,{ duration: 4000, position: 'top-right', })

    const TostDisplay = ()=>{
        return(
            <div>
                <h5>{notification.title}</h5>
                <p>{notification.body}</p>
            </div>
        )
    }

    onMessageListner()
        .then((payload) => {
            setNotification({title : payload.notification.title, body : payload.notification.title})
        })


    return (
        <Toaster />
    )
}

export default Notification