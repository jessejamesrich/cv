# An observer script to maintain locales are collated and translated (if necessary)

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess
import time
import os

class Watcher:

    def __init__(self, directoriesToWatch):
        self.directoriesToWatch = directoriesToWatch
        self.observer = Observer()

    def run(self):
        event_handler = Handler()
        for dirToWatch in self.directoriesToWatch:
            self.observer.schedule(event_handler, dirToWatch, recursive=True)

        self.observer.start()
        print("Observer started")

        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            self.observer.stop()
            print("Observer stopped")

        self.observer.join()


class Handler(FileSystemEventHandler):

    def process(self, event):
        print(f"Event type: {event.event_type} at {event.src_path}")
        if event.src_path.endswith('.json'):
            subprocess.run(['npm', 'run', 'locales'])

    def on_modified(self, event):
        self.process(event)

    def on_created(self, event):
        self.process(event)


def findLocalesDirectories(rootDir):
    localesDirs = []
    for root, dirs, files in os.walk(rootDir):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.locales' in root:
            localesDirs.append(root)
    return localesDirs


if __name__ == '__main__':
    rootDir = './packages'
    directoriesToWatch = findLocalesDirectories(rootDir)
    watcher = Watcher(directoriesToWatch)
    watcher.run()
