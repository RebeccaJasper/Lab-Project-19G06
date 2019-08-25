# Clustering Package

## Description

This package contains modules used for clustering various feature vectors

## Modules
 ### dissimilarity: 
 Module contains the class Dissimilarity, which is used for calculating the degree od dissimilarity between feature vectors. The dissimilairty measure used in this class is the Gower Dissimilarity measure. This measure is chosen to account for the fact that the feature vectors contain a mix of nomial and numeric data. 

 ### feature_encoding:
 Contains dictionary for the encoding used for refering to various races and sexes (which, by accident, was called "genders". but was not changed due to the extensive use of the the name "genders" throughout the project)