# WoWi Heatmap
Dieses Projekt umfasst die Visualisierung der Daten aus der WoWi-Datenbank mithilfe der Google Maps API.

![](/images/WoWi-Heatmap.png)

## Motivation
Zur **Vermeidung von Risikokumulen** (große Anzahl von Risiken in geographischer Nähe zueinander) ist eine geographische Analyse des Bestandes notwendig.

Außerdem sollen Analysen der Schadenhäufigkeiten und Schadenursachen durchgeführt werden können, um eine **zeitgemäße Tarifierung** zu ermöglichen.

## Aktuelle Funktionen der Oberfläche
Derzeit können folgende Daten geographisch visualisiert werden:
- Verteilungen der Bestände
- Ballungen von Schäden
- Schadensursachen

## Verwendete Technologien / APIs im Frontend
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)

## Informationen zur Google Maps API
Um die Oberfläche nutzen zu können, wird ein [Google Maps API Key](https://developers.google.com/maps/documentation/embed/get-api-key) benötigt.

Weitere Informationen:
- [Dokumentation](https://developers.google.com/maps/documentation/javascript/tutorial)
- [Heatmaps](https://developers.google.com/maps/documentation/javascript/heatmaplayer)
- [Geocoding](https://developers.google.com/maps/documentation/javascript/geocoding)

## Oberfläche starten
1. Repository über folgenden Befehl klonen: `git clone https://github.com/DanielMerkl/wowi-heatmap.git`
2. In den Ordner navigieren und `npm install` ausführen (hierfür wird [NodeJS](https://nodejs.org/en/) benötigt)
3. Den [Google Maps API Key](https://developers.google.com/maps/documentation/embed/get-api-key) in folgenden Dateien einfügen: index.html & mapsApi.ts
4. Oberfläche mit dem Befehl `npm start` starten

## Format der Daten aus dem Backend
Für die Darstellung auf der Karte werden Längen- und Breitengrade benötigt.
Ein Objekt ohne zusätzliche Metadaten würde folgendermaßen aussehen:

```
const einfacherStandort = {
    lat: 51.2366927,
    lng: 6.7754234
}
```

Um die Koordinaten besser interpretieren und analysieren zu können, müssen Metadaten sinnvoll verknüpft werden.
Beispiele für Metadaten:
- Firmenname
- Schadensart
- Datum
- ...

```
const sinnvollerStandort = {
    lat: 51.2366927,
    lng: 6.7754234,
    firmenname: 'Beispiel GmbH',
    schadensart: 'Feuer',
    datum: 01.04.2014
}
```

Die einzelnen Objekte sollten dem Frontend als Liste zur Verfügung gestellt werden:
```
const schadenListe = [
    {
        lat: 52.2363321,
        lng: 6.7754234,
        firmenname: 'Beispiel GmbH',
        schadensart: 'Feuer',
        datum: 01.04.2014
    },
    {
        lat: 50.4364927,
        lng: 6.7757237,
        firmenname: 'Muster AG',
        schadensart: 'Überschwemmung',
        datum: 12.07.2017
    },
    {
        lat: 51.2366927,
        lng: 8.7354254,
        firmenname: 'Example GmbH',
        schadensart: 'Vandalismus',
        datum: 01.01.2018
    },
    ...
]
```
