import { useState } from "react";
import PropTypes from "prop-types";

function Dialog({ children, event = () => { }, open }) {
    
  return (
    <>
      {open && (
        <div className="dialog">
          <div className="dialog-content">
            {children}
            <button onClick={event} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

Dialog.propTypes = {
  children: PropTypes.node, // PropTypes validation for children
  event: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default Dialog;
