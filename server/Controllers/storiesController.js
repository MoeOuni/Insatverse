import mongoose from "mongoose";
import Story from "../Models/storyContent.js";

const getStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createStory = async (req, res) => {
  try {
    const newStory = new Story({
      ...req.body,
    });
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateStory = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("this id doesn't belong to any Story!");
    }

    const updatedStory = await Story.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.json(updatedStory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteStory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("this id doesn't belong to any Story!");
  }

  await Story.findByIdAndRemove(id);

  res.json({ message: "Stroy deleted successfully" });
};

const likeStory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("this id doesn't belong to any Story!");
  }
  const story = await Story.findById(id);

  const updatedStory = await Story.findByIdAndUpdate(
    id,
    { likes: story.likes + 1 },
    { new: true },
  );

  res.json(updatedStory);
};

export { getStories, createStory, updateStory, deleteStory, likeStory };
