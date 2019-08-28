from mobile_application.models import *
from mobile_application.face_encoding.normalization import normalize_feature_vector
from mobile_application.clustering.dissimilarity import Dissimilarity
from mobile_application.clustering.hierarchical_clusterring import HeirachicalClustering
import numpy as np


def process_submission_info(firstname: str = "", surname: str = "", gender: float = "1", race: float = "0.16", person_id:int = -1):
    save_identikit_info_to_db(firstname, surname, gender, race, person_id)


def process_submission_feature_vector(feature_vector_string: str) -> None:
    feature_vector = list(map(int, feature_vector_string.split(',')))
    feature_vector = normalize_feature_vector(feature_vector)
    add_feature_vector_to_identikit_db(feature_vector)


def process_submission_photo(base64_string: str) -> None:
    add_image_to_identikit_database(base64_string)


def get_matching_person_ids(submission_id: str) -> np.array:
    """
    Returns an array of person_ids that the sketch has been clustered with

    :param submission_id: The submission_id of the submission to be clustered with existing person database
    :type: string
    :return: Array of person_ids that the sketch hs been clustered
    :rtype: np.array
    """

    submission_feature_vector = get_submission_features(submission_id)

    (existing_persons_feature_matrix, existing_person_ids) = get_person_feature_matrix()
    d = Dissimilarity()
    d.load_feature_vectors(existing_persons_feature_matrix)
    d.add_vector(submission_feature_vector)

    hac = HeirachicalClustering()
<<<<<<< Updated upstream
    hac.cluster(d.distance_matrix())
=======
    hac.cluster(d.distance_matrix(feature_types))
    hac.plot_dentogram(d.distance_matrix(feature_types))
    plot_facial_coordinates(submission_id, '23429344536530')

    # Extract person_ids that share the same cluster label as the submission
>>>>>>> Stashed changes

    cluster_label = hac.cluster_indexes()[-1]
    indexes = hac.find_cluster_siblings(cluster_label)[0:-2]
    person_ids = existing_person_ids[indexes]

    return person_ids
