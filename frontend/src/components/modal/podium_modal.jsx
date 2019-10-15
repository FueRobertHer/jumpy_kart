import React from "react";
import { openModal, closeModal } from "../../actions/modal";
import { connect } from "react-redux";
import HighScoreContainer from "../podium/high_score_container";

const Modal = ({ modal, closeModal }) => {
  if (!modal) {
    return null;
  }

  let component;
  switch (modal) {
    case "highScore":
      component = <HighScoreContainer />;
      break;
    default:
      return null;
  }

  return (
    <div className='podium-modal-background' onClick={closeModal}>
      <div className='podium-modal-child' onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
