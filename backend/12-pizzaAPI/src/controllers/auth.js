// "use strict";
// /* -------------------------------------------------------
//     NODEJS EXPRESS | CLARUSWAY FullStack Team
// ------------------------------------------------------- */
// const jwt = require("jsonwebtoken");
// const setToken = require('../helpers/setToken')
// const User = require("../models/user");

// module.exports = {
//   login: async (req, res) => {
//     const { username, password } = req.body;
//     if (username && password) {
//       const user = await User.findOne({ username, password });
//       if (user) {
//         if (user.isActive) {
//           // res.send({
//           //     error: false,
//           //     token: {
//           //         access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '10m' }),
//           //         refresh: jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: '3d' }),
//           //     }
//           // })

//           // const data = {
//           //   access: user.toJSON(),
//           //   refresh: { _id: user._id, password: user.password },
//           //   shortExpiresIn: "10m",
//           //   longExpiresIn: "3d",
//           // };

//           // res.send({
//           //   error: false,
//           //   token: {
//           //     access: jwt.sign(data.access, process.env.ACCESS_KEY, {
//           //       expiresIn: data.shortExpiresIn,
//           //     }),
//           //     refresh: jwt.sign(data.refresh, process.env.REFRESH_KEY, {
//           //       expiresIn: data.longExpiresIn,
//           //     }),
//           //   },
//           // });
//           res.send({
//             error:false,
//             token:setToken(user)
//           })
//         } else {
//           res.statusCode = 401;
//           throw new Error("This account is not active");
//         }
//       } else {
//         res.statusCode = 401;
//         throw new Error("Wrong username and password");
//       }
//     } else {
//       res.statusCode = 401;
//       throw new Error("Please enter username and password");
//     }
//   },
//   refresh: async (req, res) => {
//     const refreshToken = req.body?.token?.refresh
//     if(refreshToken){
//       jwt.verify(refreshToken, process.env.REFRESH_KEY, async function(err, userData){
//         if(err){
//           res.errorStatusCode = 401
//           throw err
//         }else{
//           const {_id, password} = userData
//           if(_id&&password){
//             const user = await User.findOne({_id})
//             if(user && user.password==password){
//               if(user.isActive){
//                 // const data = {
//                 //   access: user.toJSON(),
//                 //   refresh: { _id: user._id, password: user.password },
//                 //   shortExpiresIn: "10m",
//                 //   longExpiresIn: "3d",
//                 // };
      
//                 // res.send({
//                 //   error: false,
//                 //   token: {
//                 //     access: jwt.sign(data.access, process.env.ACCESS_KEY, {
//                 //       expiresIn: data.shortExpiresIn,
//                 //     }),
//                 //     refresh: null,
//                 //   },
//                 // });
                
//                 res.send({
//                   error:false,
//                   token:setToken(user,true)
//                 })
//               }else{
//                 res.errorStatusCode = 401
//             throw new Error('This account is not active')
//               }
//             }else{
//               res.errorStatusCode = 401
//             throw new Error('wrong id and password')
//             }
//           }else{
//             res.errorStatusCode = 401
//             throw new Error('please enter id and password')
//           }
//         }
//       })
//     }else{
//       res.errorStatusCode = 401
//       throw new Error('Please enter token refresh')
//     }
//   },
//   logout: async (req, res) => {
//     res.send({
//       error: false,
//       message: 'No need any doing for logout. You must deleted Bearer Token from your browser.'
//   })
//   },
// };
//! Current Using
"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const setToken = require('../helpers/setToken');
const User = require("../models/user");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      const user = await User.findOne({ username });
      if (user && await bcrypt.compare(password, user.password)) {
        if (user.isActive) {
          res.send({
            error: false,
            token: setToken(user)
          });
        } else {
          res.statusCode = 401;
          throw new Error("This account is not active");
        }
      } else {
        res.statusCode = 401;
        throw new Error("Invalid username or password");
      }
    } else {
      res.statusCode = 401;
      throw new Error("Please enter username and password");
    }
  },
  refresh: async (req, res) => {
    const refreshToken = req.body?.token?.refresh;
    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData) {
        if (err) {
          res.statusCode = 401;
          throw err;
        } else {
          const { _id, password } = userData;
          if (_id && password) {
            const user = await User.findOne({ _id });
            if (user && user.password == password) {
              if (user.isActive) {
                res.send({
                  error: false,
                  token: setToken(user, true)
                });
              } else {
                res.statusCode = 401;
                throw new Error('This account is not active');
              }
            } else {
              res.statusCode = 401;
              throw new Error('Invalid ID or password');
            }
          } else {
            res.statusCode = 401;
            throw new Error('Please enter ID and password');
          }
        }
      });
    } else {
      res.statusCode = 401;
      throw new Error('Please enter refresh token');
    }
  },
  logout: async (req, res) => {
    res.send({
      error: false,
      message: 'No need any doing for logout. You must delete Bearer Token from your browser.'
    });
  },
};