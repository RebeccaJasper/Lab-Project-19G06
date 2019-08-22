import numpy as np
import matplotlib.pyplot as plt
from scipy.spatial.distance import squareform
from scipy.cluster.hierarchy import dendrogram, linkage
# from dissimilarity import Dissimilarity
from sklearn.cluster import AgglomerativeClustering


class HeirachicalClustering(object):
    """Class for performing Heirachical Agglomorative Clustering"""

    __cluster_labels = np.array([])

    def __init__(self):
        """Default constructors"""
        return

    def cluster(self, distance_matrix: np.array) -> None:
        """
        Performs agglomerative hierarchical clustering given a condensed distance array

        :param distance_matrix: Condensed distance array (i.e. upper triangular matrix of distance matrix in a 1-D array
        :type: np.array
        :rtype: None
        """
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

    def cluster_indexes(self) -> np.array:
        """
        Returns the cluster indexes generated from clustering

        :return: Array of cluster indexes
        :rtype: np.array
        """
        return self.__cluster_labels

    def clear_clusters(self) -> None:
        """
        Clears the stored cluster labels

        :rtype: None
        """
        self.__cluster_labels = np.delete(self.__cluster_labels, np.arange(0, self.__cluster_labels.size))
        return

    def find_cluster_siblings(self, cluster_label: int)-> np.array:
        """
        Finds the indexes of all the elements with the same cluster labels

        :param cluster_label: Cluster label to be searched
        :type: int
        :return: Array with indices of elements that are labelled with the given cluster label
        :rtype: np.array
        """
        return np.where(self.__cluster_labels == cluster_label)[0]
