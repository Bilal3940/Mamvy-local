const lifeStoryCategories = [
  {
    name: 'story_title_image',
    label: 'story_title_image',
    value: 0,
  },

  {
    name: 'name_of_deceased',
    label: 'name_mayus',
    value: 1,
  },
  {
    name: 'birth_information',
    label: 'birth_information',
    value: 2,
  },
  {
    name: 'death_information',
    label: 'death_information',
    value: 3,
  },

  {
    name: 'known_social_media',
    label: 'known_social_media',
    value: 4,
  },
  {
    name: 'general_notes_section',
    label: 'general_notes_section',
    value: 5,
  },
  {
    name: 'funeral_details',
    label: 'funeral_details',
    value: 6,
  },
  {
    name: 'schools_attended',
    label: 'schools_attended',
    value: 7,
  },
  {
    name: 'military_service',
    label: 'military_service',
    value: 8,
  },
  {
    name: 'marriage',
    label: 'marriage',
    value: 9,
  },

  {
    name: 'family_members',
    label: 'family_members',
    value: 10,
  },
  {
    name: 'donate',
    label: 'donate',
    value: 11,
  },
];

const classmatesCategories = [
  {
    name: 'story_title_image',
    label: 'story_title_image',
  },
  {
    name: 'class_information',
    label: 'class_information',
  },
  {
    name: 'class_purpose',
    label: 'class_purpose',
  },
  {
    name: 'class_involved',
    label: 'class_involved',
  },
];

const teammatesCategories = [
  {
    name: 'story_title_image',
    label: 'story_title_image',
  },
  {
    name: 'teammates_memory',
    label: 'teammates_memory',
  },
  {
    name: 'teammates_names',
    label: 'teammates_names',
  },
  {
    name: 'general_notes',
    label: 'general_notes',
  },
];

const noneCategories = [
  {
    name: 'story_title_image',
    label: 'story_title_image',
  },
  {
    name: 'name_of_event',
    label: 'name_of_event',
  },
  {
    name: 'location_event',
    label: 'location_event',
  },
  {
    name: 'people_involved',
    label: 'people_involved',
  },
  {
    name: 'general_notes',
    label: 'general_notes',
  },
];

const customEvent = [
  {
    name: 'story_title_image',
    label: 'story_title_image',
  },
  {
    name: 'name_of_event',
    label: 'name_of_event',
  },
  {
    name: 'location_event',
    label: 'location_event',
  },
  {
    name: 'people_involved',
    label: 'people_involved',
  },
  {
    name: 'general_notes',
    label: 'general_notes',
  },
];

const formCategories: any = {
  life_story: lifeStoryCategories,
  classmates_story: classmatesCategories,
  teammates_story: teammatesCategories,
  none_of_this_story: noneCategories,
  custom_event: customEvent,
};

export { formCategories };
