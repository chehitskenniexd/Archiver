import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './Other.css';
import Sidebar from './Sidebar';
import MainRender from './MainRender';


export class Other extends Component {

  render() {
    return (
      <div className={styles.container} >
        <div className="row" style={{marginBottom: 0}}>

          <div className="col s4" style={{paddingLeft: 0}}>
            <Sidebar />
          </div>
          <div className="col s8">
            {this.props.children}
          </div>

        </div>
      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state){
  return {
    loginUser: state.login
  }
}


function mapDispatchToProps(dispatch) {
  return {
  }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Other);
