/**************
 *  Variables *
 **************/

const affichageMelange = document.getElementById('affichage-melange');
const titreSyllabes = document.getElementById('titre-syllabes');
const radioButton1 = document.getElementById('radioButton1');
const radioButton2 = document.getElementById('radioButton2');
const radioButton3 = document.getElementById('radioButton3');

var graphemeVoyelles = [];
var graphemeConsonnes = [];
var graphemes = [];

var baseVoyellesUneLettre = ['a', 'e', 'i', 'o', 'u', 'y', 'é', 'è', 'ê'];
var baseVoyellesDeuxLettres = ['ou', 'oi', 'ai', 'ei', 'an', 'am', 'en', 'em', 'un', 'in', 'im', 'on', 'om', 'eu', 'es', 'ui', 'au'];
var baseVoyellesTroisLettres = ['ain', 'ein', 'oin', 'oeu', 'ian', 'ien', 'ion', 'eau', 'ail', 'eil'];
var baseVoyellesQuatreLettres = ['ette', 'elle', 'erre', 'esse', 'enne', 'aille', 'eille', 'ouille', 'euille'];

var baseConsonnesUneLettre = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
var baseConsonnesDeuxLettres = ['ph', 'ch', 'qu', 'br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr', 'vr', 'bl', 'cl', 'fl', 'gl', 'pl', 'gu', 'ge'];

const buttons = document.querySelectorAll("input[type='radio']");

buttons.forEach(button => {
  button.onclick = () => {
    if (button.checked) {
      melangerSyllabes(graphemeVoyelles, graphemeConsonnes, affichageMelange)
    }
  }
})

/*****************************
 * Fonction de creation html *
 *****************************/
function createNewInput (base, letterRow, name) {
	for (let i=0; i<base.length; i++) {
		var newDiv = document.createElement('div');
		newDiv.id = 'letterCheck';
		var newInput = document.createElement('input');
		newInput.type = 'checkbox';
		newInput.id = base[i];
		newInput.name = name;
		var newLabel = document.createElement('label');
		newLabel.htmlFor = base[i];
		newLabel.appendChild(document.createTextNode(base[i]));
		newDiv.appendChild(newInput);
		newDiv.appendChild(newLabel);
		document.getElementById(letterRow).appendChild(newDiv);
	}	
}

createNewInput(baseVoyellesDeuxLettres, 'CHKV2', 'deuxLettres');
createNewInput(baseVoyellesUneLettre, 'CHKV1', 'uneLettre');
createNewInput(baseVoyellesTroisLettres, 'CHKV3', 'troisLettres');
createNewInput(baseVoyellesQuatreLettres, 'CHKV4', 'quatreLettres');
createNewInput(baseConsonnesUneLettre, 'CHKC1', 'uneCons');
createNewInput(baseConsonnesDeuxLettres, 'CHKC2', 'deuxCons');

/**************************
 *  FONCTION DE SÉLECTION *
 **************************/

function select (base, grapheme, grapheme2) {
	for (let i=0; i<base.length; i++) {
		const x = document.getElementById(base[i]).addEventListener('change', ($event) => {
			if ($event.target.checked) {
				grapheme.push(base[i]);
				grapheme2.push(base[i]);
			} else {
				const index = grapheme.indexOf(base[i]);
				grapheme.splice(index, 1);
				grapheme2.splice(index, 1);
				}
		});
	}
}

function changeCheckbox (base1, base2) {
	reset();
	for (let i=0; i<base1.length; i++) {
		const x = document.getElementById(base1[i]);
		x.checked = true;
		graphemeVoyelles.push(base1[i]);
	}
	for (let i=0; i<base2.length; i++) {
		const x = document.getElementById(base2[i]);
		x.checked = true;
		graphemeConsonnes.push(base2[i]);
	}
}

select(baseVoyellesUneLettre, graphemeVoyelles, graphemes);
select(baseVoyellesDeuxLettres, graphemeVoyelles, graphemes);
select(baseVoyellesTroisLettres, graphemeVoyelles, graphemes);
select(baseVoyellesQuatreLettres, graphemeVoyelles, graphemes);
select(baseConsonnesUneLettre, graphemeConsonnes, graphemes);
select(baseConsonnesDeuxLettres, graphemeConsonnes, graphemes);

const selectionNiveau = document.getElementById('progression').addEventListener('change', ($event) => {
	switch ($event.target.value) {
		case '1aeiou':			
			var baseV = ["a", "e", "i", "o", "u"];
			var baseC = [];
			changeCheckbox(baseV, baseC);			
			melanger(baseV, affichageMelange);
			break;
		case '2laeiou':			
			var baseV = ["a", "e", "i", "o", "u"];
			var baseC = ["l"];
			changeCheckbox(baseV, baseC);
			melangerSyllabes(baseV, baseC, affichageMelange);
			break;
		case '3raeiou':			
			var baseV = ["a", "e", "i", "o", "u"];
			var baseC = ["r"];
			changeCheckbox(baseV, baseC);
			melangerSyllabes(baseV, baseC, affichageMelange);
			break;
		case '4faeiou':			
			var baseV = ["a", "e", "i", "o", "u"];
			var baseC = ["f"];
			changeCheckbox(baseV, baseC);
			melangerSyllabes(baseV, baseC, affichageMelange);
			break;
		case '5jaeiou':			
			var baseV = ["a", "e", "i", "o", "u"];
			var baseC = ["j"];
			changeCheckbox(baseV, baseC);
			melangerSyllabes(baseV, baseC, affichageMelange);
			break;
		case '6maeiou':			
			var baseV = ["a", "e", "i", "o", "u"];
			var baseC = ["m"];
			changeCheckbox(baseV, baseC);
			melangerSyllabes(baseV, baseC, affichageMelange);
			break;
		case '7naeiou':			
			var baseV = ["a", "e", "i", "o", "u"];
			var baseC = ["n"];
			changeCheckbox(baseV, baseC);
			melangerSyllabes(baseV, baseC, affichageMelange);
			break;		
		}
	});

