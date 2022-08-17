const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const Module = require("../models/Module");
const { model } = require("mongoose");

const createModule = async (req, res) => {
  try {
    const doc = new Module({
      title: req.body.title,
      language: req.body.language,
      words: req.body.words,
      user: req.userId,
      created: new Date().toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    });
    console.log(req.user);
    const module = await doc.save();
    res.json(module);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't create a module!",
    });
  }
};

const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find().populate("user").exec(); // .populate("user").exec() = transfer the information about user in the object with posts
    res.json({ modules, count: modules.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't get modules!",
    });
  }
};

const getAllModulesOfUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const modules = await Module.find({ user: userId });
    res.json({ modules, count: modules.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't get modules!",
    });
  }
};

const getSingleModule = async (req, res) => {
  try {
    const moduleId = req.params.id;
    Module.findOneAndUpdate(
      {
        _id: moduleId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Can't get a module",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: `No modules with id ${moduleId}`,
          });
        }
        res.json(doc);
      }
    ).populate("user");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't get modules!",
    });
  }
};

const addWordsToModule = async (req, res) => {
  const moduleId = req.params.id;
  try {
    await Module.updateOne(
      {
        _id: moduleId,
      },
      {
        $push: {
          words: {
            word: req.body.word,
            translate: req.body.translate,
            wordId: uuidv4(),
          },
        },
      }
    );
    res.json({
      success: true,
      message: "Word was added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't add word",
    });
  }
};

const deleteWordFromModule = async (req, res) => {
  const moduleId = req.params.id;
  const wordId = req.params.wordId;
  try {
    await Module.updateOne(
      {
        _id: moduleId,
      },
      {
        $pull: {
          words: { wordId: wordId },
        },
      }
    );
    res.json({
      success: true,
      message: "Word was deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't delete word!",
    });
  }
};

const updateModule = async (req, res) => {
  const moduleId = req.params.id;
  try {
    await Module.updateOne(
      {
        _id: moduleId,
      },
      {
        title: req.body.title,
        language: req.body.language,
        words: req.body.words,
      }
    );
    res.json({
      success: true,
      message: "Module was edited",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't edit module",
    });
  }
};

const deleteModule = async (req, res) => {
  try {
    const moduleId = req.params.id;
    Module.findOneAndDelete(
      {
        _id: moduleId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Can't delete a module",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: `No modules with id ${moduleId}`,
          });
        }
        res.json({
          success: true,
          message: "Module was deleted",
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't get module!",
    });
  }
};

const editWord = async (req, res) => {
  try {
    const moduleId = req.params.id;
    const wordId = req.params.wordId;
    const { word, translate } = req.body;
    const result = await Module.updateOne(
      { _id: moduleId, "words.wordId": wordId },
      { $set: { "words.$.word": word, "words.$.translate": translate } }
    );
    res.json({
      result,
      success: true,
      message: "Word was edited",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't edit word!",
    });
  }
};

module.exports = {
  getAllModules,
  getSingleModule,
  createModule,
  deleteModule,
  updateModule,
  addWordsToModule,
  deleteWordFromModule,
  getAllModulesOfUser,
  editWord,
};
