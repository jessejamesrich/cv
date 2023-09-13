import json
import glob
import os
from pathlib import Path
import asyncio
import aiohttp
import aiofiles  # Missing import fixed

# Get the absolute path to the directory the script is in
script_dir = os.path.dirname(os.path.abspath(__file__))

# For reading the config file, go up from the script directory and find the 'config' folder
config_path = os.path.join(script_dir,  '..', 'src', 'config', 'index.json')
with open(config_path) as f:
    config = json.load(f)

key = config['deepl']['key']
supported = [locale['code'] for locale in config['supported']]
authority = config['default']
enabled = [locale['code'] for locale in config['supported'] if locale['enabled']]

# This gets the current working directory from which the script is run
cwd = os.getcwd()
# Now join it with your desired relative path
final = os.path.join(cwd, 'packages', 'locales', 'src', 'config')

BATCH_SIZE = 100

# Helper Functions
async def open_file(cfg):
    locale = Path(cfg).name.replace(".json", "").lower()
    async with aiofiles.open(cfg, mode='r') as f:
        data = await f.read()
    json_data = json.loads(data)
    return {'locale': locale, 'file': cfg, 'locales': json_data}

async def write_file(locale, data):
    file_path = os.path.join(final, f"{locale}.json")
    async with aiofiles.open(file_path, 'w') as f:
        await f.write(json.dumps(data))

async def translate_text(session, text, target_language):
    if not config['deepl']['enabled']:
        print("DeepL translation is disabled. Skipping...")
        return
    url = f"https://api.deepl.com/v2/translate"
    params = {
        'text': text,
        'target_lang': target_language,
        'auth_key': key
    }
    async with session.get(url, params=params) as response:
        json_resp = await response.json()
        return json_resp['translations'][0]['text']

# Main Async Function
async def main():
    # HTTP client session
    async with aiohttp.ClientSession() as session:

        # Change the working directory to the root of your project before running the glob
        os.chdir(os.path.join(script_dir, '..', '..', '..'))    

        # Collect data
        configs = [
            f for f in glob.glob("**/.locales/{}.json".format(authority), recursive=True)
            if not (f.startswith('functions') or ('node_modules' in f and 'madelive-' not in f))
        ]
        locales = {}
        read_promises = [open_file(cfg) for cfg in configs if authority in supported]
        responses = await asyncio.gather(*read_promises)

        for response in responses:
            locales.update(response['locales'])

        # Sort and write the 'authority' locale
        locales = dict(sorted(locales.items()))
        await write_file(authority, locales)

        # Translation part
        for locale in enabled:
            if locale == authority:
                continue

            # Check if translation exists
            file_path = os.path.join(final, f"{locale}.json")
            if os.path.exists(file_path):
                print(f"Translation for {locale} already exists. Skipping...")
                continue

            entries_to_translate = {k: v for k, v in locales.items() if v.strip()}

            total_batches = -(-len(entries_to_translate) // BATCH_SIZE)
            translated_locale = {}

            for batch_start in range(0, len(entries_to_translate), BATCH_SIZE):
                batch_items = {k: entries_to_translate[k] for k in list(entries_to_translate.keys())[batch_start:batch_start + BATCH_SIZE]}

                translate_promises = [translate_text(session, text, locale.split("-")[0]) for text in batch_items.values()]
                translations = await asyncio.gather(*translate_promises)

                for key, translated_text in zip(batch_items.keys(), translations):
                    translated_locale[key] = translated_text

            await write_file(locale, translated_locale)

# Run the main async function
if __name__ == "__main__":
    asyncio.run(main())
