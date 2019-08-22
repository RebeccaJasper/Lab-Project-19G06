from math import sqrt
import numpy as np


class Coordinate:
    """Class for modeling the (x,y) coordinate of a facial feature"""

    def __init__(self, x: float, y: float):
        """
        Default constructor

        :param x: x-coordinate
        :type: float
        :param y: y-coordinate
        :type: float
        """
        self.x = x
        self.y = y

    def __str__(self):
        """
        String representation of coordinate

        :return: String representation of coordinate in form (x, y)
        :rtype: str
        """
        return '({self.x}, {self.y})'.format(self=self)


def unit_vector(dlib_point) -> Coordinate:
    """
    Coverts a dlib vector to a unit vector
    :param dlib_point: Dlib coordinate
    :type: dlib.point
    :return: Unit vector of the input vector
    :rtype: Coordinate
    """
    modulus = sqrt(pow(dlib_point.x, 2) + pow(dlib_point.y, 2))
    if modulus != 0:
        x = dlib_point.x /modulus
        y = dlib_point.y/modulus
        new_point = Coordinate(x, y)
    else:
        new_point = Coordinate(dlib_point.x, dlib_point.y)

    return new_point


def change_coordinate_reference(ref: Coordinate, point: Coordinate) -> Coordinate:
    """
    Change the base-reference point of a particular coordinate

    :param ref: The new reference point of the new coordinate system
    :type: Coordinate
    :param point: The point to be transformed onto the new coordinate system
    :type: Coordinate
    :return: Transformed coordinate of point on the new coordinate system
    :rtype: Coordinate
    """
    x = point.x - ref.x
    y = point.y - ref.y
    new_point = Coordinate(x, y)
    return new_point

def convert_dlib_points_to_coordinate_indexes(dlib_points: np.array) -> np.array:
    coordinate_indexes = np.array([])
    for i in dlib_points:
        x_coordinate = int(i * 2)
        y_coordinate = int(x_coordinate + 1)
        coordinate_indexes = np.hstack((coordinate_indexes, np.array([x_coordinate]), np.array([y_coordinate])))

    return coordinate_indexes

dlib_points = np.array([0, 4])
print(convert_dlib_points_to_coordinate_indexes(dlib_points))