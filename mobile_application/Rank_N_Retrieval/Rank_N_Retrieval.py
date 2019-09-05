import mobile_application.controller as cnt
import mobile_application.models as models
import numpy as np

def find_rank_index(person_id_matrix, derisred_person_id):
    for i in range(0, person_id_matrix.shape[0]):
        if person_id_matrix[i] == str(derisred_person_id):
            return i + 1

    else:
        return -1

def convert_person_id(person_id):
    # Black male
    if person_id == 23429344536530:
        return 1228259
    # Black female
    elif person_id == 54534905784705:
        return 1759639
    # White male
    elif person_id == 45457197439853:
        return 1606361
    # White female
    elif person_id == 26753716511442:
        return 1047215
    else:
        raise ValueError('Id conversion not found')


counter = 0
valid_ids = models.get_valid_submission_ids()
rank_positions = np.array([])



for submission_id in valid_ids:
    person_ids = cnt.get_matching_person_ids(submission_id[0])
    desired_person_id = convert_person_id(int(models.get_correct_persons_id(submission_id[0])[0]))
    print("The desired person_id")
    print(desired_person_id)
    correct_person_index = find_rank_index(person_ids, desired_person_id)
    print('The rank index that is about to be appended is:')
    print(correct_person_index)
    rank_positions = np.append(rank_positions, correct_person_index)


np.savetxt("rank_positions_no_weighting.csv", rank_positions.astype(int), delimiter=",")