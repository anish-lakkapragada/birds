# %% 
"""preprocessing step for everything"""
import tensorflow_hub as hub
import numpy as np 
import cv2
from mappings import get_id_to_sciname
ids_to_sciname = get_id_to_sciname() 

# labelmap_df = pd.read_csv("aiy_birds_V1_labelmap.csv")
m = hub.KerasLayer('https://tfhub.dev/google/aiy/vision/classifier/birds_V1/1')

def query_index(index): 
    return ids_to_sciname[index]
# %%
# import cv2, numpy as np
# image = cv2.cvtColor(cv2.imread('whitecrowned_sparrow.png'), cv2.COLOR_BGR2RGB)
# image = cv2.resize(image, ((224, 224)))
# image = np.array(image, dtype=np.float32)
# image /= 255.0
# %%

def convert_image(path): 
    image = cv2.cvtColor(cv2.imread(path), cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, ((224, 224)))
    image = np.array(image, dtype=np.float32)
    image /= 255.0
    return image.reshape(1, 224, 224, 3) 
    
def predict_image(image): 
    predictions = m(image)
    index = np.argmax(predictions)
    return query_index(index)
    
# predict_image(image.reshape(1, 224, 224, 3), labelmap_df)
# %%
