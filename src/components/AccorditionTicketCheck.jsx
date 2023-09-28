import React, { Component } from "react";
import { QRCodeSVG } from "qrcode.react";

function AccorditionTicketCheck(props) {
  let ticketType = (e) => {
    switch (e) {
      case "A":
        return "成人票";
        break;
      case "S":
        return "學生票";
        break;
      case "K":
        return "孩童票";
        break;
      case "C":
        return "博愛票";
        break;
      default:
        return "錯誤";
        break;
    }
  };

  return (
    <div>
      <div className="accordion-item">
        <div
          className="accordion-header row border-bottom"
          id={`panelsStayOpen-heading` + props.index}
        >
          <button
            className="accordion-button accordionTicket"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#panelsStayOpen-collapse` + props.index}
            aria-expanded="false"
            aria-controls={`panelsStayOpen-collapse` + props.index}
          >
            <div className="row w-100 accordionTicketDescription border-top-0">
              <div className="col-12 col-md-3 text-start text-md-end">
                一般入館｜{ticketType(props.type)}
              </div>
              <div className="ms-auto col-12 col-md-6 text-start ">
                票券編號：{props.ticketId}
              </div>
            </div>
          </button>
        </div>
        <div
          id={`panelsStayOpen-collapse` + props.index}
          className="accordion-collapse collapse show"
          aria-labelledby={`panelsStayOpen-heading` + props.index}
        >
          <div className="accordion-body flex-column flex-md-row d-md-flex  justify-content-between align-items-end">
            <h2 className="mt-3 mt-md-0 mb-3 mb-md-0 accordtionTicketType">
              {ticketType(props.type)}
            </h2>
            <div className="mb-3 mb-md-0">
              <QRCodeSVG value={props.qrcode} className="qrcode" />
            </div>

            <div className="mt-auto">入館請出示此條碼</div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AccorditionTicketCheck;
