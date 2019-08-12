import numpy as np
from feature_encoding import *
from feature_weighting import *
from mobile_application.face_encoding.coordinates import Coordinate
from sklearn import preprocessing


class UnequalArrayLength(Exception):
    def __init__(self):
        Exception.__init__(self, "Input arrays are not of the same length")


class NonBinaryFormat(Exception):
    def __init__(self):
        Exception.__init__(self, "Input arrays are not in binary format (i.e. containing int values 0 or 1)")


class Dissimilarity:
    __LENGTH_OF_VECTOR = 3
    __vectors = np.empty(shape=(0, __LENGTH_OF_VECTOR))

    @property
    def feature_vectors(self):
        return self.__vectors

    def add_vector(self, vector: np.array) -> None:
        self.__vectors = np.vstack((self.__vectors, vector))

    @staticmethod
    def dissimilarity(vector_1: np.array, vector_2: np.array)-> np.array:
        """
        Calculate dissimilary between feature vectors

        :param feature_matrix:
        :return:
        """

        # Used a Python List instead of numpy array since Python Lists are mutable.
        # This allows for new dissimilariy values to be appended to the vector
        dissimilarity_vector = []

        # max_abs_scaler = preprocessing.MaxAbsScaler()

        for x, y in zip(*[iter(feature_vector_indexes["Face"])] * 2):
            face_coordinate_1 = np.array([vector_1[x], vector_1[y]])
            face_coordinate_2 = np.array([vector_2[x], vector_2[y]])
            dissimilarity = Dissimilarity.gower_similarity(face_coordinate_1, face_coordinate_2, datatype="ratio")
            dissimilarity_vector.append(dissimilarity)

        # dissimilarity_vector = max_abs_scaler.fit_transform(dissimilarity_vector)

        race_vector_1 = vector_1[feature_vector_indexes["Race"]]
        race_vector_2 = vector_2[feature_vector_indexes["Race"]]
        race_dissimilarity = Dissimilarity.gower_similarity(race_vector_1, race_vector_2, datatype="nominal")
        dissimilarity_vector.append(race_dissimilarity)

        gender_vector_1 = vector_1[feature_vector_indexes["Gender"]]
        gender_vector_2 = vector_2[feature_vector_indexes["Gender"]]
        gender_dissimilarity = Dissimilarity.gower_similarity(gender_vector_1, gender_vector_2, datatype="nominal")
        dissimilarity_vector.append(gender_dissimilarity)

        return np.array(dissimilarity_vector)


    @staticmethod
    def gower_similarity(vector_1: np.array, vector_2: np.array, datatype: str ="ratio")-> float:
        if vector_1.size != vector_2.size:
            raise UnequalArrayLength()

        if datatype == "ratio":
            similarity = Dissimilarity.manhattan_distance(vector_1, vector_2)
        elif datatype == "nominal":
            similarity = 1 - Dissimilarity.dice_coefficient(vector_1, vector_2)
        else:
            raise ValueError('datatype must be "nominal" or "ratio"')

        return similarity

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

        if binary_vector_1.size != binary_vector_2.size:
            raise UnequalArrayLength()

        for i in np.arange(0, binary_vector_1.size):
            if (binary_vector_1[i] != 1 and binary_vector_1[i] != 0) or (binary_vector_2[i] != 0 and
                                                                         binary_vector_2[i] != 1):
                raise NonBinaryFormat()

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
vec_1 = np.array([1, 2, 4, 5, 1, 0, 0, 0, 1, 0])
vec_2 = np.array([1, 3, 6, 5, 0, 1, 0, 0, 1, 0])
print(d.dissimilarity(vec_1, vec_2))