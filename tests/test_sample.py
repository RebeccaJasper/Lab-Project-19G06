import unittest
# from ..mobile_application.models import photo_to_string, convert_list_to_str
# from os import path, getcwd
# from random import random, randint
#
#
# class TestFacialEncoding(unittest.TestCase):
#
#     def test_base64_encoding(self):
#         """
#         Test that the function that converts the images into ASCII characters using base64 encoding returns the correct
#         string
#         """
#         # Navigate to facial_images directory
#         root_directory = path.dirname(getcwd())
#         photo_directory = path.join(root_directory, 'mobile_application\\facial_images\\1.jpg')
#         base64_file_directory = path.join(root_directory, 'mobile_application\\facial_images\\base64.txt')
#
#         # Find string representation of base64 encoding
#         test_encoding = photo_to_string(photo_directory)
#         test_encoding = open(base64_file_directory, 'r')
#
#         self.assertEqual(test_encoding, test_encoding, "Should be the same")
#         test_encoding.close()
#
#     def test_convert_list_to_str(self):
#         """
#         Checks if a list of floating-point numbers is converted to a csv string
#         """
#
#         # Generate a list of random floating-point numbers
#         random_list = []
#         true_string= ''
#
#         MIN_SIZE_OF_LIST = 50
#         MAX_SIZE_OF_LIST = 150
#
#         for i in range(0, randint(MIN_SIZE_OF_LIST, MAX_SIZE_OF_LIST)):
#             random_float = random()
#             random_list.append(random_float)
#             true_string += str(random_float) + ','
#
#         # Remove the final comma in the true string
#         true_string = true_string[:-1]
#
#         # Converter list to string
#         test_string = convert_list_to_str(random_list)
#
#         self.assertEqual(test_string, true_string, "Should be the same")


if __name__ == '__main__':
    unittest.main()

