const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'manageUsers', 'getVehicles', 'getMovies', 'voteMovies']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getVehicles', 'manageVehicles', 'manageMovies', 'getMovies']);

module.exports = {
  roles,
  roleRights,
};
