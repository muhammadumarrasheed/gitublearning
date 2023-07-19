const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');

// init Middleware
// const logger = require('./Middleware/logger');
// app.use(logger);
// Handlebars Middleware
// Handlebars Middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Home page
app.get('/', (req, res) => res.render('index'));



// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//Get a single Member
// app.get('/api/members/:id', (req, res) => {
//     res.json(members.filter(member => member.id === req.params.id));
// });



// app.get('/', (req, res) => {
//     res.send(path.join(__dirname, 'public', 'index.html'));
// });
//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/members', require('./routes/api/members'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`
                Server started on port $ { PORT }`))