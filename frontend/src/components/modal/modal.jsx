import React from 'react';
import { openModal, closeModal } from '../../actions/modal';
import { connect } from 'react-redux';
<<<<<<< HEAD
import joinGameContainer from '../game/lobby_container';
=======
import CreateRoomContainer from '../rooms/create_room_container';
>>>>>>> 3e84e23f49a3968756dea18480e7b331c342adcd

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
