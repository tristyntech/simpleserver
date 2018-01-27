//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');

Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

mongoose.connect('mongodb://tristyntech:password@ds135547.mlab.com:35547/blogtestdb')

var todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean
})


var blogPostSchema = new mongoose.Schema({
  image: String,
  title: String,
  headline: String,
  body: String,
  author: String,
})

var Blog = mongoose.model('Blog', blogPostSchema)
var Todo = mongoose.model('Todo', todoSchema)


app.get('/test', (req, res)=>{
  Todo.find({})
  .then((todos) => {
    res.send(todos);
  })
})

app.get('/', (req, res)=>{
  res.send('dinner')
})


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
