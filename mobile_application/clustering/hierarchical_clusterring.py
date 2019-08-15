import numpy as np
import matplotlib.pyplot as plt
from scipy.spatial.distance import squareform
from scipy.cluster.hierarchy import dendrogram, linkage
from dissimilarity import Dissimilarity
from sklearn.cluster import AgglomerativeClustering

class HeirachicalClustering(object):

    __cluster_labels = np.array([])

    def __init__(self):
        return

    def cluster(self, distance_matrix: np.array) -> None:
        dists = squareform(distance_matrix)
        clustering = AgglomerativeClustering(affinity="precomputed", linkage="complete").fit(dists)
        self.__cluster_labels = clustering.labels_
        return

    @staticmethod
    def plot_dentogram(distance_matrix: np.array) -> None:
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
        return self.__cluster_labels

    def clear_clusters(self):
        self.__cluster_labels = np.delete(self.__cluster_labels, np.arange(0, self.__cluster_labels.size))
        return


feature_matrix = np.array(([1, 2, 4, 5, 1, 0, 0, 0, 1, 0], [1, 3, 6, 5, 0, 1, 0, 0, 1, 0], [1, 3, 6, 5, 0, 1, 0, 0, 0, 1]))
d = Dissimilarity()
d.load_feature_vectors(feature_matrix)
matrix = d.distance_matrix()
hac = HeirachicalClustering()
hac.cluster(matrix)
# hac.plot_dentogram(matrix)
print(hac.cluster_indexes())
hac.clear_clusters()
print(hac.cluster_indexes())
