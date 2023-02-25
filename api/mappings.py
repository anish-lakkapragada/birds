# stores the id|sN|rN
# %% 
import pickle
def get_id_to_sciname(): 
    with open("ids_to_sciname.pkl", "rb") as f: 
        ids_to_sciname = pickle.load(f)
    return ids_to_sciname

def get_sciname_to_rnames(): 
    with open("sciname_to_rnames.pkl", "rb") as f:
        scinames_to_rnames = pickle.load(f)
    return scinames_to_rnames

# %%
