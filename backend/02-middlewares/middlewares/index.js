"use strict"


const middlewareFunction1 = (req, res, next) => {
    // next()
  const skip = req.query.skip ?? false;
  req.customData = "Custom Data";
  res.customDataWithResponse = "Custom Data With Response";
  skip ? next("route") : next();
};

const middlewareFunction2 = (req, res, next) => {
    // next()
  res.send({
    customData: [req.customData, res.customDataWithResponse],
    message: "Here is func2, first next() runned, nut second not",
  });
}; 

module.exports=[middlewareFunction1, middlewareFunction2]