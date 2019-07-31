from typing import IO
from mobile_application.db import *
from typing import List


def photo_to_binary(filename: str) -> IO[bytes]:
    """
    Opens a specified photo and converts it to binary

    :param filename: name of the image file
    :return: typing.BinaryIO
    """

    with open(filename, 'rb') as file:
        binary_data = file.read()
    return binary_data


def add_encoding_to_db(feature_vec):
    db_list.append(feature_vec)


def get_encoding_list():
    return db_list


def add_image_to_database(filename):
    arg = photo_to_binary('1.png')
    query_string = ''' INSERT INTO person_photo(photo)
                    VALUES (%s); '''
    execute_query(query_string, arg)


def convert_list_to_str(list: List[float]) -> str:
    """
    Converts a list into a csv string

    :param list: Input list to be converted to a string
    :return: A csv string with all the elements in the input list
    :rtype: str
    """
    feature = [str(i) for i in list]
    feature_string = str(",".join(feature))
    return feature_string


def add_feature_vector_to_database(id: str, feature_vector: List[float]) -> None:
    """
    Adds a feature vector to the database

    :param feature_vector: List representing a feature vector
    :param id: String representing the id associated with the person
    :rtype: None
    """

    query_string = ''' INSERT INTO face_encodings(person_id, face_encodings)
                    VALUES ('%s', '%s'); '''
    arg = (id, convert_list_to_str(feature_vector))
    execute_query(query_string, arg)


add_feature_vector_to_database('1', [0.2, 0.6, 0.9])


