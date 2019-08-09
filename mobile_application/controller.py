from mobile_application.models import save_identikit_info_to_db, add_feature_vector_to_identikit_db, add_image_to_identikit_database
from mobile_application.face_encoding.normalization import normalize_feature_vector


def process_submission_info(firstname: str = "", surname: str = "", gender: float = "0.25", race: float = "0.16", person_id:int = -1):
    save_identikit_info_to_db(firstname, surname, gender, race, person_id)


def process_submission_feature_vector(feature_vector_string: str) -> None:
    feature_vector = list(map(int, feature_vector_string.split(',')))
    feature_vector = normalize_feature_vector(feature_vector)
    add_feature_vector_to_identikit_db(feature_vector)


def process_submission_photo(base64_string: str) -> None:
    add_image_to_identikit_database(base64_string)
