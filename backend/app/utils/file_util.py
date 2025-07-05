import json
import os

from ..config import DATA_FILE_PATH


def read_data():
    if file_exists():
        with open(DATA_FILE_PATH, "r") as f:
            return json.load(f)
    return None


def write_data(data):
    with open(DATA_FILE_PATH, "w") as f:
        json.dump(data, f, indent=2)


def file_exists():
    return os.path.exists(DATA_FILE_PATH)

