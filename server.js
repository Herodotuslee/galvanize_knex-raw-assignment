const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000

app.use(bodyParser.json())


//Landing Page
app.get('/',(req,res)=>{
  res.json('Hola!!!')
})

//GET ALL DATAS
app.get('/posts',(req,res)=>{
  knex.raw(`SELECT * FROM posts`)
  .then((result)=>{
    res.json(result.rows)
  })
  .catch((err)=>{
    console.error(err)
  })
})

//GET Unique post by ID
app.get('/posts/:id',(req,res)=>{
  knex.raw(`SELECT * FROM posts WHERE id=${req.params.id}`)
  .then(result=>{
    res.json(result.rows)
  })
  .catch((err)=>{
    console.error(err)
  })
})


//POST DATA
app.post('/posts', (req, res) => {
  knex.raw(`INSERT INTO posts (content, author, upvotes) VALUES
    ('${req.body.content}', '${req.body.author}', ${req.body.upvotes})`)
    .then(() => {
      res.json('Added Post')
    })
    .catch((err) => {
      console.error(err)
    })
})

//UPDATE DATA
app.put('/posts/:id',(req,res)=>{
  knex.raw(`UPDATE posts SET content='${req.body.content}',author='${req.body.author}',upvotes=${req.body.upvotes} WHERE id=${req.params.id}`)
  .then(()=>{
  res.json(`Updated ID :${req.params.id}`)
})
  .catch((err)=>{
    console.error(err)
  })
})

//DELETE DATA
app.delete('/posts/:id', (req, res) => {
  knex.raw(`DELETE FROM posts WHERE id=${req.params.id}`)
  .then(() => {
    res.json('Post Deleted')
  })
  .catch((err) => {
    console.error(err)
  })
})




app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
