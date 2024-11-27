import { END } from 'redux-saga';
import { delay, put } from 'redux-saga/effects';

export type SagaCallback<DataType = void, ReturnType = unknown> = (args: {
  ok: boolean;
  message?: string;
  data?: DataType;
}) => ReturnType;
export type ExtractCallbackType<T extends (...args: any) => any> = ReturnType<T> extends {
  callback?: SagaCallback<infer R>;
}
  ? R
  : unknown;

const statusManagement = (inputStatus: any = 'inherit') => {
  if (inputStatus == 'inherit') return false;
  if (inputStatus == 'error') return true;
};

// Some overloads to help with typings on reducers & action definitions
export function actionObject<ActionType>(
  type: ActionType,
  payload?: never,
  callback?: never,
  optional?: never,
): { type: typeof type; payload: typeof payload; callback: typeof callback; optional: typeof optional };
export function actionObject<ActionType, PayloadType>(
  type: ActionType,
  payload: PayloadType,
  callback?: never,
  optional?: never,
): { type: typeof type; payload: typeof payload; callback: typeof callback; optional: typeof optional };
export function actionObject<ActionType, PayloadType, CallbackType extends ({ ok, message, value, data }: any) => void>(
  type: ActionType,
  payload: PayloadType,
  callback?: CallbackType,
  optional?: never,
): { type: typeof type; payload: typeof payload; callback: typeof callback; optional: typeof optional };
export function actionObject<
  ActionType,
  PayloadType,
  CallbackType extends ({ ok, message, value, data }: any) => void,
  OptionalType,
>(
  type: ActionType,
  payload: PayloadType,
  callback?: CallbackType,
  optional?: OptionalType,
): { type: typeof type; payload: typeof payload; callback: typeof callback; optional: typeof optional };
export function actionObject(type: any, payload: any, callback: any, optional: any) {
  return { type, payload, callback, optional };
}

// export const actionObject = <T>(
//   type: string,
//   payload?: any | null,
//   callback?: ({ ok, message, value, data }: any) => void,
//   optional?: any,
// ) => ({
//   type,
//   payload,
//   callback,
//   optional,
// });

/**
 * Useful to be able to wait for a callback to execute before continuing
 */
export function promisifiedCallback<CallbackDataType = void>(
  callback?: SagaCallback<CallbackDataType>,
): {
  callback: SagaCallback<CallbackDataType>;
  promise: Promise<Parameters<SagaCallback<CallbackDataType>>[0]>;
} {
  let callbackWithContext: SagaCallback<CallbackDataType> = () => {};

  const promise = new Promise((s: (result: Parameters<SagaCallback<CallbackDataType>>[0]) => void) => {
    callbackWithContext = (params) => {
      if (callback) callback(params);
      s(params);
    };
  });
  return {
    promise,
    callback: callbackWithContext,
  };
}

export function* showDialog(message = '', type = 'success', toast = 'SHOW_TOAST') {
  yield put(
    actionObject(toast, {
      show: true,
      message,
      type,
    }),
  );

  yield delay(3000);

  yield put(
    actionObject(toast, {
      show: false,
    }),
  );
}

export const checkPermissions = (roles: any, permission: any, story_id: any = null) => {
  for (const role of roles) {
    if (role?.story_id === story_id) {
      if (/*role?.story_id === story_id && */ role?.role?.permissions?.find((p: any) => p?.name === permission))
        return true;
      return false;
    }
    // if (role?.role?.permissions?.find((p: any) => p?.name === permission)) return true;
  }
  return false;
};
// export const checkRoleAndPermission = (roles: any, roleName: string, permission: string, user_id: any) => {
//   for (const role of roles) {
//     // Check if the role matches the given role name, user_id, and contains the specified permission
//     if (
//       role?.user_id === user_id &&
//       role?.role?.name === roleName &&
//       role?.role?.permissions?.some((p: any) => p?.name === permission)
//     ) {
//       return true;
//     }
//   }
//   return false;
// };

export const checkRoleAndPermission = (roles: any | any[], roleName: string, permission: string, user_id: any) => {
  // Ensure roles is treated as an array for consistent iteration
  const rolesArray = Array.isArray(roles) ? roles : [roles];

  for (const role of rolesArray) {
    // Check if the role matches the given role name, user_id, and contains the specified permission
    if (
      role?.user_id === user_id &&
      role?.role?.name === roleName &&
      role?.role?.permissions?.some((p: any) => p?.name === permission)
    ) {
      return true;
    }
  }

  return false;
};

export const logoutWithFacebook = () => {
  return new Promise((resolve) => {
    let winType: any = window;
    winType?.FB?.logout(function (response: any) {
      resolve(response);
    });
  });
};

