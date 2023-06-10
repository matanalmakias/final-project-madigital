import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { PendingBlogPost } from "../../db/models/blog/pendingPosts.js";
import { BlogPost } from "../../db/models/blog/blog.js";
import { isModerator } from "../../middleware/roles/isModerator.js";
import { User } from "../../db/models/user.js";
import { Archive } from "../../db/models/archive/archive.js";
import mongoose from "mongoose";
import nodeEvent from "../../nodeEvents/nodeEvents.js";
const router = Router();
router.get("/getPendingPosts", validateToken, async (req, res) => {
  const posts = await PendingBlogPost.find({});
  return res.json(posts);
});
router.put(
  "/adminConfirm/:postId/:sign",
  validateToken,
  isModerator,
  async (req, res) => {
    const { postId, sign } = req.params;
    let user = await User.findById(req.userId);

    const post = await PendingBlogPost.findById(postId);
    let nPost = post.toObject();
    delete nPost._id;
    if (sign === `yes`) {
      let newPost = new BlogPost(nPost);
      newPost.authorUserId = mongoose.Types.ObjectId(newPost.authorUserId);
      newPost._id = new mongoose.Types.ObjectId();
      user?.posts?.publish?.push(newPost._id);
      user?.msgFromUs?.push(`Your post is approved! - ${post.title}`);
      res.json({ message: `The post is approved` });
      await newPost.save();
    } else {
      const newArchive = new Archive(nPost);
      console.log(newArchive);
      await newArchive.save();

      res.json({
        message: `The post is unApproved and sent to the archive`,
      });
    }

    user?.posts?.pending?.pull(postId);
    await post.delete(postId).then((res) => console.log(res));

    await user.save();
    nodeEvent.emit("user");
    return nodeEvent.emit("blog");
  }
);
export { router as pendingPostsRouter };
