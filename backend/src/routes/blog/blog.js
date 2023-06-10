import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { isModerator } from "../../middleware/roles/isModerator.js";
import { BlogPost } from "../../db/models/blog/blog.js";
import { PendingBlogPost } from "../../db/models/blog/pendingPosts.js";
import { User } from "../../db/models/user.js";
import { Archive } from "../../db/models/archive/archive.js";
import nodeEvent from "../../nodeEvents/nodeEvents.js";
import multer from "multer";
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 20 * 1024 * 1024, // increase the field size limit to 10MB
  },
});
router.put("/addLike/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  let user = await User.findById(req.userId);
  let post = await BlogPost.findById(postId);
  const userCheck = user?.likes?.posts?.some(
    (item) => item.toString() === post._id.toString()
  );
  const postCheck = post?.likes?.users?.some(
    (item) => item.toString() === user._id.toString()
  );

  if (postCheck || userCheck) {
    return res.json({ message: `You already like this post` });
  }
  if (post.likes === undefined) {
    post.likes = {};
  }
  if (user.likes === undefined) {
    user.likes = {};
  }

  user.likes.likes += 1;
  post.likes.likes += 1;
  user.likes.posts.push(post._id);
  post.likes.users.push(user._id);
  await user.save();
  await post.save();
  res.json({ message: `Like successfully listed.` });
  nodeEvent.emit("user");
  return nodeEvent.emit("blog");
});

router.put(
  "/editField/:postId/:sign",
  validateToken,
  isModerator,
  upload.single("images"),
  async (req, res) => {
    const { postId, sign } = req.params;
    console.log(req.body);
    let post = await BlogPost.findById(postId);
    if (!post) return res.json({ message: `Product is not found.` });
    if (sign === `title`) {
      post.title = req.body.input;
    } else if (sign === `desc`) {
      post.desc = req.body.input;
    } else if (sign === `content`) {
      post.content = req.body.input;
    }

    await post.save();
    res.json({ message: `The post successfully edited.` });
    return nodeEvent.emit("blog");
  }
);
router.delete("/removeLike/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  let user = await User.findById(req.userId);
  let post = await BlogPost.findById(postId);
  const userCheck = user?.likes?.posts?.some(
    (item) => item.toString() === post._id.toString()
  );
  const postCheck = post?.likes?.users?.some(
    (item) => item.toString() === user._id.toString()
  );

  if (!postCheck || !userCheck) {
    return res.json({ message: `You didnt like this post.` });
  }
  if (post.likes === undefined) {
    post.likes = {};
  }
  if (user.likes === undefined) {
    user.likes = {};
  }

  user.likes.likes -= 1;
  post.likes.likes -= 1;
  user.likes.posts.pull(post._id);
  post.likes.users.pull(user._id);
  await user.save();
  await post.save();
  res.json({ message: `Like successfully removed.` });
  nodeEvent.emit("user");
  return nodeEvent.emit("blog");
});
router.get("/", async (req, res) => {
  const blogs = await BlogPost.find({});
  return res.json(blogs);
});
router.post("/addPost", validateToken, isModerator, async (req, res) => {
  const user = await User.findById(req.userId);

  const newPost = new BlogPost({
    title: req.body.title,
    desc: req.body.desc,
    content: req.body.content,
    tags: req.body.tagsArray,
    category: req.body.category,
    author: user.name === "" ? user._id : user.name,
    authorUserId: user._id,
  });
  await newPost.save();
  res.json({ message: `Blog posted successfully`, newPost });

  return nodeEvent.emit("blog");
});
router.post("/userAddPost", validateToken, async (req, res) => {
  let user = await User.findById(req.userId);
  let posts = await PendingBlogPost.find({ authorUserId: req.userId });
  let lastPostTime;
  if (posts.length > 0) {
    lastPostTime = posts[posts.length - 1].date;
  }

  if (lastPostTime && new Date() - new Date(lastPostTime) < 60 * 60 * 1000) {
    // set cooldown period of 30 minutes
    const cooldownTime = 60 * 60 * 1000; // 60 minutes in milliseconds
    const cooldownEndTime = new Date(new Date().getTime() + cooldownTime);

    //   // store the cooldown end time in the user's document
    user.cooldownEndTime = cooldownEndTime;
    await user.save();
    res.json({
      message: `You have reached the maximum number of posts allowed per hour. Please wait for ${
        cooldownTime / 60000
      } minutes before making another post.`,
    });
  } else {
    // user can make a new post, continue with the post creation logic
    const newPost = new PendingBlogPost({
      title: req.body.title,
      desc: req.body.desc,
      content: req.body.content,
      tags: req.body.tagsArray,
      category: req.body.category,
      author: user.name === "" ? user._id : user.name,
      authorUserId: user._id,
    });

    await newPost.save();

    if (user.posts === undefined) {
      user.posts = {};
    }

    user?.posts?.pending?.push(newPost);
    await user.save();

    res.json({
      message: `Blog as moved to pending list for admin confirm.`,
      newPost,
    });

    nodeEvent.emit("user");
    return nodeEvent.emit("blog");
  }
});

router.delete(
  "/removePost/:postId",
  validateToken,
  isModerator,
  async (req, res) => {
    const postId = req.params.postId;
    let post = await BlogPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newArchive = new Archive(post.toObject());
    await newArchive.save();

    await BlogPost.findByIdAndRemove(postId);

    res.json({ message: `The post has been moved to archive` });
    return nodeEvent.emit("blog");
  }
);

export { router as blogRouter };
