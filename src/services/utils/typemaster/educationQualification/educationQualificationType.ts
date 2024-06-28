import { getSelectedEducationQualificationSchema } from '../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js';

function retrieveEducationQualificationsId(
  educationQualifications: getSelectedEducationQualificationSchema[] | undefined
) {
  try {
    const educationQualificationsId: string[] = [];
    if (educationQualifications) {
      for (let educationQualification of educationQualifications) {
        educationQualificationsId.push(educationQualification.id);
      }
    }
    return educationQualificationsId;
  } catch (error) {
    throw error;
  }
}

export { retrieveEducationQualificationsId };
