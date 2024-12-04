export const containerVariants = {
  expanded: {
    width: '11rem',
  },
  collapsed: {
    width: '3rem',
  },
};

export const inputVariants = {
  expanded: {
    opacity: 1,
    width: '100%',
    display: 'block',
  },
  collapsed: {
    opacity: 0,
    width: 0,
    transitionEnd: {
      display: 'none',
    },
  },
};

export const getPropmtsOptions = (stories: any, story: any) => {
  const generalStories = [...stories?.publishedStories || [], ...stories?.collaboratorStories || [], ...stories?.draftStories || []];

  const Prompts: any = [
    {
      label: 'share_a_memory_life',
      id: '1',
    },
    {
      label: 'share_a_memory_person',
      id: '2',
    },
    {
      label: 'share_a_memory_working',
      id: '3',
    },
    {
      label: 'share_a_memory_other',
      id: '4',
    },
    { label: 'share_a_memory_fun', id: '5' },
    { label: 'share_a_memory_challenge', id: '6' },
    { label: 'share_a_memory_group', id: '7' },
    { label: 'share_a_memory_other2', id: '8' },
    { label: 'share_a_memory_team', id: '9' },
    { label: 'share_a_memory_win', id: '10' },
    { label: 'share_a_memory_team2', id: '11' },
    { label: 'share_a_memory_fan', id: '12' },
    { label: 'share_a_memory_other3', id: '13' },
    { label: 'share_a_memory_fun2', id: '14' },
    { label: 'share_a_memory_challenge2', id: '15' },
    { label: 'share_a_memory_other4', id: '16' },
      { label: 'share_a_test_prompt_1', id: '17' },
      { label: 'share_a_memory_test_prompt_2', id: '18' },
      { label: 'share_a_memory_challenge2_test_prompt_3', id: '19' },
      { label: 'share_a_memory_other4_test_prompt_4', id: '20' },
      { label: 'share_a_memory_other4_test_prompt_5', id: '21' },
      { label: 'share_a_memory_other4_test_prompt_6', id: '22' }
  ]
  const generalPrompts: any = [

  ]
  if (story?.id) {
    const prompts = story?.story_details?.prompts || {};
    for (const prompt of Object.keys(prompts)) {
      if (prompts[prompt]) {
        const selectedPrompt = Prompts.find((item: any) => item.label == prompt)
        generalPrompts.push(selectedPrompt)
      }
    }

    return generalPrompts
  }

  generalStories.forEach((story: any) => {
    const prompts = story?.story_details?.prompts || {};
    for (const prompt of Object.keys(prompts)) {
      if (prompts[prompt]) {
        const selectedPrompt = Prompts.find((item: any) => item.label == prompt)
        if (!!!generalPrompts.find((item: any) => item.label == prompt)) {
          generalPrompts.push(selectedPrompt)
        }
      }
    }
  })
  return generalPrompts
};

export const getCollaboratorsOptions = (collaborators: any[], story: any) => {
  if (story?.id) {
    const friendsStory = story?.roleUsers?.filter((roleUser: any) => roleUser?.user_type === 'friends');
    const familyStory = story?.roleUsers?.filter((roleUser: any) => roleUser?.user_type === 'family') || [];
    const fansStory = story?.roleUsers?.filter((roleUser: any) => roleUser?.user_type === 'fans') || [];
    const atheleteStory = story?.roleUsers?.filter((roleUser: any) => roleUser?.user_type === 'athelete') || [];
    const playersStory = story?.roleUsers?.filter((roleUser: any) => roleUser?.user_type === 'players') || [];

    const othersStory = story?.roleUsers?.filter((roleUser: any) => roleUser?.user_type !== 'family' && roleUser?.user_type !== 'friends'  && roleUser?.user_type !== 'players' && roleUser?.user_type !== 'fans' && roleUser?.user_type !== 'athelete'   );

    familyStory.push({ user: story?.user })
    return [
      {
        friends: friendsStory?.map((roleUser: any) => ({
          label: `${roleUser?.user?.name} ${roleUser?.user?.lastname}`,
          id: roleUser?.user?.id,
        })),
        family: familyStory?.map((roleUser: any) => ({
          label: `${roleUser?.user?.name} ${roleUser?.user?.lastname}`,
          id: roleUser?.user?.id,
        })),
        fans: fansStory?.map((roleUser: any) => ({
          label: `${roleUser?.user?.name} ${roleUser?.user?.lastname}`,
          id: roleUser?.user?.id,
        })),
        athelete: atheleteStory?.map((roleUser: any) => ({
          label: `${roleUser?.user?.name} ${roleUser?.user?.lastname}`,
          id: roleUser?.user?.id,
        })),
        players: playersStory?.map((roleUser: any) => ({
          label: `${roleUser?.user?.name} ${roleUser?.user?.lastname}`,
          id: roleUser?.user?.id,
        })),
        others: othersStory?.map((roleUser: any) => ({
          label: `${roleUser?.user?.name} ${roleUser?.user?.lastname}`,
          id: roleUser?.user?.id,
        })),
      },
    ]
  }

  const friends = collaborators?.filter((collaborator: any) => collaborator?.user_type === 'friends') || [];
  const family = collaborators?.filter((collaborator: any) => collaborator?.user_type === 'family') || [];
  const fansStory = story?.roleUsers?.filter((roleUser: any) => roleUser?.user_type === 'fans') || [];
  const atheleteStory = story?.roleUsers?.filter((roleUser: any) => roleUser?.user_type === 'athelete') || [];
  const playersStory = story?.roleUsers?.filter((roleUser: any) => roleUser?.user_type === 'players') || [];
  const others = collaborators?.filter((collaborator: any) => collaborator?.user_type !== 'family' && collaborator.user_type !== 'friends' && collaborator.user_type !== 'fans' && collaborator.user_type !== 'athelete' && collaborator.user_type !== 'players') || [];

  return [
    {
      friends: friends?.map((collaborator: any) => ({
        label: `${collaborator?.name} ${collaborator?.lastname}`,
        id: collaborator?.id,
      })),
      family: family?.map((collaborator: any) => ({
        label: `${collaborator?.name} ${collaborator?.lastname}`,
        id: collaborator?.id,
      })),
      others: others?.map((collaborator: any) => ({
        label: `${collaborator?.name} ${collaborator?.lastname}`,
        id: collaborator?.id,
      })),
      fans: fansStory?.map((roleUser: any) => ({
        label: `${roleUser?.user?.name} ${roleUser?.user?.lastname}`,
        id: roleUser?.user?.id,
      })),
      athelete: atheleteStory?.map((roleUser: any) => ({
        label: `${roleUser?.user?.name} ${roleUser?.user?.lastname}`,
        id: roleUser?.user?.id,
      })),
      players: playersStory?.map((roleUser: any) => ({
        label: `${roleUser?.user?.name} ${roleUser?.user?.lastname}`,
        id: roleUser?.user?.id,
      })),
    },
  ]
};

export const getTabsFilters = (setShowSection: any) => [
  {
    label: 'prompts',
    action: () => setShowSection(0),
  },
  {
    label: 'collaborators_mayus',
    action: () => setShowSection(1),
  },
  {
    label: 'types',
    action: () => setShowSection(2),
  },
];
