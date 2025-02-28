const mongoose = require("mongoose");
const getModuleById = async (req, res) => {
  const ModuleModel = mongoose.model("Modules");
  const { moduleId } = req.params;
  try {
    const module = await ModuleModel.findById(moduleId)
      .populate("course")
      .populate({
        path: "assignments",
        populate: {
          path: "submissions",
          model: "Submissions",
          populate: {
            path: "user",
            model: "User",
          },
        },
      });
    console.log(module);
    res.status(200).send({
      status: "success",
      data: module,
    });
  } catch (e) {
    res.status(400).send({ status: "failed", msg: e });
  }
};
module.exports = getModuleById;
