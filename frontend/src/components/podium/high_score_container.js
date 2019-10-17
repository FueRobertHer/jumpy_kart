import { openModal, closeModal } from "../../actions/modal";
import { fetchHighScore } from "../../actions/user_actions";
import { connect } from "react-redux";
import HighScore from "./high_score";

const mapStateToProps = state => {
  return {
  modal: state.ui.modal,
  players: state.userReducer.players
}
};

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
  fetchHighScore: () => dispatch(fetchHighScore())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HighScore);
