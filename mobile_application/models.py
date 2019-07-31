from typing import IO


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
    param = photo_to_binary('1.png')
    query_string = ''' INSERT INTO person_photo(photo)
                    VALUES (%s); '''
    cursor.execute(query_string, param)
    conn.commit
    



