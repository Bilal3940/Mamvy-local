// // cypress/integration/textFieldComponent.spec.js
// import React from 'react';
// import { mount } from '@cypress/react18';
// import { MuiAppBar } from '@/components';
// import configureStore from 'redux-mock-store';
// import AppContainer from './AppContainer';
// import * as NextRouter from 'next/router';

// const mockStore = configureStore([]);

// describe('Appbar component', () => {
//   beforeEach(() => {
//     const pushStub = cy.stub().as('routerPush');
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: '/app/home',
//       push: pushStub,
//     });
//   });
//   const store: any = mockStore({
//     auth: {
//       isAuth: true,
//       auth: {
//         isAuth: true,
//         user: {
//           id: 102,
//           name: 'gerards',
//           lastname: 'miot',
//           email: 'mauricemiot18@gmail.com',
//           phonenumber: '134234',
//           address_city: 'testing',
//           address_country: null,
//           address_line_1: '2',
//           address_line_2: 'pepepe',
//           address_postal_code: '1010',
//           address_state: 'WA',
//           picture: null,
//           description: 'halossss',
//           recover_code: '775938',
//           created_at: '2024-04-01T12:30:06.304Z',
//           updated_at: '2024-04-01T17:20:59.355Z',
//           googleAccessToken: null,
//           facebookAccessToken: null,
//         },
//       },
//     },
//     home: {
//       criterias: {
//         search: '',
//         prompts: [],
//         collaborators: [],
//       },
//       stories: {
//         draftStories: [
//           {
//             id: 95,
//             user_id: 3,
//             title: 'Test',
//             description: '',
//             url: 'Test-3',
//             private: false,
//             password: ' ',
//             cover_image: 'stories/Test/f689cec7-0f6d-4b90-a8fc-ae751ecf6f86.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-06-03T20:06:31.106Z',
//             updated_at: '2024-06-03T20:06:31.106Z',
//             status: 'draft',
//             invitationCode: [],
//             memories: [],
//           },
//         ],
//         publishedStories: [
//           {
//             id: 4,
//             user_id: 3,
//             title: 'test joker',
//             description:
//               "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hajsjs",
//             url: 'test-joker-1',
//             private: false,
//             password: 'public',
//             cover_image: 'stories/test joker/HD-wallpaper-comics-joker-dc-comics.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//                 classmates_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-05-16T15:02:54.625Z',
//             updated_at: '2024-06-10T20:12:08.846Z',
//             status: 'published',
//             invitationCode: [],
//             memories: [
//               {
//                 id: 7,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'text massive rich ',
//                 description: 'massive rich',
//                 asset:
//                   '[{"type":"paragraph","children":[{"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum","fontSize":"12px"}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\"de Finibus Bonorum et Malorum\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\"Lorem ipsum dolor sit amet..\\", comes from a line in section 1.10.32."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\"de Finibus Bonorum et Malorum\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}]}]',
//                 type: 'text',
//                 asset_type: 'text',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-16T15:09:04.402Z',
//                 updated_at: '2024-05-16T15:09:04.402Z',
//                 approved: true,
//               },
//               {
//                 id: 153,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test',
//                 description: '',
//                 asset: 'stories/test joker/memory/Screenshot 2023-02-09 at 4.33.21 PM.png',
//                 type: 'image',
//                 asset_type: 'image/png',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T16:42:50.618Z',
//                 updated_at: '2024-06-03T16:42:50.618Z',
//                 approved: true,
//               },
//               {
//                 id: 93,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'ssss',
//                 description: 'ddddd',
//                 asset: 'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-21T17:45:15.979Z',
//                 updated_at: '2024-05-21T17:45:15.979Z',
//                 approved: true,
//               },
//               {
//                 id: 154,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'video test large vertical',
//                 description: '',
//                 asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                 type: 'video',
//                 asset_type: 'video/mp4',
//                 preview_asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryVideo: [
//                     {
//                       thumb: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                     },
//                     {
//                       thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T17:01:09.186Z',
//                 updated_at: '2024-06-03T17:05:43.151Z',
//                 approved: true,
//               },
//               {
//                 id: 86,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'all additional',
//                 description: 'aditional resource',
//                 asset: 'stories/test joker/memory/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'test this',
//                           fontSize: '12px',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryAudio: ['stories/test joker/memories/sample.wav'],
//                   complementaryImage: [
//                     'stories/test joker/memories/HD-wallpaper-comics-joker-dc-comics.jpeg',
//                     'stories/test joker/memories/eye-solid.svg',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/photo-1564754943164-e83c08469116.avif',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                     'stories/test joker/memories/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                   ],
//                 },
//                 created_at: '2024-05-19T16:37:09.168Z',
//                 updated_at: '2024-06-03T17:22:36.567Z',
//                 approved: true,
//               },
//               {
//                 id: 162,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test final',
//                 description: '',
//                 asset: 'stories/test joker/memory/PHOTO-2024-06-04-21-11-50 3.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-05T12:55:46.705Z',
//                 updated_at: '2024-06-05T12:55:46.705Z',
//                 approved: true,
//               },
//               {
//                 id: 6,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'Mariposa',
//                 description: 'Vídeo ',
//                 asset: 'videos/IMG_9665.mov',
//                 type: 'video',
//                 asset_type: 'video/quicktime',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'complementario estoy escribiendo rápido o normal, pero se demora mucho no sé ahora si vuelve a pasar… si, es muy lento',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryImage: [
//                     'stories/test joker/memories/IMG_0426.webp',
//                     'stories/test joker/memories/IMG_0560.webp',
//                     'stories/test joker/memories/IMG_0343.webp',
//                     'stories/test joker/memories/IMG_0254.webp',
//                     'stories/test joker/memories/IMG_0248.webp',
//                     'stories/test joker/memories/IMG_0227.webp',
//                   ],
//                 },
//                 created_at: '2024-05-16T15:06:24.187Z',
//                 updated_at: '2024-06-06T22:27:23.991Z',
//                 approved: true,
//               },
//             ],
//           },
//         ],
//         collaboratorStories: [],
//       },
//     },
//     story: {
//       createStep: 0,
//     },
//     memory: {
//       mediaScreenType: 'list',
//     },
//   });
//   it('render Appbar', () => {
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//   });
//   it('click side bar function', () => {
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//     cy.get('.css-1y9zeko').click();
//   });
//   it('open dropdown and go settings', () => {
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );

