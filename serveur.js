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

var app = express();

// Définition du moteur de vue à EJS
app.set('view engine', 'ejs');

// Mise à disposition du dossier 'public' ou se trouve le fichier css
app.use(express.static(path.join(__dirname, 'public')));

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