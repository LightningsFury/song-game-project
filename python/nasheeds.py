import json
import sys

with open('database/db.json') as f:
    data = json.load(f)
print(data[nasheeds])
#if (sys.argv[2]):