import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './MainRender.css';
import MainHome from './MainHome';
import Add from './Add';

export class MainRender extends Component {

  render() {
    console.log(this.props)
    return (
      <div className={styles.container} >
        <div className="row">

        <div className="col s1"></div>

        <div className="col s10">

          {
            this.props.mainhome.onAddProject ? <Add /> : <MainHome />
          }

        </div>

        <div className="col s1"></div>

        </div>
      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/

function mapStateToProps(state){
  return{
    mainhome: state.mainhome
  }
}


function mapDispatchToProps(dispatch) {
  return{}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainRender);
