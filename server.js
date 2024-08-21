import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import QmcSchema from "./models/qmc.Schema.js";
import morgan from "morgan";

/** imposto la porta da usare prendendola dal file env oppure 5000 */
const PORT = process.env.PORT || 5000;
/** dichiaro il server */
const QMCSERVER = express();
/** abilito il logger */
QMCSERVER.use(morgan("dev"));
/** abilito l'utilizzo json */
QMCSERVER.use(express.json());
/** mi collego al database */
await mongoose
  .connect(process.env.MONGO_CONNECTION_URI, { dbName: process.env.DB_NAME })
  .then(() => {
    return console.log("DataBase Connected");
  })
  .catch((err) => console.log(err));

QMCSERVER.get("/", async (req, res) => {
  return res.send(
    `
    <a href=${process.env.HOST}:${PORT}/isActive target="_blank">Trova tutte le risorse con il dato isActive corrispondente a true</a><br>
    <a href=${process.env.HOST}:${PORT}/maggioreVentisei target="_blank">Trova tutte le risorse con il dato age maggiore di 26</a><br>
    <a href=${process.env.HOST}:${PORT}/MaggioreVentiseiMinoreUgualeTrenta target="_blank">Trova tutte le risorse con il dato age maggiore di 26 e minore o uguale a 30</a><br>
    <a href=${process.env.HOST}:${PORT}/EyesBrownBlue target="_blank">Trova tutte le risorse con il dato eyes che sia brown o blue</a><br>
    <a href=${process.env.HOST}:${PORT}/EyesNoGreen target="_blank">Trova tutte le risorse che non presentano il dato eyes uguale a green</a><br>
    <a href=${process.env.HOST}:${PORT}/EyesNoGreenBlue target="_blank">Trova tutte le risorse che non presentano il dato eyes uguale a green e neanche a blue</a><br>
    <a href=${process.env.HOST}:${PORT}/Fitcore target="_blank">Trova tutte le risorse con il dato company uguale a "FITCORE" e ritorna solo l'email</a>
    `
  );
});
/** trova tutte le risorse con il dato isActive corrispondente a true => 51 */
QMCSERVER.get("/isActive", async (req, res) => {
  try {
    /** filtro i risultati in una costante */
    const IsActive = await QmcSchema.find({ isActive: true });
    /** restituisco in console il totale dei risultati trovati */
    console.log(
      `Trova tutte le risorse con il dato isActive corrispondente a true => ${IsActive.length} risultati`
    );
    /** restituisco i risultati all'utente */
    return res.send(IsActive);
  } catch (err) {
    /** restituisco l'errore */
    res.status(500).send(err);
  }
});

/** trova tutte le risorse con il dato age maggiore di 26 => 54 */
QMCSERVER.get("/maggioreVentisei", async (req, res) => {
  try {
    /** filtro i risultati in una costante */
    const MaggioreVentisei = await QmcSchema.find({ age: { $gt: 26 } });
    /** restituisco in console il totale dei risultati trovati */
    console.log(
      `Trova tutte le risorse con il dato age maggiore di 26 => ${MaggioreVentisei.length} risultati`
    );
    /** restituisco i risultati all'utente */
    return res.send(MaggioreVentisei);
  } catch (err) {
    /** restituisco l'errore */
    res.status(500).send(err);
  }
});

/** trova tutte le risorse con il dato age maggiore di 26 e minore o uguale a 30 => 19 */
QMCSERVER.get("/MaggioreVentiseiMinoreUgualeTrenta", async (req, res) => {
  try {
    /** filtro i risultati in una costante */
    const MaggioreVentiseiMinoreUgualeTrenta = await QmcSchema.find({
      $and: [{ age: { $gt: 26 } }, { age: { $lte: 30 } }],
    });
    /** restituisco in console il totale dei risultati trovati */
    console.log(
      `Trova tutte le risorse con il dato age maggiore di 26 e minore o uguale a 30 => ${MaggioreVentiseiMinoreUgualeTrenta.length} risultati`
    );
    /** restituisco i risultati all'utente */
    return res.send(MaggioreVentiseiMinoreUgualeTrenta);
  } catch (err) {
    /** restituisco l'errore */
    res.status(500).send(err);
  }
});

/** trova tutte le risorse con il dato eyes che sia brown o blue => 66 */
QMCSERVER.get("/EyesBrownBlue", async (req, res) => {
  try {
    /** filtro i risultati in una costante */
    const EyesBrownBlue = await QmcSchema.find({
      $or: [{ eyeColor: "blue" }, { eyeColor: "brown" }],
    });
    /** restituisco in console il totale dei risultati trovati */
    console.log(
      `Trova tutte le risorse con il dato eyes che sia brown o blue => ${EyesBrownBlue.length} risultati`
    );
    /** restituisco i risultati all'utente */
    return res.send(EyesBrownBlue);
  } catch (err) {
    /** restituisco l'errore */
    res.status(500).send(err);
  }
});

/** trova tutte le risorse che non presentano il dato eyes uguale a green => 66 */
QMCSERVER.get("/EyesNoGreen", async (req, res) => {
  try {
    /** filtro i risultati in una costante */
    const EyesNoGreen = await QmcSchema.find({ $nor: [{ eyeColor: "green" }] });
    /** restituisco in console il totale dei risultati trovati */
    console.log(
      `Trova tutte le risorse che non presentano il dato eyes uguale a green => ${EyesNoGreen.length} risultati`
    );
    /** restituisco i risultati all'utente */
    return res.send(EyesNoGreen);
  } catch (err) {
    /** restituisco l'errore */
    res.status(500).send(err);
  }
});

/** trova tutte le risorse che non presentano il dato eyes uguale a green e neanche a blue => 35 */
QMCSERVER.get("/EyesNoGreenBlue", async (req, res) => {
  try {
    /** filtro i risultati in una costante */
    const EyesNoGreenBlue = await QmcSchema.find({
      $nor: [{ eyeColor: "green" }, { eyeColor: "blue" }],
    });
    /** restituisco in console il totale dei risultati trovati */
    console.log(
      `Trova tutte le risorse che non presentano il dato eyes uguale a green e neanche a blue => ${EyesNoGreenBlue.length} risultati`
    );
    /** restituisco i risultati all'utente */
    return res.send(EyesNoGreenBlue);
  } catch (err) {
    /** restituisco l'errore */
    res.status(500).send(err);
  }
});

/** trova tutte le risorse con il dato company uguale a "FITCORE" e ritorna solo l'email => 1 */
QMCSERVER.get("/Fitcore", async (req, res) => {
  try {
    /** filtro i risultati in una costante */
    const Fitcore = await QmcSchema.find({
      company: /^fitcore$/i,
    }).select({ email: 1, _id: 0 });
    // .project({ email: 1, _id: 0 });
    /** restituisco in console il totale dei risultati trovati */
    console.log(
      `Trova tutte le risorse con il dato company uguale a "FITCORE" e ritorna solo l'email => ${Fitcore.length} risultati`
    );
    /** restituisco i risultati all'utente */
    return res.send(Fitcore);
  } catch (err) {
    /** restituisco l'errore */
    res.status(500).send(err);
  }
});

/** imposto il server in ascolto */
QMCSERVER.listen(PORT, () =>
  console.log(`server listen on ${process.env.HOST}:${PORT}`)
);
