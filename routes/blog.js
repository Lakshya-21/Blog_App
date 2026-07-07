const {Router} = require("express");
const multer  = require('multer');
const path = require("path");

const Blog = require('../models/blog');
const Comment = require('../models/comment');

const { generateSummary } = require("../services/ai");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`
    cb(null,filename);
  },
})

const upload = multer({ storage: storage })

router.get("/add-new",(req,res)=>{
    return res.render("addBlog",{user : req.user,});
});

router.post("/",upload.single('coverImage'),async(req,res)=>{
  const {title,body} = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  }); 
  return res.redirect(`/blog/${blog._id}`);
});

router.get('/:id',async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdBy");

  const comments = await Comment.find({blogId : req.params.id}).populate("createdBy");

  return res.render("blog",{
    blog,
    user:req.user,
    comments,
  });
});


router.post("/comment/:blogId", async (req,res)=>{
  const comment = await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy : req.user._id, 
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});


router.post("/delete/:id", async(req,res)=>{
  const blog = await Blog.findById(req.params.id);
  if(!blog){
    return res.redirect("/");
  }
  if(!req.user || blog.createdBy.toString() !== req.user._id.toString()){
    return res.status(403).send("Unauthorized");
  }
  await Comment.deleteMany({blogId : blog._id});
  await Blog.findByIdAndDelete(req.params.id);
  return res.redirect("/");

});

router.post("/:id/summarize",async(req,res)=>{

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
      return res.status(404).json({
          message: "Blog not found",
      });
  }

  if(blog.aiSummary){
    return res.json({
      summary : blog.aiSummary,
    });
  }
  else{
    try {
        const summary = await generateSummary(blog.body);

        blog.aiSummary = summary;
        await blog.save();

        return res.json({
            summary,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "AI service is currently unavailable. Please try again later.",
        });
    }
  }
});

router.get("/edit/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.redirect("/");
  }

  if (!req.user || blog.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).send("Unauthorized");
  }

  return res.render("editBlog", {
    user: req.user,
    blog,
  });
});

router.post("/edit/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.redirect("/");
  }

  if (!req.user || blog.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).send("Unauthorized");
  }

  const { title, body } = req.body;

  if (blog.title !== title || blog.body !== body) {
    blog.aiSummary = "";
  }

  blog.title = title;
  blog.body = body;

  await blog.save();

  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;