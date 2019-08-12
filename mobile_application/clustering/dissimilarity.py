import numpy as np
from feature_encoding import *
from feature_weighting import *
from mobile_application.face_encoding.coordinates import Coordinate

class Dissimilarity:
    __LENGTH_OF_VECTOR = 3
    __vectors = np.empty(shape=(0, __LENGTH_OF_VECTOR))

    @property
    def feature_vectors(self):
        return self.__vectors

    def add_vector(self, vector: np.array) -> None:
        self.__vectors = np.vstack((self.__vectors, vector))

    @staticmethod
    def dissimilarity(vector_1: np.array, vector_2: np.array):
        dissimilarity_vector = np.array([])


        for i in feature_vector_indexes["Face"]:
            # Gower Distance
            print(i)


        for i in feature_vector_indexes["Race"]:
            # Gower Distance for nominal data
            print(i)

        for i in feature_vector_indexes["Gender"]:
            # Gower Distance for nominal data
            print(i)


        return dissimilarity_vector

    @staticmethod
    def gower_distance(vector_1: np.array, vector_2: np.array, datatype: str ="")-> float:
        if datatype == "nominal":
            return

    @staticmethod
    def __manhattan_distance(point_1: Coordinate, point_2: Coordinate):
        dist = abs(point_1.y - point_2.y) + abs(point_1.x - point_2.x)
        return dist

    @staticmethod
    def dice_coefficient(binary_vector_1: np.array, binary_vector_2: np.array):

        # Sum of all the elements that exist in both matrices (a)
        print('Binary vector 1: ', np.array(np.where(binary_vector_1 == 1)))
        print('Binary vector2: ', np.array(np.where(binary_vector_2 == 1)))
        a = np.sum(np.array(np.where(binary_vector_1 == 1)) == np.array(np.where(binary_vector_2 == 1)))
        # All the elements that are true in the first vector that aren't true in the second
        coef = a
        return coef

d = Dissimilarity()
a = d.dice_coefficient(np.array([1, 0, 1, 0]), np.array([1, 0, 0, 0]))
print(a)