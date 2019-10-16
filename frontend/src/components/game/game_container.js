import { connect } from "react-redux";

import Game from "./game";

const mapStateToProps = state => ({
  currentUserId: state.session.user.id,
  currentUsername: state.session.user.username
});

export default connect(mapStateToProps)(Game);