//     cy.get(':nth-child(3) > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//     cy.get('.MuiList-root > [tabindex="0"]').click();
//   });
//   it('open dropdown and press logout', () => {
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );

//     cy.get(':nth-child(3) > [data-cy="iconButton"]').click();

//     cy.get('.MuiList-root > [tabindex="-1"]').click({ multiple: true });
//   });
//   it('click notificacion ', () => {
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//     cy.get(':nth-child(1) > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//   });
//   it('click collaborators ', () => {
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );

//     cy.get('.css-83ngr > :nth-child(2) > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//   });

//   it('click filters ', () => {
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//     cy.get('.MuiStack-root > .css-0 > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//     cy.get('.MuiTabs-flexContainer > :nth-child(1)').click();
//     cy.get('.MuiTabs-flexContainer > :nth-child(2)').click();
//   });

//   // it('click and search ', () => {
//   //   mount(
//   //     <AppContainer store={store}>
//   //       <MuiAppBar />
//   //     </AppContainer>,
//   //   );

//   //   cy.get('#search').type('search');
//   //   cy.wait(700);
//   //   cy.get('.css-ittuaa-MuiInputAdornment-root > .MuiButtonBase-root').click();
//   // });

//   //IS MOBILE TEST

//   it('show mobile ', () => {
//     cy.viewport(414, 896);
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//   });
//   // it('show search mobile ', () => {
//   //   cy.viewport(414, 896);
//   //   mount(
//   //     <AppContainer store={store}>
//   //       <MuiAppBar />
//   //     </AppContainer>,
//   //   );
//   //   cy.get('.MuiPaper-root > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//   //   cy.get('#search').type('search');
//   //   cy.get('[data-cy="iconButton"] > .MuiButtonBase-root').click();
//   // });
//   it('show filters mobile ', () => {
//     cy.viewport(414, 896);
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//     cy.get(':nth-child(2) > [data-cy="iconButton"] > .MuiButtonBase-root').click();

//     cy.get('.MuiTabs-flexContainer > :nth-child(2)').click();
//   });
//   it('show options and click in mobile ', () => {
//     cy.viewport(414, 896);
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//     cy.get(':nth-child(3) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();

//     cy.get('.MuiList-root > [tabindex="0"]').click();
//     cy.get('.css-1u33xur').click();
//     cy.get(':nth-child(3) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
//     cy.get('.MuiList-root > :nth-child(2)').click();
//     cy.get('.css-1u33xur').click();
//     cy.get(':nth-child(3) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
//     cy.get('.MuiList-root > :nth-child(3)').click();
//     cy.get('.css-1u33xur').click();
//     cy.get(':nth-child(3) > [data-cy="iconButton"] > .MuiButtonBase-root > img').click();
//     cy.get('.MuiList-root > :nth-child(4)').click();
//     cy.get('.css-1u33xur').click();
//   });

//   it('show drawer mobile ', () => {
//     cy.viewport(414, 896);
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//     cy.get('.css-1y9zeko').click();
//   });
// });

// describe('Appbar component in Memorie screen', () => {
//   beforeEach(() => {
//     const pushStub = cy.stub().as('routerPush');
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: '/app/memories/1',
//       asPath: '/app/memories/1',
//       push: pushStub,
//     });
//   });

