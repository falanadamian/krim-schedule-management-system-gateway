import {IUser, User} from "./user.model";
import {StudyLevel} from "./enum/study-level.enum";
import {Language} from "./enum/language.enum";
import {StudyType} from "./enum/study-type.enum";
import {UserSignature} from "./user-signature.model";
import {Module} from "./module.model";

export interface IModuleGeneralInformation {
  id?: number;
  name?: string;
  studyCourse?: string;
  code?: string;
  faculty?: string;
  studyLevel?: StudyLevel;
  studyField?: string;
  semester?: number;
  educationProfile?: string;
  lectureLanguage?: Language;
  studyType?: StudyType;
  responsibleUserSignature?: UserSignature;
  academicUserSignatures?: Array<UserSignature>;
  module?: Module;
  responsibleTeacher?: IUser;
  academicTeachers?: IUser[];
}

export class ModuleGeneralInformation implements IModuleGeneralInformation {
  constructor(
    public id?: number,
    public name?: string,
    public studyCourse?: string,
    public code?: string,
    public faculty?: string,
    public studyLevel?: StudyLevel,
    public studyField?: string,
    public semester?: number,
    public educationProfile?: string,
    public lectureLanguage?: Language,
    public studyType?: StudyType,
    public responsibleUserSignature?: UserSignature,
    public academicUserSignatures?: Array<UserSignature>,
    public module?: Module,
    public responsibleTeacher?: User,
    public academicTeachers?: User[],
    public responsibleUserSignatureId?: number,
    public academicUserSignaturesIds?: Array<number>,
    public moduleId?: number,
    public responsibleTeacherId?: number,
    public academicTeachersIds?: Array<number>,
  ) {
  }

  public static fromAssertion(moduleGeneralInformation: ModuleGeneralInformation): ModuleGeneralInformation {
    return new ModuleGeneralInformation(
      moduleGeneralInformation.id,
      moduleGeneralInformation.name,
      moduleGeneralInformation.studyCourse,
      moduleGeneralInformation.code,
      moduleGeneralInformation.faculty,
      (moduleGeneralInformation.studyLevel && (typeof moduleGeneralInformation.studyLevel === 'string')) ? <StudyLevel>StudyLevel[moduleGeneralInformation.studyLevel] : null,
      moduleGeneralInformation.studyField,
      moduleGeneralInformation.semester,
      moduleGeneralInformation.educationProfile,
      (moduleGeneralInformation.lectureLanguage && (typeof moduleGeneralInformation.lectureLanguage === 'string')) ? <Language>Language[moduleGeneralInformation.lectureLanguage] : null,
      (moduleGeneralInformation.studyType && (typeof moduleGeneralInformation.studyType === 'string')) ? <StudyType>StudyType[moduleGeneralInformation.studyType] : null,
      moduleGeneralInformation.responsibleUserSignature ? UserSignature.fromAssertion(moduleGeneralInformation.responsibleUserSignature) : null,
      moduleGeneralInformation.academicUserSignatures ? moduleGeneralInformation.academicUserSignatures.map(academicUserSignature => UserSignature.fromAssertion(academicUserSignature)) : null,
      moduleGeneralInformation.module,
      moduleGeneralInformation.responsibleTeacher,
      moduleGeneralInformation.academicTeachers ? moduleGeneralInformation.academicTeachers.map(academicTeacher => User.fromAssertion(academicTeacher)) : null,
      moduleGeneralInformation.responsibleUserSignatureId,
      moduleGeneralInformation.academicUserSignaturesIds ? moduleGeneralInformation.academicUserSignaturesIds : [],
      moduleGeneralInformation.moduleId,
      moduleGeneralInformation.responsibleTeacherId,
      moduleGeneralInformation.academicTeachersIds ? moduleGeneralInformation.academicTeachersIds : []
    )
  }

  public toJson(): any {
    return {
      id: this.id,
      name: this.name,
      studyCourse: this.studyCourse,
      code: this.code,
      faculty: this.faculty,
      studyLevel: this.studyLevel,
      studyField: this.studyField,
      semester: this.semester,
      educationProfile: this.educationProfile,
      lectureLanguage: this.lectureLanguage,
      studyType: this.studyType,
      responsibleTeacherDetails: this.responsibleUserSignature.toJson(),
      academicTeachersDetails: this.academicUserSignatures.map(academicUserSignature => academicUserSignature.toJson()),
      module: this.module,
      responsibleTeacher: this.responsibleTeacher,
      academicTeachers: this.academicTeachers,
      responsibleTeacherDetailsId: this.responsibleUserSignatureId,
      academicTeachersDetailsIds: this.academicUserSignaturesIds,
      moduleId: this.moduleId,
      responsibleTeacherId: this.responsibleTeacherId,
      academicTeachersIds: this.academicTeachersIds,
    }
  }


}
