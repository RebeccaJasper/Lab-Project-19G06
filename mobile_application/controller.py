from face_encoding.face_to_vec import encode_face_image
from cv2 import imread

img = imread('facial_images/1.jpg', 0)
print(encode_face_image(img))



