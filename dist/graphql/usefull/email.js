"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _pug = _interopRequireDefault(require("pug"));

var _htmlToText = _interopRequireDefault(require("html-to-text"));

var SendEmail =
/*#__PURE__*/
function () {
  function SendEmail(user, url) {
    (0, _classCallCheck2["default"])(this, SendEmail);
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = "Cesar Berrio Humanes<".concat(process.env.EMAIL_FROM, ">");
  }

  (0, _createClass2["default"])(SendEmail, [{
    key: "newTransport",
    value: function newTransport() {
      if (process.env.NODE_ENV === "production") {
        // Sendgrid
        // return nodemailer.createTransport({
        //   service: 'SendGrid',
        //   auth: {
        //     user: process.env.SENDGRID_USERNAME,
        //     pass: process.env.SENDGRID_PASSWORD
        //   }
        // });
        _nodemailer["default"].createTransport({
          service: process.env.SERVICE,
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
          }
        });
      }

      return _nodemailer["default"].createTransport({
        service: process.env.SERVICE,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    } // Send the actual email

  }, {
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(template, subject) {
        var html, mailOptions;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 1) Render HTML based on a pug template
                html = _pug["default"].renderFile("".concat(__dirname, "/../../template/email/").concat(template, ".pug"), {
                  firstName: this.firstName,
                  url: this.url,
                  subject: subject
                }); // 2) Define email options

                mailOptions = {
                  from: this.from,
                  to: this.to,
                  subject: subject,
                  html: html,
                  text: _htmlToText["default"].fromString(html)
                }; // 3) Create a transport and send email

                _context.next = 4;
                return this.newTransport().sendMail(mailOptions);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function send(_x, _x2) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "sendWelcome",
    value: function () {
      var _sendWelcome = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.send("welcome", "Welcome to the My App Graphql..!");

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function sendWelcome() {
        return _sendWelcome.apply(this, arguments);
      }

      return sendWelcome;
    }()
  }, {
    key: "sendPasswordReset",
    value: function () {
      var _sendPasswordReset = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.send("passwordReset", "Your password reset token (valid for only 24 hours)");

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendPasswordReset() {
        return _sendPasswordReset.apply(this, arguments);
      }

      return sendPasswordReset;
    }()
  }]);
  return SendEmail;
}();

exports["default"] = SendEmail;