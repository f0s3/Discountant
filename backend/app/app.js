const app = require('express')();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/register', (req, res) => res.send('REGISTER'));

app.get('/login', (req, res) => res.send('LOGIN'));

app.get('/code', (req, res) => res.send('Add code'));

app.put('/code', (req, res) => res.send('Share code'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
