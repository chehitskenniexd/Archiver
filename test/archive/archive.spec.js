const fs = require('fs');
const expect = require('chai').expect;
const rmdir = require('rimraf').sync;
const actions = require('../../utilities/actions');

describe('Actions', function () {
    const dirPath = `./ArchiveTest`;
    beforeEach(function () { rmdir(dirPath) });
    afterEach(function () { rmdir(dirPath) });

    describe('Initialize A New Project:', function () {
        const _initNewProject = actions.initNewProject;
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
    })

    describe('Add A New File To The Archive:', function () {
        const fileName = 'File'
        const filePath = `${dirPath}/File.txt`;
        const _initNewProject = actions.initNewProject;
        const contents = 'banana peel';

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
            const fileName = filePath.split('/').pop().split('.').shift();
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
            console.log(`${dirPath}/.archive/objects/${objDirName}/${objFileName}`);
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
    })
})