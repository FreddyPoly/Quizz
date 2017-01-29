"use strict"

function display_answer(bool) {
	var good_answer = "rep_"+bool;
	var bad_answer = "rep_"+!bool;

	// Efface la mauvaise réponse
	document.getElementById(bad_answer).style.display = 'none';

	// Met en avant la bonne réponse
	document.getElementById(good_answer).
};