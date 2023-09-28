import React, { Fragment, useContext, useEffect, useState } from 'react';
import TicketListCheck from './TicketListCheck';
import AccorditionTicketCheck from './AccorditionTicketCheck';
import { ContextA } from "./ContextA";
import axios from 'axios';
import { useHistory } from "react-router-dom";



function Check() {
    const navigate = useHistory();

    const { OrderPass, setOrderPass } = useContext(ContextA);
    const { OrderID, setOrderID } = useContext(ContextA);
    const { OrderDate, setOrderDate } = useContext(ContextA);
    const { OrderSession, setOrderSession } = useContext(ContextA);


    const [OrderListInCheck, setOrderListInCheck] = useState([]);

    const OrderListInCheckDetails = async () => {

        let url = "http://localhost:2407/Ticket/Cart/OrderListInCheck";
        let Detail;

        await axios.post(url, { OrderID: OrderID })
            .then(function (response) {
                console.log(response.data.data);
                Detail = response.data.data
                setOrderListInCheck(Detail);

            }).catch(function (error) {

                console.log(error);
            });
    }

    // 票的內容

    const [TicketInCheck, setTicketInCheck] = useState([]);

    const TicketInCheckDetails = async () => {

        let url = "http://localhost:2407/Ticket/Cart/CheckList";

        let Detail;
        await axios.post(url, { OrderID: OrderID })
            .then(function (response) {
                console.log(response.data.data);
                Detail = response.data.data
                setTicketInCheck(Detail);

            }).catch(function (error) {

                console.log(error);
            });
    }

    useEffect(() => {
        TicketInCheckDetails();
        OrderListInCheckDetails();

    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <Fragment>
            <div className="testpage">
                <div className="bgImg"></div>


                <div className='CheckContainer  container'>

                    <div className="d-flex justify-content-center p-5">
                        <div className="title_ticket">
                            購票 - 訂單完成
                        </div>
                    </div>


                    <div className="d-flex justify-content-center">
                        <div className="shoppingSOPbox">
                            <div
                                className=" text-light shoppingSOP"
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
                                className="shoppingSOP"
                            >
                                線上
                                <br />
                                付款
                            </div>

                            <div className="linebox">
                                <div className="line"></div>
                            </div>

                            <div
                                className="shoppingSOP bg-warning text-dark "
                            >
                                訂單
                                <br />
                                確認
                            </div>
                        </div>
                    </div>

                    <div className="reminderContainer">
                        <div className="FieldTitle text-warning">您的訂單已完成！</div>
                    </div>

                    <div className='px-3'>

                        {OrderListInCheck.map(function (item, index) {

                            return (
                                <TicketListCheck
                                    key={index}
                                    orderId={item.order_id}
                                    orderTime={item.order_time}
                                    customerName={item.customer_name}
                                    pickUpPersonName={item.pickup_person_name}
                                    date={item.date}
                                    session={item.session}
                                    adultTicketNum={item.adult_tickets}
                                    studentTicketNum={item.student_tickets}
                                    childTicketNum={item.child_tickets}
                                    charityTicketNum={item.charity_tickets}
                                    pickupMethod={item.ticket_pickup_method}

                                />
                            );
                        })}


                        <div className="reminderContainer px-3 mb-4">
                            <span className="fs-4 fw-bolder text-light">如需退票，請至</span>
                            <a href="" className="btn mx-2 btn-outline-light rounded-0 p-3 animate__animated animate__fadeInUp">訂票紀錄查詢</a>
                        </div>



                        <div className="infoField text-center">
                            <div className="FieldTitle">電子票券</div>


                            <div
                                className="accordion accordion-flush"
                                id="accordionPanelsStayOpenExample"
                            >
                                {TicketInCheck.map(function (item, index) {

                                    return (
                                        <AccorditionTicketCheck
                                            key={index}
                                            index={index}
                                            type={item.ticket_type}
                                            ticketId={item.ticket_id}
                                            qrcode={item.qrcode}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                    <br />
                </div>
            </div>
        </Fragment>
    )
}


export default Check;