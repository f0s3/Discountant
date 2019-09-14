const app = require('express')();
const bodyParser = require('body-parser')
const port = 3000;
const { User, Code, UsersCodes } = require('./sequelize');

app.use(bodyParser.json())

app.get('/', (req, res) => {
  UsersCodes.findAll()
    .then(users => {
      res.send(users);
    })
});

app.post('/register', (req, res) => {
  User.create({
    name: 'IlyaBielov',
    password: '123456'
  }).then(value => res.send(value));
});

app.get('/login', (req, res) => res.send('LOGIN'));

app.post('/code', (req, res) => {
  const code = req.body;

  Code.create({
    name: code.name,
    image: code.image
  }).then(value => {
    res.send({
      id: value.id
    });
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

app.put('/code/:id', (req, res) => {
  Code.update(
    { name: req.body.name },
    { where: { id: req.params.id } }
  ).then(value => {
    Code.findOne({
      where: { id: req.params.id }
    }).then(value => {
      res.send(value);
    })
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