//   const store: any = mockStore({
//     home: {
//       criterias: {
//         search: '',
//         prompts: [],
//         collaborators: [],
//       },
//       story: {
//         draftStories: [
//           {
//             id: 95,
//             user_id: 3,
//             title: 'Test',
//             description: '',
//             url: 'Test-3',
//             private: false,
//             password: ' ',
//             cover_image: 'stories/Test/f689cec7-0f6d-4b90-a8fc-ae751ecf6f86.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-06-03T20:06:31.106Z',
//             updated_at: '2024-06-03T20:06:31.106Z',
//             status: 'draft',
//             invitationCode: [],
//             memories: [],
//           },
//         ],
//         publishedStories: [
//           {
//             id: 4,
//             user_id: 3,
//             title: 'test joker',
//             description:
//               "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hajsjs",
//             url: 'test-joker-1',
//             private: false,
//             password: 'public',
//             cover_image: 'stories/test joker/HD-wallpaper-comics-joker-dc-comics.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//                 classmates_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-05-16T15:02:54.625Z',
//             updated_at: '2024-06-10T20:12:08.846Z',
//             status: 'published',
//             invitationCode: [],
//             memories: [
//               {
//                 id: 7,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'text massive rich ',
//                 description: 'massive rich',
//                 asset:
//                   '[{"type":"paragraph","children":[{"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum","fontSize":"12px"}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\"de Finibus Bonorum et Malorum\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\"Lorem ipsum dolor sit amet..\\", comes from a line in section 1.10.32."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\"de Finibus Bonorum et Malorum\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}]}]',
//                 type: 'text',
//                 asset_type: 'text',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-16T15:09:04.402Z',
//                 updated_at: '2024-05-16T15:09:04.402Z',
//                 approved: true,
//               },
//               {
//                 id: 153,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test',
//                 description: '',
//                 asset: 'stories/test joker/memory/Screenshot 2023-02-09 at 4.33.21 PM.png',
//                 type: 'image',
//                 asset_type: 'image/png',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T16:42:50.618Z',
//                 updated_at: '2024-06-03T16:42:50.618Z',
//                 approved: true,
//               },
//               {
//                 id: 93,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'ssss',
//                 description: 'ddddd',
//                 asset: 'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-21T17:45:15.979Z',
//                 updated_at: '2024-05-21T17:45:15.979Z',
//                 approved: true,
//               },
//               {
//                 id: 154,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'video test large vertical',
//                 description: '',
//                 asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                 type: 'video',
//                 asset_type: 'video/mp4',
//                 preview_asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryVideo: [
//                     {
//                       thumb: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                     },
//                     {
//                       thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T17:01:09.186Z',
//                 updated_at: '2024-06-03T17:05:43.151Z',
//                 approved: true,
//               },
//               {
//                 id: 86,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'all additional',
//                 description: 'aditional resource',
//                 asset: 'stories/test joker/memory/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'test this',
//                           fontSize: '12px',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryAudio: ['stories/test joker/memories/sample.wav'],
//                   complementaryImage: [
//                     'stories/test joker/memories/HD-wallpaper-comics-joker-dc-comics.jpeg',
//                     'stories/test joker/memories/eye-solid.svg',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/photo-1564754943164-e83c08469116.avif',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                     'stories/test joker/memories/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                   ],
//                 },
//                 created_at: '2024-05-19T16:37:09.168Z',
//                 updated_at: '2024-06-03T17:22:36.567Z',
//                 approved: true,
//               },
//               {
//                 id: 162,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test final',
//                 description: '',
//                 asset: 'stories/test joker/memory/PHOTO-2024-06-04-21-11-50 3.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-05T12:55:46.705Z',
//                 updated_at: '2024-06-05T12:55:46.705Z',
//                 approved: true,
//               },
//               {
//                 id: 6,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'Mariposa',
//                 description: 'Vídeo ',
//                 asset: 'videos/IMG_9665.mov',
//                 type: 'video',
//                 asset_type: 'video/quicktime',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'complementario estoy escribiendo rápido o normal, pero se demora mucho no sé ahora si vuelve a pasar… si, es muy lento',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryImage: [
//                     'stories/test joker/memories/IMG_0426.webp',
//                     'stories/test joker/memories/IMG_0560.webp',
//                     'stories/test joker/memories/IMG_0343.webp',
//                     'stories/test joker/memories/IMG_0254.webp',
//                     'stories/test joker/memories/IMG_0248.webp',
//                     'stories/test joker/memories/IMG_0227.webp',
//                   ],
//                 },
//                 created_at: '2024-05-16T15:06:24.187Z',
//                 updated_at: '2024-06-06T22:27:23.991Z',
//                 approved: true,
//               },
//             ],
//           },
//         ],
//         collaboratorStories: [],
//       },
//     },
//     auth: {
//       isAuth: true,
//       user: {
//         id: 102,
//         name: 'gerards',
//         lastname: 'miot',
//         email: 'mauricemiot18@gmail.com',
//         phonenumber: '134234',
//         address_city: 'testing',
//         address_country: null,
//         address_line_1: '2',
//         address_line_2: 'pepepe',
//         address_postal_code: '1010',
//         address_state: 'WA',
//         picture: null,
//         description: 'halossss',
//         recover_code: '775938',
//         created_at: '2024-04-01T12:30:06.304Z',
//         updated_at: '2024-04-01T17:20:59.355Z',
//         googleAccessToken: null,
//         facebookAccessToken: null,
//       },
//     },
//     intermitence: {
//       actualSection: 'title 1',
//     },
//     story: {
//       createStep: 0,
//     },
//     memory: {
//       mediaScreenType: 'list',
//     },
//   });
//   // it('render Appbar in home', () => {
//   //   mount(
//   //     <AppContainer store={store}>
//   //       <MuiAppBar />
//   //     </AppContainer>,
//   //   );
//   // });
//   // it('render Appbar in home mobile ', () => {
//   //   cy.viewport(414, 896);
//   //   mount(
//   //     <AppContainer store={store}>
//   //       <MuiAppBar />
//   //     </AppContainer>,
//   //   );
//   // });

//   // it('go to home ', () => {
//   //   cy.viewport(414, 896);
//   //   mount(
//   //     <AppContainer store={store}>
//   //       <MuiAppBar />
//   //     </AppContainer>,
//   //   );
//   //   cy.get('.MuiButtonBase-root').click({ multiple: true });
//   // });
// });

// describe('Appbar component in logout ', () => {
//   beforeEach(() => {
//     const pushStub = cy.stub().as('routerPush');
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: '/app/memories/1',
//       asPath: '/app/memories/1',
//       push: pushStub,
//     });
//   });