export const changeInputStatus = (value: string, error: any) => {
  if (value !== '') {
    if (error) return 'error';
    return 'inherit';
  }
  return 'inherit';
};

export const fileToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function convertToTitleCase(text: string) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export const findNotificationByMemoryId = (notifications: any, memoryId: number | undefined) => {
  return notifications?.find((notification: any) => notification.actions?.memory_id === memoryId);
};

const worldcountries = [
  { name: 'Afghanistan', id: 'Afghanistan' },
  { name: 'Albania', id: 'Albania' },
  { name: 'Algeria', id: 'Algeria' },
  { name: 'Andorra', id: 'Andorra' },
  { name: 'Angola', id: 'Angola' },
  { name: 'Antigua and Barbuda', id: 'Antigua and Barbuda' },
  { name: 'Argentina', id: 'Argentina' },
  { name: 'Armenia', id: 'Armenia' },
  { name: 'Australia', id: 'Australia' },
  { name: 'Austria', id: 'Austria' },
  { name: 'Azerbaijan', id: 'Azerbaijan' },
  { name: 'Bahamas', id: 'Bahamas' },
  { name: 'Bahrain', id: 'Bahrain' },
  { name: 'Bangladesh', id: 'Bangladesh' },
  { name: 'Barbados', id: 'Barbados' },
  { name: 'Belarus', id: 'Belarus' },
  { name: 'Belgium', id: 'Belgium' },
  { name: 'Belize', id: 'Belize' },
  { name: 'Benin', id: 'Benin' },
  { name: 'Bhutan', id: 'Bhutan' },
  { name: 'Bolivia', id: 'Bolivia' },
  { name: 'Bosnia and Herzegovina', id: 'Bosnia and Herzegovina' },
  { name: 'Botswana', id: 'Botswana' },
  { name: 'Brazil', id: 'Brazil' },
  { name: 'Brunei', id: 'Brunei' },
  { name: 'Bulgaria', id: 'Bulgaria' },
  { name: 'Burkina Faso', id: 'Burkina Faso' },
  { name: 'Burundi', id: 'Burundi' },
  { name: 'Cabo Verde', id: 'Cabo Verde' },
  { name: 'Cambodia', id: 'Cambodia' },
  { name: 'Cameroon', id: 'Cameroon' },
  { name: 'Canada', id: 'Canada' },
  { name: 'Central African Republic', id: 'Central African Republic' },
  { name: 'Chad', id: 'Chad' },
  { name: 'Chile', id: 'Chile' },
  { name: 'China', id: 'China' },
  { name: 'Colombia', id: 'Colombia' },
  { name: 'Comoros', id: 'Comoros' },
  { name: 'Congo, Democratic Republic of the', id: 'Congo, Democratic Republic of the' },
  { name: 'Congo, Republic of the', id: 'Congo, Republic of the' },
  { name: 'Costa Rica', id: 'Costa Rica' },
  { name: 'Croatia', id: 'Croatia' },
  { name: 'Cuba', id: 'Cuba' },
  { name: 'Cyprus', id: 'Cyprus' },
  { name: 'Czech Republic', id: 'Czech Republic' },
  { name: 'Denmark', id: 'Denmark' },
  { name: 'Djibouti', id: 'Djibouti' },
  { name: 'Dominica', id: 'Dominica' },
  { name: 'Dominican Republic', id: 'Dominican Republic' },
  { name: 'Ecuador', id: 'Ecuador' },
  { name: 'Egypt', id: 'Egypt' },
  { name: 'El Salvador', id: 'El Salvador' },
  { name: 'Equatorial Guinea', id: 'Equatorial Guinea' },
  { name: 'Eritrea', id: 'Eritrea' },
  { name: 'Estonia', id: 'Estonia' },
  { name: 'Eswatini', id: 'Eswatini' },
  { name: 'Ethiopia', id: 'Ethiopia' },
  { name: 'Fiji', id: 'Fiji' },
  { name: 'Finland', id: 'Finland' },
  { name: 'France', id: 'France' },
  { name: 'Gabon', id: 'Gabon' },
  { name: 'Gambia', id: 'Gambia' },
  { name: 'Georgia', id: 'Georgia' },
  { name: 'Germany', id: 'Germany' },
  { name: 'Ghana', id: 'Ghana' },
  { name: 'Greece', id: 'Greece' },
  { name: 'Grenada', id: 'Grenada' },
  { name: 'Guatemala', id: 'Guatemala' },
  { name: 'Guinea', id: 'Guinea' },
  { name: 'Guinea-Bissau', id: 'Guinea-Bissau' },
  { name: 'Guyana', id: 'Guyana' },
  { name: 'Haiti', id: 'Haiti' },
  { name: 'Honduras', id: 'Honduras' },
  { name: 'Hungary', id: 'Hungary' },
  { name: 'Iceland', id: 'Iceland' },
  { name: 'India', id: 'India' },
  { name: 'Indonesia', id: 'Indonesia' },
  { name: 'Iran', id: 'Iran' },
  { name: 'Iraq', id: 'Iraq' },
  { name: 'Ireland', id: 'Ireland' },
  { name: 'Israel', id: 'Israel' },
  { name: 'Italy', id: 'Italy' },
  { name: 'Jamaica', id: 'Jamaica' },
  { name: 'Japan', id: 'Japan' },
  { name: 'Jordan', id: 'Jordan' },
  { name: 'Kazakhstan', id: 'Kazakhstan' },
  { name: 'Kenya', id: 'Kenya' },
  { name: 'Kiribati', id: 'Kiribati' },
  { name: 'Korea, North', id: 'Korea, North' },
  { name: 'Korea, South', id: 'Korea, South' },
  { name: 'Kosovo', id: 'Kosovo' },
  { name: 'Kuwait', id: 'Kuwait' },
  { name: 'Kyrgyzstan', id: 'Kyrgyzstan' },
  { name: 'Laos', id: 'Laos' },
  { name: 'Latvia', id: 'Latvia' },
  { name: 'Lebanon', id: 'Lebanon' },
  { name: 'Lesotho', id: 'Lesotho' },
  { name: 'Liberia', id: 'Liberia' },
  { name: 'Libya', id: 'Libya' },
  { name: 'Liechtenstein', id: 'Liechtenstein' },
  { name: 'Lithuania', id: 'Lithuania' },
  { name: 'Luxembourg', id: 'Luxembourg' },
  { name: 'Madagascar', id: 'Madagascar' },
  { name: 'Malawi', id: 'Malawi' },
  { name: 'Malaysia', id: 'Malaysia' },
  { name: 'Maldives', id: 'Maldives' },
  { name: 'Mali', id: 'Mali' },
  { name: 'Malta', id: 'Malta' },
  { name: 'Marshall Islands', id: 'Marshall Islands' },
  { name: 'Mauritania', id: 'Mauritania' },
  { name: 'Mauritius', id: 'Mauritius' },
  { name: 'Mexico', id: 'Mexico' },
  { name: 'Micronesia', id: 'Micronesia' },
  { name: 'Moldova', id: 'Moldova' },
  { name: 'Monaco', id: 'Monaco' },
  { name: 'Mongolia', id: 'Mongolia' },
  { name: 'Montenegro', id: 'Montenegro' },
  { name: 'Morocco', id: 'Morocco' },
  { name: 'Mozambique', id: 'Mozambique' },
  { name: 'Myanmar', id: 'Myanmar' },
  { name: 'Namibia', id: 'Namibia' },
  { name: 'Nauru', id: 'Nauru' },
  { name: 'Nepal', id: 'Nepal' },
  { name: 'Netherlands', id: 'Netherlands' },
  { name: 'New Zealand', id: 'New Zealand' },
  { name: 'Nicaragua', id: 'Nicaragua' },
  { name: 'Niger', id: 'Niger' },
  { name: 'Nigeria', id: 'Nigeria' },
  { name: 'North Macedonia', id: 'North Macedonia' },
  { name: 'Norway', id: 'Norway' },
  { name: 'Oman', id: 'Oman' },
  { name: 'Pakistan', id: 'Pakistan' },
  { name: 'Palau', id: 'Palau' },
  { name: 'Palestine', id: 'Palestine' },
  { name: 'Panama', id: 'Panama' },
  { name: 'Papua New Guinea', id: 'Papua New Guinea' },
  { name: 'Paraguay', id: 'Paraguay' },
  { name: 'Peru', id: 'Peru' },
  { name: 'Philippines', id: 'Philippines' },
  { name: 'Poland', id: 'Poland' },
  { name: 'Portugal', id: 'Portugal' },
  { name: 'Qatar', id: 'Qatar' },
  { name: 'Romania', id: 'Romania' },
  { name: 'Russia', id: 'Russia' },
  { name: 'Rwanda', id: 'Rwanda' },
  { name: 'Saint Kitts and Nevis', id: 'Saint Kitts and Nevis' },
  { name: 'Saint Lucia', id: 'Saint Lucia' },
  { name: 'Saint Vincent and the Grenadines', id: 'Saint Vincent and the Grenadines' },
  { name: 'Samoa', id: 'Samoa' },
  { name: 'San Marino', id: 'San Marino' },
  { name: 'Sao Tome and Principe', id: 'Sao Tome and Principe' },
  { name: 'Saudi Arabia', id: 'Saudi Arabia' },
  { name: 'Senegal', id: 'Senegal' },
  { name: 'Serbia', id: 'Serbia' },
  { name: 'Seychelles', id: 'Seychelles' },
  { name: 'Sierra Leone', id: 'Sierra Leone' },
  { name: 'Singapore', id: 'Singapore' },
  { name: 'Slovakia', id: 'Slovakia' },
  { name: 'Slovenia', id: 'Slovenia' },
  { name: 'Solomon Islands', id: 'Solomon Islands' },
  { name: 'Somalia', id: 'Somalia' },
  { name: 'South Africa', id: 'South Africa' },
  { name: 'South Sudan', id: 'South Sudan' },
  { name: 'Spain', id: 'Spain' },
  { name: 'Sri Lanka', id: 'Sri Lanka' },
  { name: 'Sudan', id: 'Sudan' },
  { name: 'Suriname', id: 'Suriname' },
  { name: 'Sweden', id: 'Sweden' },
  { name: 'Switzerland', id: 'Switzerland' },
  { name: 'Syria', id: 'Syria' },
  { name: 'Taiwan', id: 'Taiwan' },
  { name: 'Tajikistan', id: 'Tajikistan' },
  { name: 'Tanzania', id: 'Tanzania' },
  { name: 'Thailand', id: 'Thailand' },
  { name: 'Timor-Leste', id: 'Timor-Leste' },
  { name: 'Togo', id: 'Togo' },
  { name: 'Tonga', id: 'Tonga' },
  { name: 'Trinidad and Tobago', id: 'Trinidad and Tobago' },
  { name: 'Tunisia', id: 'Tunisia' },
  { name: 'Turkey', id: 'Turkey' },
  { name: 'Turkmenistan', id: 'Turkmenistan' },
  { name: 'Tuvalu', id: 'Tuvalu' },
  { name: 'Uganda', id: 'Uganda' },
  { name: 'Ukraine', id: 'Ukraine' },
  { name: 'United Arab Emirates', id: 'United Arab Emirates' },
  { name: 'United Kingdom', id: 'United Kingdom' },
  { name: 'United States', id: 'United States' },
  { name: 'Uruguay', id: 'Uruguay' },
  { name: 'Uzbekistan', id: 'Uzbekistan' },
  { name: 'Vanuatu', id: 'Vanuatu' },
  { name: 'Vatican City', id: 'Vatican City' },
  { name: 'Venezuela', id: 'Venezuela' },
  { name: 'Vietnam', id: 'Vietnam' },
  { name: 'Yemen', id: 'Yemen' },
  { name: 'Zambia', id: 'Zambia' },
  { name: 'Zimbabwe', id: 'Zimbabwe' },
];

