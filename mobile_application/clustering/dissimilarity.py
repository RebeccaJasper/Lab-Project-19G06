import numpy as np


class Dissimilarity:
    __LENGTH_OF_VECTOR = 3
    __vectors = np.empty(shape=(0, __LENGTH_OF_VECTOR))

    @property
    def feature_vectors(self):
        return self.__vectors

    def add_vector(self, vector: np.array):
        self.__vectors = np.vstack((self.__vectors, vector))
        return



d = Dissimilarity()
a = np.ndarray([1, 2, 3])
print(d.feature_vectors)
d.add_vector(np.array([3, 4, 5]))
print(d.feature_vectors)