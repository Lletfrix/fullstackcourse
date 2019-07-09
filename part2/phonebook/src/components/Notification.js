import React from 'react';

const Notification = ({message, error=false}) => {

    if (message == null){
        return null;
    }
    if(error){
        return (
            <div className='notification' style={{color:'red'}}>
                {message}
            </div>
        );
    }

    return (
        <div className='notification' style={{color:'green'}}>
            {message}
        </div>
    );
};

export default Notification;
