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
        true_indexes_1 = np.array(np.where(binary_vector_1 == 1))
        true_indexes_2 = np.array(np.where(binary_vector_2 == 1))

        a = np.sum(true_indexes_1 == true_indexes_2)

        # All the elements that are true in the first vector that aren't false in the second (b)
        false_indexes_2 = np.array(np.where(binary_vector_2 == 0))

        b = np.sum(binary_vector_1[false_indexes_2] == 1)

        # All the elements that are false in the first vector that aren't true in the second (b)
        false_indexes_1 = np.array(np.where(binary_vector_1 == 0))

        c = np.sum(binary_vector_2[false_indexes_1] == 1)


        print("a = ", a)
        print("b = ", b)
        print("c = ", c)
        coef = 2*a/(2*a + b + c)

        return coef

d = Dissimilarity()
a = d.dice_coefficient(np.array([1, 0, 1, 0]), np.array([1, 0, 0, 1]))
print(a)