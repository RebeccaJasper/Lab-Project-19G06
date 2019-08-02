from math import sqrt


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

def unit_vector(dlib_point):
    
    modulus = sqrt(pow(dlib_point.x, 2) + pow(dlib_point.y, 2))
    if modulus != 0:
        x = dlib_point.x /modulus
        y = dlib_point.y/modulus
        new_point = Coordinate(x, y)
    else:
        new_point = Coordinate(dlib_point.x, dlib_point.y)

    return new_point

def change_coordinate_reference(ref, point):
    x = point.x - ref.x
    y = point.y - ref.y
    new_point = Coordinate(x, y)
    return new_point