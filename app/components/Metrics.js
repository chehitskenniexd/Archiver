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

export class Metrics extends Component {
  constructor(props) {
    super(props);
    this.wordsPerCommit = this.wordsPerCommit.bind(this);
    this.wordCounter = this.wordCounter.bind(this);
    this.wordsAddedPerCommit = this.wordsAddedPerCommit.bind(this);
    this.wordsAddedPerPerson = this.wordsAddedPerPerson.bind(this);
  }

  // word counter
  wordCounter = (str) => {
    return str.match(/\w+/g).length;
  }

  // takes all commits in currentProject array and returns array of objects
  // array is ordered from newest to oldest
  // each object has commit id, number of words, and commiter
  wordsPerCommit = () => {
    const perCommitArr = [];
    if (this.props.currents.currentProject) {
      const commitArr = this.props.currents.currentProject.commits;
      for (let i = 0; i < commitArr.length; i++) {
        const totalWords = this.wordCounter(commitArr[i].blob.files[0].file_contents);
        perCommitArr.push({ total: totalWords, name: commitArr[i].committer, id: commitArr[i].id, date: Moment(commitArr[i].date).format('MMM Do, h:mm a') });
      }
    }
    console.log('PER COMMIT ARRAY', perCommitArr);
    return perCommitArr;
  }

  // takes wordsPerCommit array and subtracts the number of words from its previous commits
  // returns same array but with the number of words added in that commit added to each object
  wordsAddedPerCommit = (wordsPerCommitArr) => {
    const addedPerCommitArr = wordsPerCommitArr;
    for (let i = 0; i < wordsPerCommitArr.length; i++) {
      if (i !== (wordsPerCommitArr.length - 1)) {
        const difference = wordsPerCommitArr[i].total - wordsPerCommitArr[i + 1].total;
        addedPerCommitArr[i].difference = difference;
      } else {
        addedPerCommitArr[wordsPerCommitArr.length - 1].difference = wordsPerCommitArr[wordsPerCommitArr.length - 1].total;
      }
    }
    console.log('ADDED PER COMMIT ARRAY', addedPerCommitArr);
    return addedPerCommitArr;
  }

  // takes wordsAddedPerCommit array and adds all wordsAddedPerCommit by the same commmiter
  // returns new object of key/value pairs (commiter name : added words total)
  wordsAddedPerPerson = (addedPerCommitArr) => {
    const addedPerPersonObject = {};
    const addedPerPersonArr = [];
    for (let i = 0; i < addedPerCommitArr.length; i++) {
      if (addedPerPersonObject.hasOwnProperty(addedPerCommitArr[i].name)) {
        addedPerPersonObject[addedPerCommitArr[i].name] += addedPerCommitArr[i].difference;
      } else addedPerPersonObject[addedPerCommitArr[i].name] = addedPerCommitArr[i].difference;
    }
    console.log('ADDED PER PERSON OBJECT', addedPerPersonObject);
    for (const key in addedPerPersonObject) {
      addedPerPersonArr.push({ name: key, words: addedPerPersonObject[key] });
    }
    console.log('ADDED PER PERSON ARRAY', addedPerPersonArr);
    return addedPerPersonArr;
  }

  render() {
    const col6container = `col 6 ${styles.textContain}`;
    const wordPerCommit = this.props.currents.currentProject ? this.wordsAddedPerCommit(this.wordsPerCommit()).reverse() : [];
    const wordPerPerson = wordPerCommit ? this.wordsAddedPerPerson(wordPerCommit) : [];

    return (
      <div className={styles.container} >
        <div className="row" >
          <div className="col 3" />
          <h5>{'Metrics for ' + this.props.currents.currentProject.name}</h5>
          <h6>(Hover over the graphs for more information)</h6>
          <br />
          <br />
          <h6>Total Words in Project</h6>
          <RC2
            data={
              {
                labels: wordPerCommit.map((obj) => obj.date),
                datasets: [
                  {
                    backgroundColor: 'rgba(72, 209, 204, 0.2)',
                    borderColor: 'rgba(72, 209, 204, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(72, 209, 204, 0.4)',
                    hoverBorderColor: 'rgba(72, 209, 204, 1)',
                    data: wordPerCommit.map((obj) => obj.total),
                  }
                ]
              }
            }
            options={
              {
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Date of Commit',
                    },
                    ticks: {
                      display: false
                    }
                  }],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Number of Words',
                    },
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              }
            }
            type="bar"
          />
        </div>
        <br />
        <div className="row" >
          <div className="col 3" />
          <h6>Words Added Per Commit</h6>
            <RC2
              data={
                {
                  labels: wordPerCommit.map((obj) => obj.date),
                  datasets: [
                    {
                      backgroundColor: 'rgba(72, 209, 204, 0.2)',
                      borderColor: 'rgba(72, 209, 204, 1)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(72, 209, 204, 0.4)',
                      hoverBorderColor: 'rgba(72, 209, 204, 1)',
                      data: wordPerCommit.map((obj) => obj.difference),
                    }
                  ]
                }
              } 
              options={
              {
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Date of Commit',
                    },
                    ticks: {
                      display: false
                    }
                  }],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Number of Words',
                    },
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              }
            }
              type="bar"
            />
        </div>
        <br />
        <div className="row" >
          <div className="col 3" />
            <h6>Words Added Per Person</h6> 
            <RC2
              data={
                {
                  labels: wordPerPerson.map((obj) => obj.name),
                  datasets: [
                    {
                      backgroundColor: 'rgba(72, 209, 204, 0.2)',
                      borderColor: 'rgba(72, 209, 204, 1)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(72, 209, 204, 0.4)',
                      hoverBorderColor: 'rgba(72, 209, 204, 1)',
                      data: wordPerPerson.map((obj) => obj.words),
                    }
                  ]
                }
              }
              options={
                {
                  legend: {
                    display: false
                  }
                }
              }
              type="pie"
            />
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