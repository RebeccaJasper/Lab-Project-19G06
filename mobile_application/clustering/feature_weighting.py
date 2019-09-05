
feature_vector_indexes = {
    "Other_facial_features": list(range(0, 32)),
    "Nose": list(range(32, 42)),
    "Eyes": list(range(42, 66)),
    "Mouth": list(range(66, 106)),
    "Race": list(range(106, 112)),
    "Gender": list(range(112, 116)),
    "Face": list(range(0, 106))
}

all_weights = {
    "Nose": 1,
    "Eyes": 1,
    "Mouth": 1,
    "Other_facial_features": 1,
    "Race": 0,
    "Gender": 0
}


# face_feature_weights = {
#     "Eyes": 0.81,
#     "Nose": 0.088,
#     "Mouth": 0.022,
#     "Other": 0.08,
# }

# feature_weights = {
#     "Race": 0.4,
#     "Gender": 0.4,
#     "Face": 0.2
# }