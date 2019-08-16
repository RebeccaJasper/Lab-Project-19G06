from models import *
from os import listdir
from os.path import join
from random import randint
from face_encoding.face_to_vec import encode_face_image

existing_ids = []

def generate_id():

    UPPER_LIMIT = 2000000
    LOWER_LIMIT = 1000000
    run = True

    new_id = randint(LOWER_LIMIT, UPPER_LIMIT)

    while run:
        if new_id in existing_ids:
            run = True
            new_id = randint(LOWER_LIMIT, UPPER_LIMIT)
        else:
            run = False
    return new_id


for i in listdir('./facial_images/White/Male'):
    print(i)
    person_id = generate_id()


    filename = join('./facial_images/White/Male', i)
    add_person_info_to_db(person_id, 4, 'M')
    add_image_to_database(person_id, filename)
    add_feature_vector_to_db(person_id, encode_face_image(filename))
