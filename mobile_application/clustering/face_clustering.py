from sklearn.cluster import DBSCAN
from mobile_application.models import get_encoding_list
from sklearn.cluster import DBSCAN
from typing import List
import numpy as np


def get_feature_vectors_of_matching_persons(feature_vector: List[float]) -> List[str]:
    """Matches the feature vector to existing persons and returns a list of matching person feature vector"""
    face_encodings = get_encoding_list().append(feature_vector)

    # Each sample is given a cluster label using DBSCAN label
    clusters = DBSCAN(eps=0.5, metric="euclidean")
    clusters.fit(face_encodings)

    # Get cluster ID of feature_vector
    matching_faces_cluster_id = clusters.labels_[face_encodings[-1]]

    # Find indexes of all matching IDs
    matching_faces_indexes = np.where(clusters.labels_ == matching_faces_cluster_id)

    matching_faces_feature_vectors = np.take(face_encodings, matching_faces_indexes)

    return matching_faces_feature_vectors

