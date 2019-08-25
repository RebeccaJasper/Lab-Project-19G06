from mobile_application.models import *
from mobile_application.face_encoding.normalization import *
from mobile_application.clustering.dissimilarity import Dissimilarity
from mobile_application.clustering.feature_encoding import *
from mobile_application.clustering.hierarchical_clusterring import HeirachicalClustering
import numpy as np
import json


def process_submission_info(firstname: str = "", surname: str = "", gender: float = "1", race: float = "0.16", person_id:int = -1):
    """
    Controller function for saving AJAX submission of user statement to the database

    :param firstname: First name from submission
    :param surname: Surname from submission
    :param gender: Gender from submission
    :param race: Race from submission
    :param person_id: Person_id from submission
    :rtype: None
    """
    save_identikit_info_to_db(firstname, surname, gender, race, person_id)


def process_submission_feature_vector(feature_vector_string: str) -> None:
    feature_vector = list(map(int, feature_vector_string.split(',')))
    feature_vector = normalize_feature_vector(feature_vector)
    add_feature_vector_to_identikit_db(feature_vector)


def get_submission_info(submission_id: str) -> None:
    """
    Gets biographical information of a particular submission

    :param submission_id:
    :type: str
    :return: Array of submission biographical information
    :rtype: np.array
    """
    submission_info = get_submission_biographical_info(int(submission_id))

    return_array = []

    return_array.append(submission_id)
    return_array.append(submission_info[0])
    return_array.append(submission_info[1])

    return_array.append(str([key for key in gender.items() if key[1] == submission_info[2]][0][0]))
    # print(str([key for key in gender.items() if key[1] == submission_info[2]][0][0]))
    return_array.append(str([key for key in race.items() if key[1] == int(submission_info[3])][0][0]))
    return_array.append("data:image/jpg;base64," + submission_info[4])
    # print(submission_info[3])
    # # submission_info[3] = next(key for key, value in race.items() if value == submission_info[3])

    return np.array(return_array)


def create_race_array(race_int: int) -> np.array:
    """
    Converts a integer-encoded race into a ones-hot encoded feature vector

    :param race_int: Character representing race
    :type: int
    :return: Ones-hot encoded representation of race
    :rtype: np.array
    """
    if race_int > 6 or race_int < 1:
        ValueError('Race integer "%d"  does not exist in current encoding scheme' % race_int)

    race_array = np.zeros(6)
    race_array[race_int - 1] = 1
    return race_array


def create_sex_array(gender_str: str) -> np.array:
    """
    Converts a string-encoded sex into a ones-hot encoded feature vector

    :param gender_str: Character representing sex
    :type: str
    :return: Ones-hot encoded representation of sex
    :rtype: np.array
    """
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
    """
    Convert a string of feature values into an array of features

    :param feature_string: A string of feature values
    :type: str
    :return: Array of features
    :rtype: np.array
    """
    feature_array = np.array(feature_string.split(','), float)
    return feature_array


def convert_db_array_to_feature_vector(db_array: np.array) -> np.array:
    """
    Convert an array of features extract from the persons database into a feature vector suitable for clustering

    :param db_array: Array of features extracted from the database
    :type: np.array
    :return: An array of features suitable for clustering
    :rtype: np.array
    """
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
    """
    Convert an array of features extract from the identikit database into a feature vector suitable for clustering

    :param db_array: Array of features extracted from the database
    :type: np.array
    :return: An array of features suitable for clustering
    :rtype: np.array
    """
    facial_feature_array = convert_feature_string_to_array(db_array[0])
    facial_feature_array = change_coordinate_reference_of__identikit_array(facial_feature_array,
                                                     Coordinate(facial_feature_array[100], facial_feature_array[101]))
    race_array = create_race_array(int(db_array[1]))
    sex_array = create_sex_array(str(db_array[2]))

    submission_feature_vector = np.hstack((facial_feature_array, race_array, sex_array))
    return submission_feature_vector


def fetch_submission_feature_vector(submission_id: str)-> np.array:
    """
    Controller function that fetches and composes a feature vector for a specified submission_id

    :param submission_id: The submission_id of the desired submission
    :type: str
    :return: An array containing elements of the submission's feature vector
    :rtype: np.array
    """
    database_feature_vector = get_submission_feature_vector(submission_id)

    submission_feature_vector = convert_identikit_array_to_feature_vector(database_feature_vector)

    return submission_feature_vector


def persons_feature_matrix() -> np.ndarray:
    """
    Retrieves feature matrix

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


def process_submission_photo(base64_string: str) -> None:
    """
    Controller function for passing the base64 encoded image to the database

    :param base64_string: Base 64 string
    :type: str
    :rtype: None
    """
    add_image_to_identikit_database(base64_string)


def get_matching_person_ids(submission_id: str) -> np.array:
    """
    Returns an array of person_ids that the sketch has been clustered with

    :param submission_id: The submission_id of the submission to be clustered with existing person database
    :type: string
    :return: Array of person_ids that the sketch hs been clustered
    :rtype: np.array
    """

    # Fetch existing persons from the database
    existing_persons_feature_matrix = persons_feature_matrix()
    existing_person_ids = get_person_ids()

    # Calculate dissimilarity between existing persons and the specified submission id
    d = Dissimilarity()
    d.load_feature_vectors(existing_persons_feature_matrix)
    d.add_vector(fetch_submission_feature_vector(submission_id))

    # Perform clustering
    hac = HeirachicalClustering()
    hac.cluster(d.distance_matrix())
    # hac.plot_dentogram(d.distance_matrix())

    # Extract person_ids that share the same cluster label as the submission

    print(hac.cluster_indexes())
    cluster_label = hac.cluster_indexes()[-1]
    print("The submission cluster label: %d" % cluster_label)
    indexes = hac.find_cluster_siblings(cluster_label)[0:-1]
    print("The other indexes: ")
    print(indexes)
    person_ids = np.array([])
    if indexes.size != 0:
        person_ids = existing_person_ids[indexes]
    print(person_ids)


    # Convert result to id array
    return_array = []
    for id in person_ids:
        return_array.append(id[0])

    return np.array(return_array)


def get_submission_list() -> List[dict]:
    """
    Get a list of the off all the submissions and their time stamps

    :return: List of dictionary objects containing the timestamps and submission_ids of each submission
    :rtype: List[dict]
    """
    submission_list = get_submission_ids()
    return_list = []
    for data in submission_list:
        submission = {
            "time": str(data[0]),
            "id": data[1]
        }
        return_list.append(submission)

    return return_list


def get_matching_persons_list(person_ids: np.array) -> List[dict]:
    """
    Retrieve the personal biographical information for a given array of person_ids

    :param person_ids: Array of person_ids of matching persons/desired persons
    :type: np.array
    :return: List of dictionary objects containing biographical information of each person
    :rtype: List[dict]
    """
    persons_list = get_persons_biographical_info(person_ids)
    return_list = []

    # for entry in persons_list:
    for entry in persons_list:
        person = {
            "id": entry[0],
            "name": entry[1],
            "surname": entry[2],
            "gender": str([key for key in gender.items() if key[1] == entry[3]][0][0]),
            "race": str([key for key in race.items() if key[1] == int(entry[4])][0][0]),
            "photo": "data:image/jpg;base64," + entry[5]
        }
        return_list.append(person)
    print(return_list)

    return return_list

