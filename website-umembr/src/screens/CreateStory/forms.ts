import { FileUpload, MuiInputDate, MuiSelect, MuiTextField, RichText } from '@/components';
import { onlyLettersNumbersAndSpace, onlyLettersRegex, onlyNames, worldcountries } from '@/utils';
import i18next from 'i18next';

import * as Yup from 'yup';

const lifeStoryConfig = {
  story_title_image: {
    title: 'select_cover',
    fields: [
      {
        grid: 12,
        name: 'cover_image',
        component: FileUpload,
        label: 'select_cover ',
        required:'true',
        placeholder: 'click_to_upload',
        acceptedFormats: 'image/*',
        isDarkTheme: false,
        validation: Yup.string().required('field_required'),
      },
      {
        grid: 12,
        name: 'title',
        component: MuiTextField,
        label: 'Title ',
        required:'true',
        placeholder: 'title_your_history',
        isDarkTheme: false,
        validation: Yup.string()
          .required('field_required')
          .max(40, i18next.t('max_invalid', { number: 40 })),
      },
      {
        grid: 12,
        name: 'description',
        component: MuiTextField,
        label: 'description',
        placeholder: 'describe_story',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .max(255, i18next.t('max_invalid', { number: 255 })),
      },
    ],
  },
  name_of_deceased: {
    title: 'name_of_deceased_minus',
    fields: [
      {
        grid: 6,
        name: 'name',
        component: MuiTextField,
        label: 'name',
        placeholder: 'enter_first_name',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(1, i18next.t('min_invalid', { number: 1 }))
          .max(40, i18next.t('max_invalid', { number: 40 }))
          .matches(onlyNames, 'only_letters'),
      },
      {
        grid: 6,
        name: 'middle_name',
        component: MuiTextField,
        label: 'middle_name',
        placeholder: 'enter_middle_name',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(1, i18next.t('min_invalid', { number: 1 }))
          .max(40, i18next.t('max_invalid', { number: 40 }))
          .matches(onlyNames, 'only_letters'),
      },
      {
        grid: 6,
        name: 'lastname',
        component: MuiTextField,
        label: 'lastname',
        placeholder: 'enter_last_name',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(1, i18next.t('min_invalid', { number: 1 }))
          .max(40, i18next.t('max_invalid', { number: 40 }))
          .matches(onlyNames, 'only_letters'),
      },
      {
        grid: 6,
        name: 'suffix',
        component: MuiTextField,
        label: 'suffix',
        placeholder: 'enter_suffix',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(1, i18next.t('min_invalid', { number: 1 }))
          .max(40, i18next.t('max_invalid', { number: 40 }))
          .matches(onlyNames, 'only_letters'),
      },
      {
        grid: 12,
        name: 'maiden_name',
        component: MuiTextField,
        label: 'maiden',
        placeholder: 'enter_maiden_name',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(1, i18next.t('min_invalid', { number: 1 }))
          .max(40, i18next.t('max_invalid', { number: 40 }))
          .matches(onlyNames, i18next.t('only_letters')),
      },
    ],
  },
  birth_information: {
    title: 'birth_information_minus',
    fields: [
      {
        grid: 6,
        name: 'city',
        component: MuiTextField,
        label: 'city',
        placeholder: 'enter_the_city',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(2, i18next.t('min_invalid', { number: 2 }))
          .max(80, i18next.t('max_invalid', { number: 80 }))
          .matches(onlyLettersRegex, 'only_letters'),
      },
      {
        grid: 6,
        name: 'country',
        component: MuiSelect,
        label: 'country',
        placeholder: 'select_country',
        isDarkTheme: false,
        validation: Yup.string().notRequired(),
        options: worldcountries,
        value: 'United States',
      },
      {
        grid: 6,
        name: 'state_province',
        component: MuiTextField,
        label: 'state_province',
        placeholder: 'enter_the_state',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(2, i18next.t('min_invalid', { number: 2 }))
          .max(80, i18next.t('max_invalid', { number: 80 }))
      },
      {
        grid: 6,
        name: 'birth_date',
        component: MuiInputDate,
        label: 'birth_date',
        placeholder: 'enter_the_birth_date',
        isDarkTheme: false,
        validation: Yup.string().notRequired(),
      },
    ],
  },
  death_information: {
    title: 'death_information_minus',
    fields: [
      {
        grid: 6,
        name: 'address',
        component: MuiTextField,
        label: 'address',
        placeholder: 'enter_the_address',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(1, i18next.t('min_invalid', { number: 1 }))
          .max(80, i18next.t('max_invalid', { number: 80 }))
          .matches(onlyLettersNumbersAndSpace, 'only_letters_numbers_spaces'),
      },
      {
        grid: 6,
        name: 'country',
        component: MuiSelect,
        label: 'country',
        placeholder: 'select_country',
        isDarkTheme: false,
        validation: Yup.string().notRequired(),
        options: worldcountries,
        value: 'United States',
      },

      {
        grid: 6,
        name: 'province',
        component: MuiTextField,
        label: 'province',
        placeholder: 'enter_the_province',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(1, i18next.t('min_invalid', { number: 1 }))
          .max(80, i18next.t('max_invalid', { number: 80 }))
      },
      {
        grid: 6,
        name: 'state_province',
        component: MuiTextField,
        label: 'state_province',
        placeholder: 'enter_the_state',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(2, i18next.t('min_invalid', { number: 2 }))
          .max(80, i18next.t('max_invalid', { number: 80 }))
      },
      {
        grid: 6,
        name: 'death_date',
        component: MuiInputDate,
        label: 'death_date',
        placeholder: 'enter_death_date',
        isDarkTheme: false,
        validation: Yup.string().notRequired(),
      },
    ],
  },
  known_social_media: {
    title: 'known_social_media_minus',
    fields: [
      {
        grid: 6,
        name: 'facebook',
        component: MuiTextField,
        label: 'facebook',
        placeholder: 'enter_link',
        isDarkTheme: false,
        validation: Yup.string().notRequired(),
      },
      {
        grid: 6,
        name: 'link',
        component: MuiTextField,
        label: 'link',
        placeholder: 'enter_link',
        isDarkTheme: false,
        validation: Yup.string().notRequired(),
      },
      {
        grid: 6,
        name: 'instagram',
        component: MuiTextField,
        label: 'instagram',
        placeholder: 'enter_link',
        isDarkTheme: false,
        validation: Yup.string().notRequired(),
      },
      {
        grid: 6,
        name: 'linkeind',
        component: MuiTextField,
        label: 'linkeind',
        placeholder: 'enter_link',
        isDarkTheme: false,
        validation: Yup.string().notRequired(),
      },
    ],
  },
  general_notes_section: {
    title: 'general_notes_section_minus',
    fields: [
      {
        grid: 12,
        name: 'general_notes',
        component: RichText,
        label: 'rich_text_description',
        placeholder: 'type_something',
        isDarkTheme: false,
        validation: Yup.array().notRequired(),
      },
    ],
  },
  funeral_details: {
    title: 'funeral_details_minus',
    fields: [
      {
        grid: 6,
        name: 'link_funeral',
        component: MuiTextField,
        label: 'link_funeral',
        placeholder: 'link_to_funeral',
        isDarkTheme: false,
        validation: Yup.string().notRequired(),
      },
      {
        grid: 6,
        name: 'street',
        component: MuiTextField,
        label: 'street',
        placeholder: 'enter_the_street',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(2, i18next.t('min_invalid', { number: 2 }))
          .max(80, i18next.t('max_invalid', { number: 80 }))
          .matches(onlyLettersNumbersAndSpace, 'only_letters_numbers_spaces'),
      },
      {
        grid: 6,
        name: 'city',
        component: MuiTextField,
        label: 'city',
        placeholder: 'enter_the_city',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(2, i18next.t('min_invalid', { number: 2 }))
          .max(80, i18next.t('max_invalid', { number: 80 }))
          .matches(onlyLettersRegex, 'only_letters_numbers_spaces'),
      },
      {
        grid: 6,
        name: 'state_province',
        component: MuiTextField,
        label: 'state_province',
        placeholder: 'enter_the_state',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(2, i18next.t('min_invalid', { number: 2 }))
          .max(80, i18next.t('max_invalid', { number: 80 }))
      },
      {
        grid: 6,
        name: 'province',
        component: MuiTextField,
        label: 'province',
        placeholder: 'enter_the_province',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(2, i18next.t('min_invalid', { number: 2 }))
          .max(80, i18next.t('max_invalid', { number: 80 }))
          .matches(onlyLettersRegex, 'only_letters'),
      },
      {
        grid: 6,
        name: 'zip_code',
        component: MuiTextField,
        label: 'zip_code',
        placeholder: 'enter_the_zip_code',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .min(5, i18next.t('min_invalid', { number: 5 }))
          .max(10, i18next.t('max_invalid', { number: 10 }))
          .matches(onlyLettersNumbersAndSpace, 'only_letters_numbers_spaces'),
      },
    ],
  },
  schools_attended: [
    {
      title: 'schools_attended_minus',
      subtitle: 'elementary',
      fields: [
        {
          grid: 6,
          name: 'name_of_school',
          component: MuiTextField,
          label: 'name_of_school',
          placeholder: 'enter_name_of_school',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'start_date',
          component: MuiInputDate,
          label: 'start_date',
          placeholder: 'enter_start_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'end_date',
          component: MuiInputDate,
          label: 'end_date',
          placeholder: 'enter_end_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
    {
      subtitle: 'middle',
      fields: [
        {
          grid: 6,
          name: 'name_of_school',
          component: MuiTextField,
          label: 'name_of_school',
          placeholder: 'enter_name_of_school',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'start_date',
          component: MuiInputDate,
          label: 'start_date',
          placeholder: 'enter_start_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'end_date',
          component: MuiInputDate,
          label: 'end_date',
          placeholder: 'enter_end_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
    {
      subtitle: 'high',
      fields: [
        {
          grid: 6,
          name: 'name_of_school',
          component: MuiTextField,
          label: 'name_of_school',
          placeholder: 'enter_name_of_school',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'start_date',
          component: MuiInputDate,
          label: 'start_date',
          placeholder: 'enter_start_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'end_date',
          component: MuiInputDate,
          label: 'end_date',
          placeholder: 'enter_end_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
    {
      subtitle: 'college',
      fields: [
        {
          grid: 6,
          name: 'name_of_school',
          component: MuiTextField,
          label: 'name_of_school',
          placeholder: 'enter_name_of_school',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'start_date',
          component: MuiInputDate,
          label: 'start_date',
          placeholder: 'enter_start_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'end_date',
          component: MuiInputDate,
          label: 'end_date',
          placeholder: 'enter_end_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
    {
      subtitle: 'graduate',
      fields: [
        {
          grid: 6,
          name: 'name_of_school',
          component: MuiTextField,
          label: 'name_of_school',
          placeholder: 'enter_name_of_school',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'start_date',
          component: MuiInputDate,
          label: 'start_date',
          placeholder: 'enter_start_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'end_date',
          component: MuiInputDate,
          label: 'end_date',
          placeholder: 'enter_end_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
    {
      subtitle: 'other',
      fields: [
        {
          grid: 6,
          name: 'name_of_school',
          component: MuiTextField,
          label: 'name_of_school',
          placeholder: 'enter_name_of_school',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'start_date',
          component: MuiInputDate,
          label: 'start_date',
          placeholder: 'enter_start_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'end_date',
          component: MuiInputDate,
          label: 'end_date',
          placeholder: 'enter_end_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
  ],
  military_service: [
    {
      subtitle: 'military_service_minus',
      fields: [
        {
          grid: 6,
          name: 'based_lives',
          component: MuiTextField,
          label: 'based_lives',
          placeholder: 'enter_base_name',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'start_date',
          component: MuiInputDate,
          label: 'start_date',
          placeholder: 'enter_start_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'end_date',
          component: MuiInputDate,
          label: 'end_date',
          placeholder: 'enter_end_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 6,
          name: 'final_rank',
          component: MuiTextField,
          label: 'final_rank',
          placeholder: 'enter_final_rank',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 6,
          name: 'branch_of_service',
          component: MuiTextField,
          label: 'branch_of_service',
          placeholder: 'type_service',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
  ],
  marriage: [
    {
      subtitle: 'marriage_minus',
      fields: [
        {
          grid: 6,
          name: 'name',
          component: MuiTextField,
          label: 'name',
          placeholder: 'enter_first_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'second_name',
          component: MuiTextField,
          label: 'middle_name',
          placeholder: 'enter_middle_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'lastname',
          component: MuiTextField,
          label: 'lastname',
          placeholder: 'enter_last_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'suffix',
          component: MuiTextField,
          label: 'suffix',
          placeholder: 'enter_suffix',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'maiden_name',
          component: MuiTextField,
          label: 'maiden',
          placeholder: 'enter_maiden_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 3,
          name: 'date_of_marriage',
          component: MuiInputDate,
          label: 'date_of_marriage',
          placeholder: 'select_marriage_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'date_of_divorce',
          component: MuiInputDate,
          label: 'date_of_divorce',
          placeholder: 'select_divorce_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
  ],
  family_members: [
    {
      subtitle: 'parents',
      fields: [
        {
          grid: 6,
          name: 'name',
          component: MuiTextField,
          label: 'name',
          placeholder: 'enter_first_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'second_name',
          component: MuiTextField,
          label: 'middle_name',
          placeholder: 'enter_middle_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'lastname',
          component: MuiTextField,
          label: 'lastname',
          placeholder: 'enter_last_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'suffix',
          component: MuiTextField,
          label: 'suffix',
          placeholder: 'enter_suffix',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'maiden_name',
          component: MuiTextField,
          label: 'maiden',
          placeholder: 'enter_maiden_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'type_relationship',
          component: MuiTextField,
          label: 'type_relationship',
          placeholder: 'type_relationship',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
    {
      subtitle: 'children',
      fields: [
        {
          grid: 6,
          name: 'name',
          component: MuiTextField,
          label: 'name',
          placeholder: 'enter_first_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'second_name',
          component: MuiTextField,
          label: 'middle_name',
          placeholder: 'enter_middle_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'lastname',
          component: MuiTextField,
          label: 'lastname',
          placeholder: 'enter_last_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'suffix',
          component: MuiTextField,
          label: 'suffix',
          placeholder: 'enter_suffix',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'maiden_name',
          component: MuiTextField,
          label: 'maiden',
          placeholder: 'enter_maiden_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'type_relationship',
          component: MuiTextField,
          label: 'type_relationship',
          placeholder: 'type_relationship',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
    {
      subtitle: 'siblings',
      fields: [
        {
          grid: 6,
          name: 'name',
          component: MuiTextField,
          label: 'name',
          placeholder: 'enter_first_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'second_name',
          component: MuiTextField,
          label: 'middle_name',
          placeholder: 'enter_middle_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'lastname',
          component: MuiTextField,
          label: 'lastname',
          placeholder: 'enter_last_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'suffix',
          component: MuiTextField,
          label: 'suffix',
          placeholder: 'enter_suffix',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'maiden_name',
          component: MuiTextField,
          label: 'maiden',
          placeholder: 'enter_maiden_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'type_relationship',
          component: MuiTextField,
          label: 'type_relationship',
          placeholder: 'type_relationship',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
    {
      subtitle: 'grand_children',
      fields: [
        {
          grid: 6,
          name: 'name',
          component: MuiTextField,
          label: 'name',
          placeholder: 'enter_first_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'second_name',
          component: MuiTextField,
          label: 'middle_name',
          placeholder: 'enter_middle_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'lastname',
          component: MuiTextField,
          label: 'lastname',
          placeholder: 'enter_last_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'suffix',
          component: MuiTextField,
          label: 'suffix',
          placeholder: 'enter_suffix',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'maiden_name',
          component: MuiTextField,
          label: 'maiden',
          placeholder: 'enter_maiden_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'type_relationship',
          component: MuiTextField,
          label: 'type_relationship',
          placeholder: 'type_relationship',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
  ],
  donate: [
    {
      subtitle: 'link_oportunity',
      fields: [
        {
          grid: 12,
          name: 'link',
          component: MuiTextField,
          type: 'string',
          label: 'link',
          placeholder: 'enter_link',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
  ],
};

const classmatesConfig = {
  story_title_image: {
    title: 'select_cover',
    fields: [
      {
        grid: 12,
        name: 'cover_image',
        component: FileUpload,
        label: 'select_cover',
        placeholder: 'click_to_upload',
        required : 'true',
        acceptedFormats: 'image/*',
        isDarkTheme: false,
        validation: Yup.string().required('field_required'),
      },
      {
        grid: 12,
        name: 'title',
        component: MuiTextField,
        label: 'Title ',
        required:'true',
        placeholder: 'title_your_history',
        isDarkTheme: false,
        validation: Yup.string()
          .required('field_required')
          .max(40, i18next.t('max_invalid', { number: 40 })),
      },
      {
        grid: 12,
        name: 'description',
        component: MuiTextField,
        label: 'description',
        placeholder: 'describe_story',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .max(255, i18next.t('max_invalid', { number: 255 })),
      },
    ],
  },
  class_information: [
    {
      subtitle: 'name_of_class',
      fields: [
        {
          grid: 6,
          name: 'name_of_class',
          component: MuiTextField,
          label: 'name_of_class',
          placeholder: 'enter_classname',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'start_date',
          component: MuiInputDate,
          label: 'start_date',
          placeholder: 'enter_start_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'end_date',
          component: MuiInputDate,
          label: 'end_date',
          placeholder: 'enter_end_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
    {
      title: 'associated_school',
      fields: [
        {
          grid: 12,
          name: 'name_of_school',
          component: MuiTextField,
          label: 'name_of_school',
          placeholder: 'enter_name_of_school',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 6,
          name: 'street',
          component: MuiTextField,
          label: 'street',
          placeholder: 'enter_the_street',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(2, i18next.t('min_invalid', { number: 2 }))
            .max(80, i18next.t('max_invalid', { number: 80 }))
            .matches(onlyLettersNumbersAndSpace, 'only_letters_numbers_spaces'),
        },
        {
          grid: 6,
          name: 'city',
          component: MuiTextField,
          label: 'city',
          placeholder: 'enter_the_city',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(2, i18next.t('min_invalid', { number: 2 }))
            .max(80, i18next.t('max_invalid', { number: 80 }))
            .matches(onlyLettersRegex, 'only_letters'),
        },
        {
          grid: 6,
          name: 'state_province',
          component: MuiTextField,
          label: 'state_province',
          placeholder: 'enter_the_state',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(2, i18next.t('min_invalid', { number: 2 }))
            .max(80, i18next.t('max_invalid', { number: 80 }))
        },
        {
          grid: 6,
          name: 'province',
          component: MuiTextField,
          label: 'province',
          placeholder: 'enter_the_province',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(80, i18next.t('max_invalid', { number: 80 }))
            .matches(onlyLettersRegex, 'only_letters'),
        },
        {
          grid: 6,
          name: 'zip_code',
          component: MuiTextField,
          label: 'zip_code',
          placeholder: 'enter_the_zip_code',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(5, i18next.t('min_invalid', { number: 5 }))
            .max(10, i18next.t('max_invalid', { number: 10 }))
            .matches(onlyLettersNumbersAndSpace, 'only_letters_numbers_spaces'),
        },
      ],
    },
  ],
  class_purpose: [
    {
      subtitle: 'purpose_of_class',
      fields: [
        {
          grid: 6,
          name: 'name_of_class',
          component: MuiTextField,
          label: 'name_of_class',
          placeholder: 'enter_description',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 6,
          name: 'description_of_event',
          component: MuiTextField,
          label: 'description_of_event',
          placeholder: 'enter_description',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },

    {
      title: 'general_notes_section',
      fields: [
        {
          grid: 12,
          name: 'general_information',
          component: RichText,
          label: 'write_general_information',
          placeholder: 'type_something',
          isDarkTheme: false,
          validation: Yup.array().notRequired(),
        },
      ],
    },
  ],
  class_involved: [
    {
      subtitle: 'classmates_involved',
      fields: [
        {
          grid: 6,
          name: 'name',
          component: MuiTextField,
          label: 'name',
          placeholder: 'enter_first_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'second_name',
          component: MuiTextField,
          label: 'middle_name',
          placeholder: 'enter_middle_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'lastname',
          component: MuiTextField,
          label: 'lastname',
          placeholder: 'enter_last_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'suffix',
          component: MuiTextField,
          label: 'suffix',
          placeholder: 'enter_suffix',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 12,
          name: 'maiden_name',
          component: MuiTextField,
          label: 'maiden',
          placeholder: 'enter_maiden_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
      ],
      type: 'array',
    },
  ],
};

const teammatesConfig = {
  story_title_image: {
    title: 'select_cover',
    fields: [
      {
        grid: 12,
        name: 'cover_image',
        component: FileUpload,
        label: 'select_cover',
        placeholder: 'click_to_upload',
        acceptedFormats: 'image/*',
        isDarkTheme: false,
        validation: Yup.string().required('field_required'),
      },
      {
        grid: 12,
        name: 'title',
        component: MuiTextField,
        label: 'Title',
        required:'true',
        placeholder: 'title_your_history',
        isDarkTheme: false,
        validation: Yup.string()
          .required('field_required')
          .max(40, i18next.t('max_invalid', { number: 40 })),
      },
      {
        grid: 12,
        name: 'description',
        component: MuiTextField,
        label: 'description',
        placeholder: 'describe_story',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .max(255, i18next.t('max_invalid', { number: 255 })),
      },
    ],
  },
  teammates_memory: [
    {
      subtitle: 'team_information',
      fields: [
        {
          grid: 6,
          name: 'team_name',
          component: MuiTextField,
          label: 'team_name',
          placeholder: 'enter_team_name',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'start_date',
          component: MuiInputDate,
          label: 'start_date',
          placeholder: 'enter_start_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'end_date',
          component: MuiInputDate,
          label: 'end_date',
          placeholder: 'enter_end_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
    {
      title: 'sport',
      fields: [
        {
          grid: 6,
          name: 'name_of_team',
          component: MuiTextField,
          label: 'name_of_team',
          placeholder: 'enter_name_of_team',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 6,
          name: 'country',
          component: MuiSelect,
          label: 'country',
          placeholder: 'select_country',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
          options: worldcountries,
          value: 'United States',
        },
        {
          grid: 6,
          name: 'state_province',
          component: MuiTextField,
          label: 'state_province',
          placeholder: 'enter_the_state',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(2, i18next.t('min_invalid', { number: 2 }))
            .max(80, i18next.t('max_invalid', { number: 80 }))
        },
      ],
    },
  ],
  teammates_names: [
    {
      subtitle: 'teammates',
      fields: [
        {
          grid: 6,
          name: 'name',
          component: MuiTextField,
          label: 'name',
          placeholder: 'enter_first_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'second_name',
          component: MuiTextField,
          label: 'middle_name',
          placeholder: 'enter_middle_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'lastname',
          component: MuiTextField,
          label: 'lastname',
          placeholder: 'enter_last_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 6,
          name: 'suffix',
          component: MuiTextField,
          label: 'suffix',
          placeholder: 'enter_suffix',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
        {
          grid: 12,
          name: 'maiden_name',
          component: MuiTextField,
          label: 'maiden',
          placeholder: 'enter_maiden_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
      ],
      type: 'array',
    },
  ],
  general_notes: [
    {
      title: 'general_notes_minus',
      fields: [
        {
          grid: 12,
          name: 'general_notes',
          component: RichText,
          label: '',
          placeholder: 'type_something',
          isDarkTheme: false,
          validation: Yup.array().notRequired(),
        },
      ],
    },
  ],
};

const noneOfCategoryConfig = {
  story_title_image: {
    title: 'select_cover',
    fields: [
      {
        grid: 12,
        name: 'cover_image',
        component: FileUpload,
        label: 'select_cover ',
        required:'true',
        placeholder: 'click_to_upload',
        acceptedFormats: 'image/*',
        isDarkTheme: false,
        validation: Yup.string().required('field_required'),
      },
      {
        grid: 12,
        name: 'title',
        component: MuiTextField,
        label: 'Title',
        required:'true',
        placeholder: 'title_your_history',
        isDarkTheme: false,
        validation: Yup.string()
          .required('field_required')
          .max(40, i18next.t('max_invalid', { number: 40 })),
      },
      {
        grid: 12,
        name: 'description',
        component: MuiTextField,
        label: 'description',
        placeholder: 'describe_story',
        isDarkTheme: false,
        validation: Yup.string()
          .notRequired()
          .max(255, i18next.t('max_invalid', { number: 255 })),
      },
    ],
  },
  name_of_event: [
    {
      subtitle: 'name_of_event_minus',
      fields: [
        {
          grid: 6,
          name: 'name_of_event_minus',
          component: MuiTextField,
          label: 'name_of_event_minus',
          placeholder: 'enter_team_name',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'start_date',
          component: MuiInputDate,
          label: 'start_date',
          placeholder: 'enter_start_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
        {
          grid: 3,
          name: 'end_date',
          component: MuiInputDate,
          label: 'end_date',
          placeholder: 'enter_end_date',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
        },
      ],
      type: 'array',
    },
  ],
  location_event: [
    {
      subtitle: 'location_event_minus',
      fields: [
        {
          grid: 6,
          name: 'venue_name',
          component: MuiTextField,
          label: 'venue_name',
          placeholder: 'enter_venue_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(128, i18next.t('max_invalid', { number: 128 }))
        },
        
        {
          grid: 6,
          name: 'country',
          component: MuiSelect,
          label: 'country',
          placeholder: 'select_country',
          isDarkTheme: false,
          validation: Yup.string().notRequired(),
          options: worldcountries,
          value: 'United States',
          defaultValue: 'United States',
        },
        {
          grid: 6,
          name: 'state_province',
          component: MuiTextField,
          label: 'state_province',
          placeholder: 'enter_the_state',
          isDarkTheme: false,
          validation: Yup.string().notRequired().min(2).max(80),
        },
      ],
      type: 'array',
    },
  ],
  people_involved: [
    {
      subtitle: 'people_involved_minus',
      fields: [
        {
          grid: 12,
          name: 'full_name',
          component: MuiTextField,
          label: 'full_name',
          placeholder: 'enter_full_name',
          isDarkTheme: false,
          validation: Yup.string()
            .notRequired()
            .min(1, i18next.t('min_invalid', { number: 1 }))
            .max(40, i18next.t('max_invalid', { number: 40 }))
            .matches(onlyNames, 'only_letters'),
        },
      ],
      type: 'array',
    },
  ],
  general_notes: [
    {
      title: 'general_notes_minus',
      fields: [
        {
          grid: 12,
          name: 'general_notes',
          component: RichText,
          label: '',
          placeholder: 'type_something',
          isDarkTheme: false,
          validation: Yup.array().notRequired(),
        },
      ],
    },
  ],
};
const formsByCategory: any = {
  life_story: lifeStoryConfig,
  classmates_story: classmatesConfig,
  teammates_story: teammatesConfig,
  none_of_this_story: noneOfCategoryConfig,
};

export { formsByCategory };
