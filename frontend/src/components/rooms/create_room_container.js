import { openModal, closeModal } from '../../actions/modal';
import { connect } from 'react-redux';
import CreateRoom from './create_room';

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal())
});

export default connect(null, mapDispatchToProps)(CreateRoom);