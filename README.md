# 🔬 Jargon Buster - Interaktives Wissenschafts-Glossar

## 📖 Projektübersicht
**Jargon Buster** ist eine mit React entwickelte Webanwendung, die komplexe wissenschaftliche Begriffe verständlich und zugänglich macht. Sie dient als interaktives Glossar, in dem Benutzer nach Fachbegriffen suchen, sie filtern und mithilfe von Karteikarten (Flashcards) lernen können.

Dieses Projekt wurde als **Abschlussprojekt** für den Kurs *App-Entwicklung (React)* an der **Hochschule Hannover** erstellt.

## 🎯 Die Idee
Die Wissenschaftskommunikation leidet oft unter Fachjargon. Diese Anwendung löst dieses Problem durch ein durchsuchbares, interaktives Wörterbuch. Benutzer können Begriffe nachschlagen, Favoriten speichern und ihr Wissen im "Karteikarten-Modus" testen.

## 🎮 Interaktive Funktionen (6+)
1. **🔍 Suchleiste:** Filtert das Glossar sofort während der Eingabe.
2. **📂 Kategorie-Filter:** Filtert Begriffe nach wissenschaftlichen Bereichen (z.B. Klima, KI, Biologie).
3. **⭐ Favoriten-System:** Speichert Begriffe in einer persönlichen Liste (mithilfe von `localStorage`, bleibt nach dem Neuladen erhalten).
4. **🔤 Alphabetische Sortierung:** Sortiert die Liste von A-Z oder Z-A.
5. **🎴 Karteikarten-Modus:** Blendet Definitionen aus, damit Benutzer ihr Gedächtnis testen können.
6. **➕ Neuen Begriff hinzufügen:** Ein Formular zum Hinzufügen neuer Begriffe (simuliert ein Admin-Panel).
7. **📊 Live-Zähler:** Zeigt dynamisch an, wie viele Begriffe gerade sichtbar sind.

## ⚛️ Verwendete React-Hooks
*   **`useState`:** Für die Verwaltung von Suchbegriffen, Kategorien, Sortierreihenfolge und dem Karteikarten-Modus.
*   **`useReducer`:** Für komplexe Zustandslogik (Verwalten der Glossarliste, Hinzufügen, Löschen und Favorisieren von Begriffen).
*   **`useContext`:** Zur Weitergabe von Daten an alle Komponenten, ohne "Prop Drilling".
*   **`useEffect`:** Zur Synchronisierung der Favoriten mit dem `localStorage`.
*   **`useMemo`:** Zur Leistungsoptimierung (Such-, Filter- und Sortierlogik wird nur bei Bedarf neu berechnet).

## 🏗️ Komponenten-Struktur
```text
App.jsx
├── Header.jsx                (Titel und UI)
├── SearchBar.jsx             (Suchleiste + Kategorie-Filter)
├── GlossaryProvider.jsx      (Context + Reducer für globalen Zustand)
│   ├── GlossaryList.jsx      (Rendert die Liste der TermCards)
│   │   └── TermCard.jsx      (Einzelner Begriff: Name, Definition, Favoriten-Button)
│   ├── FlashcardMode.jsx     (Umschalten zum Ausblenden der Definitionen)
│   └── AddTermForm.jsx       (Formular zum Hinzufügen neuer Begriffe)
└── Footer.jsx                (Credits)