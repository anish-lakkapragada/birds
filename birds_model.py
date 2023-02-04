# %% 
"""preprocessing step for everything"""
import tensorflow.compat.v2 as tf
import tensorflow_hub as hub
import pandas as pd
labelmap_df = pd.read_csv("aiy_birds_V1_labelmap.csv")
m = hub.KerasLayer('https://tfhub.dev/google/aiy/vision/classifier/birds_V1/1')

def query_index(index, labelmap_df): 
    return labelmap_df[labelmap_df['id'] == index]['name'].values[0]
# %%
import cv2, numpy as np
image = cv2.cvtColor(cv2.imread('whitecrowned_sparrow.png'), cv2.COLOR_BGR2RGB)
image = cv2.resize(image, ((224, 224)))
image = np.array(image, dtype=np.float32)
image /= 255.0
# %%
def predict_image(image, labelmap_df): 
    predictions = m(image)
    index = np.argmax(predictions)
    return query_index(index, labelmap_df)
    
predict_image(image.reshape(1, 224, 224, 3), labelmap_df)
# %%
