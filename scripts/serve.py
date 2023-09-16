import subprocess
import sys
import os

def run_command(command):
    print(f"Executing: {command}")
    process = subprocess.Popen(
        command, 
        stdout=subprocess.PIPE, 
        stderr=subprocess.PIPE, 
        shell=True,
        bufsize=1,  # Line-buffered mode
        text=True   # Get text output
    )

    for line in process.stdout:
        print(line, end='')  # Print each line of output

    process.wait()  # Wait for the command to finish

    if process.returncode != 0:
        print("Command failed!")
        print("STDERR:")
        for line in process.stderr:
            print(line, end='')  # Print each line of stderr output

    print(f"Finished: {command}")
    return process.returncode

def serve_local(environment):
    # Set environment variable for localhost
    os.environ['IS_LOCALHOST'] = 'true'

    if environment == "production":
        # run_command("firebase functions:config:set env.environment=\"production\"")
        run_command("firebase serve --only functions --host 0.0.0.0 --project jessejamesrichard-ba480")
    elif environment == "development":
        # run_command("firebase functions:config:set env.environment=\"development\"")
        run_command("firebase serve --only functions --host 0.0.0.0 --project jessejamesrichard-ba480")

def main():
    arg = sys.argv[1] if len(sys.argv) > 1 else None

    if arg in ('production', 'development'):
        environment = arg
    else:
        print("Invalid environment. Please provide 'production' or 'development' as an argument.")
        return
    
    # Add this line to print the environment
    print(f"-----------------------------------------")
    print(f"Serving locally in {environment} environment...")
    print(f"-----------------------------------------")
    
    serve_local(environment)

if __name__ == "__main__":
    main()
