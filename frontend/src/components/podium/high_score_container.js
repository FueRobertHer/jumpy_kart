import { openModal, closeModal } from "../../actions/modal";
import { connect } from "react-redux";
import HighScore from "./high_score";
import { fetchHighScore } from "../../actions/user_actions";

const mapStateToProps = state => ({
  modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
  fetchHighScore: () => dispatch(fetchHighScore())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighScore);
