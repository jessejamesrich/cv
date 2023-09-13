import glob
import os

print("-----------------------------")
print("Converting readmes into single file.")

ignore = [ "**/node_modules/**"]
files = "**/README.md"
final = "./README.md"

readme = {}
toc = "#\n## TOC\n"
master = ""


def create_readme():
    global toc, master  # Add this line to use the global 'toc' variable
    readmes = glob.glob(files, recursive=True)
    readmes = [file for file in readmes if not any(glob.fnmatch.fnmatch(file, pattern) for pattern in ignore) and "node_modules" not in file]  # Exclude node_modules directory

    print("Finding constraint files.")

    for file in readmes:
        if file != "README.md" and os.path.exists("./" + file):
            with open("./" + file, "r", encoding="utf-8") as f:
                result = f.read()
                component = os.path.basename(os.path.dirname(file))
                print(f"Adding {component} ({file}).")

                if file == "src/libraries/Readme/config/README.md":
                    master = result
                else:
                    try:
                        result = '#\n<a name="' + component + '"></a>\n' + result + "\n"
                    except Exception as error:
                        print(f"Error: {file}")
                        exit()

                    readme[component] = result

    markdown = ""
    for component in sorted(readme.keys()):
        toc += f"[{component}](#{component})\n"
        markdown += readme[component]
    markdown = master + toc + markdown

    return markdown


def write(markdown):
    print("Writing configs.")
    print("-----------------------------")
    with open(final, "w", encoding="utf-8") as f:
        f.write(markdown)
    print("Finished.")
    print("-----------------------------")


def run():
    markdown = create_readme()
    write(markdown)


run()
