

// ONE FILE PER PROJECT

const userProjects = [
  { role: 'author', userId: '1', projectId: '1' },
  { role: 'pending', userId: '2', projectId: '1' },
  { role: 'pending', userId: '2', projectId: '5' },
  { role: 'pending', userId: '2', projectId: '6' },
  { role: 'pending', userId: '2', projectId: '7' },
  { role: 'collaborator', userId: '2', projectId: '8' },
  { role: 'collaborator', userId: '2', projectId: '9' },
  { role: 'collaborator', userId: '3', projectId: '1' },
  { role: 'collaborator', userId: '4', projectId: '1' },
  { role: 'collaborator', userId: '5', projectId: '1' },
  { role: 'collaborator', userId: '6', projectId: '1' },
  { role: 'collaborator', userId: '7', projectId: '1' },
  { role: 'collaborator', userId: '8', projectId: '1' },
  { role: 'collaborator', userId: '9', projectId: '1' },
  { role: 'collaborator', userId: '10', projectId: '1' },
  { role: 'pending', userId: '1', projectId: '2' },
  { role: 'collaborator', userId: '1', projectId: '3' },
  { role: 'collaborator', userId: '1', projectId: '4' },
  { role: 'author', userId: '2', projectId: '2' },
  { role: 'collaborator', userId: '3', projectId: '2' },
  { role: 'collaborator', userId: '4', projectId: '2' },
  { role: 'collaborator', userId: '5', projectId: '2' },
  { role: 'author', userId: '6', projectId: '3' },
  { role: 'collaborator', userId: '7', projectId: '3' },
  { role: 'collaborator', userId: '8', projectId: '3' },
  { role: 'collaborator', userId: '9', projectId: '3' },
  { role: 'collaborator', userId: '10', projectId: '3' },
  { role: 'author', userId: '11', projectId: '4' },
  { role: 'collaborator', userId: '12', projectId: '4' },
  { role: 'collaborator', userId: '13', projectId: '4' },
  { role: 'collaborator', userId: '14', projectId: '4' },
  { role: 'collaborator', userId: '15', projectId: '4' },
  { role: 'collaborator', userId: '16', projectId: '4' },
  { role: 'collaborator', userId: '17', projectId: '4' },
  { role: 'collaborator', userId: '18', projectId: '4' },
  { role: 'collaborator', userId: '19', projectId: '4' },
  { role: 'collaborator', userId: '20', projectId: '4' },
  { role: 'collaborator', userId: '11', projectId: '5' },
  { role: 'author', userId: '12', projectId: '5' },
  { role: 'collaborator', userId: '13', projectId: '5' },
  { role: 'collaborator', userId: '14', projectId: '5' },
  { role: 'collaborator', userId: '15', projectId: '5' },
  { role: 'author', userId: '16', projectId: '6' },
  { role: 'collaborator', userId: '17', projectId: '6' },
  { role: 'collaborator', userId: '18', projectId: '6' },
  { role: 'collaborator', userId: '19', projectId: '6' },
  { role: 'collaborator', userId: '20', projectId: '6' }
];


// MULTIPLE FILES PER PROJECT

// roles array
var roles = ["collaborator", "author", "pending"];

// const userprojects = [
//   { role: '', userId: '', projectId: '1' },
//   { role: '', userId: '', projectId: '1' },
//   { role: '', userId: '', projectId: '1' },
//   { role: '', userId: '', projectId: '1' },
//   { role: '', userId: '', projectId: '1' },
//   { role: '', userId: '', projectId: '1' },
//   { role: '', userId: '', projectId: '1' },
//   { role: '', userId: '', projectId: '1' },
//   { role: '', userId: '', projectId: '1' },
//   { role: '', userId: '', projectId: '1' },
//   { role: '', userId: '', projectId: '2' },
//   { role: '', userId: '', projectId: '2' },
//   { role: '', userId: '', projectId: '2' },
//   { role: '', userId: '', projectId: '2' },
//   { role: '', userId: '', projectId: '2' },
//   { role: '', userId: '', projectId: '2' },
//   { role: '', userId: '', projectId: '2' },
//   { role: '', userId: '', projectId: '2' },
//   { role: '', userId: '', projectId: '2' },
//   { role: '', userId: '', projectId: '2' },
//   { role: '', userId: '', projectId: '2' },
//   { role: '', userId: '', projectId: '3' },
//   { role: '', userId: '', projectId: '3' },
//   { role: '', userId: '', projectId: '3' },
//   { role: '', userId: '', projectId: '3' },
//   { role: '', userId: '', projectId: '3' },
//   { role: '', userId: '', projectId: '3' },
//   { role: '', userId: '', projectId: '3' },
//   { role: '', userId: '', projectId: '3' },
//   { role: '', userId: '', projectId: '3' },
//   { role: '', userId: '', projectId: '3' },
// ];


module.exports = userProjects;

var generateUserProjects = function () {
  return doTimes(numUserProjects, function () {
    const upObject = {
      role: chance.pick(roles),
      userId: chance.integer({ min: 1, max: 20 }),
      projectId: chance.integer({ min: 1, max: 15 }),
    }
    fs.appendFileSync('./UPObjects.text', JSON.stringify(upObject) + '\n', 'utf-8');
    return user_project.create(upObject)
  })
}

var userProjectsSeed = () => {
  return generateUserProjects();
}


// module.exports = userProjectsSeed;

