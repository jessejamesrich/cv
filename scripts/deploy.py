import os
import subprocess
import json

# Load the personal access key from config/deploy.json
with open("scripts/config/deploy.json", "r") as deploy_config_file:
    deploy_config = json.load(deploy_config_file)

personal_access_key = deploy_config.get("key")
repo_name = deploy_config.get("repo")

if not personal_access_key:
    print("Error: Personal access key not found in config/deploy.json")
    exit(1)

if not repo_name:
    print("Error: Repo not found in config/deploy.json")
    exit(1)

# Define repository URL and branch
repository_url = f"https://github.com/{repo_name}.git"
branch = "main"

# Run npm run version and npm run locales
subprocess.run(["npm", "run", "version"], check=True)
subprocess.run(["npm", "run", "locales"], check=True)

# Commit changes
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-m", "Commit message"], check=True)

# Push changes to the specified branch using the personal access key
subprocess.run(["git", "push", repository_url, f"HEAD:{branch}", "--force", f"-u {personal_access_key}"], check=True)

print("Changes have been committed and pushed to the repository.")
