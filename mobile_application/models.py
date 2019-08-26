from mobile_application.db import *
from typing import List, Tuple
from base64 import b64encode
import numpy as np
from random import seed, randint
from mobile_application.clustering.feature_encoding import *
from datetime import datetime

seed(datetime.now())

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


# def get_random_image() -> Tuple[str, str]:
#     """
#     Returns a random image id and base64 encoded image from the database
#
#     :return: person_id, base64_image_string
#     :rtype Tuple[str, str]
#     """
#     query_string = '''SELECT * FROM person_photos
#                     ORDER BY RANDOM()
#                     LIMIT 1 '''
#
#     execute_query(query_string, ())
#     data = retrieve_data()
#     (person_id, base64_img_string) = (data[0], data[1])
#     return person_id, base64_img_string


def get_random_image() -> Tuple[str, str]:
    """
    Returns a random image id and base64 encoded image from the database

    :return: person_id, base64_image_string
    :rtype Tuple[str, str]
    """

    ids = np.array([54534905784705, 23429344536530, 26753716511442, 45457197439853])

    query_string = '''SELECT * FROM person_photos
                    WHERE person_id = '%s'; '''
    arg = ids[randint(0, 3)]
    execute_query(query_string, arg)
    data = retrieve_data()
    (person_id, base64_img_string) = (data[0], data[1])
    return person_id, base64_img_string


def save_identikit_info_to_db(firstname: str, surname: str, identikit_gender: float, identikit_race: float, person_id:int):
    query_string = """INSERT INTO identikits(firstname, surname, gender, race, person_id)
                    VALUES ('%s', '%s', '%s', '%d', '%s');"""
    args = (firstname, surname, gender[identikit_gender], race[identikit_race], person_id)
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


def get_submission_feature_vector(submission_id: int) -> np.array:
    """
    Get the feature vector of a particular feature vector

    :param submission_id: Submission_id of the submission whose feature vector is to extracted
    :type: str
    :return: Feature vector associated with the specified submission_id
    :rtype: np.array
    """
    query_string = '''SELECT identikit_markers.face_encoding, identikits.race, identikits.gender
                        from identikits
                        inner join identikit_markers on identikit_markers.submission_id=identikits.submission_id
                        where identikits.submission_id=%d'''

    arg = int(submission_id)
    execute_query(query_string, arg)
    data = retrieve_data()
    return np.array(data)


def get_person_ids() -> np.array:
    query_string = '''SELECT persons.person_id
                        from persons'''
    execute_query(query_string, ())
    data = retrieve_all()
    return np.array(data)


def get_submission_biographical_info(submission_id: str) -> np.array:
    query_string = '''SELECT identikits.firstname, identikits.surname, identikits.gender, identikits.race,
                            identikit_photos.photo
                        from identikits
                        inner join identikit_photos on identikit_photos.submission_id=identikits.submission_id
                        where identikits.submission_id=%d'''

    execute_query(query_string, submission_id)
    data = retrieve_data()
    return np.array(data)


def get_submission_feature_matrix() -> np.array:
    """
    Get the feature vector of a particular feature vector

    :param submission_id: Submission_id of the submission whose feature vector is to extracted
    :type: str
    :return: Feature vector associated with the specified submission_id
    :rtype: np.array
    """
    query_string = '''SELECT identikit_markers.face_encoding, identikits.race, identikits.gender
                        from identikits
                        inner join identikit_markers on identikit_markers.submission_id=identikits.submission_id'''

    execute_query(query_string, ())
    data = retrieve_all()
    return np.array(data)


def get_person_feature_matrix() -> np.ndarray:
    """
    Get a feature vector of the existing person database

    :return: 2-D array of all feature vectors of the existing persons database
    :rtype: np.ndarray
    """

    query_string = '''SELECT face_encodings.face_encoding, persons.race, persons.sex
                    FROM persons 
                    inner join face_encodings on face_encodings.person_id = persons.person_id'''
    execute_query(query_string, ())
    data = retrieve_all()
    return np.array(data)


def get_submission_ids() -> np.ndarray:
    """
    Get all the submission ids from the person database

    :return: Array containing all the submission ids
    :rtype: np.ndarray
    """
    query_string = """SELECT submission_timestamp, submission_id
                        FROM identikits"""
    execute_query(query_string, ())
    submission_ids = retrieve_all()

    return submission_ids


def get_persons_biographical_info(person_ids: np.array) -> np.array:
    if person_ids.size != 0:
        query_string = '''SELECT persons.person_id, persons.firstname, persons.surname, persons.sex, persons.race,
                                person_photos.photo
                            from persons
                            inner join person_photos on person_photos.person_id=persons.person_id'''

        for i in range(0, len(person_ids)):
            if i == 0:
                query_string = query_string + "\n WHERE persons.person_id='%s'"
            elif i != 0:
                query_string = query_string + "\n OR persons.person_id='%s'"

        query_string = query_string + ";"

        execute_query(query_string, tuple(person_ids))
        data = retrieve_all()
        return data
    else:
        return np.array([])


def get_identikits_biographical_info(submission_ids: np.array) -> np.array:
    if submission_ids.size != 0:
        query_string = '''SELECT identikits.person_id, identikits.firstname, identikits.surname, identikits.sex,
                            identikits.race, identikit_photos.photo
                            from identikits
                            inner join identikit_photos on identikit_photos.submission_id=identikits.submission_id'''

        for i in range(0, len(submission_ids)):
            if i == 0:
                query_string = query_string + "\n WHERE identikits.submission_id='%s'"
            elif i != 0:
                query_string = query_string + "\n OR identikits.submission_id='%s'"

        query_string = query_string + ";"

        execute_query(query_string, tuple(submission_ids))
        data = retrieve_all()
        return data
    else:
        return np.array([])

