import { connect } from "react-redux";

import MuteButton from "./mute_button";

const mapStateToProps = state => ({
  currentUserId: state.session.user.id,
  currentUsername: state.session.user.username
});

export default connect(mapStateToProps)(MuteButton);
