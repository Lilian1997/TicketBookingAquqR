import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import InputFieldPay from './InputFieldPay';
import axios from 'axios';
import { ContextA } from "./ContextA";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function CreditCard() {
    const navigate = useHistory();

    const { OrderPass, setOrderPass } = useContext(ContextA);
    const { OrderID, setOrderID } = useContext(ContextA);
    const { OrderDate, setOrderDate } = useContext(ContextA);
    const { OrderSession, setOrderSession } = useContext(ContextA);
    const { timeleft, setTimeleft } = useContext(ContextA);
    const { cancelTicket } = useContext(ContextA);
    const { cancelOrder } = useContext(ContextA);
    const { cancelOrderChangeremain } = useContext(ContextA);
    const { startTimer } = useContext(ContextA);
    const { timeStartClear, setTimeStartClear } = useContext(ContextA);
    const { timeoutID, setTimeoutID } = useContext(ContextA);
    const { timeoutExecuted, setTimeoutExecuted } = useContext(ContextA);

    const [somethingWrongShow, setSomethingWrongShow] = useState(false);
    const handleSomethingWrongShow = () => setSomethingWrongShow(true);
    const handleSomethingWrongClose = () => setSomethingWrongShow(false);

    const [isNotCompletedShow, setIsNotCompletedShow] = useState(false);
    const handleIsNotCompletedShow = () => setIsNotCompletedShow(true);
    const handleIsNotCompletedClose = () => setIsNotCompletedShow(false);

    const [isCanceledShow, setIsCanceledShow] = useState(false);
    const handleIsCanceledShow = () => setIsCanceledShow(true);
    const handleIsCanceledClose = () => setIsCanceledShow(false);



    const [inputFieldCard, setInputFieldCard] = useState({
        CardNumber: "",
        CardDeadlineMonth: "",
        CardDeadlineYear: "",
        CardLastThree: "",

    });

    let NewOrderPass = [0, 0, 0, 0];

    for (let i = 0; i < OrderPass.length; i++) {
        switch (OrderPass[i].Name) {
            case '成人票':
                NewOrderPass[0] = OrderPass[i].count;
                break;
            case '學生票':
                NewOrderPass[1] = OrderPass[i].count;
                break;
            case '孩童票':
                NewOrderPass[2] = OrderPass[i].count;
                break;
            case '博愛票':
                NewOrderPass[3] = OrderPass[i].count;
                break;


        }
    }


    const handleChangeEventCard = (e) =>
        setInputFieldCard({ ...inputFieldCard, [e.target.name]: e.target.value });



    const [isCardValid, setIsCardValid] = useState(true);
    const [isCardEmpty, setIsCardEmpty] = useState(true);
    const [isCardLastThreeValid, setIsCardLastThreeValid] = useState(true);
    const [isCardLastThreeEmpty, setIsCardLastThreeEmpty] = useState(true);
    const [isDeadlineMMValid, setIsDeadlineMMValid] = useState(true);
    const [isDeadlineYYValid, setIsDeadlineYYValid] = useState(true);
    const [isDeadlineMMEmpty, setIsDeadlineMMEmpty] = useState(true);
    const [isDeadlineYYEmpty, setIsDeadlineYYEmpty] = useState(true);



    const handleSubmitCard = (event) => {

        if (isCardValid && isCardLastThreeValid && isDeadlineMMValid && isDeadlineYYValid
            && !isCardEmpty && !isCardLastThreeEmpty && !isDeadlineMMEmpty && !isDeadlineYYEmpty) {

            event.preventDefault();
            let url = "http://localhost:2407/Ticket/CreditCard";
            let sendData = {
                order_id: OrderID ? OrderID : Math.random() * 100,
                CardNumber: inputFieldCard.CardNumber,
                CardDeadlineMonth: inputFieldCard.CardDeadlineMonth,
                CardDeadlineYear: inputFieldCard.CardDeadlineYear,
                CardLastThree: inputFieldCard.CardLastThree,

            };
            console.log(sendData);
            axios
                .post(url, sendData)
                .then(function (response) {
                    if ((response.status = 200)) {

                        if (timeStartClear) {

                            window.clearTimeout(timeoutID);
                            console.log(timeoutID);
                            navigate.push("/Ticket/Check");
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    handleSomethingWrongShow();

                });


        } else {
            handleIsNotCompletedShow();
        }
    };

    const [checkCanceledShow, setCheckCanceledShow] = useState(false);
    const handleCheckCanceledShow = () => setCheckCanceledShow(true);
    const handleCheckCanceledClose = () => setCheckCanceledShow(false);

    const [canceledShow, setcanceledShow] = useState(false);
    const handleCanceledShow = () => setcanceledShow(true);
    const handleCanceledClose = () => {setcanceledShow(false); window.location = "/Ticket/Cart";}

    const [isChangeRemain, setIsChangeRemain] = useState(true);

    const handleCancel = async () => {

        setIsChangeRemain(false);

        await cancelTicket();
        await cancelOrderChangeremain();
        await cancelOrder();
        handleCheckCanceledClose();
        handleCanceledShow();

    }


    let timePass = parseInt(timeleft.substr(0, 2)) * 60 + parseInt(timeleft.slice(3));



    useEffect(() => {
        let display = document.querySelector('#time2');
        startTimer(timePass, display);
    }, []);


    useBeforeunload(OrderPass.length !== 0 ? async (event) => {
        if (!timeoutExecuted) {

            event.preventDefault();
            await cancelOrder();
            await cancelTicket();

            if(isChangeRemain){

                await cancelOrderChangeremain();
            }
        }
    } : null)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Fragment>

            <div className="testpage">
                <div className="bgImg"></div>


                <div className='CreditCardContainer container'>

                    <div className="d-flex justify-content-center p-5">
                        <div className="title_ticket">
                            購票 - 交易付款
                        </div>
                    </div>


                    <div className="d-flex justify-content-center">
                        <div className="shoppingSOPbox mb-5">
                            <div
                                className="shoppingSOP"
                            >
                                選購
                                <br />
                                票券
                            </div>

                            <div className="linebox">
                                <div className="line"></div>
                            </div>

                            <div
                                className="shoppingSOP"
                            >
                                填寫
                                <br />
                                資料
                            </div>

                            <div className="linebox">
                                <div className="line"></div>
                            </div>

                            <div
                                className="shoppingSOP bg-warning text-dark "
                            >
                                線上
                                <br />
                                付款
                            </div>

                            <div className="linebox">
                                <div className="line"></div>
                            </div>

                            <div
                                className="shoppingSOP"
                            >
                                訂單
                                <br />
                                確認
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center pb-2 text-center'>

                        <div className='Timer'>請在 <span id="time2">{ }</span> 內完成資料填寫與付款流程，逾時將清除選購票券！</div>
                    </div>


                    <div className="infoField CreditCardBox">

                        <div className='d-flex justify-content-center'>
                            <div >
                                <div className=''>
                                    <span className='Infolabel text-end '>訂單編號：</span>
                                    <span id="Card_orderNumber" className='Infolabel text-start '>{OrderID}</span>
                                </div>

                                <div>
                                    <span className='Infolabel text-end'>訂單金額：</span>
                                    <span id="Card_amount" className='Infolabel text-start'>
                                        TWD ${NewOrderPass[0] * 300 + NewOrderPass[1] * 250 + NewOrderPass[2] * 200 + NewOrderPass[3] * 200}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr />



                        <InputFieldPay
                            title="卡號*"
                            type="text"
                            name="CardNumber"
                            required={true}
                            handleChangeEvent={handleChangeEventCard}
                            pattern="[0-9]{16}"
                            placeholder="0000-0000-0000-0000"
                            maxLength="16"
                            handleBlurEvent={(e) => {
                                if (e.target.value.length > 0) {
                                    setIsCardEmpty(false);
                                    console.log("OK");
                                    const { name, value } = e.target;
                                    console.log(e.target.name);

                                    // 在這裡使用正則表達式進行驗證;
                                    let isValid = true;

                                    const regex = /[0-9]{16}/; // 電子郵件的正則表達式示例
                                    isValid = regex.test(value);
                                    if (!isValid) {
                                        setIsCardValid(false);
                                        console.log("失敗");
                                    } else {
                                        setIsCardValid(true);
                                        console.log("成功");
                                    }
                                } else {
                                    setIsCardEmpty(true);
                                    console.log("不得為0");
                                }
                            }}
                            isEmpty={isCardEmpty}
                            errMessage={isCardEmpty ? "卡號不得為空白" : null}
                            isValid={isCardValid}
                            validMessage="請輸入有效的卡號"

                        />

                        <div className="row CreditInputBox">
                            <div className="col-12 col-md-4 text-center text-md-start">
                                <label className="form-label Infolabel" htmlFor="CardDeadlineMonth">有效期限*</label>
                            </div>
                            <div className="col-12 col-md-8 text-center text-md-start">
                                <div className="d-flex align-items-center">

                                    <div>
                                        <input type="text"
                                            className="border-0 border-bottom d-inline-block Input text-center"
                                            id="CardDeadlineMonth"
                                            name="CardDeadlineMonth"
                                            // pattern="[0-9]{2}"
                                            placeholder="MM"
                                            // required
                                            maxLength="2"
                                            onChange={handleChangeEventCard}
                                            onBlur={(e) => {
                                                if (e.target.value.length > 0) {
                                                    setIsDeadlineMMEmpty(false);
                                                    console.log("OK");
                                                    const { name, value } = e.target;
                                                    console.log(e.target.name);

                                                    // 在這裡使用正則表達式進行驗證;
                                                    let isValid = true;

                                                    const regex = /[0-9]{2}/; // 電子郵件的正則表達式示例
                                                    isValid = regex.test(value);
                                                    if (!isValid) {
                                                        setIsDeadlineMMValid(false);
                                                        console.log("失敗");
                                                    } else {
                                                        setIsDeadlineMMValid(true);
                                                        console.log("成功");
                                                    }
                                                } else {
                                                    setIsDeadlineMMEmpty(true);
                                                    console.log("不得為0");
                                                }
                                            }}
                                        />

                                        {isDeadlineMMEmpty ? (
                                            <div className="isEmptyText mb-0 animate__animated  animate__flash">
                                                有效月份不得為空
                                            </div>
                                        ) : null}
                                        {isDeadlineMMValid ? null : (
                                            <div className="isEmptyText mb-0 animate__animated  animate__flash">
                                                請輸入有效的月份
                                            </div>
                                        )}
                                    </div>

                                    <div className='dash'>
                                        -

                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            className="border-0 border-bottom d-inline-block Input text-center"
                                            id="CardDeadlineYear"
                                            name="CardDeadlineYear"
                                            // pattern="[0-9]{2}"
                                            placeholder="YY"
                                            // required 
                                            maxLength="2"
                                            onChange={handleChangeEventCard}
                                            onBlur={(e) => {
                                                if (e.target.value.length > 0) {
                                                    setIsDeadlineYYEmpty(false);
                                                    console.log("OK");
                                                    const { name, value } = e.target;
                                                    console.log(e.target.name);

                                                    // 在這裡使用正則表達式進行驗證;
                                                    let isValid = true;

                                                    const regex = /[0-9]{2}/; // 電子郵件的正則表達式示例
                                                    isValid = regex.test(value);
                                                    if (!isValid) {
                                                        setIsDeadlineYYValid(false);
                                                        console.log("失敗");
                                                    } else {
                                                        setIsDeadlineYYValid(true);
                                                        console.log("成功");
                                                    }
                                                } else {
                                                    setIsDeadlineYYEmpty(true);
                                                    console.log("不得為0");
                                                }
                                            }}

                                        />

                                        {isDeadlineYYEmpty ? (
                                            <div className="isEmptyText mb-0 animate__animated  animate__flash">
                                                有效年份不得為空
                                            </div>
                                        ) : null}

                                        {isDeadlineYYValid ? null : (
                                            <div className="isEmptyText mb-0 animate__animated  animate__flash">
                                                請輸入有效的年份
                                            </div>
                                        )}
                                    </div>
                                </div>


                            </div>
                        </div>


                        <InputFieldPay
                            title="末三碼*"
                            type="password"
                            name="CardLastThree"
                            required={true}
                            handleChangeEvent={handleChangeEventCard}
                            pattern="[0-9]{3}"
                            placeholder="000"
                            maxLength="3"
                            handleBlurEvent={(e) => {
                                if (e.target.value.length > 0) {
                                    setIsCardLastThreeEmpty(false);
                                    console.log("OK");
                                    const { name, value } = e.target;
                                    console.log(e.target.name);

                                    // 在這裡使用正則表達式進行驗證;
                                    let isValid = true;

                                    const regex = /[0-9]{3}/; // 電子郵件的正則表達式示例
                                    isValid = regex.test(value);
                                    if (!isValid) {
                                        setIsCardLastThreeValid(false);
                                        console.log("失敗");
                                    } else {
                                        setIsCardLastThreeValid(true);
                                        console.log("成功");
                                    }
                                } else {
                                    setIsCardLastThreeEmpty(true);
                                    console.log("不得為0");
                                }
                            }}
                            isEmpty={isCardLastThreeEmpty}
                            errMessage={isCardLastThreeEmpty ? "末三碼不得為空白" : null}
                            isValid={isCardLastThreeValid}
                            validMessage="請輸入有效的末三碼"
                        />


                    </div>


                    <div className="d-flex justify-content-center pb-5">
                        <button id="SureToPay" type="buttom"
                            className="btn-lg me-5 btn btn-outline-light rounded-0 p-3 animate__animated animate__fadeInUp"
                            onClick={handleSubmitCard}
                        >
                            確定付款</button>
                        <button id="cancelPay" className="btn-lg btn btn-outline-warning rounded-0 p-3 animate__animated animate__fadeInUp"

                            onClick={handleCheckCanceledShow}

                        >取消</button>
                    </div>



                    <Modal show={checkCanceledShow} onHide={handleCheckCanceledClose} className="modalAlert">

                        <Modal.Header className="text-center text-dark" closeButton>取消付款</Modal.Header>
                        <Modal.Body className="fs-6 text-dark">確定要取消嗎？這筆訂單將不會被保留</Modal.Body>
                        <Modal.Footer className="">
                            <Button variant="warning" onClick={handleCheckCanceledClose}
                                className="rounded-0"
                            >
                                繼續付款
                            </Button>

                            <Button variant="danger" onClick={handleCancel}
                                className="rounded-0 text-light"
                            >
                                取消付款
                            </Button>

                        </Modal.Footer>
                    </Modal>

                </div>
            </div>

            <Modal show={somethingWrongShow} onHide={handleSomethingWrongClose} className="modalAlert">

                <Modal.Body className="text-center text-dark">發生一些問題，請重新選購！</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="warning" onClick={handleSomethingWrongClose}
                        className="rounded-0"
                    >
                        確定
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal show={isNotCompletedShow} onHide={handleIsNotCompletedClose} className="modalAlert">

                <Modal.Body className="text-center text-dark">尚有欄位未填寫完成！</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="warning" onClick={handleIsNotCompletedClose}
                        className="rounded-0"
                    >
                        確定
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal show={isCanceledShow} onHide={handleIsCanceledClose} className="modalAlert">

                <Modal.Body className="text-center text-dark">付款時間超過，票券已被清除，請重新選購！</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="warning" onClick={handleIsCanceledClose}
                        className="rounded-0"
                    >
                        確定
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal show={canceledShow} onHide={handleCanceledClose} className="modalAlert">

                <Modal.Body className="text-center text-dark">本筆訂單已取消！</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="warning"
                        onClick={() => {

                            handleCanceledClose();
                           
                        }}
                        className="rounded-0"
                    >
                        確定
                    </Button>

                </Modal.Footer>
            </Modal>

        </Fragment>
    )
}


export default CreditCard;