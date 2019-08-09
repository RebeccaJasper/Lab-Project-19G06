from mobile_application.models import save_identikit_info_to_db


def process_submission_info(firstname: str = "", surname: str = "", gender: float = "0.25", race: float = "0.16", person_id:int = -1):
    save_identikit_info_to_db(firstname, surname, gender, race, person_id)

