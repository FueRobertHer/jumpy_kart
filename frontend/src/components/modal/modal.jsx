import React from 'react';
import { openModal, closeModal } from '../../actions/modal';
import { connect } from 'react-redux';
import CreateRoomContainer from '../rooms/create_room_container';

const Modal = ({ modal, closeModal }) => {
  if (!modal) {
    return null;
  }

  let component;
  switch (modal) {
    case 'createRoom':
      component = <CreateRoomContainer />;
      break;                             
  
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
