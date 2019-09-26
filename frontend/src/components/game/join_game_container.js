import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';

import JoinGame from './join_game';

const mapStateToProps = state => ({
  currentUserId: state.session.user.id
});

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps)(JoinGame);