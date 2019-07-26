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
        new_point = Coordinate(dlib_point.x, dlib_point.y)

    return new_point

def change_coordinate_reference(ref, point):
    x = point.x - ref.x
    y = point.y - ref.y
    new_point = Coordinate(x, y)
    return new_point