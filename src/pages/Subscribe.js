//react
import React, { useState, useRef } from 'react';


//components
import Message from '../components/Message';
import PlanBox from '../components/PlanBox';


export default function Subscribe()
{
    
    const [message, setMessage] = useState([]);
    const [plan, setPlan] = useState([]);
    const subscribeEmailRef = useRef([]);
    const subscribePlanRef = useRef([]);

    const iconClose = require('../assets/img/icon/icon-close.svg').default;

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    function handleSubscribe(e)
    {
        let email = subscribeEmailRef.current.value;
        let plan = subscribePlanRef.current.value;

        if(email == '')
        {
            const newMessage = { 
                type: 'error', 
                title: "Missing email address!", 
                message: "You need to enter your email address to be able to subscribe to our services!"
            };
            setMessage(newMessage);
        }

        if(!validateEmail(email) && email != '')
        {
            const newMessage = { 
                type: 'error', 
                title: "Invalid email address!", 
                message: "You need to enter a valid email address!"
            };
            setMessage(newMessage);

            email = '';
        }

        if(plan == '')
        {
            const newMessage = { 
                type: 'error', 
                title: "There is no Plan selected!", 
                message: "Please, make sure you select a difficulty level before continuing!"
            };
            setMessage(newMessage);
        }

        if(email != '' && plan != '')
        {

            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    email: email,
                    plan: plan,
                    token: '[YOUR_SECRET_TOKEN]' 
                })
            };
            fetch('', requestOptions)
                .then(response => response.json())
                .then(messages => {console.log(messages);})
                .then(data => {
                    console.log('api call');
                })
                .catch(err => {
                    console.log("FAKE AJAX CALL => let's pretend it's valid for now" )
                    //console.log("Error Reading data " + err);
                    
                    //here would go the err msg in normal case
                    /*
                    const newMessage = { 
                        type: 'error', 
                        title: "There is no Plan selected!", 
                        message: "Please, make sure you select a difficulty level before continuing!"
                    };
                    setMessage(newMessage);
                    */
    
                    const newMessage = { 
                        type: 'success', 
                        title: "You've been subscribed!", 
                        message: "Thank you! You subscirbed to our " + plan + " plan! Now you only need to wait for our weekly emails ( please don't really! )"
                    };
                    setMessage(newMessage);
                });

        }

    }

    function handleCallback(plan)
    {
        setPlan(plan);
    }

    function toggleModal(e)
    {
        setPlan('');
    }

    return (
        <>
            <Message message={message} />
            <h1 className="page-title">New Sudoku every week</h1>
            <p className="page-subtitle">Get a new Sudoku with the level of your choice in your inbox weekly</p>
            <div id="plans" className="plan-container">
                <PlanBox plan="easy" onPlanSelect={handleCallback} />
                <PlanBox plan="medium" onPlanSelect={handleCallback} />
                <PlanBox plan="hard" onPlanSelect={handleCallback} />
            </div>
            
            <div id="newsletter-container" className={plan != ''?'modal-container shown':'modal-container'}>
                <div className="modal-close-layer" onClick={toggleModal}></div>
                <div className="modal">
                    <button className="modal-close" onClick={toggleModal}>
                        <img src={iconClose} />
                        Close
                    </button>
                    <h3 className="h3">You've choosen our <strong>{plan}</strong> Sudoku plan!</h3>
                    <p>To recieve our weekly emails fill out the form below</p>
                    <input
                        ref={subscribeEmailRef}
                        type='email'
                        className="input"
                        placeholder='eg. john.smith@mail.com'
                    />
                    <input
                        ref={subscribePlanRef}
                        type="hidden"
                        value={plan}
                    />
                    <button className="btn btn-primary" onClick={handleSubscribe}>Subscribe</button>
                </div>
            </div>
        </>
    );
}
