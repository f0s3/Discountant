const app = require('express')();
const bodyParser = require('body-parser')
const port = 3000;
const { User, Code, UsersCodes, sequelize } = require('./sequelize');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
 }));

function parseError(err, res) {
  console.log(err);
  res.sendStatus(500);
}

app.get('/', (req, res) => {
  const { user_id } = req.headers;
  
  sequelize.query(`
      SELECT codes.* FROM codes
      LEFT JOIN users_codes AS uc ON uc.code_id = codes.id
      WHERE uc.user_id = ${ user_id }
    ;`, {
      model: Code,
      mapToModel: true,
      type: sequelize.QueryTypes.SELECT
    }).then((result) => {
      const codes = result.map(({ dataValues }) => dataValues);
    console.log(17, codes);
    res.send({ codes })
  })
});

app.post('/register', (req, res) => {
  const {name, password} = req.body;
  User.create({name, password})
  .then(user => res.status(200).send({user_id: user.id}))
  .catch(err => parseError(err, res));
});

app.post('/login', (req, res) => {
  const {name, password} = req.body;
  User.findOne({where: {name}})
  .then(user => {
    if (user && user.password === password) {
      res.status(200).send({user_id: user.id});
    } else {
      res.status(401).send();
    }
  })
  .catch(err => parseError(err, res));
});

app.post('/code', (req, res) => {
  const {name, image} = req.body;
  const {user_id} = req.headers;

  Code.create({name, image})
  .then(({ dataValues: { id } }) => {
    console.log("abc", id);
    UsersCodes.create({user_id, code_id: id})
      .then(_ => {
        res.send({ id });
      }).catch(err => parseError(err, res));
  }).catch(err => parseError(err, res));
});

app.put('/code/:id', (req, res) => {
  const { id: code_id } = req.params;
  const { target_id }  = req.body;
  
  UsersCodes.create({user_id: target_id, code_id})
    .then(_ => res.sendStatus(200))
    .catch(err => parseError(err, res));
});

app.delete('/code/:id', (req, res) => {
  const { id } = req.params;
  const { user_id } = req.headers;

  UsersCodes.findOne({where: {user_id, code_id: id}})
  .then(code => {
    if (code) {
      code.destroy();
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  })
  .catch(err => parseError(err, res));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
