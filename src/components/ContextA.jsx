import React, { createContext, useState } from "react";
import axios from 'axios';

export const ContextA = createContext();


const ContextProvider = ({ children }) => {

    const [OrderPass, setOrderPass] = useState([]);
    const [OrderID, setOrderID] = useState('');
    const [OrderDate, setOrderDate] = useState('');
    const [OrderSession, setOrderSession] = useState('');
    const [timeleft, setTimeleft] = useState('');
    const [timeStartClear, setTimeStartClear] = useState(false);
    const [timeoutID, setTimeoutID] = useState('');
    const [timeoutExecuted, setTimeoutExecuted] = useState(false);


    // 取消訂單insert
    const cancelOrder = async () => {

        let data = {
            OrderID: OrderID,
        }

        await axios
            .post("http://localhost:2407/Ticket/CancelOrder", data)
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Order canceled successfully");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // 取消票券
    const cancelTicket = async () => {

        let data = {
            OrderID: OrderID,
        }

        await axios
            .post("http://localhost:2407/Ticket/cancelTicket", data)
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Order canceled successfully");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };


    // 取消票券後要修改票券總數
    const cancelOrderChangeremain = async () => {

        let data = {
            count: OrderPass.reduce((acc, element) => acc + element.count, 0),
            date: OrderDate,
            session: OrderSession
        }

        await axios
            .post("http://localhost:2407/Ticket/cancelOrderChangeremain", data)
            .then(function (response) {
                if (response.status === 200) {
                    console.log("Change remain successfully");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    // 計時器
    const startTimer = (duration, display) => {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.innerText = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    return (
        <ContextA.Provider
            value={{
                OrderPass, setOrderPass,
                OrderID, setOrderID, OrderDate, setOrderDate, OrderSession,
                setOrderSession, timeleft, setTimeleft,
                cancelOrderChangeremain, cancelTicket, cancelOrder, startTimer,
                timeStartClear, setTimeStartClear,
                timeoutID, setTimeoutID,
                timeoutExecuted, setTimeoutExecuted
            }}>
            {children}
        </ContextA.Provider>
    )
}




export default ContextProvider;

