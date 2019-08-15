# import sys
# import os
#
# sys.path.append(os.path.abspath('../mobile_application/clustering'))
import sys
sys.path.append("..")
# print(sys.path)
import unittest
from .mobile_application.clustering.dissimilarity import Dissimilarity
import numpy as np

class TestDissimilarity(unittest.TestCase):

    __d = Dissimilarity()

    def tearDown(self):
        self.__d.clear_feature_vectors()

    """Testing the Dissimilarity Class in the clustering package"""
    def test_add_vector(self):

        size_of_test_vector = 10
        feature_vector = np.ones(size_of_test_vector)

        self.__d.add_feature_vector(feature_vector)
        self.assertEqual(self.__d.feature_vectors(), feature_vector, "Should be the same")