//   const store: any = mockStore({
//     home: {
//       criterias: {
//         search: '',
//         prompts: [],
//         collaborators: [],
//       },
//       stories: {
//         draftStories: [
//           {
//             id: 95,
//             user_id: 3,
//             title: 'Test',
//             description: '',
//             url: 'Test-3',
//             private: false,
//             password: ' ',
//             cover_image: 'stories/Test/f689cec7-0f6d-4b90-a8fc-ae751ecf6f86.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-06-03T20:06:31.106Z',
//             updated_at: '2024-06-03T20:06:31.106Z',
//             status: 'draft',
//             invitationCode: [],
//             memories: [],
//           },
//         ],
//         publishedStories: [
//           {
//             id: 4,
//             user_id: 3,
//             title: 'test joker',
//             description:
//               "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hajsjs",
//             url: 'test-joker-1',
//             private: false,
//             password: 'public',
//             cover_image: 'stories/test joker/HD-wallpaper-comics-joker-dc-comics.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//                 classmates_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-05-16T15:02:54.625Z',
//             updated_at: '2024-06-10T20:12:08.846Z',
//             status: 'published',
//             invitationCode: [],
//             memories: [
//               {
//                 id: 7,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'text massive rich ',
//                 description: 'massive rich',
//                 asset:
//                   '[{"type":"paragraph","children":[{"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum","fontSize":"12px"}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\"de Finibus Bonorum et Malorum\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\"Lorem ipsum dolor sit amet..\\", comes from a line in section 1.10.32."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\"de Finibus Bonorum et Malorum\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}]}]',
//                 type: 'text',
//                 asset_type: 'text',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-16T15:09:04.402Z',
//                 updated_at: '2024-05-16T15:09:04.402Z',
//                 approved: true,
//               },
//               {
//                 id: 153,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test',
//                 description: '',
//                 asset: 'stories/test joker/memory/Screenshot 2023-02-09 at 4.33.21 PM.png',
//                 type: 'image',
//                 asset_type: 'image/png',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T16:42:50.618Z',
//                 updated_at: '2024-06-03T16:42:50.618Z',
//                 approved: true,
//               },
//               {
//                 id: 93,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'ssss',
//                 description: 'ddddd',
//                 asset: 'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-21T17:45:15.979Z',
//                 updated_at: '2024-05-21T17:45:15.979Z',
//                 approved: true,
//               },
//               {
//                 id: 154,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'video test large vertical',
//                 description: '',
//                 asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                 type: 'video',
//                 asset_type: 'video/mp4',
//                 preview_asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryVideo: [
//                     {
//                       thumb: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                     },
//                     {
//                       thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T17:01:09.186Z',
//                 updated_at: '2024-06-03T17:05:43.151Z',
//                 approved: true,
//               },
//               {
//                 id: 86,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'all additional',
//                 description: 'aditional resource',
//                 asset: 'stories/test joker/memory/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'test this',
//                           fontSize: '12px',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryAudio: ['stories/test joker/memories/sample.wav'],
//                   complementaryImage: [
//                     'stories/test joker/memories/HD-wallpaper-comics-joker-dc-comics.jpeg',
//                     'stories/test joker/memories/eye-solid.svg',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/photo-1564754943164-e83c08469116.avif',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                     'stories/test joker/memories/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                   ],
//                 },
//                 created_at: '2024-05-19T16:37:09.168Z',
//                 updated_at: '2024-06-03T17:22:36.567Z',
//                 approved: true,
//               },
//               {
//                 id: 162,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test final',
//                 description: '',
//                 asset: 'stories/test joker/memory/PHOTO-2024-06-04-21-11-50 3.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-05T12:55:46.705Z',
//                 updated_at: '2024-06-05T12:55:46.705Z',
//                 approved: true,
//               },
//               {
//                 id: 6,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'Mariposa',
//                 description: 'Vídeo ',
//                 asset: 'videos/IMG_9665.mov',
//                 type: 'video',
//                 asset_type: 'video/quicktime',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'complementario estoy escribiendo rápido o normal, pero se demora mucho no sé ahora si vuelve a pasar… si, es muy lento',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryImage: [
//                     'stories/test joker/memories/IMG_0426.webp',
//                     'stories/test joker/memories/IMG_0560.webp',
//                     'stories/test joker/memories/IMG_0343.webp',
//                     'stories/test joker/memories/IMG_0254.webp',
//                     'stories/test joker/memories/IMG_0248.webp',
//                     'stories/test joker/memories/IMG_0227.webp',
//                   ],
//                 },
//                 created_at: '2024-05-16T15:06:24.187Z',
//                 updated_at: '2024-06-06T22:27:23.991Z',
//                 approved: true,
//               },
//             ],
//           },
//         ],
//         collaboratorStories: [],
//       },
//     },
//     auth: {
//       isAuth: false,
//       user: {},
//     },
//     intermitence: {
//       actualSection: 'title 1',
//     },
//     story: {
//       createStep: 0,
//     },
//     memory: {
//       mediaScreenType: 'list',
//     },
//   });
//   // it('render Appbar in home', () => {
//   //   mount(
//   //     <AppContainer store={store}>
//   //       <MuiAppBar />
//   //     </AppContainer>,
//   //   );
//   // });
//   // it('render Appbar in home mobile ', () => {
//   //   cy.viewport(414, 896);
//   //   mount(
//   //     <AppContainer store={store}>
//   //       <MuiAppBar />
//   //     </AppContainer>,
//   //   );
//   // });
// });

// describe('Appbar component in settings screen', () => {
//   beforeEach(() => {
//     const pushStub = cy.stub().as('routerPush');
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: '/app/settings',
//       asPath: '/app/settings',
//       push: pushStub,
//     });
//   });

