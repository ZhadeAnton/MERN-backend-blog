import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("user", "-passwordHash")
      .exec();
    res.json(posts);
  } catch (err) {
    req.status(500).json({ message: "Не удалось получить статьи" });
  }
};

export const getOne = async (req, res) => {
  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { returnDocument: "after" },
      (err, post) => {
        if (err) {
          return res.status(500).json({ message: "Ошибка при поиске статьи" });
        }
        if (!post) {
          return res.status(404).json({ message: "Статья не найдена" });
        }
        res.json(post);
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Не удалось получить статьи" });
  }
};

export const updateOne = async (req, res) => {
  try {
    await PostModel.updateOne(
      { _id: req.params.id },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({ message: "Статья изменена успешно" });
  } catch (err) {
    res.status(500).json({ message: "Не удалось изменить статью" });
  }
};

export const deleteOne = async (req, res) => {
  try {
    PostModel.findByIdAndDelete(
      {
        _id: req.params.id,
      },
      (err, doc) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Ошибка при удалении статьи" });
        }
        if (!doc) {
          return res.status(404).json({ message: "Статья не найдена" });
        }
        res.json({ message: "Статья удалена успешно" });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: "Ошибка при удалении статьи" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Не удалось создать статью" });
  }
};
