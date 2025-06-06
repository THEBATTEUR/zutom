"use strict";

/**
 * Petit script qui nettoie le fichier dictionnaire pour le mettre dans le format attendu par le système
 */
var fs = require("fs");

function ecrireDictionnaire(dictionnaire, suffixeNom) {
  console.log("Écriture du dictionnaire " + (suffixeNom !== undefined ? suffixeNom : "général"));
  let contenu = "export default class ListeMotsProposables {\n";
  contenu += "public static readonly Dictionnaire: Array<string> = [\n";
  contenu += dictionnaire
    .map(function (mot) {
      return '"' + mot.toUpperCase().replaceAll("\r", "") + '"';
    })

  contenu += "\n];";
  contenu += "\n}";
  let nomFichier = "ts/mots/listeMotsProposables";
  if (suffixeNom !== undefined) nomFichier += suffixeNom;
  nomFichier += ".ts";
  fs.writeFile(nomFichier, contenu, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
}

function ecrireListeNettoyee(dictionnaire) {
  let contenu = dictionnaire
    .map(function (mot) {
      return mot.toUpperCase();
    })
    .join("\n");
  let nomFichier = "data/motsNettoyes.txt";
  fs.writeFile(nomFichier, contenu, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
}

fs.readFile("data/mots.txt", "UTF8", function (erreur, contenu) {
  console.log("Chargement de la liste des mots");
  //console.log(erreur);
  var dictionnaire = contenu
    .split("\n")
    .filter((mot) => mot)
    .map((mot) =>
      mot
        .normalize("NFD")
        .replace(/æ/gu, "ae")
        .replace(/œ/gu, "oe")
        .replace(/\p{Diacritic}/gu, "")
        .replace("\r", "")
    )
    .filter(
      (mot) =>
        !(mot[0] === mot[0].toUpperCase()) &&
        mot.length >= 4 &&
        mot.length <= 10 &&
        !mot.includes("!") &&
        !mot.includes(" ") &&
        !mot.includes("-") &&
        !mot.toUpperCase().startsWith("K") &&
        !mot.toUpperCase().startsWith("Q") &&
        !mot.toUpperCase().startsWith("W") &&
        !mot.toUpperCase().startsWith("X") &&
        !mot.toUpperCase().startsWith("Y") &&
        !mot.toUpperCase().startsWith("Z")
    )
    .filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
  console.log("Tri du dictionnaire");
  dictionnaire.sort((a, b) => {
    if (a.length < b.length) return -1;
    if (a.length > b.length) return 1;
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  console.log("Longueur du dictionnaire : " + dictionnaire.length);

  ecrireListeNettoyee(dictionnaire);
  ecrireDictionnaire(dictionnaire);

  const NUMBERS = [4, 5, 6, 7, 8, 9, 10];
  let initialesPossibles = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V"];
  for (let longueur of NUMBERS) {
    for (let initiale of initialesPossibles) {
      let dicoFiltre = dictionnaire.filter((mot) => mot.length == longueur && mot.toUpperCase().startsWith(initiale));
      console.log("Longueur du dictionnaire : " + dicoFiltre.length);
      if (dicoFiltre.length > 0) {
        if (dicoFiltre[0].length !== longueur) {
          console.error("Erreur ! La longueur du premier mot ne correspond pas à la longueur attendue.")
          return;
        }
        ecrireDictionnaire(dicoFiltre, "." + longueur + "." + initiale);
      }
    }
  }
});