//   const store: any = mockStore({
//     home: {
//       criterias: {
//         search: '',
//         prompts: [],
//         collaborators: [],
//       },
//       stories: {
//         draftStories: [
//           {
//             id: 95,
//             user_id: 3,
//             title: 'Test',
//             description: '',
//             url: 'Test-3',
//             private: false,
//             password: ' ',
//             cover_image: 'stories/Test/f689cec7-0f6d-4b90-a8fc-ae751ecf6f86.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-06-03T20:06:31.106Z',
//             updated_at: '2024-06-03T20:06:31.106Z',
//             status: 'draft',
//             invitationCode: [],
//             memories: [],
//           },
//         ],
//         publishedStories: [
//           {
//             id: 4,
//             user_id: 3,
//             title: 'test joker',
//             description:
//               "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hajsjs",
//             url: 'test-joker-1',
//             private: false,
//             password: 'public',
//             cover_image: 'stories/test joker/HD-wallpaper-comics-joker-dc-comics.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//                 classmates_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-05-16T15:02:54.625Z',
//             updated_at: '2024-06-10T20:12:08.846Z',
//             status: 'published',
//             invitationCode: [],
//             memories: [
//               {
//                 id: 7,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'text massive rich ',
//                 description: 'massive rich',
//                 asset:
//                   '[{"type":"paragraph","children":[{"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum","fontSize":"12px"}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\"de Finibus Bonorum et Malorum\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\"Lorem ipsum dolor sit amet..\\", comes from a line in section 1.10.32."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\"de Finibus Bonorum et Malorum\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}]}]',
//                 type: 'text',
//                 asset_type: 'text',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-16T15:09:04.402Z',
//                 updated_at: '2024-05-16T15:09:04.402Z',
//                 approved: true,
//               },
//               {
//                 id: 153,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test',
//                 description: '',
//                 asset: 'stories/test joker/memory/Screenshot 2023-02-09 at 4.33.21 PM.png',
//                 type: 'image',
//                 asset_type: 'image/png',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T16:42:50.618Z',
//                 updated_at: '2024-06-03T16:42:50.618Z',
//                 approved: true,
//               },
//               {
//                 id: 93,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'ssss',
//                 description: 'ddddd',
//                 asset: 'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-21T17:45:15.979Z',
//                 updated_at: '2024-05-21T17:45:15.979Z',
//                 approved: true,
//               },
//               {
//                 id: 154,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'video test large vertical',
//                 description: '',
//                 asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                 type: 'video',
//                 asset_type: 'video/mp4',
//                 preview_asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryVideo: [
//                     {
//                       thumb: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                     },
//                     {
//                       thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T17:01:09.186Z',
//                 updated_at: '2024-06-03T17:05:43.151Z',
//                 approved: true,
//               },
//               {
//                 id: 86,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'all additional',
//                 description: 'aditional resource',
//                 asset: 'stories/test joker/memory/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'test this',
//                           fontSize: '12px',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryAudio: ['stories/test joker/memories/sample.wav'],
//                   complementaryImage: [
//                     'stories/test joker/memories/HD-wallpaper-comics-joker-dc-comics.jpeg',
//                     'stories/test joker/memories/eye-solid.svg',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/photo-1564754943164-e83c08469116.avif',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                     'stories/test joker/memories/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                   ],
//                 },
//                 created_at: '2024-05-19T16:37:09.168Z',
//                 updated_at: '2024-06-03T17:22:36.567Z',
//                 approved: true,
//               },
//               {
//                 id: 162,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test final',
//                 description: '',
//                 asset: 'stories/test joker/memory/PHOTO-2024-06-04-21-11-50 3.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-05T12:55:46.705Z',
//                 updated_at: '2024-06-05T12:55:46.705Z',
//                 approved: true,
//               },
//               {
//                 id: 6,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'Mariposa',
//                 description: 'Vídeo ',
//                 asset: 'videos/IMG_9665.mov',
//                 type: 'video',
//                 asset_type: 'video/quicktime',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'complementario estoy escribiendo rápido o normal, pero se demora mucho no sé ahora si vuelve a pasar… si, es muy lento',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryImage: [
//                     'stories/test joker/memories/IMG_0426.webp',
//                     'stories/test joker/memories/IMG_0560.webp',
//                     'stories/test joker/memories/IMG_0343.webp',
//                     'stories/test joker/memories/IMG_0254.webp',
//                     'stories/test joker/memories/IMG_0248.webp',
//                     'stories/test joker/memories/IMG_0227.webp',
//                   ],
//                 },
//                 created_at: '2024-05-16T15:06:24.187Z',
//                 updated_at: '2024-06-06T22:27:23.991Z',
//                 approved: true,
//               },
//             ],
//           },
//         ],
//         collaboratorStories: [],
//       },
//     },
//     auth: {
//       isAuth: true,
//       user: {
//         id: 102,
//         name: 'gerards',
//         lastname: 'miot',
//         email: 'mauricemiot18@gmail.com',
//         phonenumber: '134234',
//         address_city: 'testing',
//         address_country: null,
//         address_line_1: '2',
//         address_line_2: 'pepepe',
//         address_postal_code: '1010',
//         address_state: 'WA',
//         picture: null,
//         description: 'halossss',
//         recover_code: '775938',
//         created_at: '2024-04-01T12:30:06.304Z',
//         updated_at: '2024-04-01T17:20:59.355Z',
//         googleAccessToken: null,
//         facebookAccessToken: null,
//       },
//     },
//     intermitence: {
//       actualSection: 'title 1',
//     },
//     story: {
//       createStep: 0,
//     },
//     memory: {
//       mediaScreenType: 'list',
//     },
//   });


//   // it('go to home ', () => {
//   //   cy.viewport(414, 896);
//   //   mount(
//   //     <AppContainer store={store}>
//   //       <MuiAppBar />
//   //     </AppContainer>,
//   //   );
//   //   cy.get('.MuiButtonBase-root').click({ multiple: true });
//   // });
// });

// describe('Appbar component in memories create screen', () => {
//   beforeEach(() => {
//     const pushStub = cy.stub().as('routerPush');
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: '/app/memories/create',
//       asPath: '/app/settings',
//       push: pushStub,
//     });
//   });

