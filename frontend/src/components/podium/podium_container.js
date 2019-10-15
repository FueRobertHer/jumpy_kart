import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal';
import Podium from './podium';

const mapStateToProps = state => ({
  currentUserId: state.session.user.id,
  currentUsername: state.session.user.username,
  modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Podium);