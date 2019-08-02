import unittest
from mobile_application.models import photo_to_string
from os import path, getcwd


class TestFacialEncoding(unittest.TestCase):

    def test_base64_encoding(self):
        """
        Test that the function that converts the images into ASCII characters using base64 encoding returns the correct
        string
        """
        # Navigate to facial_images directory
        root_directory = path.dirname(getcwd())
        photo_directory = path.join(root_directory, 'mobile_application\\facial_images\\1.jpg')
        base64_file_directory = path.join(root_directory, 'mobile_application\\facial_images\\base64.txt')

        # Find string representation of base64 encoding
        test_encoding = photo_to_string(photo_directory)
        test_encoding = open(base64_file_directory, 'r')

        self.assertEqual(test_encoding, test_encoding, "Should be the same")
        test_encoding.close()



if __name__ == '__main__':
    unittest.main()