//   const store: any = mockStore({
//     home: {
//       criterias: {
//         search: '',
//         prompts: [],
//         collaborators: [],
//       },
//       stories: {
//         draftStories: [
//           {
//             id: 95,
//             user_id: 3,
//             title: 'Test',
//             description: '',
//             url: 'Test-3',
//             private: false,
//             password: ' ',
//             cover_image: 'stories/Test/f689cec7-0f6d-4b90-a8fc-ae751ecf6f86.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-06-03T20:06:31.106Z',
//             updated_at: '2024-06-03T20:06:31.106Z',
//             status: 'draft',
//             invitationCode: [],
//             memories: [],
//           },
//         ],
//         publishedStories: [
//           {
//             id: 4,
//             user_id: 3,
//             title: 'test joker',
//             description:
//               "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hajsjs",
//             url: 'test-joker-1',
//             private: false,
//             password: 'public',
//             cover_image: 'stories/test joker/HD-wallpaper-comics-joker-dc-comics.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//                 classmates_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-05-16T15:02:54.625Z',
//             updated_at: '2024-06-10T20:12:08.846Z',
//             status: 'published',
//             invitationCode: [],
//             memories: [
//               {
//                 id: 7,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'text massive rich ',
//                 description: 'massive rich',
//                 asset:
//                   '[{"type":"paragraph","children":[{"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum","fontSize":"12px"}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\"de Finibus Bonorum et Malorum\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\"Lorem ipsum dolor sit amet..\\", comes from a line in section 1.10.32."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\"de Finibus Bonorum et Malorum\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}]}]',
//                 type: 'text',
//                 asset_type: 'text',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-16T15:09:04.402Z',
//                 updated_at: '2024-05-16T15:09:04.402Z',
//                 approved: true,
//               },
//               {
//                 id: 153,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test',
//                 description: '',
//                 asset: 'stories/test joker/memory/Screenshot 2023-02-09 at 4.33.21 PM.png',
//                 type: 'image',
//                 asset_type: 'image/png',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T16:42:50.618Z',
//                 updated_at: '2024-06-03T16:42:50.618Z',
//                 approved: true,
//               },
//               {
//                 id: 93,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'ssss',
//                 description: 'ddddd',
//                 asset: 'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-21T17:45:15.979Z',
//                 updated_at: '2024-05-21T17:45:15.979Z',
//                 approved: true,
//               },
//               {
//                 id: 154,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'video test large vertical',
//                 description: '',
//                 asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                 type: 'video',
//                 asset_type: 'video/mp4',
//                 preview_asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryVideo: [
//                     {
//                       thumb: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                     },
//                     {
//                       thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T17:01:09.186Z',
//                 updated_at: '2024-06-03T17:05:43.151Z',
//                 approved: true,
//               },
//               {
//                 id: 86,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'all additional',
//                 description: 'aditional resource',
//                 asset: 'stories/test joker/memory/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'test this',
//                           fontSize: '12px',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryAudio: ['stories/test joker/memories/sample.wav'],
//                   complementaryImage: [
//                     'stories/test joker/memories/HD-wallpaper-comics-joker-dc-comics.jpeg',
//                     'stories/test joker/memories/eye-solid.svg',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/photo-1564754943164-e83c08469116.avif',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                     'stories/test joker/memories/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                   ],
//                 },
//                 created_at: '2024-05-19T16:37:09.168Z',
//                 updated_at: '2024-06-03T17:22:36.567Z',
//                 approved: true,
//               },
//               {
//                 id: 162,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test final',
//                 description: '',
//                 asset: 'stories/test joker/memory/PHOTO-2024-06-04-21-11-50 3.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-05T12:55:46.705Z',
//                 updated_at: '2024-06-05T12:55:46.705Z',
//                 approved: true,
//               },
//               {
//                 id: 6,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'Mariposa',
//                 description: 'Vídeo ',
//                 asset: 'videos/IMG_9665.mov',
//                 type: 'video',
//                 asset_type: 'video/quicktime',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'complementario estoy escribiendo rápido o normal, pero se demora mucho no sé ahora si vuelve a pasar… si, es muy lento',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryImage: [
//                     'stories/test joker/memories/IMG_0426.webp',
//                     'stories/test joker/memories/IMG_0560.webp',
//                     'stories/test joker/memories/IMG_0343.webp',
//                     'stories/test joker/memories/IMG_0254.webp',
//                     'stories/test joker/memories/IMG_0248.webp',
//                     'stories/test joker/memories/IMG_0227.webp',
//                   ],
//                 },
//                 created_at: '2024-05-16T15:06:24.187Z',
//                 updated_at: '2024-06-06T22:27:23.991Z',
//                 approved: true,
//               },
//             ],
//           },
//         ],
//         collaboratorStories: [],
//       },
//     },
//     auth: {
//       isAuth: true,
//       user: {
//         id: 102,
//         name: 'gerards',
//         lastname: 'miot',
//         email: 'mauricemiot18@gmail.com',
//         phonenumber: '134234',
//         address_city: 'testing',
//         address_country: null,
//         address_line_1: '2',
//         address_line_2: 'pepepe',
//         address_postal_code: '1010',
//         address_state: 'WA',
//         picture: null,
//         description: 'halossss',
//         recover_code: '775938',
//         created_at: '2024-04-01T12:30:06.304Z',
//         updated_at: '2024-04-01T17:20:59.355Z',
//         googleAccessToken: null,
//         facebookAccessToken: null,
//       },
//     },
//     intermitence: {
//       actualSection: 'title 1',
//     },
//     story: {
//       createStep: 0,
//     },
//     memory: {
//       mediaScreenType: 'list',
//     },
//   });

//   // it('go to home ', () => {
//   //   cy.viewport(414, 896);
//   //   mount(
//   //     <AppContainer store={store}>
//   //       <MuiAppBar />
//   //     </AppContainer>,
//   //   );
//   //   cy.get('.MuiButtonBase-root').click({ multiple: true });
//   // });
// });

// describe('Appbar component default route', () => {
//   beforeEach(() => {
//     const pushStub = cy.stub().as('routerPush');
//     cy.stub(NextRouter, 'useRouter').returns({
//       push: pushStub,
//     });
//   });

