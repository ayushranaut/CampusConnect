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
import { userCommentDeleteHandler } from "../handlers/forums/userCommentDeleteHandler";


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
forumsRouter.delete("/delete-comment/:mongoId/:weaviateId", userCommentDeleteHandler)
export default forumsRouter