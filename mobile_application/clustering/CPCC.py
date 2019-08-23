from dissimilarity import Dissimilarity
from scipy.cluster.hierarchy import cophenet
import numpy as np


def calculate_CPCC(matrix: np.array)-> float:
    distance_matrix = Dissimilarity.distance_matrix(matrix)
    cophenetic_matrix = cophenet(distance_matrix)
    CPCC = np.corrcoef(distance_matrix, cophenetic_matrix)[0,1]

    return CPCC

