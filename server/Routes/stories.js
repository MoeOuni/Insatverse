import { Router } from "express";
import {
  getStories,
  createStory,
  updateStory,
  deleteStory,
  likeStory,
} from "../Controllers/storiesController.js";
const router = Router();

// localhost:5001/stories/
router.get("/", getStories);
router.post("/", createStory);
router.patch("/:id", updateStory);
router.delete("/:id", deleteStory);
router.patch("/:id/likeStory", likeStory);

export default router;
