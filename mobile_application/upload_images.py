from mobile_application.models import *
from os import listdir
from os.path import join
from random import randint

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


for i in listdir('./facial_images'):
    filename = join('./facial_images', i)
    