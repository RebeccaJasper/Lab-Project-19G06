import cv2
import dlib
from .coordinates import *
from typing import List


def encode_face_image(img_dir: str) -> List[float]:
    """
    Creates a normailized feature vector for a given id photograph
    :param img_dir: File directory for the id photograph
    :type: str

    :return: Normalized list of features
    :rtype: List[float]
    """
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor("./landmarks_data/shape_predictor_68_face_landmarks.dat")

    img = cv2.imread(img_dir, 0)

    faces = detector(img)

    for face in faces:
        x1 = face.left()
        y1 = face.top()
        x2 = face.right()
        y2 = face.bottom()
        # cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 3)

        landmarks = predictor(img, face)

        # Extract only the chosen facial markers
        # required_indexes = [0, 4, 6, 10, 12, 16, 31, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 51, 54, 57]
        central_point_index = 33
        transformed_points = []

        # Place circles at desired facial markers
        for n in range(0, 68):
            new_dlib_point = change_coordinate_reference(landmarks.part(central_point_index), landmarks.part(n))
            new_point = unit_vector(new_dlib_point, landmarks.part(central_point_index))
            transformed_points.append(new_point.x)
            transformed_points.append(new_point.y)
            x = landmarks.part(n).x
            y = landmarks.part(n).y
    #         cv2.circle(img, (x, y), 4, (255, 0, 0), -1)
    #
    # cv2.imshow('Output', img)
    #
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    return transformed_points


