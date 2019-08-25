# Clustering Package

## Description

This package contains modules used for clustering various feature vectors

## Modules
 ### dissimilarity: 
 Module contains the class Dissimilarity, which is used for calculating the degree od dissimilarity between feature vectors. The dissimilairty measure used in this class is the Gower Dissimilarity measure. This measure is chosen to account for the fact that the feature vectors contain a mix of nomial and numeric data. 

 ### feature_encoding:
 Contains dictionary for the encoding used for refering to various races and sexes (which, by accident, was called "genders". but was not changed due to the extensive, mistaken use of the the name "genders" throughout the project)

 ### feature_weighting:
 Contains dictionaries for the indices of the various types of features ina  featue array, and dictionaries fo the relative weights of each type of feature

 ### heirachical_clustering:
 Module that contains the class HeirachicalClustering, which is used to group towgether and encapsulate various functionalities used for perfomring Agglomorative Heirachical Clustering (HAC). 

 The heirachical clustering is performed using the AgglomerativeClustering class from the cluster module in the ScikitLearn package. 

 This class merely provides a more client-friendly interface for the AgglomerativeClustering class by encapsulating a lot of it's functionlity and presetting the arguments in its constructor.  