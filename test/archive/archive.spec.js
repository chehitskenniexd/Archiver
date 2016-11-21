const fs = require('fs');
const expect = require('chai').expect;
const rmdir = require('rimraf').sync;
const actions = require('../../utilities/actions');

describe('Actions', function () {
    const dirPath = `./ArchiveTest`;
    const fileName = 'File'
    const filePath = `${dirPath}/File.txt`;
    const contents = 'banana peel';
    const message = 'ayyyyy commit!';
    const _initNewProject = actions.initNewProject;
    const _addNewFile = actions.addNewFile;
    const _commitFileChanges = actions.commitFileChanges;

    beforeEach(function () { rmdir(dirPath) });
    afterEach(function () { rmdir(dirPath) });

    describe('Initialize A New Project:', function () {
        it('Returns false when directory does not exist', function () {
            const returnValue = _initNewProject(dirPath);
            expect(returnValue).to.be.false;
        })

        it('Returns true when directory does exist', function () {
            fs.mkdirSync(dirPath);
            const returnValue = _initNewProject(dirPath);
            expect(returnValue).to.be.true;
        })

        it('Creates a hidden directory for version control', function () {
            fs.mkdirSync(dirPath);
            const returnValue = _initNewProject(dirPath);
            const stat = fs.statSync(`${dirPath}/.archive`);
            expect(returnValue).to.be.true;
            expect(stat).to.exist;
            expect(stat.isDirectory()).to.be.true;
        })
    }) // end initialize functionality

    describe('Add A New File To The Archive:', function () {
        beforeEach(function () {
            fs.mkdirSync(dirPath);
            _initNewProject(dirPath);
            fs.writeFileSync(filePath, contents, 'utf-8');
        });

        const _addNewFile = actions.addNewFile;
        it('Returns false if a directory is passed in', function () {
            const returnValue = _addNewFile(dirPath);
            expect(returnValue).to.be.false;
        })

        it('Returns a valid hash of the file if successful', function () {
            const hash = _addNewFile(filePath);
            expect(hash).to.be.equal(actions.getSha1Hash(`${fileName}${contents}`));
        })

        it('Creates an object directory with the object in the hidden archive', function () {
            const hash = _addNewFile(filePath);

            // Test the directory created
            const stat = fs.statSync(`${dirPath}/.archive/objects`);
            expect(stat).to.exist;
            expect(stat.isDirectory()).to.be.true;

            // Test the object created (TODO: Isolate this test)
            const objDirName = hash.slice(0, 2);
            const objFileName = hash.slice(2);

            const statDir = fs.statSync(`${dirPath}/.archive/objects/${objDirName}`);
            const statFile = fs.statSync(`${dirPath}/.archive/objects/${objDirName}/${objFileName}`);
            expect(statDir).to.exist;
            expect(statDir.isDirectory()).to.be.true;

            expect(statFile).to.exist;
            expect(statFile.isFile()).to.be.true;
        })

        it('Creates a spot in the index to track the file', function () {
            const hash = _addNewFile(filePath);

            // Test to make sure index was created
            const stat = fs.statSync(`${dirPath}/.archive/index.txt`);
            expect(stat).to.exist;
            expect(stat.isFile()).to.be.true;

            // Test the contents of the file
            const indexContents = fs.readFileSync(`${dirPath}/.archive/index.txt`, 'utf-8');
            const indexHash = indexContents.split('/').shift();
            const indexFileName = indexContents.split('/').pop().replace(/\n$/, "");

            expect(indexHash).to.be.equal(hash);
            expect(indexFileName).to.be.equal(fileName);
        })
    }) // end add functionality

    describe('Commit a file to the archive: ', function () {
        beforeEach(function () {
            fs.mkdirSync(dirPath);
            _initNewProject(dirPath);
            fs.writeFileSync(filePath, contents, 'utf-8');
            _addNewFile(filePath);
        })

        it('Returns a valid hash of the commit if successful', function () {
            const commitHash = _commitFileChanges(filePath, message);
            expect(commitHash).to.be.equal(actions.getSha1Hash(`${fileName}${contents}${message}`))
        })

        it('Creates a valid archive object to store the commit information', function () {
            const commitHash = _commitFileChanges(filePath, message);
            const directoryUrl = `${dirPath}/.archive/objects/${commitHash.slice(0, 2)}`;
            const statDir = fs.statSync(directoryUrl);
            const statFile = fs.statSync(`${directoryUrl}/${commitHash.slice(2)}`);

            expect(statDir).to.exist;
            expect(statDir.isDirectory()).to.be.true;
            expect(statFile).to.exist;
            expect(statFile.isFile()).to.be.true;
        })

        it('Creates a file with the correct information about the commit', function () {
            const commitHash = _commitFileChanges(filePath, message);
            const directoryUrl = `${dirPath}/.archive/objects/${commitHash.slice(0, 2)}`;
            const fileUrl = `${directoryUrl}/${commitHash.slice(2)}`;
            const fileName = filePath.split('/').pop().split('.').shift();

            console.log(fs.readFileSync(fileUrl, 'utf-8'));
            // date: Mon Nov 21 2016 12:02:39 GMT-0500 (EST)/
            // msg: ayyyyy commit!/
            // committer: /
            // file: a5d3155fbc93ecb2fe4838b2d78da5e8e6b74a24/
            // File
            const fileContents = fs.readFileSync(fileUrl, 'utf-8');
            const fileContentsArr = fileContents.split('/');

            // check for valid contents and that it's properly sized
            fileContentsArr.forEach(content => {
                expect(content).to.be.a('string');
            })
            expect(fileContentsArr.length).to.be.equal(5);

            const date = fileContentsArr[0];
            const msg = fileContentsArr[1];
            // TODO: Committer is currently not being added
            const committer = fileContentsArr[2];
            const fileHash = fileContentsArr[3];
            const filename = fileContentsArr[4];

            expect(msg.split(':')[1]).to.be.equal(message);
            expect(fileHash.split(':')[1]).to.be.equal(actions.getSha1Hash(`${fileName}${contents}`));
            // TODO: Where is the filename being added to the commit file?
            expect(filename).to.be.equal(fileName);
            // TODO: Check the committer when it is actually being used
        })

        it('Creates a valid refs folder to store versioning position', function () {
            const commitHash = _commitFileChanges(filePath, message);
            const fileName = filePath.split('/').pop().split('.').shift();
            const refsUrl = `${dirPath}/.archive/refs`

            const statRefsDir = fs.statSync(refsUrl);
            const statRefs = fs.statSync(`${refsUrl}/${fileName}`);

            expect(statRefsDir).to.exist;
            expect(statRefsDir.isDirectory()).to.be.true;
            expect(statRefs).to.exist;
            expect(statRefs.isFile()).to.be.true;

            const refHash = fs.readFileSync(`${refsUrl}/${fileName}`, 'utf-8');
            expect(refHash).to.be.equal(commitHash);
        })
    }) // end commit functionality
})