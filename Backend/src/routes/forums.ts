import { Router } from "express";
import { getAllForumsHandler } from "../handlers/forums/getAllForumsHandler";
import { createThreadHandler } from "../handlers/forums/createThreadHandler";
import { authMiddleware } from "../middlewares/auth";
import { createPostForumshandler } from "../handlers/forums/createPostForumsHandler";
import { createCommentForumHandler } from "../handlers/forums/createCommentForumHandler";
import { searchForumHandler } from "../handlers/forums/searchForumHandler";
import { getAllThreadsFromAForumHandler } from "../handlers/forums/getAllThreadsFromAForumHandler";
import { getAllPostsFromAThreadHandler } from "../handlers/forums/getAllPostsFromAThreadHandler";
import { getAllCommentsFromAPostHandler } from "../handlers/forums/getAllCommentsFromAPostHandler";
import { userCommentForumDeleteHandler } from "../handlers/forums/userCommentForumDeleteHandler";
import { userPostForumdeleteHandler } from "../handlers/forums/userPostForumDeleteHandler";
import { reportCommentForumHandler } from "../handlers/forums/reportCommentForumHandler";
import { likePostForumHandler } from "../handlers/forums/likePostForumHandler";
import { dislikePostForumHandler } from "../handlers/forums/dislikePostForumHandler";
import { likeCommentForumHandler } from "../handlers/forums/likeCommentForumHandler";
import { dislikeCommentForumHandler } from "../handlers/forums/dislikeCommentForumHandler";
import { editCommentForumHandler } from "../handlers/forums/editCommentForumhandler";
import { editPostForumHandler } from "../handlers/forums/editPostForumHandler";
import { editThreadForumHandler } from "../handlers/forums/editThreadForumHandler";


const forumsRouter = Router()

forumsRouter.use(authMiddleware)
// get all forums
forumsRouter.get("/get-forums", getAllForumsHandler)

// create threads
forumsRouter.post("/create-thread/:forumMongoId/:forumWeaviateId", createThreadHandler)

// get all threads from a forum
forumsRouter.get("/get-threads/:forumId", getAllThreadsFromAForumHandler)

// create Posts
forumsRouter.post("/create-post/:threadMongo/:threadWeaviate", createPostForumshandler)

// create comments
forumsRouter.post("/create-comment/:postMongo/:postWeaviate", createCommentForumHandler)

// search forums
forumsRouter.get("/search-forums/:query", searchForumHandler)

// get posts from a thread
forumsRouter.get("/get-posts/:threadId", getAllPostsFromAThreadHandler)

// get comments of a post 
forumsRouter.get("/get-comments/:postId", getAllCommentsFromAPostHandler)

// delete comment 
forumsRouter.delete("/delete-comment/:mongoId/:weaviateId", userCommentForumDeleteHandler)

// delete post
forumsRouter.delete("/delete-post/:mongoId/:weaviateId", userPostForumdeleteHandler)

// report comment
forumsRouter.put("/report-comment/:mongoId", reportCommentForumHandler)

// like post
forumsRouter.put("/like-post/:mongoId", likePostForumHandler)

// dislike post
forumsRouter.put("/dislike-post/:mongoId", dislikePostForumHandler)

// like comment
forumsRouter.put("/like-comment/:mongoId", likeCommentForumHandler)

// dislike comment
forumsRouter.put("/dislike-comment/:mongoId", dislikeCommentForumHandler)

// edit comment
forumsRouter.put("/edit-comment/:mongoId/:weaviateId", editCommentForumHandler)

// edit Post
forumsRouter.put("/edit-post/:mongoId/:weaviateId", editPostForumHandler)

// edit thread
forumsRouter.put("/edit-thread/:mongoId/:weaviateId", editThreadForumHandler)

export default forumsRouter