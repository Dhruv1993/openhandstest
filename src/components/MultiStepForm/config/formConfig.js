// Form visibility configuration based on user privileges
export const PRIVILEGE_LEVELS = {
  BASIC: 'BASIC',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

export const formConfig = {
  personalInfo: {
    step: 1,
    title: 'Personal Information',
    forms: {
      basicInfo: {
        id: 'basicInfo',
        title: 'Basic Information',
        requiredPrivilege: PRIVILEGE_LEVELS.BASIC,
      },
      contactInfo: {
        id: 'contactInfo',
        title: 'Contact Information',
        requiredPrivilege: PRIVILEGE_LEVELS.BASIC,
      },
      additionalInfo: {
        id: 'additionalInfo',
        title: 'Additional Information',
        requiredPrivilege: PRIVILEGE_LEVELS.ADMIN,
      },
    },
  },
  professionalInfo: {
    step: 2,
    title: 'Professional Information',
    forms: {
      workExperience: {
        id: 'workExperience',
        title: 'Work Experience',
        requiredPrivilege: PRIVILEGE_LEVELS.BASIC,
      },
      education: {
        id: 'education',
        title: 'Education',
        requiredPrivilege: PRIVILEGE_LEVELS.BASIC,
      },
      certifications: {
        id: 'certifications',
        title: 'Certifications',
        requiredPrivilege: PRIVILEGE_LEVELS.ADMIN,
      },
    },
  },
  preferences: {
    step: 3,
    title: 'Preferences',
    forms: {
      generalPreferences: {
        id: 'generalPreferences',
        title: 'General Preferences',
        requiredPrivilege: PRIVILEGE_LEVELS.BASIC,
      },
      advancedSettings: {
        id: 'advancedSettings',
        title: 'Advanced Settings',
        requiredPrivilege: PRIVILEGE_LEVELS.SUPER_ADMIN,
      },
    },
  },
};