import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal';

import JoinGame from './join_game';

const mapStateToProps = state => ({
  currentUserId: state.session.user.id
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);