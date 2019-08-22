from mobile_application.models import *
from mobile_application.face_encoding.normalization import *
from mobile_application.clustering.dissimilarity import Dissimilarity
from mobile_application.clustering.feature_encoding import *
from mobile_application.clustering.hierarchical_clusterring import HeirachicalClustering
import numpy as np


def process_submission_info(firstname: str = "", surname: str = "", gender: float = "1", race: float = "0.16", person_id:int = -1):
    save_identikit_info_to_db(firstname, surname, gender, race, person_id)


def process_submission_feature_vector(feature_vector_string: str) -> None:
    feature_vector = list(map(int, feature_vector_string.split(',')))
    feature_vector = normalize_feature_vector(feature_vector)
    add_feature_vector_to_identikit_db(feature_vector)


def create_race_array(race_int: int) -> np.array:
    if race_int > 6 or race_int < 1:
        ValueError('Race integer "%d"  does not exist in current encoding scheme' % race_int)

    race_array = np.zeros(6)
    race_array[race_int - 1] = 1
    return race_array


def create_sex_array(gender_str: str) -> np.array:
    sex_array = np.zeros(4)
    if gender_str == gender["Female"]:
        sex_array[0] = 1
    elif gender_str == gender["Male"]:
        sex_array[1] = 1
    elif gender_str == gender["Other"]:
        sex_array[2] = 1
    elif gender_str == gender["Unknown"]:
        sex_array[3] = 1
    else:
        ValueError('Sex string does not exist in current sex encoding')

    return sex_array


def convert_feature_string_to_array(feature_string: str) -> np.array:
    feature_array = np.array(feature_string.split(','), float)
    return feature_array


def convert_db_array_to_feature_vector(db_array: np.array) -> np.array:
    facial_feature_array = convert_feature_string_to_array(db_array[0])
    desired_facial_marker_dlib_points = np.array([0, 4, 6, 10, 12, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
                                                  31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
                                                  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
                                                  65, 66, 67])

    desired_facial_marker_points = convert_dlib_points_to_coordinate_indexes(desired_facial_marker_dlib_points)
    facial_feature_array = facial_feature_array[desired_facial_marker_points.astype(int)]
    race_array = create_race_array(int(db_array[1]))
    sex_array = create_sex_array(str(db_array[2]))


    submission_feature_vector = np.hstack((facial_feature_array, race_array, sex_array))

    return submission_feature_vector


def convert_identikit_array_to_feature_vector(db_array: np.array) -> np.array:
    facial_feature_array = convert_feature_string_to_array(db_array[0])
    facial_feature_array = change_coordinate_reference_of__identikit_array(facial_feature_array)
    race_array = create_race_array(int(db_array[1]))
    sex_array = create_sex_array(str(db_array[2]))

    submission_feature_vector = np.hstack((facial_feature_array, race_array, sex_array))
    print("Submission feature vector length: %d" % submission_feature_vector.size)
    return submission_feature_vector


def fetch_submission_feature_vector(submission_id: str)-> np.array:
    database_feature_vector = get_submission_feature_vector(submission_id)

    submission_feature_vector = convert_identikit_array_to_feature_vector(database_feature_vector)

    return submission_feature_vector


def persons_feature_matrix() -> np.ndarray:
    """
    Retreives feature matrix
    :rtype: np.ndarray
    """
    feature_matrix = np.array([])

    db_person_feature_matrix = get_person_feature_matrix()

    for row in db_person_feature_matrix:
        if feature_matrix.size != 0:
            feature_matrix = np.vstack((feature_matrix, convert_db_array_to_feature_vector(row)))
        else:
            feature_matrix = np.hstack((feature_matrix, convert_db_array_to_feature_vector(row)))


    return feature_matrix


# print(persons_feature_matrix()[0])

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

    existing_persons_feature_matrix = persons_feature_matrix()
    existing_person_ids = get_person_ids()

    d = Dissimilarity()
    d.load_feature_vectors(existing_persons_feature_matrix)
    d.add_vector(fetch_submission_feature_vector(submission_id))

    hac = HeirachicalClustering()
    hac.cluster(d.distance_matrix())

    cluster_label = hac.cluster_indexes()[-1]
    indexes = hac.find_cluster_siblings(cluster_label)[0:-2]
    person_ids = existing_person_ids[indexes]

    return person_ids

print(get_matching_person_ids('70'))