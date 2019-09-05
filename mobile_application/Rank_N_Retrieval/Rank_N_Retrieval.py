import mobile_application.controller as cnt
import mobile_application.models as models
counter = 0
valid_ids = models.get_valid_submission_ids()

for submission_id in valid_ids:
