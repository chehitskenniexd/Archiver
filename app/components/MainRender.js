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

            <div className="row">
             
              <br />
              <hr />
              <img className="center footer-logo" src="../public/media/archiver_logo_words_3.png" height="75px" />
            </div>
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
