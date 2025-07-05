import json
import os

from ..config import DATA_FILE_PATH


class FileUtil:
    def read_data(self):
        if self.file_exists():
            with open(DATA_FILE_PATH, "r") as f:
                return json.load(f)
        else: # self healing, lazy initialization of data.
            self.write_data({"users": []})
            return {"users": []}

    def write_data(self, data):
        with open(DATA_FILE_PATH, "w") as f:
            json.dump(data, f, indent=2)

    def file_exists(self):
        return os.path.exists(DATA_FILE_PATH)
