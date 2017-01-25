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

var app = express();

// Page d'accueil du site
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
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