# 🔬 Jargon Buster - Interaktives Wissenschafts-Glossar

## 📖 Projektübersicht
**Jargon Buster** ist eine mit React entwickelte Webanwendung, die komplexe wissenschaftliche Begriffe verständlich und zugänglich macht. Sie dient als interaktives Glossar, in dem Benutzer nach Fachbegriffen suchen, sie filtern und mithilfe von Karteikarten (Flashcards) lernen können.

Dieses Projekt wurde als **Abschlussprojekt** für den Kurs *App-Entwicklung (React)* an der **Hochschule Hannover** erstellt.

## 🎯 Die Idee
Die Wissenschaftskommunikation leidet oft unter Fachjargon. Diese Anwendung löst dieses Problem durch ein durchsuchbares, interaktives Wörterbuch. Benutzer können Begriffe nachschlagen, Favoriten speichern und ihr Wissen im "Karteikarten-Modus" testen.

## 🎮 Interaktive Funktionen (7)
1. **🔍 Suchleiste:** Filtert das Glossar sofort während der Eingabe.
2. **📂 Kategorie-Filter:** Filtert Begriffe nach wissenschaftlichen Bereichen (dynamisch aus den Daten generiert).
3. **⭐ Favoriten-System:** Speichert Begriffe in einer persönlichen Liste (mithilfe von `localStorage`, bleibt nach dem Neuladen erhalten).
4. **🔤 Alphabetische Sortierung:** Sortiert die Liste von A-Z oder Z-A.
5. **🎴 Karteikarten-Modus:** Blendet Definitionen aus, damit Benutzer ihr Gedächtnis testen können.
6. **➕ Neuen Begriff hinzufügen:** Ein Formular zum Hinzufügen neuer Begriffe (mit dynamischer Kategorie-Eingabe).
7. **📊 Live-Zähler:** Zeigt dynamisch an, wie viele Begriffe gerade sichtbar sind.

## ⚛️ Verwendete React-Hooks
*   **`useState`:** Für die Verwaltung von Suchbegriffen, Kategorien, Sortierreihenfolge, Karteikarten-Status und Formulareingaben.
*   **`useReducer`:** Für komplexe Zustandslogik (Verwalten der Glossarliste, Hinzufügen, Löschen und Favorisieren von Begriffen).
*   **`useContext`:** Zur Weitergabe von Daten an alle Komponenten, ohne "Prop Drilling".
*   **`useEffect`:** Zur Synchronisierung der Begriffe und Favoriten mit dem `localStorage`.
*   **`useMemo`:** Zur Leistungsoptimierung (Such-, Filter- und Sortierlogik wird nur bei Bedarf neu berechnet).

## 🏗️ Komponenten-Struktur
```text
src/
├── context/
│   └── GlossaryProvider.jsx  (Zentraler State & localStorage)
├── components/
│   ├── SearchBar.jsx         (Suche, Filter & Sortierung)
│   ├── GlossaryList.jsx      (Rendert die Liste)
│   ├── TermCard.jsx          (Einzelner Begriff)
│   ├── AddTermForm.jsx       (Formular zum Hinzufügen)
│   └── FlashcardMode.jsx     (Karteikarten-Ansicht)
├── App.jsx                   (Hauptkomponente & View-Toggle)
└── App.css                   (Professionelles Styling)


🚀 Installation und Start
Repository klonen:

bash
git clone https://github.com/mutabazi105/jargon-buster.git  
In den Ordner wechseln:

bash
cd jargon-buster
Abhängigkeiten installieren:

bash
npm install
Entwicklungsserver starten:

bash
npm run dev
Im Browser öffnen: http://localhost:5173/


👨‍💻 Autor
Bernard
App-Entwicklung (React) - Hochschule Hannover