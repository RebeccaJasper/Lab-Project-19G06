import numpy as np
from .feature_encoding import *
from .feature_weighting import *


class Dissimilarity(object):
    """Class used for computing dissimilarities between feature vectors and feature matrices"""

    __LENGTH_OF_VECTOR = 4
    __distance_vector = np.array([])
    __feature_vectors = np.array([])

    def __init__(self):
        """Default constructor"""
        self.__feature_vectors = np.array([])

    @property
    def feature_vectors(self):
        """Returns the loaded feature matrix

        :rtype: None
        """
        return self.__feature_vectors

    def load_feature_vectors(self, vectors: np.array) -> None:
        """Loads feature matrix to be analyzed

        :rtype: None
        """
        self.__feature_vectors = vectors

    def add_vector(self, vector: np.array) -> None:
        """Add a feature vector to the feature matrix

        :rtype: None
        """

        if np.array_equal(self.__feature_vectors, np.array([])):
            self.load_feature_vectors(vector)
        else:
            self.__feature_vectors = np.vstack((self.__feature_vectors, vector))

    def clear_feature_vectors(self):
        """Clears all feature vectors from the feature matrix

        :rtype: None
        """
        self.__feature_vectors = np.delete(self.__feature_vectors, np.arange(0, self.__feature_vectors.shape[0]), 0)

    def ranges(self) -> np.array:
        """Function for calculating in the range on each column in the feature matrix

        :return An array with the ranges for each feature in the feature matrix
        :rtype: np.array
        """
        ranges = np.ptp(self.__feature_vectors, axis=0)
        return ranges

    def distance_matrix(self)-> np.array:
        """
        Returns the condensed distance matrix (i.e. the upper triangular) of the loaded feature matrix

        :return: The upper triangular of the distance matrix of the feature matrix
        :rtype: np.array
        """

        distance_matrix = np.array([])

        feature_ranges = self.ranges()
        # weights_1 = np.ones(feature_ranges.size)
        # print(weights_1)
        # weights = np.append(np.full((1, 106), 0.8), np.full((1, 10), 5*10**10))

        weights = np.append(np.full((0, 32), all_weights["Other_facial_features"]), np.full((32, 42), all_weights["Nose"]))
        weights = np.append(weights, np.full((42, 66), all_weights["Eyes"]))
        weights = np.append(weights, np.full((66, 106), all_weights["Mouth"]))
        weights = np.append(weights, np.full((106, 112), all_weights["Race"]))
        weights = np.append(weights, np.full((112, 116), all_weights["Gender"]))     
        
        print("The weight vector's length: %d" % weights.size)

        for current_row_index in np.arange(0, self.__feature_vectors.shape[0]):
            start = current_row_index + 1

            if start < self.__feature_vectors.shape[0]:
                for other_row_index in np.arange(start, self.__feature_vectors.shape[0]):
                    distance = Dissimilarity.distance(self.__feature_vectors[current_row_index],
                                                      self.__feature_vectors[other_row_index],
                                                      feature_ranges, weights)

                    distance_matrix = np.append(distance_matrix, [distance])

        return distance_matrix


    @staticmethod
    def distance(vector_1: np.array, vector_2: np.array, feature_range: np.array, weights: np.array)-> np.array:
        """
        Calculates the Gower Distance between two mixed-data feature arrays based on facial markers, race and sex

        :param vector_1: Feature vector
        :param vector_2: Feature vector
        :param feature_range: Range of ratio data features for range normalization of partial distancess
        :param weights: Array containing the weights for each and every feature in the feature vector
        :return: Gower distance between two feature vectors
        :rtype: float
        """

        dist = 0

        for i in feature_vector_indexes["Face"]:
            if feature_range[i] != 0:
                partial_dist = Dissimilarity.gower_similarity(np.array([vector_1[i]]), np.array([vector_2[i]]))
                partial_dist = partial_dist/feature_range[i]
                partial_dist = partial_dist * weights[i]
                partial_dist = partial_dist/weights.sum()
            else:
                partial_dist = 0

            dist += partial_dist

        race_vector_1 = vector_1[feature_vector_indexes["Race"]]
        race_vector_2 = vector_2[feature_vector_indexes["Race"]]
        race_dissimilarity = Dissimilarity.gower_similarity(race_vector_1, race_vector_2, datatype="nominal")
        dist += race_dissimilarity

        gender_vector_1 = vector_1[feature_vector_indexes["Gender"]]
        gender_vector_2 = vector_2[feature_vector_indexes["Gender"]]
        gender_dissimilarity = Dissimilarity.gower_similarity(gender_vector_1, gender_vector_2, datatype="nominal")
        dist += gender_dissimilarity

        dist = dist/vector_1.size

        return dist

    @staticmethod
    def gower_similarity(vector_1: np.array, vector_2: np.array, datatype: str ="ratio")-> float:
        """
        Calculates the gower similarity between two input vectors of the same data type

        :param vector_1: Feature vector
        :param vector_2: Feature vector
        :param datatype: Type of data to calcualte the distance between (either "nominal" or "ratio"). Default
                            type is "ratio"
        :return: Gower similarity measure
        :rtype: float
        """
        if vector_1.size != vector_2.size:
            raise ValueError("Input arrays are not of the same length")

        if datatype == "ratio":
            similarity = Dissimilarity.manhattan_distance(vector_1, vector_2)
        elif datatype == "nominal":
            similarity = 1 - Dissimilarity.dice_coefficient(vector_1, vector_2)
        else:
            raise ValueError('datatype must be "nominal" or "ratio"')

        return similarity

    @staticmethod
    def manhattan_distance(vector_1: np.array, vector_2: np.array) -> float:
        """
        Calculate the Manhattan Distance between two n-dimensional points

        :param vector_1: N-dimensional point
        :type: np.array
        :param vector_2: N-dimensional point
        :type: np.array
        :return: Manhattan distance between the points
        :rtype: float
        """
        if vector_1.size != vector_2.size:
            raise ValueError("Input arrays are not of the same length")

        dist = 0
        for i in np.arange(0, vector_1.size):
            dist += abs(vector_1[i] - vector_2[i])

        return dist

    @staticmethod
    def dice_coefficient(binary_vector_1: np.array, binary_vector_2: np.array) -> float:
        """
        Calculates the Dice Coefficient (a similarity measure) between two ones-hot encoded nominal values

        :param binary_vector_1: Binary vector of ones-hot encoded nominal feature
        :type: np.array
        :param binary_vector_2: Binary vector of ones-hot encoded nominal feature
        :type: np.array
        :return: Dice coefficient
        :rtype: float
        """

        if binary_vector_1.size != binary_vector_2.size:
            raise ValueError("Input arrays are not of the same length")

        for i in np.arange(0, binary_vector_1.size):
            if (binary_vector_1[i] != 1 and binary_vector_1[i] != 0) or (binary_vector_2[i] != 0 and
                                                                         binary_vector_2[i] != 1):
                raise ValueError("Input arrays are not in binary format (i.e. containing int values 0 or 1)")

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

        dice_coeficient = 2*a/(2*a + b + c)

        return dice_coeficient


