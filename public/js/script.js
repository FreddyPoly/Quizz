"use strict"

function display_answer(bool) {
	var good_answer = "rep_"+bool;
	var bad_answer = "rep_"+!bool;

	// Dégradation de la mauvaise réponse
	document.getElementById(bad_answer).style.opacity = '0.3';

	// Met en avant la bonne réponse
	document.getElementById(good_answer).size = "10";
};