/*******************************************************
 *  FONCTION DE MELANGE, D'AFFICHAGE ET DE MISE À ZÉRO *
 *******************************************************/

function melanger(donnees, affichage) {		
	affichageMelange.textContent = " ";
	if (donnees.length == 0) {
		window.alert("Vous devez choisir au moins un graphème !");}
		else {
	for (compteur=0; compteur <200; compteur +=1) {
		var lettreAleatoire = Math.floor(Math.random() * donnees.length);
		affichageMelange.textContent += donnees[lettreAleatoire] + " ";}
	}	
}

function melangerSyllabes(donneesVoyelles, donneesConsonnes, affichage) {		
	affichageMelange.textContent = " ";
	if (donneesVoyelles.length < 1 || donneesConsonnes < 1) {
		window.alert("Vous devez choisir au moins un graphème voyelle et un graphème consonne !");}
		else {
	for (compteur=0; compteur <200; compteur +=1) {
		var voyelleAleatoire = Math.floor(Math.random() * donneesVoyelles.length);
		var consonneAleatoire = Math.floor(Math.random() * donneesConsonnes.length);
		var syllabeAleatoire = Math.floor(Math.random() * 2);
		if (radioButton1.checked == true)
			affichageMelange.textContent += donneesConsonnes[consonneAleatoire] + donneesVoyelles[voyelleAleatoire] + " ";
		else if (radioButton2.checked == true)
			affichageMelange.textContent += donneesVoyelles[voyelleAleatoire] + donneesConsonnes[consonneAleatoire] + " ";
		else if (radioButton3.checked == true)			
			if (syllabeAleatoire === 1)
				affichageMelange.textContent += donneesConsonnes[consonneAleatoire] + donneesVoyelles[voyelleAleatoire] + " ";
			else
				affichageMelange.textContent += donneesVoyelles[voyelleAleatoire] + donneesConsonnes[consonneAleatoire] + " ";
		}
	}	
}

function lireDeuxSyllabes(donneesVoyelles, donneesConsonnes, affichage) {		
	affichageMelange.textContent = " ";
	if ((donneesVoyelles.length < 1) | (donneesConsonnes.length < 1)) {
		window.alert("Vous devez choisir au moins un graphème voyelle et un graphème consonne !");}
		else {
	for (compteur=0; compteur <200; compteur +=1) {
		var voyelleAleatoire1 = Math.floor(Math.random() * donneesVoyelles.length);
		var consonneAleatoire1 = Math.floor(Math.random() * donneesConsonnes.length);
		var voyelleAleatoire2 = Math.floor(Math.random() * donneesVoyelles.length);
		var consonneAleatoire2 = Math.floor(Math.random() * donneesConsonnes.length);
		affichageMelange.textContent += donneesConsonnes[consonneAleatoire1] + donneesVoyelles[voyelleAleatoire1]
		+ donneesConsonnes[consonneAleatoire2] + donneesVoyelles[voyelleAleatoire2] + " ";}
	}	
}

function lireTroisSyllabes(donneesVoyelles, donneesConsonnes, affichage) {		
	affichageMelange.textContent = " ";
	if (donneesVoyelles.length < 1 || donneesConsonnes.length < 1) {
		window.alert("Vous devez choisir au moins un graphème voyelle et un graphème consonne !");}
		else {
	for (compteur=0; compteur <200; compteur +=1) {
		var voyelleAleatoire1 = Math.floor(Math.random() * donneesVoyelles.length);
		var consonneAleatoire1 = Math.floor(Math.random() * donneesConsonnes.length);
		var voyelleAleatoire2 = Math.floor(Math.random() * donneesVoyelles.length);
		var consonneAleatoire2 = Math.floor(Math.random() * donneesConsonnes.length);
		var voyelleAleatoire3 = Math.floor(Math.random() * donneesVoyelles.length);
		var consonneAleatoire3 = Math.floor(Math.random() * donneesConsonnes.length);
		affichageMelange.textContent += donneesConsonnes[consonneAleatoire1] + donneesVoyelles[voyelleAleatoire1]
		+ donneesConsonnes[consonneAleatoire2] + donneesVoyelles[voyelleAleatoire2]
		+ donneesConsonnes[consonneAleatoire3] + donneesVoyelles[voyelleAleatoire3] + " ";}
	}	
}

function reset() {
	var clist = document.getElementsByTagName("input");
	for (var i = 0; i < clist.length; ++i) { clist[i].checked = false; }
	affichageMelange.textContent = " ";
	graphemeConsonnes.splice(0, graphemeConsonnes.length);
	graphemeVoyelles.splice(0, graphemeVoyelles.length);
	graphemes.splice(0, graphemes.length);
	radioButton1.checked = "checked";
}

function selectAll(nom, base, unit, unit2) {
		checkboxes = document.getElementsByName(nom);
		for (var i = 0; i < checkboxes.length; ++i) {checkboxes[i].checked = true;}
			for (var i=0; i<base.length; ++i) {
				unit.push(base[i]);
				unit2.push(base[i]);}			
	}

function selectNone(nom, base, unit, unit2) {
		checkboxes = document.getElementsByName(nom);
		for (var i = 0; i < checkboxes.length; ++i) {checkboxes[i].checked = false;}
			for (var i=0; i<base.length; ++i) {
				var graph = base[i];
				if (unit2.includes(base[i])) {
					var index = unit2.indexOf(base[i]);
					unit2.splice(index, 1);}
				}
		unit.splice(0, base.length);			
	}

