const storyPrompts = [
  {
    text: 'life_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_life', value: '' },
      { checked: true, placeholder: 'share_a_memory_person', value: '' },
      { checked: true, placeholder: 'share_a_memory_working', value: '' },
      { checked: true, placeholder: 'share_a_memory_other', value: '' },
    ],
  },
  {
    text: 'classmates_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_fun', value: '' },
      { checked: true, placeholder: 'share_a_memory_challenge', value: '' },
      { checked: true, placeholder: 'share_a_memory_group', value: '' },
      { checked: true, placeholder: 'share_a_memory_other2', value: '' },
    ],
  },
  {
    text: 'teammates_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_team', value: '' },
      { checked: true, placeholder: 'share_a_memory_win', value: '' },
      { checked: true, placeholder: 'share_a_memory_team2', value: '' },
      { checked: true, placeholder: 'share_a_memory_fan', value: '' },
    ],
  },
  {
    text: 'none_of_this_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_other3', value: '' },
      { checked: true, placeholder: 'share_a_memory_fun2', value: '' },
      { checked: true, placeholder: 'share_a_memory_challenge2', value: '' },
      { checked: true, placeholder: 'share_a_memory_other4', value: '' },
    ],
  },
];


export const transformPayload = (
  values: any,
  typeOfStory: string,
  user_id: string,
  email: string,
  imageName: string,
  imageType: string,
  status?: string
) => {
  if (typeOfStory === 'life_story') {
    const {
      birth_information,
      death_information,
      donate,
      family_members,
      funeral_details,
      general_notes_section,
      known_social_media,
      marriage,
      military_service,
      name_of_deceased,
      schools_attended,
      story_title_image,
    } = values;
    const transformedPayload = {
      user_id,
      title: story_title_image.title,
      description: story_title_image.description,
      isPrivate: false,
      password: ' ',
      cover_image: `stories/${story_title_image?.title}/${imageName?.replace(/\.[^.]+$/, '.webp')}`,
      name_image: imageName?.replace(/\.[^.]+$/, '.webp'),
      type_image: imageType,
      story_details: {
        type_of_story: typeOfStory,
        general_info: {
          name_of_deceased: name_of_deceased,
          birth_information: birth_information,
          death_information: death_information,
          known_social_media: known_social_media,
          general_notes_section: general_notes_section,
          funeral_details: funeral_details,
          schools_attended: schools_attended,
          military_service: military_service,
          marriage: marriage,
          family_members: family_members,
          donate: donate,
        },
      },
      status: status || 'draft',
    };

    return transformedPayload;
  }
  if (typeOfStory === 'classmates_story') {
    const { story_title_image, class_information, class_purpose, class_involved } = values;

    const transformedPayload = {
      user_id,
      title: story_title_image.title,
      description: story_title_image.description,
      isPrivate: false,
      password: ' ',
      cover_image: `stories/${story_title_image?.title}/${imageName?.replace(/\.[^.]+$/, '.webp')}`,
      name_image: imageName?.replace(/\.[^.]+$/, '.webp'),
      type_image: imageType,
      story_details: {
        type_of_story: typeOfStory,
        general_info: {
          class_information: class_information,
          class_purpose: class_purpose,
          class_involved: class_involved,
        },
      },
      status: status || 'draft',
    };

    return transformedPayload;
  }
  if (typeOfStory === 'teammates_story') {
    const { story_title_image, teammates_memory, teammates_names, general_notes } = values;

    const transformedPayload = {
      user_id,
      title: story_title_image.title,
      description: story_title_image.description,
      isPrivate: false,
      password: ' ',
      cover_image: `stories/${story_title_image?.title}/${imageName?.replace(/\.[^.]+$/, '.webp')}`,
      name_image: imageName?.replace(/\.[^.]+$/, '.webp'),
      type_image: imageType,
      story_details: {
        type_of_story: typeOfStory,
        general_info: {
          teammates_memory: teammates_memory,
          teammates_names: teammates_names,
          general_notes: general_notes?.general_notes?.general_notes || general_notes?.general_notes || general_notes,
        },
      },
      status: status || 'draft',
    };

    return transformedPayload;
  }
  if (typeOfStory === 'none_of_this_story') {
    const { story_title_image, name_of_event, location_event, people_involved, general_notes, fileSize } = values;

    const transformedPayload = {
      user_id,
      title: story_title_image.title,
      description: story_title_image.description,
      isPrivate: false,
      password: ' ',
      cover_image: `stories/${story_title_image?.title}/${imageName?.replace(/\.[^.]+$/, '.webp')}`,
      fileSize:fileSize,
      name_image: imageName?.replace(/\.[^.]+$/, '.webp'),
      type_image: imageType,
      story_details: {
        type_of_story: typeOfStory,
        general_info: {
          name_of_event: name_of_event,
          location_event: location_event,
          people_involved: people_involved,
          general_notes: general_notes?.general_notes?.general_notes || general_notes?.general_notes || general_notes,
        },
      },
      status: status || 'draft',
    };

    return transformedPayload;
  }
};

export const finalPayload = (prev_stories: any, prompts: any = {}, typeOfStory: string) => {
  const { user_id, title, fileSize, description, isPrivate, password, cover_image, story_details, status } = prev_stories;

  const type = story_details?.type_of_story;
  const promptsBase = storyPrompts.find((item: any) => item.text === type)?.prompts;
  const organizePrompts = promptsBase?.reduce((acc: any, item: any) => {
    const keys = Object.keys(prompts);
    if (keys.includes(item?.placeholder) && prompts[item?.placeholder]) {
      acc[item?.placeholder] = prompts[item?.placeholder];
    }

    return acc;
  }, {})

  const transformedPayload = {
    user_id,
    title,
    fileSize:fileSize,
    description: description,
    isPrivate: isPrivate,
    password: password,
    cover_image: cover_image,
    story_details: {
      ...story_details,
      prompts: organizePrompts,
    },
    status: status,
  };

  return transformedPayload;
};
