# %%
import fastapi
from birds_model import predict_image, convert_image
from mappings import get_sciname_to_rnames
scinames_to_rnames = get_sciname_to_rnames()
import time
import os 
import uvicorn
import urllib.request


app = fastapi.FastAPI()
from fastapi.middleware.cors import CORSMiddleware
 
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# image URL downloading stuff
req = urllib.request.build_opener()
req.addheaders = [("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64)")]
urllib.request.install_opener(req)

@app.get("/")
async def index(): 
    return "hello mom!"

@app.get("/predict")
async def predict_bird(imageURL: str): 
    file_name = f"temp/photo-{time.time()}"
    try: 
        urllib.request.urlretrieve(imageURL, file_name)
    except Exception as e: 
        print(e)
        return {"error": "shit"}
    
    print('we caa done')
    converted_image = convert_image(file_name)
    print('we converting')
    image_prediction = predict_image(converted_image)
    print('brooo')
    os.remove(file_name) # delete 
    return {"SN": image_prediction, "RN": scinames_to_rnames[image_prediction]}
    
# /etc/letsencrypt/live/birds.lakkapragada.com/fullchain.pem
# /etc/letsencrypt/live/birds.lakkapragada.com/privkey.pem

# uvicorn main:app --ssl-keyfile /etc/letsencrypt/live/birds.lakkapragada.com/privkey.pem --ssl-certfile /etc/letsencrypt/live/birds.lakkapragada.com/fullchain.pem --port 80

# %%
