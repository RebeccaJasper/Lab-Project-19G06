from dissimilarity import Dissimilarity
from scipy.cluster.hierarchy import cophenet
from scipy.optimize import minimize
import numpy as np


def calculate_CPCC()-> float:
    distance_matrix = Dissimilarity.distance_matrix()
    cophenetic_matrix = cophenet(distance_matrix)
    CPCC = np.corrcoef(distance_matrix, cophenetic_matrix)[0,1]

    return CPCC

def calculate_optimal_weights() -> np.array
    x0 = np.array([]) # initial guess(es)
    return minimize(calculate_CPCC(), x0, method=‘BFGS’ )