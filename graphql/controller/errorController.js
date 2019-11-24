export default error => {
  var errmsg = "";
  if (error.name === "MongoError") {
    if (error.code === 11000) {
      const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
      errmsg = `duplicate field value ${value} : please use another value`;
    } else if (error.name === "CastError") {
      errmsg = `invalid ${error.path}: ${error.value}`;
    } else if (error.code === 2) {
      errmsg = `invalid ${error.errmsg}`;
    }
  } else if (error.name === "ValidationError") {
    console.log(error);
    errmsg = `${error.path}: ${error.message}`;
  }
  return errmsg;
};
