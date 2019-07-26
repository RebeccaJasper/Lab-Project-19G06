import cv2
import numpy as np
import dlib
from operator import itemgetter
from math import sqrt

class Coordinate:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __str__(self):
        return '({self.x}, {self.y})'.format(self=self)

def unit_vector(dlib_point):
    modulus = sqrt(pow(dlib_point.x, 2) + pow(dlib_point.y, 2))
    if modulus != 0:
        x = dlib_point.x /modulus
        y = dlib_point.y/modulus
        new_point = Coordinate(x, y)
    else:
        new_point = (dlib_point.x, dlib_point.y)
        
    return new_point

def change_coordinate_reference (ref, point):
    x = point.x - ref.x
    y = point.y - ref.y
    new_point = dlib.point(x, y)
    return new_point



detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("landmarks_data/shape_predictor_68_face_landmarks.dat")

img = cv2.imread('facial_images/1.jpg', 0)

faces = detector(img)

for face in faces:
    x1 = face.left()
    y1 = face.top()
    x2 = face.right()
    y2 = face.bottom()
    #cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 3)

    landmarks = predictor(img, face)


    # Extract only the chosen facial markers
    required_indexes = [0, 4, 6, 10, 12, 16, 31, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 51, 54, 57]
    central_point_index = 51
    transformed_points = []

    # Place circles at desired facial markers
    for n in required_indexes:
        new_dlib_point = change_coordinate_reference(landmarks.part(central_point_index), landmarks.part(n))
        new_point = unit_vector(new_dlib_point)
        print(new_point)
        transformed_points.append(new_point)
        x = landmarks.part(n).x
        y = landmarks.part(n).y
        cv2.circle(img, (x, y), 4, (255, 0, 0), -1)

cv2.imshow('Output', img)

cv2.waitKey(0)
cv2.destroyAllWindows()