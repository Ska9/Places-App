import React, { Fragment } from "react";
import ReactDOM from "react-dom";

// SHARED COMPONENTS
import Backdrop from "../../Navigation/Backdrop";
// ANIMATION
import { CSSTransition } from "react-transition-group";
// CSS
import "./Modal.css";

const ModelOverlay = (props) => {
  const content = (
    <div className={`modal ${props.classNames}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        classNames="modal"
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        <ModelOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
