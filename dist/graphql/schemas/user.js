"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  #Query#\n\n  extend type Query {\n    getUsers(cursor: String, limit: Int): UserConnection!\n    getUser(id: ID!): User\n    getMe: User\n  }\n\n  #Muation#\n\n  extend type Mutation {\n    createUser(input: createUserInput!): userCreatedPayload!\n    updateMe(input: updateMeInput!): User\n    disableMe: DeleteMePayload!\n    disableUser(user_id: ID!): DeleteMePayload!\n    updateUser(input: updateUserInput!): User\n    signin(input: signinInput): userCreatedPayload!\n    SendEmailToRecoverPassword(email: String!): TokenPasswordReset!\n    recoverPassword(input: RecoverPasswordInput!): userCreatedPayload!\n    updatePassword(input: UpdatePasswordInput!): userCreatedPayload!\n  }\n  #Subscription\n  extend type Subscription {\n    newUser: userCreatedPayload!\n    updatedUser(user_id: ID!): User!\n  }\n  # types#\n\n  type User implements Node {\n    _id: ID!\n    name: String\n    last_name: String\n    username: String\n    password: String\n    email: String!\n    createdAt: DateTime\n    roles: [String]\n    resetPassword: TokenPasswordReset\n    updatedAt: DateTime\n  }\n\n  type userCreatedPayload {\n    user: User\n    token: String\n    error: String\n  }\n\n  type UserConnection implements Connection {\n    edges: [User!]!\n    pageInfo: PageInfo!\n  }\n\n  type DeleteMePayload {\n    disabled: Boolean\n    message: String\n    error: String\n  }\n  # inputs #\n\n  input createUserInput {\n    name: String\n    last_name: String\n    username: String\n    password: String\n    email: String\n    roles: [Roles!]\n    confirmPassword: String\n  }\n\n  input RecoverPasswordInput {\n    token: String!\n    newPassword: String!\n    password: String!\n  }\n  input UpdatePasswordInput {\n    current: String!\n    password: String!\n    passwordConfirm: String!\n  }\n\n  input signinInput {\n    username: String!\n    password: String!\n  }\n  input updateMeInput {\n    name: String\n    last_name: String\n    username: String\n  }\n  input updateUserInput {\n    user_id: ID!\n    name: String\n    last_name: String\n    username: String\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _graphqlTag["default"])(_templateObject());

exports["default"] = _default;