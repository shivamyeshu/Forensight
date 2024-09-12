const express = require("express");
const multer = require("multer");
const { PythonShell } = require("python-shell");
const socketIo = require("socket.io");
const http = require("http");
const mongoose = require('mongoose');
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB connection
mongoose.connect('mongodb://localhost/forensicDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Multer setup
const upload = multer({ dest: "uploads/" });

// Mongoose schema for results
const analysisSchema = new mongoose.Schema({
    suspiciousFiles: [String],
    suspiciousScore: Number,
    yaraMatches: [String]
});
const AnalysisResult = mongoose.model('AnalysisResult', analysisSchema);

// Handle file upload and Python script execution
app.post("/upload", upload.single("file"), (req, res) => {
    const filePath = req.file.path;

    let options = {
        args: [filePath],
    };

    PythonShell.run("forensic_analysis.py", options, function (err, results) {
        if (err) throw err;

        const analysisResults = JSON.parse(results[0]);

        // Save result to MongoDB
        const newResult = new AnalysisResult(analysisResults);
        newResult.save();

        res.json(analysisResults);
    });

    io.on("connection", (socket) => {
        socket.emit("progress", { progress: 50 });
    });
});

server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
