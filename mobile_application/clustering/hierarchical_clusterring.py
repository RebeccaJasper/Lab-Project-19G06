import numpy as np
import matplotlib.pyplot as plt
from scipy.spatial.distance import squareform
from scipy.cluster.hierarchy import dendrogram, linkage
from dissimilarity import Dissimilarity

class HeirachicalClustering(object):

    __clusters = np.array([])

    def __init__(self):
        return

    def cluster(self, distance_matrix: np.array) -> None:
        pass

    def plot_dentogram(self, distance_matrix: np.array) -> None:
        """
        Plots the dentogram of a condensed distance matrix

        :param distance_matrix: 1-D Condensed distance matrix (i.e. upper triangular of distance matrix)
        :type: np.array
        :rtype: None
        """
        plt.figure(figsize=(10, 7))
        plt.title("Dendrogram")
        dists = squareform(distance_matrix)
        linkage_matrix = linkage(dists, "single")
        dendrogram(linkage_matrix)
        plt.show()
        return

    def cluster_indexes(self):
        pass

    def clear_clusters(self):
        pass


feature_matrix = np.array(([1, 2, 4, 5, 1, 0, 0, 0, 1, 0], [1, 3, 6, 5, 0, 1, 0, 0, 1, 0], [1, 3, 6, 5, 0, 1, 0, 0, 0, 1]))
d = Dissimilarity()
d.load_feature_vectors(feature_matrix)
matrix = d.distance_matrix()
hac = HeirachicalClustering()
hac.plot_dentogram(matrix)