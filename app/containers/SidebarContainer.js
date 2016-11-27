import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return {
    loginUser: state.login,
    projects: state.projects
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLoadProjects: function (user) {
      dispatch(fetchUserProjects(user));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);