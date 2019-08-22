from .coordinates import *
from typing import List
import nummpy as np


def normalize_feature_vector(feature_vector: List[int]) -> List[float]:
    normalized_feature_vector = []
    reference_point = Coordinate(feature_vector[42], feature_vector[43])

    for x, y in zip(*[iter(feature_vector)]*2):
        current_coordinate = Coordinate(x, y)
        new_dlib_point = change_coordinate_reference(current_coordinate, reference_point)
        new_point = unit_vector(new_dlib_point)
        normalized_feature_vector.append(new_point.x)
        normalized_feature_vector.append(new_point.y)

    return normalized_feature_vector

def change_coordinate_reference_of__identikit_array(feature_vector: np.array) -> np.array:
    changed_feature_vector = []
    reference_point = Coordinate(feature_vector[100], feature_vector[101])
    for x, y in zip(*[iter(feature_vector)]*2):
        current_coordinate = Coordinate(x, y)
        new_point = change_coordinate_reference(current_coordinate, reference_point)
        changed_feature_vector.append(new_point.x)
        changed_feature_vector.append(new_point.y)

    return np.array(changed_feature_vector)