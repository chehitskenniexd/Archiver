const fs = require('fs');
const expect = require('chai').expect;
const rmdir = require('rimraf').sync;
const actions = require('../../utilities/actions');

describe('Actions', function () {
    describe('Initialize A New Project', function () {
        const dirPath = `./ArchiveTest`;
        beforeEach(function () { rmdir(dirPath) });
        afterEach(function () { rmdir(dirPath) });

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
})