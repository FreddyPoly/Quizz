/*
 * Renvoyer différents types de données (types MIME)
 * Dans l'en tête réponse
 * text/plain: 			texte brut
 * text/html: 			code HTML
 * text/css: 			code CSS
 * image/jpeg: 			image JPEG
 * video/mp4: 			video MP4
 * application/zip: 	fichier ZIP 
*/


var http = require('http');
var express = require('express');
var path = require('path');
var session = require('cookie-session');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false });

var app = express();

// Définition du moteur de vue à EJS
app.set('view engine', 'ejs');

// Mise à disposition du dossier 'public' ou se trouve le fichier css
app.use(express.static(path.join(__dirname, 'public')));

// Utilisation des cookies de session
app.use(session({secret: 'quizzsecret'}));

// Page d'accueil du site
app.get('/', function(req, res) {
	/*var tab = [
		{name: 'Bob', level: 10},
		{name: 'Charles', level: 99},
		{name: 'Pigne', level: 1},
	];*/
	var titre = 'Quizz';
    res.render('pages/accueil', {
    	//tab: tab,
    	titre: titre
    });
});

// Page de choix de thème
app.get('/theme', function(req, res) {
    var titre = 'Choix du thème';
    res.render('pages/theme', {
        titre: titre
    });
});

// Sélection du thème
app.post('/choix_theme', urlencodedParser, function(req, res) {
    var val_theme = 0;
    if(req.body.theme == 32) {
        // Choix d'un thème aléatoire entre 9 et 32
        val_theme = Math.floor(Math.random() * 32) + 9;
    } else {
        val_theme = req.body.theme;
    }

    req.session.theme = val_theme;
    console.log(req.session);
    res.redirect('/difficulte');
});

// Page du choix de la difficulté
app.get('/difficulte', function(req, res) {
    var titre = 'Choix de la difficulté';
    res.render('pages/difficulte', {
        titre: titre
    });
});

// Sélection de la difficulté
app.post('/choix_difficulte', urlencodedParser, function(req, res) {
    req.session.difficulte = req.body.difficulte;

    // Initialisation du compteur de questions
    req.session.question_index = 0;

    // Récupération des questions
    req.session.questions = ;

    console.log(req.session);

    res.redirect('/questions');
});

// Page d'affichage d'une question
app.get('/questions', function(req, res) {
    var titre = 'Question ';
    res.render('pages/questions', {
        titre: titre
    })
});

// *******************************
// Test
app.get('/etage/:etagenum/chambre', function(req, res) {
    res.render('accueil.ejs', {etage: req.params.etagenum});
});

app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('compter.ejs', {compteur: req.params.nombre, noms: noms});
});
// *******************************

// Gestion des requêtes 404
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(8080);