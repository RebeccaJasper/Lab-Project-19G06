from .coordinates import *
from typing import List
import numpy as np


def normalize_feature_vector(feature_vector: List[int]) -> List[float]:
    """
    Function used to normalize facial coordinates (i.e. convert them to values between 0 to 1)

    :param feature_vector: Array of facial feature points
    :type: List[int]
    :return: Normalized array of facial feature points
    :rtype: List[float]
    """
    normalized_feature_vector = []
    reference_point = Coordinate(feature_vector[42], feature_vector[43])

    for x, y in zip(*[iter(feature_vector)]*2):
        current_coordinate = Coordinate(x, y)
        new_dlib_point = change_coordinate_reference(current_coordinate, reference_point)
        new_point = unit_vector(new_dlib_point)
        normalized_feature_vector.append(new_point.x)
        normalized_feature_vector.append(new_point.y)

    return normalized_feature_vector

def change_coordinate_reference_of__identikit_array(feature_vector: np.array, ref_coordinate: Coordinate) -> np.array:
    """
    Function used to change the coordinate references of an array of feature points

    :param feature_vector: Array of facial feature points.
    :type: np.array
    :param ref_coordinate: Reference coordinate of the new coordinate base
    :type: Coordinate
    :return: Array of feature points
    """
    changed_feature_vector = []
    reference_point = Coordinate(feature_vector[100], feature_vector[101])
    for x, y in zip(*[iter(feature_vector)]*2):
        current_coordinate = Coordinate(x, y)
        new_point = change_coordinate_reference(current_coordinate, reference_point)
        changed_feature_vector.append(new_point.x)
        changed_feature_vector.append(new_point.y)

    return np.array(changed_feature_vector)