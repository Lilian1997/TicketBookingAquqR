import React, { Fragment } from "react";


function InputFieldPay(Info) {
    return (
        <Fragment>
            <div className="infoInputBox row">
                <div className="col-12 col-md-4 text-center text-md-start">

                    <label className="Infolabel d-inline-block" htmlFor={Info.name + "input"}> {Info.title}</label>
                </div>

                <div className="col-12 col-md-8 text-center text-md-start">

                    <input
                        type={Info.type}
                        className="border-0 border-bottom d-inline-block Input text-center"
                        id={Info.name + "input"}
                        required={Info.required}
                        name={Info.name}
                        onChange={Info.handleChangeEvent}
                        pattern={Info.pattern}
                        placeholder={Info.placeholder}
                        onBlur={Info.handleBlurEvent}
                        maxLength={Info.maxLength} />

                    {Info.isEmpty ?(
                        <div className="isEmptyText mb-0 animate__animated  animate__flash">
                            {Info.errMessage}
                        </div>
                    ) : null }
                    {Info.isValid ? null : (
                        <div className="isEmptyText mb-0 animate__animated  animate__flash">
                            {Info.validMessage}
                        </div>
                    )}
                </div>


            </div>

        </Fragment>

    );
}

export default InputFieldPay;
