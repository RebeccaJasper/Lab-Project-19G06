from typing import IO
from mobile_application.db import *
from typing import List
from base64 import b64encode


def photo_to_binary(filename: str) -> IO[bytes]:
    """
    Opens a specified photo and converts it to binary

    :param filename: name of the image file
    :return: typing.BinaryIO
    """

    with open(filename, 'rb') as file:
        binary_data = b64encode(file.read())

    # print('This word can be formatted: "%s" ' % binary_data.decode('utf-8'))
    return binary_data.decode('utf-8')


def add_encoding_to_db(feature_vec):
    db_list.append(feature_vec)


def get_encoding_list():
    return db_list


def add_image_to_database(person_id, filename):

    query_string = ''' INSERT INTO person_photos(person_id, photo)
                    VALUES ('%s', '%s'); '''
    args = (person_id, photo_to_binary(filename))
    execute_query(query_string, args)

add_image_to_database('1', '1.jpg')

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


def add_feature_vector_to_db(person_id: str, feature_vector: List[float]) -> None:
    """
    Adds a feature vector to the database

    :param feature_vector: List representing a feature vector
    :param person_id: String representing the id associated with the person
    :rtype: None
    """

    query_string = ''' INSERT INTO face_encodings(person_id, face_encodings)
                    VALUES ('%s', '%s'); '''
    args = (person_id, convert_list_to_str(feature_vector))
    execute_query(query_string, args)



