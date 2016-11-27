import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './MainRender.css';
import MainHome from './MainHome';
import Add from './Add';
import Collaborator from './Collaborator';
import PageRender from './PageRender';


export class MainRender extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    hashHistory.push("/mainHome")
  }


  render() {
    return (
      <div className={styles.container} >
        <div className="row" style={{marginTop: 0}}>

          <div className="col s1"></div>

          <div className="col s10">

            {this.props.children}

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
    mainhome: state.mainhome,
    login: state.login
  }
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainRender);
