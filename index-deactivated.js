
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const port = 3000;
var path = require('path');
const { getegid } = require('process');
const app = express();

var login = 'admin';
var password = 'password';

app.use(session({
    secret: 'atgagaeihgiaeoiaebueauuuuu7_bananasemcasca',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));
app.use(express.json());
app.use(cors());

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})

app.get('/login', (req, res)=>{
    res.render('page-login/index');
})
app.post('/login', (req, res)=>{
    console.log(req.body.email);
    if(req.body.email === login && req.body.password === password){
        console.log('USUÁRIO LOGADO!');
    }else{
        console.log('EMAIL OU SENHA INCORRETOS');
    }
})

app.get('/register', (req, res)=>{
    res.render('page-register/index');
})
app.post('/register', (req, res)=>{
    const {
        name,
        email,
        password,
        voucher
    } = req.body;
    
    // Verifique se algum campo obrigatório está faltando
    if (!name || !email || !password || !voucher) {
        return res.status(400).json({ message: 'Error' });
    }

    return res.status(200).json({ token: '123' })
    // Outras validações e lógica de registro aqui...

    // Redirecionamento para o sucesso após o registro
    //res.redirect('/register/success');
})
app.get('/register/success', (req, res)=>{
    res.render('page-register/index');
})

app.get('/main', (req,res) => {
    res.render('page-register/index');
})

function autenticarToken(req,res,next){
    const authH = req.headers['authorization'];
    const token = authH && authH.split(' ')[1];

    if(token === null) return res.status(401).send('Token não encontrado');

    //verificando o token
    jwt.verify(token, process.env.TOKEN, (err, user) => {
        if(err) return res.status(403).send('Token inválido');
        console.log('token verificado: ');
        console.log(token);
        next();
    })
}