import numpy as np
from feature_encoding import *
from feature_weighting import *
from mobile_application.face_encoding.coordinates import Coordinate
from sklearn import preprocessing


class UnequalArrayLength(Exception):
    def __init__(self):
        Exception.__init__(self, "Input arrays are not of the same length")

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
        # max_abs_scaler = preprocessing.MaxAbsScaler()

        for x, y in zip(*[iter(feature_vector_indexes["Face"])] * 2):

            print(i)

        # dissimilarity_vector = max_abs_scaler.fit_transform(dissimilarity_vector)

        for i in feature_vector_indexes["Race"]:
            # Gower Distance for nominal data
            print(i)

        for i in feature_vector_indexes["Gender"]:
            # Gower Distance for nominal data
            print(i)


        return dissimilarity_vector

    @staticmethod
    def gower_similarity(vector_1: np.array, vector_2: np.array, datatype: str ="")-> float:
        if datatype == "ratio":
            manhattan_distance(vector_1, vector_2)




    @staticmethod
    def manhattan_distance(vector_1: np.array, vector_2: np.array):
        if vector_1.size != vector_2.size:
            raise UnequalArrayLength()

        dist = 0
        for i in np.arange(0, vector_1.size):
            dist += abs(vector_1[i] - vector_2[i])

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

        coef = 2*a/(2*a + b + c)

        return coef

d = Dissimilarity()
print(d.manhattan_distance(np.array([1, 4, 3]), np.array([1, 2, 3, 5])))