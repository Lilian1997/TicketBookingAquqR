import React from 'react';

function PickUpButton(props) {
    return (
        <>
           
            <div className="btn-group justify-content-center" role="group" aria-label="Basic radio toggle button group">
                <input
                    type="radio"
                    value="E"
                    checked={props.selectedOption === 'E'}
                    className="btn-check"
                    name="PickUpTicket"
                    id="TicketforMobile"
                    autoComplete="off"
                    onChange={props.PickUpHandler} />
                <label className="btn btn-outline-light fs-4" htmlFor="TicketforMobile">電子取票</label>

                <input
                    type="radio"
                    value="S"
                    checked={props.selectedOption === 'S'}
                    className="btn-check"
                    name="PickUpTicket"
                    id="TicketonSite"
                    autoComplete="off"
                    onChange={props.PickUpHandler} />
                <label className="btn btn-outline-light fs-4" htmlFor="TicketonSite">現場取票</label>

            </div>


        </>

    );
}

export default PickUpButton;
