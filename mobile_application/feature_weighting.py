
feature_vector_indexes = {
    "Eyes": list(range(8, 20)),
    "Nose": list(range(6, 8)),
    "Mouth": list(range(20, 24)),
    "Face": list(range(0, 24)),
    "Race": list(range(24, 31)),
    "Gender": list(range(30, 34))
}


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