from mobile_application.models import *
from os import listdir
from os.path import join

for i in listdir('./facial_images'):
    filename = join('./facial_images', i)
    print(filename)