const express = require("express");

const apiNotesRouter = require('./apiNotes.js');

const app = express();

app.use("/notes", apiNotesRouter);

module.exports = app;