//   const store: any = mockStore({
//     home: {
//       criterias: {
//         search: '',
//         prompts: [],
//         collaborators: [],
//       },
//       stories: {
//         draftStories: [
//           {
//             id: 95,
//             user_id: 3,
//             title: 'Test',
//             description: '',
//             url: 'Test-3',
//             private: false,
//             password: ' ',
//             cover_image: 'stories/Test/f689cec7-0f6d-4b90-a8fc-ae751ecf6f86.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-06-03T20:06:31.106Z',
//             updated_at: '2024-06-03T20:06:31.106Z',
//             status: 'draft',
//             invitationCode: [],
//             memories: [],
//           },
//         ],
//         publishedStories: [
//           {
//             id: 4,
//             user_id: 3,
//             title: 'test joker',
//             description:
//               "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hajsjs",
//             url: 'test-joker-1',
//             private: false,
//             password: 'public',
//             cover_image: 'stories/test joker/HD-wallpaper-comics-joker-dc-comics.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//                 classmates_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-05-16T15:02:54.625Z',
//             updated_at: '2024-06-10T20:12:08.846Z',
//             status: 'published',
//             invitationCode: [],
//             memories: [
//               {
//                 id: 7,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'text massive rich ',
//                 description: 'massive rich',
//                 asset:
//                   '[{"type":"paragraph","children":[{"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum","fontSize":"12px"}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\"de Finibus Bonorum et Malorum\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\"Lorem ipsum dolor sit amet..\\", comes from a line in section 1.10.32."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\"de Finibus Bonorum et Malorum\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}]}]',
//                 type: 'text',
//                 asset_type: 'text',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-16T15:09:04.402Z',
//                 updated_at: '2024-05-16T15:09:04.402Z',
//                 approved: true,
//               },
//               {
//                 id: 153,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test',
//                 description: '',
//                 asset: 'stories/test joker/memory/Screenshot 2023-02-09 at 4.33.21 PM.png',
//                 type: 'image',
//                 asset_type: 'image/png',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T16:42:50.618Z',
//                 updated_at: '2024-06-03T16:42:50.618Z',
//                 approved: true,
//               },
//               {
//                 id: 93,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'ssss',
//                 description: 'ddddd',
//                 asset: 'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-21T17:45:15.979Z',
//                 updated_at: '2024-05-21T17:45:15.979Z',
//                 approved: true,
//               },
//               {
//                 id: 154,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'video test large vertical',
//                 description: '',
//                 asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                 type: 'video',
//                 asset_type: 'video/mp4',
//                 preview_asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryVideo: [
//                     {
//                       thumb: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                     },
//                     {
//                       thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T17:01:09.186Z',
//                 updated_at: '2024-06-03T17:05:43.151Z',
//                 approved: true,
//               },
//               {
//                 id: 86,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'all additional',
//                 description: 'aditional resource',
//                 asset: 'stories/test joker/memory/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'test this',
//                           fontSize: '12px',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryAudio: ['stories/test joker/memories/sample.wav'],
//                   complementaryImage: [
//                     'stories/test joker/memories/HD-wallpaper-comics-joker-dc-comics.jpeg',
//                     'stories/test joker/memories/eye-solid.svg',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/photo-1564754943164-e83c08469116.avif',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                     'stories/test joker/memories/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                   ],
//                 },
//                 created_at: '2024-05-19T16:37:09.168Z',
//                 updated_at: '2024-06-03T17:22:36.567Z',
//                 approved: true,
//               },
//               {
//                 id: 162,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test final',
//                 description: '',
//                 asset: 'stories/test joker/memory/PHOTO-2024-06-04-21-11-50 3.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-05T12:55:46.705Z',
//                 updated_at: '2024-06-05T12:55:46.705Z',
//                 approved: true,
//               },
//               {
//                 id: 6,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'Mariposa',
//                 description: 'Vídeo ',
//                 asset: 'videos/IMG_9665.mov',
//                 type: 'video',
//                 asset_type: 'video/quicktime',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'complementario estoy escribiendo rápido o normal, pero se demora mucho no sé ahora si vuelve a pasar… si, es muy lento',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryImage: [
//                     'stories/test joker/memories/IMG_0426.webp',
//                     'stories/test joker/memories/IMG_0560.webp',
//                     'stories/test joker/memories/IMG_0343.webp',
//                     'stories/test joker/memories/IMG_0254.webp',
//                     'stories/test joker/memories/IMG_0248.webp',
//                     'stories/test joker/memories/IMG_0227.webp',
//                   ],
//                 },
//                 created_at: '2024-05-16T15:06:24.187Z',
//                 updated_at: '2024-06-06T22:27:23.991Z',
//                 approved: true,
//               },
//             ],
//           },
//         ],
//         collaboratorStories: [],
//       },
//     },
//     auth: {
//       isAuth: true,
//       user: {
//         id: 102,
//         name: 'gerards',
//         lastname: 'miot',
//         email: 'mauricemiot18@gmail.com',
//         phonenumber: '134234',
//         address_city: 'testing',
//         address_country: null,
//         address_line_1: '2',
//         address_line_2: 'pepepe',
//         address_postal_code: '1010',
//         address_state: 'WA',
//         picture: null,
//         description: 'halossss',
//         recover_code: '775938',
//         created_at: '2024-04-01T12:30:06.304Z',
//         updated_at: '2024-04-01T17:20:59.355Z',
//         googleAccessToken: null,
//         facebookAccessToken: null,
//       },
//     },
//     intermitence: {
//       actualSection: 'title 1',
//     },
//     story: {
//       createStep: 0,
//     },
//     memory: {
//       mediaScreenType: 'list',
//     },
//   });
//   it('render Appbar in home', () => {
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//   });
//   it('render Appbar in home mobile ', () => {
//     cy.viewport(414, 896);
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//   });

//   // it('go to home ', () => {
//   //   cy.viewport(414, 896);
//   //   mount(
//   //     <AppContainer store={store}>
//   //       <MuiAppBar />
//   //     </AppContainer>,
//   //   );
//   //   cy.get('.MuiButtonBase-root').click({ multiple: true });
//   // });
// });
// describe('Appbar component render in story', () => {
//   beforeEach(() => {
//     const pushStub = cy.stub().as('routerPush');
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: '/app/story/create',
//       asPath: '/app/story/create',
//       push: pushStub,
//     });
//   });

