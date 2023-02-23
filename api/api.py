import fastapi
import typing 
from birds_model import predict_image, convert_image
from uuid import uuid4
import requests
import shutil
import time
import os 

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

@app.get("/predict")
async def predict_bird(imageURL: str): 
    res = requests.get(imageURL, stream = True)
    file_name = None 
    if res.status_code == 200:
        file_name = f"temp/photo-{time.time()}"
        with open(file_name,'wb') as f:
            shutil.copyfileobj(res.raw, f)
        print('Image sucessfully Downloaded: ',file_name)
    else:
        return {"Error": "shit"}
        
    converted_image = convert_image(file_name)
    image_prediction = predict_image(converted_image)
    os.remove(file_name) # delete 
    return {"SN": image_prediction}
        

