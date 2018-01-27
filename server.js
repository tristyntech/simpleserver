var express = require('express')
var app = express()
var http = require('http');
const path = require('path');

var cors = require('cors')
app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.json())

var mongoose = require('mongoose')

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',

mongoose.connect('mongodb://tristyntech:password@ds135547.mlab.com:35547/blogtestdb')
var todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean
})

app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname + '/server.js'));
});

var blogPostSchema = new mongoose.Schema({
  image: String,
  title: String,
  headline: String,
  body: String,
  author: String,
})

var Blog = mongoose.model('Blog', blogPostSchema)
var Todo = mongoose.model('Todo', todoSchema)


app.post('/addBlog', (req, res) => {
  var title = req.body.title
  var body = req.body.body
  var image = req.body.image
  var headline = req.body.headline

  console.log('#################working')
  var newPost = new Blog({
    title: title,
    body: body,
    image: image,
    headline: headline,
    author: "Geoff Dennis"
  })
  console.log('newPost', newPost)
  newPost.save()
  .then((resp) => {
    res.send(resp)
  })
})

app.post('/todos/:text', (req, res) => {
  var t = req.params.text
//pop
  var newTodo = new Todo({
    text: t,
    done: false
  })

  newTodo.save()
  .then((res)=>{
      res.json(res)
  })
})


app.get('/getBlogs', (req, res) =>{
  Blog.find({})
  .then((resp) => {
    res.json(resp);
  })
})

app.get('/lulu', (req, res)=> {
  Blog.find({})
  .then((todo)=>{
    res.json(todo)
  })
})

app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password
  if (username === 'theg@gdennis.com' && password==='password') {
    res.json('success')
  } else {
    res.json('fail')
  }
})

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
