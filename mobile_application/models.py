from mobile_application.db import *
from typing import List, Tuple
from base64 import b64encode
import numpy as np


def photo_to_string(filename: str) -> str:
    """
    Opens a specified photo and converts it to a string using base64 encoding

    :param filename: name of the image file
    :type: str
    :return: Base64 encoded image
    :rtype: str
    """

    with open(filename, 'rb') as file:
        binary_data = b64encode(file.read())

    return binary_data.decode('utf-8')


def add_image_to_database(person_id: str, filename: str) -> None:
    """
    Adds a specified person's image to the database

    :param person_id: The id od the person
    :type: str
    :param filename: The name of the image file
    :type: str
    :rtype: None
    """
    query_string = ''' INSERT INTO person_photos(person_id, photo)
                    VALUES ('%s', '%s'); '''
    args = (person_id, photo_to_string(filename))
    execute_query(query_string, args)
    commit_changes()


def add_image_to_identikit_database(base64_string: str) -> None:
    """
    Adds a specified person's image to the database

    :param person_id: The id od the person
    :type: str
    :param filename: The name of the image file
    :type: str
    :rtype: None
    """
    query_string = ''' INSERT INTO identikit_photos(photo)
                    VALUES ('%s'); '''
    args = (base64_string)
    execute_query(query_string, args)
    commit_changes()


def convert_list_to_str(input_list: List[float]) -> str:
    """
    Converts a list into a csv string

    :param input_list: Input list to be converted to a string
    :type: List[float]
    :return: A csv string with all the elements in the input list
    :rtype: str
    """
    feature = [str(i) for i in input_list]
    feature_string = str(",".join(feature))
    return feature_string


def add_feature_vector_to_db(person_id: str, feature_vector: List[float]) -> None:
    """
    Adds a feature vector to the database

    :param feature_vector: List representing a feature vector
    :type: str
    :param person_id: String representing the id associated with the person
    :type: str
    :rtype: None
    """

    query_string = ''' INSERT INTO face_encodings(person_id, face_encodings)
                    VALUES ('%s', '%s'); '''
    args = (person_id, convert_list_to_str(feature_vector))
    execute_query(query_string, args)
    commit_changes()


def add_feature_vector_to_identikit_db(feature_vector: List[float]) -> None:
    """
    Adds a feature vector to the database

    :param feature_vector: List representing a feature vector
    :type: str
    :param person_id: String representing the id associated with the person
    :type: str
    :rtype: None
    """

    query_string = ''' INSERT INTO identikit_markers(face_encoding)
                    VALUES ('%s'); '''
    args = (convert_list_to_str(feature_vector))
    execute_query(query_string, args)
    commit_changes()


def get_random_image() -> Tuple[str, str]:
    """
    Returns a random image id and base64 encoded image from the database

    :return: person_id, base64_image_string
    :rtype Tuple[str, str]
    """
    query_string = '''SELECT * FROM person_photos
                    ORDER BY RANDOM()  
                    LIMIT 1 '''

    execute_query(query_string, ())
    data = retrieve_data()
    (person_id, base64_img_string) = (data[0], data[1])
    return person_id, base64_img_string


def save_identikit_info_to_db(firstname: str, surname: str, gender: float, race: float, person_id:int):
    query_string = """INSERT INTO identikits(firstname, surname, gender, race, person_id)
                    VALUES ('%s', '%s', '%f', '%f', '%s');"""
    args = (firstname, surname, gender, race, person_id)
    execute_query(query_string, args)
    commit_changes()


def add_person_info_to_db(person_id: str, firstname: str, surname: str) -> None:
    """
    Adds a person to the the database of persons

    :param person_id: ID of person
    :type: str
    :param firstname: First name of person
    :type: str
    :param surname: Surname of person
    :type: str
    :rtype: None
    """
    query_string = """INSERT INTO persons(person_id, firstname, surname)
                    VALUES ('%s', '%s', '%s');"""
    args = (person_id, firstname, surname)
    execute_query(query_string, args)
    commit_changes()


def get_submission_features(submission_id: str) -> np.araay:
    """
    Get the feature vector of a particular feature vector

    :param submission_id: Submission_id of the submission whose feature vector is to extracted
    :type: str
    :return: Feature vector associated with the specified submission_id
    :rtype: np.array
    """
    feature_vector = np.array([])
    return feature_vector


def get_person_feature_matrix() -> np.ndarray:
    """
    Get a feature vector of the existing person database

    :return: 2-D array of all feature vectors of the existing persons database
    :rtype: np.ndarray
    """
    feature_vector = np.array([])
    return feature_vector


