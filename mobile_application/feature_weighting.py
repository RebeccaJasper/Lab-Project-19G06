EYES = list(range(8, 20))
NOSE = list(range(6, 8))
MOUTH = list(range(20, 24))

face_feature_weights = {
    "Eyes": 0.81,
    "Nose": 0.088,
    "Mouth": 0.022,
    "Other": 0.08,
}

feature_weights = {
    "Race": 0.4,
    "Gender": 0.4,
    "Face": 0.2
}