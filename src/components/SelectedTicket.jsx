import React, { Fragment, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function SelectedTicketype({
  SelectedTicketContent,
  selectedTickets,
  calculateTotalPrice,
  Delete,
  AvailableCheck

}) {
  const [SelectedCount, setSelectedCount] = useState(
    parseInt(SelectedTicketContent.count)
  );

  const [noTicketshow, setNoTicketShow] = useState(false);
  const handleNoTicketShow = () => setNoTicketShow(true);
  const handleNoTicketClose = () => setNoTicketShow(false);


  let NewInputValue = {};
  let updatedTickets = [];

  const Minus = (e) => {

    let NewCount = SelectedCount - 1;

    if (NewCount < 0) {
      NewCount = 0;
    }

    setSelectedCount(NewCount);

    if (NewCount === 0) {
      Delete(e);
    }


    NewInputValue = [...selectedTickets];

    updatedTickets = NewInputValue.map((item) => {
      if (e.target.name == item.Label) {
        item.count = NewCount;
        return item;
      } else {
        return item;
      }
    });
    updatedTickets = updatedTickets.filter((item) => item.count !== "");

    calculateTotalPrice(selectedTickets);
  };

  const Increment = async (e) => {

    let isAvailable = await AvailableCheck(true);


    if (isAvailable) {

      let NewCount = SelectedCount + 1;

      if (NewCount > 15) {
        NewCount = 15;
      }

      setSelectedCount(NewCount);

      NewInputValue = [...selectedTickets];

      updatedTickets = NewInputValue.map((item) => {
        if (e.target.name == item.Label) {
          item.count = NewCount;
          return item;
        } else {
          return item;
        }
      });
      updatedTickets = updatedTickets.filter((item) => item.count !== "");

      calculateTotalPrice(selectedTickets);

    } else {
      setNoTicketShow(true);
    }
  };

  const AutoTicketCount = (e) => {
    console.log(e.target.value);
    if (e.target.value < 0 || e.target.value == NaN) {
      e.target.value = 0;
    } else if (e.target.value > 15) {
      e.target.value = 15;
    }

    setSelectedCount(e.target.value);

    NewInputValue = [...selectedTickets];
    console.log(NewInputValue);

    updatedTickets = NewInputValue.map((item) => {
      if (e.target.name == item.Label) {
        item.count = parseInt(e.target.value);
        return item;
      } else {
        return item;
      }
    });
    updatedTickets = updatedTickets.filter((item) => item.count !== "");
    console.log(updatedTickets);
    calculateTotalPrice(selectedTickets);
  };

  const HandleBlur = (e) => {

    let NewCount = parseInt(e.target.value);

    if (NewCount < 1 || isNaN(NewCount)) {
      Delete(e);
    }
  };


  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });


  return (
    <Fragment>

      {(isMobile === false) ?


        (<div
          className="mt-3 card2"
          key={SelectedTicketContent.id}
          id={`InCart_${SelectedTicketContent.Label}`}
        >
          <div className="d-flex row mx-0 align-items-center">
            <div className="col-2 CartListText d-flex form-check align-items-center px-0">
              <label>
                <div>一般入館</div>
                <div className="fw-semibold TicketName">{SelectedTicketContent.Name}</div>
              </label>
            </div>

            <div
              className="col-3 CartListText ps-0"
              id={`InCart_${SelectedTicketContent.Label}TicketPrice`}
            >
              {`TWD $${SelectedTicketContent.TicketPrice}`}
            </div>

            <div className="col-3 d-flex justify-content-center px-0">
              <button
                className="btn btn-outline-light CartBtn CartListText"
                id={`InCart_${SelectedTicketContent.Label}_Minus`}
                onClick={Minus}
                name={SelectedTicketContent.Label}
              >
                -
              </button>

              <input
                className="CartCount CartListText hide-arrows text-light"
                value={SelectedCount}
                type="number"
                min="0"
                max="15"
                id={`InCart_${SelectedTicketContent.Label}Ticket_Amount`}
                onChange={AutoTicketCount}
                onBlur={HandleBlur}
                name={SelectedTicketContent.Label}
              />

              <button
                className="btn btn-outline-light CartBtn CartListText"
                id={`InCart_${SelectedTicketContent.Label}_Plus`}
                onClick={Increment}
                name={SelectedTicketContent.Label}
              >
                +
              </button>
            </div>

            <div
              className="col-3 CartListText ps-0"
              id={`InCart_${SelectedTicketContent.Label}TicketPrice_Amount`}
            >
              {`TWD $${isNaN(SelectedCount)
                ? 0
                : SelectedCount * SelectedTicketContent.TicketPrice
                }`}
            </div>

            <div className="col-1 CartListText px-0">
              <button
                className="btn btn-danger Cart_DeleteBtn"
                id={`InCart_${SelectedTicketContent.Label}Ticket_Delete`}
                onClick={Delete}
                name={SelectedTicketContent.Label}
              >
                刪除
              </button>
            </div>
          </div>
        </div>)

        :


        (<div
          className="mt-3 Ticketincart card2"
          key={SelectedTicketContent.id}
          id={`InCart_${SelectedTicketContent.Label}`}
        >
          <div className="d-flex row mx-0 align-items-center justify-content-center">

            <div className='row align-items-center justify-content-center'>


              <div className="col-5 CartListText d-flex form-check align-items-center px-0">
                <label>
                  <div className='px-2 normalEntry'>一般入館</div>
                  <div className="fw-semibold TicketName">{SelectedTicketContent.Name}</div>
                </label>
              </div>

              <div className="col-7 d-flex justify-content-center px-0">
                <button
                  className="btn btn-light CartBtn CartListText"
                  id={`InCart_${SelectedTicketContent.Label}_Minus`}
                  onClick={Minus}
                  name={SelectedTicketContent.Label}
                >
                  -
                </button>

                <input
                  className="CartCount CartListText hide-arrows"
                  value={SelectedCount}
                  type="number"
                  min="0"
                  max="15"
                  id={`InCart_${SelectedTicketContent.Label}Ticket_Amount`}
                  onChange={AutoTicketCount}
                  onBlur={HandleBlur}
                  name={SelectedTicketContent.Label}
                />

                <button
                  className="btn btn-light CartBtn CartListText"
                  id={`InCart_${SelectedTicketContent.Label}_Plus`}
                  onClick={Increment}
                  name={SelectedTicketContent.Label}
                >
                  +
                </button>
              </div>


            </div>


            <div className='row align-items-center justify-content-center'>
              {/* <div className="col-1" ></div> */}
              <div
                className="col-5 CartListText text-center"
                id={`InCart_${SelectedTicketContent.Label}TicketPrice`}
              >
                {`TWD $${SelectedTicketContent.TicketPrice}`}
              </div>
              <div
                className="col-7 CartListText text-center"
                id={`InCart_${SelectedTicketContent.Label}TicketPrice_Amount`}
              >
                {`小計 TWD $${isNaN(SelectedCount)
                  ? 0
                  : SelectedCount * SelectedTicketContent.TicketPrice
                  }`}
              </div>


            </div>
            <div className="CartListText px-0 pt-1">
              <button
                className="btn btn-danger Cart_DeleteBtnS"
                id={`InCart_${SelectedTicketContent.Label}Ticket_Delete`}
                onClick={Delete}
                name={SelectedTicketContent.Label}
              >
                刪除
              </button>
            </div>


          </div>
        </div>)


      }


      <Modal show={noTicketshow} onHide={handleNoTicketClose} className="modalAlert">

        <Modal.Body className="text-center text-dark">票券已無所選數量！</Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="warning" onClick={()=>setNoTicketShow(false)}
            className="rounded-0"
          >
            確定
          </Button>

        </Modal.Footer>
      </Modal>

    </Fragment>
  );
}

export default SelectedTicketype;
