
const UserModel = require("../models/user-schema");

const Question_Controller = async (req, res) => {
  const id = req.UserId;
  try {
    const getUser = await UserModel.findOne({ _id: id });
    return res.status(200).json({
      success: true,
      user: {
        name: getUser.name,
        email: getUser.email,
        imageUrl: getUser.userImg,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// insert Course in DB
// const InsertCourseDB = async () => {
//   CourseModel.insertMany(CourseArray)
//     .then((res) => console.log(res))
//     .catch((error) => console.log(error));
// };

// // find all courses
// const FIND_ALL_COURSES = async (req, res) => {
//   try {
//     const all_course = await CourseModel.find({});
//     if (!all_course) {
//       return res.status(400).json({
//         success: true,
//         message: "no course available",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       course: all_course,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
module.exports = { Question_Controller };
