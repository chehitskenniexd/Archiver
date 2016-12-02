import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './PageRender.css';
import { setCurrentCommit, setCurrentProject } from '../reducers/currentsReducer';
import axios from 'axios';
import * as FEActions from '../../utilities/vcfrontend';
import { fetchUserProjects } from '../reducers/projects_list';
import UpdateProjectPopup from './UpdateProjectPopup';
import Moment from 'moment';

// Additional modules for rendering a file
import * as fs from 'fs';

export class PageRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updated: false
        }
        this.onClickLocalFileUpdate = this.onClickLocalFileUpdate.bind(this);
        this.onClickAddArchive = this.onClickAddArchive.bind(this);
        this.onClickOpenFile = this.onClickOpenFile.bind(this);
    }

    onClickAddArchive(event) {
        console.log('adding archive to local machine');
        const project = this.props.currents
            && this.props.currents.currentProject
            ? this.props.currents.currentProject : undefined;
        project && axios.get(`http://localhost:3000/api/vcontrol/${project.id}`)
            .then(project => {
                const projectData = project.data[0];
                // Note the object structure
                // project.commits[0].blob.files[0];

                // create the directory if it doesn't already exist
                const dirPath = `./${projectData.name}`;
                try {
                    fs.statSync(dirPath).isDirectory()
                } catch (err) {
                    fs.mkdirSync(dirPath);
                }
                // create the file if it doesn't already exist
                // NOTE: WILL CONTAIN MOST RECENT DATA
                const commits = projectData.commits;
                const fileData = commits[commits.length - 1].blob.files[0];
                const filePath = `${dirPath}/${fileData.file_name}.txt`
                fs.writeFileSync(filePath, fileData.file_contents, 'utf-8');

                // then create the .archive directory
                try {
                    fs.statSync(`${dirPath}/.archive`).isDirectory()
                } catch (err) {
                    FEActions.initNewProject(dirPath);
                }

                // then create all the .archive files
                projectData.commits.forEach((commit, index) => {
                    // commitFileChanges(filePath, message, mergeHash, date)
                    const fileHash = commit.blob.hash;
                    const fileContent = commit.blob.files[0].file_contents;
                    FEActions.commitFileChanges(filePath, commit.message, undefined, commit.date, fileHash, fileContent);
                })
            })
    }

    onClickLocalFileUpdate(event) {
        const project = this.props.currents && this.props.currents.currentProject
            ? this.props.currents.currentProject : undefined;
        const dirPath = `./${project.name}`;
        const fileData = project ? project.commits[0].blob.files[0] : undefined;
        const filePath = project && fileData
            ? `./${project.name}/${fileData.file_name}.txt` : undefined;
        if (filePath) {
            // Check to make sure the file exists first
            try {
                fs.statSync(filePath).isFile();
            } catch (err) {
                console.log(`file ${filePath} does not exist!`);
                return false;
            }

            const commitFileContents = fileData.file_contents;
            const localFileContents = fs.readFileSync(filePath, 'utf-8');

            // Check to make sure there are changes to be sent to server
            if (commitFileContents === localFileContents) {
                console.log('no updates to be made!');
                return false;
            }

            fs.writeFileSync(filePath, commitFileContents, 'utf-8');
        }
    }

    onClickOpenFile() {
        const project = this.props.currents && this.props.currents.currentProject
            ? this.props.currents.currentProject : undefined;
        const dirPath = `./${project.name}`;
        const fileData = project ? project.commits[0].blob.files[0] : undefined;
        const filePath = project && fileData
            ? `./${project.name}/${fileData.file_name}.txt` : undefined;

        // check to see if the file exists.
        try {
            fs.statSync(filePath).isFile()
        } catch (err) {
            console.log('file does not exist!');
            return;
        }
        require('child_process').exec(`open -e "${filePath}"`);
    }

    componentWillMount() {
        if (!this.props.currents.currentCommit) {
            this.props.currents && this.props.currents.setCurrentProject
                && this.props.setCurrentCommit(this.props.currents.currentProject.commits[0]);
        }
    }

    componentDidUpdate() {
        if (!this.props.currents.currentCommit || !this.props.currents.currentProject) {
            return;
        }
        const projCommitId = this.props.currents.currentProject.commits[0].id;
        const currentCommitId = this.props.currents.currentCommit.id;
        if (this.state.updated && projCommitId != currentCommitId) {
            this.props.setCurrentCommit(this.props.currents.currentProject.commits[0]);
            this.state.updated = false;
        }
    }

    render() {
        const col6container = `col 6 ${styles.textContain}`;
        const renderText = this.props.currents && this.props.currents.currentCommit
            ? this.props.currents.currentCommit.blob.files[0].file_contents : '';
        return (
            <div className={styles.container} >
                <div className="row">

                    <div className="main-buttons-container">
                        {//<UpdateProjectPopup />
                        }
                        <a className="waves-effect waves-light btn single-button red" onClick={this.onClickAddArchive} id="add-archive-btn">
                            <i className="material-icons right icon-margin">get_app</i>
                            Download
            </a>
                        <a className="waves-effect waves-light btn single-button green" onClick={this.onClickLocalFileUpdate} id="update-local-btn">
                            <i className="material-icons right icon-margin">restore_page</i>
                            Restore
            </a>
                        <a className="waves-effect waves-light btn special-single-button cyan accent-3">
                            <UpdateProjectPopup clicked={() => {
                                console.log('clicked');
                                this.state.updated = true;
                            } } />
                        </a>
                        <a className="waves-effect waves-light btn single-button yellow darken-2"
                            onClick={this.onClickOpenFile}>
                            <i className="material-icons right">open_in_new</i>
                            Open
            </a>
                    </div>


                    {this.props.currents && this.props.currents.currentCommit
                        ? <div className="col 6">
                            <br />
                            <div className="on-commit-border">
                                <h5>{this.props.currents.currentProject && this.props.currents.currentProject.name}</h5>
                                <div className="commit-message commit-color">{"\"" + this.props.currents.currentCommit.message + "\""}</div>
                                <div className="item-commit-details"><span className="commit-message commit-info-font commit-date">{`On ${Moment(this.props.currents.currentCommit.date).format('MMMM Do')}`}</span><span className="commit-info-font">{`by ${this.props.currents.currentCommit.committer}`}</span></div>
                            </div>
                            <br />
                            <div id="textContainer" style={{ 'minHeight': `600`, 'maxHeight': `100%`, border: '1px' }}>
                                <div id="textRender" style={{ border: `5px` }}>{renderText}
                                </div>
                            </div>

                        </div>
                        : ''
                    }
                    <div className="col 3"></div>
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
        fetchProjects: (userId) => {
            dispatch(fetchUserProjects(userId));
        },
        setCurrentCommit: (commit) => {
            dispatch(setCurrentCommit(commit));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageRender);
