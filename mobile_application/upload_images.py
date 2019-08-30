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


for i in listdir('./facial_images/Black/Male'):
    print(i)
    person_id = generate_id()

    filename = join('./facial_images/Black/Male', i)
    add_person_info_to_db(person_id, 1, 'M')
    add_image_to_database(person_id, filename)
    add_feature_vector_to_db(person_id, encode_face_image(filename))


for i in listdir('./facial_images/Black/Female'):
    print(i)
    person_id = generate_id()

    filename = join('./facial_images/Black/Female', i)
    add_person_info_to_db(person_id, 1, 'F')
    add_image_to_database(person_id, filename)
    add_feature_vector_to_db(person_id, encode_face_image(filename))



for i in listdir('./facial_images/Coloured/Male'):
    print(i)
    person_id = generate_id()

    filename = join('./facial_images/Coloured/Male', i)
    add_person_info_to_db(person_id, 2, 'M')
    add_image_to_database(person_id, filename)
    add_feature_vector_to_db(person_id, encode_face_image(filename))


for i in listdir('./facial_images/Coloured/Female'):
    print(i)
    person_id = generate_id()

    filename = join('./facial_images/Coloured/Female', i)
    add_person_info_to_db(person_id, 2, 'F')
    add_image_to_database(person_id, filename)
    add_feature_vector_to_db(person_id, encode_face_image(filename))



for i in listdir('./facial_images/Indian and Asian/Male'):
    print(i)
    person_id = generate_id()

    filename = join('./facial_images/Indian and Asian/Male', i)
    add_person_info_to_db(person_id, 3, 'M')
    add_image_to_database(person_id, filename)
    add_feature_vector_to_db(person_id, encode_face_image(filename))


for i in listdir('./facial_images/Indian and Asian/Female'):
    print(i)
    person_id = generate_id()

    filename = join('./facial_images/Indian and Asian/Female', i)
    add_person_info_to_db(person_id, 3, 'F')
    add_image_to_database(person_id, filename)
    add_feature_vector_to_db(person_id, encode_face_image(filename))



for i in listdir('./facial_images/White/Male'):
    print(i)
    person_id = generate_id()

    filename = join('./facial_images/White/Male', i)
    add_person_info_to_db(person_id, 4, 'M')
    add_image_to_database(person_id, filename)
    add_feature_vector_to_db(person_id, encode_face_image(filename))



for i in listdir('./facial_images/White/Female'):
    print(i)
    person_id = generate_id()

    filename = join('./facial_images/White/Female', i)
    add_person_info_to_db(person_id, 4, 'F')
    add_image_to_database(person_id, filename)
    add_feature_vector_to_db(person_id, encode_face_image(filename))



# for i in listdir('./Identikits'):
#     # print(i)
#     person_id = generate_id()
#     submission_id = int(i[:-4])
#     print("Submission-id: %d" % submission_id)
#
#     filename = join('./Identikits', i)
#     # add_person_info_to_db(person_id, 4, 'M')
#     # add_image_to_database(person_id, filename)
#     edit_identikit_feature_vector_in_db(submission_id, encode_face_image(filename))