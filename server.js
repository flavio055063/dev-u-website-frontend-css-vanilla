
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet')

const port = 3000;
var path = require('path');
const { getegid } = require('process');
const app = express();
const User = require('./public/models/User');


//secutiry improved. Any doubt, see https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());
app.disable('x-powered-by')

//Necessário para extrair os dados de Forms vindos de uma requisição POST
app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'atgagaeihgiaeoiaebueauuuuu7_bananasemcasca',
    resave: true,
    saveUninitialized: true,
    name: 'sessionId'
}));

app.use(bodyParser.urlencoded({extended:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));
app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})

// custom 404
// app.use((req, res, next) => {
//     res.status(404).send("The server could not find the requested page.")
// })
  
// custom error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Oops! Something is not working very well... (×_×)')
})

app.get('/login', (req, res)=>{
    res.render('page-login/index');
})

app.post('/login', async(req, res)=>{

    const {name, email, password, voucher} = req.body;

    //Abre o bd (aqui estamos simulando com arquivo)
    const usuariosCadastrados = JSON.parse(fs.readFileSync('banco-dados-usuario.json', { encoding: 'utf8', flag: 'r' }));

       //verifica se existe usuario com email    
    for (let user of usuariosCadastrados){
        if(user.email === email){
            //usuario existe.  Agora é verificar a senha
            const passwordValidado = await bcrypt.compare(password, user.password);
            if(passwordValidado===true){
                //Usuario foi autenticado.
                //Agora vamos retornar um token de acesso
                //para isso usamos jwt
                //O primeiro parametro é o que queremos serializar (o proprio user)
                //O segundo parametro é a chave secreta do token. Está no arquivo .env
                //La coloquei as instruções de como gerar
                const tokenAcesso = jwt.sign(user,process.env.TOKEN);
                return res.status(200).json(tokenAcesso);
            }
                
            else
                return res.status(422).send(`Usuario ou senhas incorretas.`);
        }   
    }
    //Nesse ponto não existe usuario com email informado.
    return res.status(409).send(`Usuario com email ${email} não existe. Considere criar uma conta!`);

})

app.get('/register', (req, res)=>{
    console.log("[ GET ] Register");
    res.render('page-register/index');
})
app.post('/register', (req, res)=>{
    console.log("[ POST ] Register");
    const {name, email, password, voucher} = req.body;
    console.log(name);
    console.log(password);
    console.log(voucher);
    console.log(email);
    
    // Verifique se algum campo obrigatório está faltando
    if (!name || !email || !password || !voucher || voucher != '123456') {
        return res.status(400).json({ token: 'Invalid' });
    }

    
    return res.status(200).json({ token: '123' });
    // Outras validações e lógica de registro aqui...

    res.redirect('/register/success');
})

app.get('/main', (req,res) => {
})

