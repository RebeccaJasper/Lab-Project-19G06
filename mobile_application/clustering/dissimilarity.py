import numpy as np
from feature_encoding import *
from feature_weighting import *
from mobile_application.face_encoding.coordinates import Coordinate
from sklearn import preprocessing
import matplotlib.pyplot as plt
from scipy.spatial.distance import squareform
from scipy.cluster.hierarchy import dendrogram, linkage

import scipy.cluster.hierarchy as shc


class UnequalArrayLength(Exception):
    def __init__(self):
        Exception.__init__(self, "Input arrays are not of the same length")


class NonBinaryFormat(Exception):
    def __init__(self):
        Exception.__init__(self, "Input arrays are not in binary format (i.e. containing int values 0 or 1)")


class Dissimilarity(object):
    __LENGTH_OF_VECTOR = 4
    __distance_vector = np.array([])
    __feature_vectors = np.array([])

    def __init__(self):
        self.__feature_vectors = np.array([])

    @property
    def feature_vectors(self):
        return self.__feature_vectors

    def load_feature_vectors(self, vectors: np.array) -> None:
        self.__feature_vectors = vectors

    def add_vector(self, vector: np.array) -> None:
        self.__feature_vectors = np.vstack((self.__vectors, vector))


    def ranges(self):
        """Function for calculating in the range on each column in the feature_matrix"""

        ranges = np.ptp(self.__feature_vectors, axis=0)
        return ranges

    def distance_matrix(self)-> np.array:
        #
        # np.delete(feature_matrix, np.arange(0, feature_matrix.shape[0]), 0)

        distance_matrix = np.array([])

        feature_ranges = self.ranges()
        weights = np.ones((feature_ranges.size))


        for currrent_row_index in np.arange(0, self.__feature_vectors.shape[0]):
            start = currrent_row_index + 1
            # for other_row_index in np.arange(start, self.__feature_vectors.shape[0]):
            if start < self.__feature_vectors.shape[0]:
                for other_row_index in np.arange(start, self.__feature_vectors.shape[0]):
                    distance = Dissimilarity.distance(self.__feature_vectors[currrent_row_index],
                                                             self.__feature_vectors[other_row_index],
                                                      feature_ranges, weights)

                    distance_matrix = np.append(distance_matrix, [distance])

        return distance_matrix

    @staticmethod
    def distance( vector_1: np.array, vector_2: np.array, range: np.array, weights: np.array)-> np.array:
        """
        Calculate dissimilary between feature vectors

        :param feature_matrix:
        :return:
        """

        # Used a Python List instead of numpy array since Python Lists are mutable.
        # This allows for new dissimilariy values to be appended to the vector
        dist = 0

        # max_abs_scaler = preprocessing.MaxAbsScaler()

        for i in feature_vector_indexes["Face"]:
            if range[i] != 0:
                partial_dist = Dissimilarity.gower_similarity(np.array([vector_1[i]]), np.array([vector_2[i]]))
                partial_dist = partial_dist/range[i]
                partial_dist = partial_dist * weights[i]
                partial_dist = partial_dist/weights.sum()
            else:
                partial_dist = 0

            dist += partial_dist

        # for x, y in zip(*[iter(feature_vector_indexes["Face"])] * 2):
        #     face_coordinate_1 = np.array([vector_1[x], vector_1[y]])
        #     face_coordinate_2 = np.array([vector_2[x], vector_2[y]])
        #     partial_dissimilarity = Dissimilarity.gower_similarity(face_coordinate_1, face_coordinate_2, datatype="ratio")
        #
        #     dissimilarity_vector.append(dissimilarity)

        # dissimilarity_vector = max_abs_scaler.fit_transform(dissimilarity_vector)

        race_vector_1 = vector_1[feature_vector_indexes["Race"]]
        race_vector_2 = vector_2[feature_vector_indexes["Race"]]
        race_dissimilarity = Dissimilarity.gower_similarity(race_vector_1, race_vector_2, datatype="nominal")
        dist += race_dissimilarity

        gender_vector_1 = vector_1[feature_vector_indexes["Gender"]]
        gender_vector_2 = vector_2[feature_vector_indexes["Gender"]]
        gender_dissimilarity = Dissimilarity.gower_similarity(gender_vector_1, gender_vector_2, datatype="nominal")
        dist += race_dissimilarity

        dist = dist/vector_1.size

        return dist

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


feature_matrix = np.array(([1, 2, 4, 5, 1, 0, 0, 0, 1, 0], [1, 3, 6, 5, 0, 1, 0, 0, 1, 0], [1, 3, 6, 5, 0, 1, 0, 0, 0, 1]))
d = Dissimilarity()
d.load_feature_vectors(feature_matrix)
matrix = d.distance_matrix()
print(matrix)

# print('After deletion:')
# print(np.delete(feature_matrix, np.arange(0, feature_matrix.shape[0]), 0))
# d = Dissimilarity()
# d.load_feature_vectors(feature_matrix)
# matrix = d.distance_matrix()



plt.figure(figsize=(10, 7))
plt.title("Dendrograms")
dists = squareform(matrix)
linkage_matrix = linkage(dists, "single")
# dend = shc.dendrogram(shc.linkage(dists, "single"))
dendrogram(linkage_matrix)
plt.axhline(y=6, color='r', linestyle='--')
plt.show()


