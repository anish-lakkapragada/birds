import fastapi
import typing 
from birds_model import predict_image, convert_image
from uuid import uuid4

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

@app.post("/predict")
async def predict_bird(file: typing.Optional[fastapi.UploadFile] = fastapi.File(...)): 
   id = uuid4()
   path = f"temp/{id}"
   with open(path, 'wb') as f: 
       f.write(await file.read())
   converted_image = convert_image(path)
   image_prediction = predict_image(converted_image)
   return {"SN": image_prediction}
        

