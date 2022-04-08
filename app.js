const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

//connect to mongoDB
const dbURI = 'mongodb+srv://bralaryea:0909@nodetuts.uowrp.mongodb.net/node-tuts?retryWrites=true&w=majority';
// const dbURI = 'mongodb://bralaryea:0909@_mongodb._tcp.nodetuts.uowrp.mongodb.net/node-tuts?ssl=true&replicaSet=atlas-5h268a-shard-0&authSource=admin&retryWrites=true&w=majority';



mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(5000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs');
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => { res.redirect('/blogs') })

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

app.get('/about-me', (req, res) => {
    res.redirect('/about');
})

//blog routes
app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