const translate = (key: any, value: any) => {
  if (!key) return;
  if (value === 'only_letters') return 'This field must only contain letters';
  if (value === 'only_letters_numbers_spaces') return 'This field must only contain letters and numbers and spaces';
  if (value === 'field_required') return 'Field required';

  let valueTranslated = value?.split(key);

  return `This field ${valueTranslated?.[1]}`;
};

export function debounce<T extends (...args: any[]) => unknown>(func: T, timeout: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export const mapProps = async (store: any, action: any) => {
  store.dispatch(action);
  store.dispatch(END);
  await store.sagaTask.toPromise();
};

export const calculateAspectRatio = (width: any, height: any) => {
  try {
    // Find the greatest common divisor (GCD) of the width and height
    const gcd = (a: any, b: any): any => {
      return b === 0 ? a : gcd(b, a % b);
    };

    // Calculate the GCD of the given width and height
    const divisor = gcd(width, height);

    // Calculate and return the simplified aspect ratio
    const aspectWidth = width / divisor;
    const aspectHeight = height / divisor;

    return `${aspectWidth}/${aspectHeight}`;
  } catch (error) {
    return null;
  }
};

export function areUrlsEqual(arr1: File[], arr2: File[]): boolean {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  return arr1.every((file: any, index: any) => file.url === arr2[index]);
}

export const calculateFileSize = (file: any) => {
  if (!file) return 0;
  const fileSizeBytes = file.size;
  const fileSizeMB = fileSizeBytes / (1024 * 1024); // Convert to MB
  return fileSizeBytes;
};


export const faqs = [
  {
    question: "What is the purpose of this FAQ section?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum, sapien a convallis vestibulum, libero urna pharetra eros, ut tempus felis lorem vel lorem.",
  },
  {
    question: "How can I get more information?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac elementum elit. In hac habitasse platea dictumst.",
  },
  {
    question: "Who can I contact for support?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Curabitur scelerisque erat vel nisi facilisis, at tincidunt sapien cursus.",
  },
];


export { convertToTitleCase, statusManagement, translate, worldcountries };
