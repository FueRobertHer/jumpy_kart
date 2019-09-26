import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';
import { closeModal, openModal } from '../../actions/modal';
import { fetchCurrentUser } from '../../actions/user_actions';


import JoinGame from './join_game';

const mapStateToProps = state => ({
  currentUserId: state.session.user.id,
  currentUsername: state.session.user.username,
  modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
  fetchCurrentUser: (id) => dispatch(fetchCurrentUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);