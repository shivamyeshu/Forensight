# Cyber Triage Tool

## Overview

The Cyber Triage Tool is designed to streamline digital forensic investigations by providing an intuitive interface for importing evidence, conducting automated analysis, and generating detailed reports. This tool integrates disk imaging, AI/ML for anomaly detection, and real-time data visualization to assist investigators in identifying suspicious activities and generating comprehensive reports.

## Features

- **Automated Data Collection:** Extract data from forensic images and other formats.
- **Automated Scanning and Analysis:** Analyze files, system logs, registry entries, and network activity.
- **Indicator of Compromise (IOC) Detection:** Identify suspicious activities.
- **AI/ML Algorithms:** Integrate machine learning for anomaly detection and scoring.
- **Interactive UI:** Real-time data visualization and interactive timelines.
- **Reporting:** Export reports in PDF, JSON, and CSV formats.

## Architecture

- **Frontend:** React.js for UI, Chart.js for visualizations, jsPDF for reporting.
- **Backend:** Node.js with Express for API, Python for forensic analysis and ML tasks.
- **Data Processing:** The Sleuth Kit (TSK), PyTSK3 for disk analysis, YARA for scanning, Scikit-learn for ML.
- **Database:** MongoDB for storing results.
- **Real-time Communication:** Socket.IO for progress updates.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher)
- MongoDB

## Installation Instructions

### Backend Setup

1. **Install Node.js Dependencies:**

    ```bash
    npm install
    ```

2. **Install Python Libraries:**

    ```bash
    pip install pytsk3 scikit-learn yara-python
    ```

3. **Start MongoDB:**

    Open a new terminal and run:

    ```bash
    mongod
    ```

4. **Run the Backend Server:**

    ```bash
    node server.js
    ```

### Frontend Setup

1. **Navigate to the Frontend Directory:**

    ```bash
    cd Foreignsight/frontend/cyber-triage-tool
    ```

2. **Install Frontend Dependencies:**

    ```bash
    npm install
    ```

3. **Run the Frontend Development Server:**

    ```bash
    npm start
    ```

## Running the Application

1. Ensure MongoDB is running.
2. Start the backend server using Node.js.
3. Start the frontend development server using React.
4. Access the application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

## File Structure

### Frontend Directory
`frontend/cyber-triage-tool/`

- `src/` - Contains React components and styles.
- `public/` - Static files.

### Backend Directory
`backend/`

- `server.js` - Node.js server code.
- `forensic_analysis.py` - Python script for forensic analysis.
- `rules.yar` - YARA rules file.
- `package.json` - Node.js dependencies.
- `requirements.txt` - Python dependencies.

## Troubleshooting

- **Module Not Found Errors:** Ensure all dependencies are installed. Check `package.json` and `requirements.txt`.
- **MongoDB Issues:** Verify MongoDB is installed and running.
- **Permission Issues:** Use appropriate permissions or `sudo` where necessary.


- happy coding </> 

   
