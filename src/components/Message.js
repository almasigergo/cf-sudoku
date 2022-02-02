import React, { useState, useEffect } from 'react';

export default function Message({message}) {

    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        toggleModal();
    }, [message]);

    message.close = require('../assets/img/icon/icon-close.svg').default;
  
    switch (message.type)
    {
        case 'success':
            message.icon = require('../assets/img/icon/icon-check.svg').default;
            return <ModalLayout data={message} />
        case 'error':
            message.icon = require('../assets/img/icon/icon-cross.svg').default;
            return <ModalLayout data={message} />
        default:
            return null;
    }

    function ModalLayout({data})
    {
        let modal = {data}.data;
        let classList = 'modal ' + modal.type;
        let icon = modal.icon;
        let close = modal.close;
        let title = modal.title;
        let msg = modal.message;

        return (
            <>
                <div id="message-container" className={showModal?'modal-container shown':'modal-container'}>
                    <div className="modal-close-layer" onClick={toggleModal}></div>
                    <div className={classList}>
                        <button className="modal-close" onClick={toggleModal}>
                            <img src={close} />
                            Close
                        </button>
                        <div className="modal-icon">
                            <img src={icon} />
                        </div>
                        <h3 className="h3">{title}</h3>
                        <p>{msg}</p>
                    </div>
                </div>
                
            </>
        );
        
    }

    function toggleModal(e)
    {
        setShowModal(prev => !prev);
    }
}
