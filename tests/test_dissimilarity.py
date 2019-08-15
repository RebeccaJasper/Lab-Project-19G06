import pytest
from mobile_application.clustering.dissimilarity import Dissimilarity
import numpy as np


class TestDissimilarity:
    __d = Dissimilarity()

    def teardown(self):
        self.__d.clear_feature_vectors()
        return

    def test_load_feature_vectors(self):
        feature_vector = np.ones(10)
        self.__d.load_feature_vectors(feature_vector)
        assert np.array_equal(self.__d.feature_vectors, feature_vector)

    def test_add_feature_vector(self):
        feature_vector = np.ones(10)
        self.__d.add_vector(feature_vector)
        self.__d.add_vector(feature_vector)
        print(self.__d.feature_vectors)
        print(np.vstack((feature_vector, feature_vector)))
        assert np.array_equal(self.__d.feature_vectors, np.vstack((feature_vector, feature_vector)))

    def test_dice_coefficient(self):
        a = np.array([1, 0, 1])
        b = np.array([1, 1, 0])
        result = Dissimilarity.dice_coefficient(a, b)
        assert result == 0.5

    def test_manhattan_distance(self):
        a = np.array([10, 8, 9])
        b = np.array([5, 6, 7])
        result = Dissimilarity.manhattan_distance(a, b)
        assert result == 9

    def test_gower_similarity(self):
        a = np.array([1, 0, 1])
        b = np.array([1, 1, 0])
        answer = Dissimilarity.gower_similarity(a, b, "nominal")
        first_assertion = answer == 0.5

        a = np.array([10, 8, 9])
        b = np.array([5, 6, 7])
        answer_2 = Dissimilarity.gower_similarity(a, b)
        second_assertion = answer_2 == 9

        assert first_assertion and second_assertion
