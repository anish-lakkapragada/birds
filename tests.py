# file to test whether or not the API is working 

# %% 
import requests 
URL = "http://127.0.0.1:8000"

with open("whitecrowned_sparrow.png", 'rb') as f: 
    r = requests.post(f"{URL}/predict", files={"file": f})

assert r.status_code == 200, r
print(r.json())
# %%
