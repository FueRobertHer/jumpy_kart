import { openModal, closeModal } from '../../actions/modal';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../../actions/user_actions'
import CreateRoom from './create_room';

const mapStateToProps = state => ({
  currentUserId: state.session.user.id,
  currentUsername: state.session.user.username,
  modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
  fetchCurrentUser: (id) => dispatch(fetchCurrentUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);