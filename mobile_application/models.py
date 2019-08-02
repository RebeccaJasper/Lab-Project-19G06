from mobile_application.db import *
from typing import List
from base64 import b64encode


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



