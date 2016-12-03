import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './PageRender.css';
import { setCurrentCommit, setCurrentProject } from '../reducers/currentsReducer';
import { fetchUserProjects } from '../reducers/projects_list';
import Moment from 'moment';
import RC2 from 'react-chartjs2';

// Additional modules for rendering a file
import * as fs from 'fs';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    }
  ]
};

export class Metrics extends Component {
  constructor(props) {
    super(props);
    this.wordsPerCommit = this.wordsPerCommit.bind(this);
    this.wordCounter = this.wordCounter.bind(this);
  }

  // word counter
  wordCounter = (str) => {
    return str.match(/\w+/g).length;
  }

  // takes all commits in currentProject array and returns array of objects
  // array is ordered from newest to oldest
  // each object has commit id, number of words, and commiter
  wordsPerCommit = () => {
    const commitArr = this.props.currents.currentProject.commits;
    const perCommitArr = [];
    console.log("ARRAY", commitArr);
    if (commitArr) {
      for (let i = 0; i < commitArr.length; i++) {
        const totalWords = this.wordCounter(commitArr[i].blob.files[0].file_contents);
        console.log('TOTAL', totalWords)
        perCommitArr.push({ total: totalWords, name: commitArr[i].committer, id: commitArr[i].id });
      }
    }
    return perCommitArr;
  }

  // takes wordsPerCommit array and subtracts the number of words from its previous commits
  // returns same array but with the number of words added in that commit added to each object
  wordsAddedPerCommit = () => {
    

  }

  // takes wordsAddedPerCommit array and adds all wordsAddedPerCommit by the same commmiter
  // returns new array of objects with a commiter name and a added words total in each
  wordsAddedPerPerson = () => {

  }

  render() {
    console.log("WORDS PER COMMIT", this.wordsPerCommit())
    const col6container = `col 6 ${styles.textContain}`;
    const renderText = this.props.currents && this.props.currents.currentCommit
      ? this.props.currents.currentCommit.blob.files[0].file_contents : '';
    if (this.props.currents.currentProject.commits) { console.log(this.props.currents.currentProject.commits[0].blob.files[0].file_contents); }
    
    return (
      <div className={styles.container} >
        <div className="row" >
          <div className="col 3" />
            <RC2 data={data} type="bar" />
        </div>
      </div>
    );
  }
}

/* ---------------- CONTAINER --------------------*/
function mapStateToProps(state) {
  return {
    user: state.login,
    mainhome: state.mainhome,
    currents: state.currents,
    projects: state.projects
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrics);