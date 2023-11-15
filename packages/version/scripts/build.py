import json
import re

# Path to your package.json and .env files
package_json_path = "package.json"
env_file_path = ".env"

print("-------UPDATING FRONTEND VERSION--------")

# Read package.json to get the version
with open(package_json_path, 'r') as f:
    package_data = json.load(f)
    new_version = package_data.get('version', '0.0.0')

# Read .env and update the version
with open(env_file_path, 'r') as f:
    env_content = f.readlines()

with open(env_file_path, 'w') as f:
    for line in env_content:
        if line.startswith("VITE_VERSION="):
            f.write(f"VITE_VERSION={new_version}\n")
        else:
            f.write(line)
