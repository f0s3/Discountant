const app = require('express')();
const bodyParser = require('body-parser')
const port = 3000;
const { User, Code, UsersCodes, sequelize } = require('./sequelize');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
 }));

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
  .then(user => res.status(200).send({userId: user.id}))
  .catch(err => {
    console.log(err);
    res.status(500).send();
  });
});

app.post('/login', (req, res) => {
  const {name, password} = req.body;
  User.findOne({where: {name}})
  .then(user => {
    if (user && user.password === password) {
      res.status(200).send({userId: user.id});
    } else {
      res.status(401).send();
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).send();
  });
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
      }).catch(err => {
        console.log(err);
        res.sendStatus(500);
      })
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

app.put('/code/:id', (req, res) => {
  const { id: code_id } = req.params;
  const { target_id }  = req.body;
  
  UsersCodes.create({user_id: target_id, code_id})
    .then(_ => res.sendStatus(200))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
