import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Chart } from "chart.js";
import jsPDF from "jspdf";
import "./App.css"; // Importing CSS file for styling
import { Bar } from 'react-chartjs-2'; // For interactive charts
import { ToastContainer, toast } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css';

const socket = io.connect("http://localhost:5000");

function App() {
    const [file, setFile] = useState(null);
    const [analysisResults, setAnalysisResults] = useState(null);
    const [progress, setProgress] = useState(0);
    const [chartData, setChartData] = useState({});

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            toast.error("Please upload a file before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setAnalysisResults(response.data);
            updateChartData(response.data);
            toast.success("Analysis completed successfully.");
        } catch (error) {
            toast.error("An error occurred during the analysis.");
        }
    };

    const updateChartData = (data) => {
        const { suspicious_files, suspicious_score } = data;
        setChartData({
            labels: suspicious_files,
            datasets: [
                {
                    label: 'Suspicious Files Score',
                    data: suspicious_score,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        });
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Analysis Report", 10, 10);
        doc.text(JSON.stringify(analysisResults, null, 2), 10, 20);
        doc.save("report.pdf");
        toast.success("PDF generated successfully.");
    };

    useEffect(() => {
        socket.on("progress", (data) => {
            setProgress(data.progress);
        });
    }, []);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Cyber Triage Tool</h1>
            </header>
            <main className="app-main">
                <div className="upload-section">
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        className="file-input"
                    />
                    <button
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                        Submit Evidence
                    </button>
                </div>
                <div className="progress-container">
                    <progress
                        className="progress-bar"
                        value={progress}
                        max="100"
                    ></progress>
                    <span className="progress-text">{progress}%</span>
                </div>
                {analysisResults && (
                    <div className="results-section">
                        <h2>Results</h2>
                        <pre className="results-text">
                            {JSON.stringify(analysisResults, null, 2)}
                        </pre>
                        <button
                            onClick={generatePDF}
                            className="export-button"
                        >
                            Export as PDF
                        </button>
                        <div className="chart-container">
                            <Bar
                                data={chartData}
                                options={{
                                    responsive: true,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                )}
            </main>
            <footer className="app-footer">
                <p>© 2024 Cyber Triage Tool</p>
            </footer>
            <ToastContainer />
        </div>
    );
}

export default App;
