import User from "./userSchema";

export default {
  createUser: user => new User({ ...user }).save(),
  updateUser: (where, user) => User.findOneAndUpdate(where, user),
  getUsers: () => User.find({}),
  getUser: where => User.findOne(where),
  deleteUser: where => User.findOneAndDelete(where)
};
