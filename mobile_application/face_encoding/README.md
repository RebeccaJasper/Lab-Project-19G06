# face_encoding

## Description
This package contains modules used for converting the coordinates of various facial features on a person to an normalizing "facial map" which is later used for clustering. 

## Modules
### coordinates:
This module contains the class Coordinates for modelling a 2D coordinate (e.g. the coordinate of a facial feature). 

It also ocntains useful functions manipulating coordinates, converting dlib points into Coordinate points, and finding unit vectors (which is used for standardizing the facial maps)

### face_to_vec:
This module contains a function used for extrating facial features from a photograph, and converting those facial features into a normalized facial map, which is represented as a feature vector. 

This module is currently not used in any of the user applications. It was only used during the process of uploading GAN images to the database.

### normalization:
This module contains functions for normalizing facial feature vectors. 

It also contains a function for changing the coordinate reference of an entire feature vector. (This was created because of the fact that the current coordinate reference of the entire identikit_markers table is wrong. Hence, this function quickly aided in changing that coordinate reference to the correct one)