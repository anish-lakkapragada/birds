# file to test whether or not the API is working 

# %% 
import requests 
URL = "http://127.0.0.1:8000"

with open("whitecrowned_sparrow.png", 'rb') as f: 
    r = requests.post(f"{URL}/predict", files={"file": f})

assert r.status_code == 200, r
print(r.json())
# %%
"""
Verify each species.
"""

import pandas as pd
import requests
import time
i = 0
bird_species = pd.read_csv("aiy_birds_V1_labelmap.csv")
for i, item in bird_species.iterrows(): 
    name = item["name"]
    if name != "background": 
        url = f"https://nuthatch.lastelm.software/birds"
        r = requests.get(url, params={"sciName": name, "operator": "AND"}, headers={"API-Key": "f0a7a774-f08f-4e4e-9e26-0fc55163f693"})
        data = r.json()
        time.sleep(0.5)
        if not data: 
            i += 1
            print(f"No information on: {name}")
# %%
