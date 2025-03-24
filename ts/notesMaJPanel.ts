import Configuration from "./entites/configuration";
import InstanceConfiguration from "./instanceConfiguration";
import PanelManager from "./panelManager";
import Sauvegardeur from "./sauvegardeur";

export default class NotesMaJPanel {
  private readonly _panelManager: PanelManager;

  private readonly _notes = [
    {
      version: 512,
      notes: [
        "Correction du non affichage du bouton Partie de la veille",
        "Ajustement de la hauteur du jeu sur certains téléphones",
        "Correction de la couleur de la longue barre des statistiques",
        "Ajout des couleurs dans les stats pour les terminaux sans emoji",
        "Correction d'une coquille dans les options",
        "Résolution d'un problème de selection de texte sur le clavier",
      ],
    },
    {
      version: 500,
      notes: [
        "Revue du design général de l'application",
        "Refonte du mode clair",
        "Refonte de l'affichage des statistiques",
        "Ajout d'un bouton pour partager ses statistiques",
        "Ajout d'un bouton pour terminer la partie de la veille",
        "Ajout d'une option pour avoir le clavier haptique",
        "Ajout d'une option pour transférer ses statistiques sur un autre navigateur",
      ],
    },
  ];

  public constructor(panelManager: PanelManager) {
    this._panelManager = panelManager;
  }

  public afficher(versionOrigine: number): void {
    let titre = "Notes de mises à jour";

    // On affiche du plus récent au plus ancien
    const notesAAfficher = this._notes
      .filter((note) => note.version > versionOrigine)
      .sort((a, b) => {
        if (b.version > a.version) return 1;
        if (b.version < a.version) return -1;
        return 0;
      });

    if (notesAAfficher.length === 0) return;

    const notesArea = document.createElement("div");

    for (let note of notesAAfficher) {
      const divNote = document.createElement("div");

      const titre = document.createElement("h3");
      titre.innerText = `Version ${note.version}`;
      divNote.appendChild(titre);

      const listeNotes = document.createElement("ul");

      for (let item of note.notes) {
        const itemLi = document.createElement("li");
        itemLi.innerText = item;
        listeNotes.appendChild(itemLi);
      }

      divNote.appendChild(listeNotes);

      notesArea.appendChild(divNote);
    }

    this._panelManager.setContenuHtmlElement(titre, notesArea);
    this._panelManager.setClasses(["notes-panel"]);
    this._panelManager.setCallbackFermeture(() => {
      Sauvegardeur.sauvegarderConfig({
        ...(Sauvegardeur.chargerConfig() ?? Configuration.Default),
        changelog: InstanceConfiguration.derniereMiseAJour,
      });
    });
    this._panelManager.afficherPanel();
  }
}