//   const store: any = mockStore({
//     home: {
//       criterias: {
//         search: '',
//         prompts: [],
//         collaborators: [],
//       },
//       stories: {
//         draftStories: [
//           {
//             id: 95,
//             user_id: 3,
//             title: 'Test',
//             description: '',
//             url: 'Test-3',
//             private: false,
//             password: ' ',
//             cover_image: 'stories/Test/f689cec7-0f6d-4b90-a8fc-ae751ecf6f86.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-06-03T20:06:31.106Z',
//             updated_at: '2024-06-03T20:06:31.106Z',
//             status: 'draft',
//             invitationCode: [],
//             memories: [],
//           },
//         ],
//         publishedStories: [
//           {
//             id: 4,
//             user_id: 3,
//             title: 'test joker',
//             description:
//               "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hajsjs",
//             url: 'test-joker-1',
//             private: false,
//             password: 'public',
//             cover_image: 'stories/test joker/HD-wallpaper-comics-joker-dc-comics.jpeg',
//             story_details: {
//               prompts: {
//                 share_a_memory_fun: true,
//               },
//               general_info: {
//                 class_purpose: {
//                   purpose_of_class: [
//                     {
//                       name_of_class: '',
//                       description_of_event: '',
//                     },
//                   ],
//                   general_notes_section: {
//                     general_information: '',
//                   },
//                 },
//                 class_information: {
//                   name_of_class: [
//                     {
//                       end_date: '',
//                       start_date: '',
//                       name_of_class: '',
//                     },
//                   ],
//                   associated_school: {
//                     city: '',
//                     state: '',
//                     street: '',
//                     province: '',
//                     zip_code: '',
//                     name_of_school: '',
//                   },
//                 },
//                 classmates_involved: {
//                   classmates_involved: [
//                     {
//                       name: '',
//                       suffix: '',
//                       lastname: '',
//                       maiden_name: '',
//                       second_name: '',
//                     },
//                   ],
//                 },
//               },
//               type_of_story: 'classmates_story',
//             },
//             created_at: '2024-05-16T15:02:54.625Z',
//             updated_at: '2024-06-10T20:12:08.846Z',
//             status: 'published',
//             invitationCode: [],
//             memories: [
//               {
//                 id: 7,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'text massive rich ',
//                 description: 'massive rich',
//                 asset:
//                   '[{"type":"paragraph","children":[{"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum","fontSize":"12px"}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\"de Finibus Bonorum et Malorum\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\"Lorem ipsum dolor sit amet..\\", comes from a line in section 1.10.32."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\"de Finibus Bonorum et Malorum\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}]}]',
//                 type: 'text',
//                 asset_type: 'text',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-16T15:09:04.402Z',
//                 updated_at: '2024-05-16T15:09:04.402Z',
//                 approved: true,
//               },
//               {
//                 id: 153,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test',
//                 description: '',
//                 asset: 'stories/test joker/memory/Screenshot 2023-02-09 at 4.33.21 PM.png',
//                 type: 'image',
//                 asset_type: 'image/png',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T16:42:50.618Z',
//                 updated_at: '2024-06-03T16:42:50.618Z',
//                 approved: true,
//               },
//               {
//                 id: 93,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'ssss',
//                 description: 'ddddd',
//                 asset: 'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {},
//                 created_at: '2024-05-21T17:45:15.979Z',
//                 updated_at: '2024-05-21T17:45:15.979Z',
//                 approved: true,
//               },
//               {
//                 id: 154,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'video test large vertical',
//                 description: '',
//                 asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                 type: 'video',
//                 asset_type: 'video/mp4',
//                 preview_asset: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryVideo: [
//                     {
//                       thumb: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/4678261-hd_1080_1920_25fps-1080p.mp4',
//                     },
//                     {
//                       thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                       video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-03T17:01:09.186Z',
//                 updated_at: '2024-06-03T17:05:43.151Z',
//                 approved: true,
//               },
//               {
//                 id: 86,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'all additional',
//                 description: 'aditional resource',
//                 asset: 'stories/test joker/memory/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'test this',
//                           fontSize: '12px',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryAudio: ['stories/test joker/memories/sample.wav'],
//                   complementaryImage: [
//                     'stories/test joker/memories/HD-wallpaper-comics-joker-dc-comics.jpeg',
//                     'stories/test joker/memories/eye-solid.svg',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/photo-1564754943164-e83c08469116.avif',
//                     'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//                     'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//                     'stories/test joker/memories/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//                   ],
//                 },
//                 created_at: '2024-05-19T16:37:09.168Z',
//                 updated_at: '2024-06-03T17:22:36.567Z',
//                 approved: true,
//               },
//               {
//                 id: 162,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'test final',
//                 description: '',
//                 asset: 'stories/test joker/memory/PHOTO-2024-06-04-21-11-50 3.jpg',
//                 type: 'image',
//                 asset_type: 'image/jpeg',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: '',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 created_at: '2024-06-05T12:55:46.705Z',
//                 updated_at: '2024-06-05T12:55:46.705Z',
//                 approved: true,
//               },
//               {
//                 id: 6,
//                 user_id: 3,
//                 story_id: 4,
//                 title: 'Mariposa',
//                 description: 'Vídeo ',
//                 asset: 'videos/IMG_9665.mov',
//                 type: 'video',
//                 asset_type: 'video/quicktime',
//                 preview_asset: null,
//                 prompt: 'share_a_memory_fun',
//                 memory_details: {
//                   complementaryText: [
//                     {
//                       type: 'paragraph',
//                       children: [
//                         {
//                           text: 'complementario estoy escribiendo rápido o normal, pero se demora mucho no sé ahora si vuelve a pasar… si, es muy lento',
//                           fontSize: '1rem',
//                         },
//                       ],
//                     },
//                   ],
//                   complementaryImage: [
//                     'stories/test joker/memories/IMG_0426.webp',
//                     'stories/test joker/memories/IMG_0560.webp',
//                     'stories/test joker/memories/IMG_0343.webp',
//                     'stories/test joker/memories/IMG_0254.webp',
//                     'stories/test joker/memories/IMG_0248.webp',
//                     'stories/test joker/memories/IMG_0227.webp',
//                   ],
//                 },
//                 created_at: '2024-05-16T15:06:24.187Z',
//                 updated_at: '2024-06-06T22:27:23.991Z',
//                 approved: true,
//               },
//             ],
//           },
//         ],
//         collaboratorStories: [],
//       },
//     },
//     auth: {
//       isAuth: true,
//       user: {
//         id: 102,
//         name: 'gerards',
//         lastname: 'miot',
//         email: 'mauricemiot18@gmail.com',
//         phonenumber: '134234',
//         address_city: 'testing',
//         address_country: null,
//         address_line_1: '2',
//         address_line_2: 'pepepe',
//         address_postal_code: '1010',
//         address_state: 'WA',
//         picture: null,
//         description: 'halossss',
//         recover_code: '775938',
//         created_at: '2024-04-01T12:30:06.304Z',
//         updated_at: '2024-04-01T17:20:59.355Z',
//         googleAccessToken: null,
//         facebookAccessToken: null,
//       },
//     },
//     intermitence: {
//       actualSection: 'title 1',
//     },
//     story: {
//       createStep: 0,
//     },
//     memory: {
//       mediaScreenType: 'list',
//     },
//   });
//   it('render Appbar in story create', () => {
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//   });
//   it('render Appbar in  story create mobile ', () => {
//     cy.viewport(414, 896);
//     mount(
//       <AppContainer store={store}>
//         <MuiAppBar />
//       </AppContainer>,
//     );
//   });
// });
