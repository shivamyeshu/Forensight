import pytsk3
import yara
import json
from sklearn.ensemble import IsolationForest

def analyze_disk_image(image_path):
    # Load disk image using pytsk3
    img = pytsk3.Img_Info(image_path)
    volume = pytsk3.Volume_Info(img)
    
    # Scan for files and analyze
    suspicious_files = []

    for partition in volume:
        fs = pytsk3.FS_Info(img, offset=partition.start * 512)
        for f in fs.open_dir():
            if "malicious" in f.info.name.name:
                suspicious_files.append(f.info.name.name)

    # Perform ML analysis using Isolation Forest
    clf = IsolationForest()
    clf.fit([[0], [0], [1]])
    suspicious_score = clf.predict([[1]])

    # YARA rule matching logic
    rules = yara.compile(filepath="rules.yar")
    matches = rules.match(image_path)

    return {
        "suspicious_files": suspicious_files,
        "suspicious_score": suspicious_score.tolist(),
        "yara_matches": matches
    }

if __name__ == "__main__":
    import sys
    image_path = sys.argv[1]
    results = analyze_disk_image(image_path)
    print(json.dumps(results))
