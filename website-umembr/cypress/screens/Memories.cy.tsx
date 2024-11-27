// import React from 'react';
// import { mount } from '@cypress/react18';
// import { Memories } from '@/screens';
// import AppContainer from '../components/AppContainer';
// import configureStore from 'redux-mock-store';
// const mockStore = configureStore([]);
// import * as NextRouter from 'next/router';
// import { RemoveCollaborator } from '@/screens/Memories/components/AddCollaborators/RemoveCollaborator';
// import { PrivateStoryModal } from '@/screens/Memories/components/PrivateStoryModal';
// import { FloatingMemories, MemoryFloatingItem } from '@/screens/Memories/components';

// describe('Render Memories screen', () => {
//   beforeEach(() => {
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: '/app/memories',
//       query: { id: '' },
//       push: () => '/app/memories/create',
//     });
//   });
//   const storeAuth: any = mockStore({
//     auth: {
//       isAuth: true,
//     },
//     story: {
//       story: [],
//     },
//     memory: {
//       createMemoryStep: 1,
//       mediaType: 'image',
//       showMediaButtons: false,
//       mediaScreenType: 'list',
//       memoriesLoaded: [
//         {
//           id: 6,
//           user_id: 3,
//           story_id: 4,
//           title: 'test video ',
//           description:
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been tejdjdjdjdjdjdn jsjs hd dnkskwk jskdks jsjdhns hshsbks njcjcbdsk ncjcjudnej',
//           asset: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps.mp4',
//           type: 'video',
//           asset_type: 'video/mp4',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-16T15:06:24.187Z',
//           updated_at: '2024-05-16T15:06:24.187Z',
//           approved: true,
//         },
//         {
//           id: 7,
//           user_id: 3,
//           story_id: 4,
//           title: 'text massive rich ',
//           description: 'massive rich',
//           asset:
//             '[{"type":"paragraph","children":[{"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum","fontSize":"12px"}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\"de Finibus Bonorum et Malorum\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\"Lorem ipsum dolor sit amet..\\", comes from a line in section 1.10.32."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\"de Finibus Bonorum et Malorum\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}]}]',
//           type: 'text',
//           asset_type: 'text',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-16T15:09:04.402Z',
//           updated_at: '2024-05-16T15:09:04.402Z',
//           approved: true,
//         },
//         {
//           id: 65,
//           user_id: 3,
//           story_id: 4,
//           title: 'test',
//           description: 'pepeppee',
//           asset:
//             'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//           type: 'image',
//           asset_type: 'image/png',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-17T15:43:21.240Z',
//           updated_at: '2024-05-17T15:43:21.240Z',
//           approved: true,
//         },
//         {
//           id: 66,
//           user_id: 3,
//           story_id: 4,
//           title: 'pepepe',
//           description: 'snhjhshshshs',
//           asset: 'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//           type: 'image',
//           asset_type: 'image/jpeg',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-17T15:43:35.264Z',
//           updated_at: '2024-05-17T15:43:35.264Z',
//           approved: true,
//         },
//         {
//           id: 86,
//           user_id: 3,
//           story_id: 4,
//           title: 'all additional',
//           description: 'aditional resource',
//           asset: 'stories/test joker/memories/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//           type: 'image',
//           asset_type: 'image/jpeg',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {
//             complementaryText: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     text: 'test this',
//                     fontSize: '12px',
//                   },
//                 ],
//               },
//             ],
//             complementaryAudio: ['stories/test joker/memories/sample.wav'],
//             complementaryImage: [
//               'stories/test joker/memories/eye-solid.svg',
//               'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//             ],
//             complementaryVideo: [
//               {
//                 thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                 video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//               },
//             ],
//           },
//           created_at: '2024-05-19T16:37:09.168Z',
//           updated_at: '2024-05-19T16:37:09.168Z',
//           approved: true,
//         },
//       ],
//       newMemoryCreated: true,
//       memoryEdit: null,
//       memoryPreview: null,
//     },
//     intermitence: {
//       loading: false,
//     },
//     notifications: [],
//   });

//   it('Render Memories', () => {
//     mount(
//       <AppContainer store={storeAuth}>
//         <Memories />
//       </AppContainer>,
//     );
//   });
//   it('Render Memories', () => {
//     mount(
//       <AppContainer store={storeAuth}>
//         <Memories />
//       </AppContainer>,
//     );
//   });
// });

// describe('Render  Memories Detail', () => {
//   beforeEach(() => {
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: '/app/memories',
//       query: { memoryId: '86' },
//       push: () => '/app/memories/create',
//     });
//   });
//   const storePreview: any = mockStore({
//     auth: {
//       isAuth: true,
//     },
//     story: {
//       story: [],
//     },
//     memory: {
//       createMemoryStep: 1,
//       mediaType: 'image',
//       showMediaButtons: false,
//       mediaScreenType: 'list',
//       memoriesLoaded: [
//         {
//           id: 6,
//           user_id: 3,
//           story_id: 4,
//           title: 'test video ',
//           description:
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been tejdjdjdjdjdjdn jsjs hd dnkskwk jskdks jsjdhns hshsbks njcjcbdsk ncjcjudnej',
//           asset: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps.mp4',
//           type: 'video',
//           asset_type: 'video/mp4',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-16T15:06:24.187Z',
//           updated_at: '2024-05-16T15:06:24.187Z',
//           approved: true,
//         },
//         {
//           id: 7,
//           user_id: 3,
//           story_id: 4,
//           title: 'text massive rich ',
//           description: 'massive rich',
//           asset:
//             '[{"type":"paragraph","children":[{"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum","fontSize":"12px"}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\"de Finibus Bonorum et Malorum\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\"Lorem ipsum dolor sit amet..\\", comes from a line in section 1.10.32."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\"de Finibus Bonorum et Malorum\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}]}]',
//           type: 'text',
//           asset_type: 'text',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-16T15:09:04.402Z',
//           updated_at: '2024-05-16T15:09:04.402Z',
//           approved: true,
//         },
//         {
//           id: 65,
//           user_id: 3,
//           story_id: 4,
//           title: 'test',
//           description: 'pepeppee',
//           asset:
//             'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//           type: 'image',
//           asset_type: 'image/png',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-17T15:43:21.240Z',
//           updated_at: '2024-05-17T15:43:21.240Z',
//           approved: true,
//         },
//         {
//           id: 66,
//           user_id: 3,
//           story_id: 4,
//           title: 'pepepe',
//           description: 'snhjhshshshs',
//           asset: 'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//           type: 'image',
//           asset_type: 'image/jpeg',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-17T15:43:35.264Z',
//           updated_at: '2024-05-17T15:43:35.264Z',
//           approved: true,
//         },
//         {
//           id: 86,
//           user_id: 3,
//           story_id: 4,
//           title: 'all additional',
//           description: 'aditional resource',
//           asset: 'stories/test joker/memories/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//           type: 'image',
//           asset_type: 'image/jpeg',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {
//             complementaryText: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     text: 'test this',
//                     fontSize: '12px',
//                   },
//                 ],
//               },
//             ],
//             complementaryAudio: ['stories/test joker/memories/sample.wav'],
//             complementaryImage: [
//               'stories/test joker/memories/eye-solid.svg',
//               'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//             ],
//             complementaryVideo: [
//               {
//                 thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                 video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//               },
//               {
//                 thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                 video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//               },
//             ],
//           },
//           created_at: '2024-05-19T16:37:09.168Z',
//           updated_at: '2024-05-19T16:37:09.168Z',
//           approved: true,
//         },
//       ],
//       newMemoryCreated: true,
//       memoryEdit: null,
//       memoryPreview: {
//         id: 65,
//         user_id: 3,
//         story_id: 4,
//         title: 'test',
//         description: 'pepeppee',
//         asset:
//           'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//         type: 'image',
//         asset_type: 'image/png',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun',
//         memory_details: {},
//         created_at: '2024-05-17T15:43:21.240Z',
//         updated_at: '2024-05-17T15:43:21.240Z',
//         approved: true,
//       },
//     },
//     intermitence: {
//       loading: false,
//     },
//     notifications: [],
//   });

//   const storeEmpty = mockStore({
//     auth: {
//       isAuth: true,
//     },
//     story: {
//       story: [],
//     },
//     memory: {
//       createMemoryStep: 1,
//       mediaType: 'image',
//       showMediaButtons: false,
//       mediaScreenType: 'list',

//       memoriesLoaded: [],
//       newMemoryCreated: true,
//       memoryEdit: null,
//     },
//     intermitence: {
//       showPublishModal: false,
//     },
//     notifications: [],
//   });

//   it('init with preview memory ', () => {
//     mount(
//       <AppContainer store={storePreview}>
//         <Memories />
//       </AppContainer>,
//     );
//   });

//   // it('init with change type media data of memory ', () => {
//   //   mount(
//   //     <AppContainer store={storePreview}>
//   //       <Memories />
//   //     </AppContainer>,
//   //   );
//   //   cy.get('.css-6dkdsl > :nth-child(2) > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//   //   cy.get(':nth-child(3) > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//   //   cy.get(':nth-child(4) > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//   //   cy.get(':nth-child(5) > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//   // });
//   it('select images ', () => {
//     mount(
//       <AppContainer store={storePreview}>
//         <Memories />
//       </AppContainer>,
//     );
//     // cy.get('.css-6dkdsl > :nth-child(2) > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//   });
//   it('select images ', () => {
//     mount(
//       <AppContainer store={storePreview}>
//         <Memories />
//       </AppContainer>,
//     );
//     // cy.get('.css-6dkdsl > :nth-child(3) > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//     // cy.get('.MuiGrid-container > :nth-child(2) > .MuiBox-root > [data-nimg="fill"]').click({ force: true });
//   });
// });

// describe('Render  Story Detail', () => {
//   beforeEach(() => {
//     const pushStub = cy.stub().as('routerPush');
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: '/app/memories',
//       asPath: '/app/memories',
//       push: pushStub,
//     });
//   });
//   const storePreview: any = mockStore({
//     auth: {
//       isAuth: true,
//     },
//     story: {
//       story: {
//         id: 53,
//         user_id: 3,
//         title: 'probando 2',
//         description: 'a ver',
//         url: 'probando-2-1',
//         private: false,
//         password: ' ',
//         cover_image: 'stories/probando 2/434031546_367648066302881_5865827799105303827_n.jpg',
//         story_details: {
//           prompts: {
//             share_a_memory_fun: true,
//             share_a_memory_challenge: true,
//           },
//           general_info: {
//             class_purpose: {
//               purpose_of_class: [
//                 {
//                   name_of_class: 'quizas',
//                   description_of_event: 'aqui',
//                 },
//               ],
//               general_notes_section: {
//                 general_information: '',
//               },
//             },
//             class_involved: {
//               classmates_involved: [
//                 {
//                   name: '',
//                   suffix: '',
//                   lastname: '',
//                   maiden_name: '',
//                   second_name: '',
//                 },
//               ],
//             },
//             class_information: {
//               name_of_class: [
//                 {
//                   end_date: '2024-05-16T04:00:00.000Z',
//                   start_date: '2024-05-22T04:00:00.000Z',
//                   name_of_class: 'a ver 2',
//                 },
//               ],
//               associated_school: {
//                 city: '',
//                 state: '',
//                 street: '',
//                 province: '',
//                 zip_code: '',
//                 name_of_school: '',
//               },
//             },
//           },
//           type_of_story: 'classmates_story',
//         },
//         created_at: '2024-05-24T11:34:11.245Z',
//         updated_at: '2024-05-24T11:34:11.245Z',
//         status: 'draft',
//         invitationCode: [],
//       },
//     },
//     memory: {
//       createMemoryStep: 1,
//       mediaType: 'image',
//       showMediaButtons: false,
//       mediaScreenType: 'list',
//       memoriesLoaded: [
//         {
//           id: 6,
//           user_id: 3,
//           story_id: 4,
//           title: 'test video ',
//           description:
//             'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been tejdjdjdjdjdjdn jsjs hd dnkskwk jskdks jsjdhns hshsbks njcjcbdsk ncjcjudnej',
//           asset: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps.mp4',
//           type: 'video',
//           asset_type: 'video/mp4',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-16T15:06:24.187Z',
//           updated_at: '2024-05-16T15:06:24.187Z',
//           approved: true,
//         },
//         {
//           id: 7,
//           user_id: 3,
//           story_id: 4,
//           title: 'text massive rich ',
//           description: 'massive rich',
//           asset:
//             '[{"type":"paragraph","children":[{"text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum","fontSize":"12px"}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \\"de Finibus Bonorum et Malorum\\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \\"Lorem ipsum dolor sit amet..\\", comes from a line in section 1.10.32."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \\"de Finibus Bonorum et Malorum\\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}]},{"type":"paragraph","children":[{"fontSize":"12px","text":""}]},{"type":"paragraph","children":[{"fontSize":"12px","text":"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}]}]',
//           type: 'text',
//           asset_type: 'text',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-16T15:09:04.402Z',
//           updated_at: '2024-05-16T15:09:04.402Z',
//           approved: true,
//         },
//         {
//           id: 65,
//           user_id: 3,
//           story_id: 4,
//           title: 'test',
//           description: 'pepeppee',
//           asset:
//             'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//           type: 'image',
//           asset_type: 'image/png',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-17T15:43:21.240Z',
//           updated_at: '2024-05-17T15:43:21.240Z',
//           approved: true,
//         },
//         {
//           id: 66,
//           user_id: 3,
//           story_id: 4,
//           title: 'pepepe',
//           description: 'snhjhshshshs',
//           asset: 'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.jpg',
//           type: 'image',
//           asset_type: 'image/jpeg',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {},
//           created_at: '2024-05-17T15:43:35.264Z',
//           updated_at: '2024-05-17T15:43:35.264Z',
//           approved: true,
//         },
//         {
//           id: 86,
//           user_id: 3,
//           story_id: 4,
//           title: 'all additional',
//           description: 'aditional resource',
//           asset: 'stories/test joker/memories/wallpapersden.com_joker-dc-comic-digital-4k_3840x2160.jpg',
//           type: 'image',
//           asset_type: 'image/jpeg',
//           preview_asset: null,
//           prompt: 'share_a_memory_fun',
//           memory_details: {
//             complementaryText: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     text: 'test this',
//                     fontSize: '12px',
//                   },
//                 ],
//               },
//             ],
//             complementaryAudio: ['stories/test joker/memories/sample.wav'],
//             complementaryImage: [
//               'stories/test joker/memories/eye-solid.svg',
//               'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//             ],
//             complementaryVideo: [
//               {
//                 thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                 video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//               },
//               {
//                 thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//                 video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//               },
//             ],
//           },
//           created_at: '2024-05-19T16:37:09.168Z',
//           updated_at: '2024-05-19T16:37:09.168Z',
//           approved: true,
//         },
//       ],
//       newMemoryCreated: true,
//       memoryEdit: null,
//       memoryPreview: {
//         id: 65,
//         user_id: 3,
//         story_id: 4,
//         title: 'test',
//         description: 'pepeppee',
//         asset:
//           'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//         type: 'image',
//         asset_type: 'image/png',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun',
//         memory_details: {},
//         created_at: '2024-05-17T15:43:21.240Z',
//         updated_at: '2024-05-17T15:43:21.240Z',
//         approved: true,
//       },
//     },
//     intermitence: {
//       loading: false,
//     },
//     notifications: {
//       notifications: {
//         allNotifications: [
//           {
//             id: 36,
//             user_id: 3,
//             message: 'You have been invited to collaborate on the "gerard" Story in MEMVY as a collaborator.',
//             title: 'Story Invitation Collaborator',
//             avatar: 'mauricemiot18@gmail.com/434031546_367648066302881_5865827799105303827_n.jpg',
//             actions: {
//               role: 'Story_Collaborator',
//               type: 'COLLABORATION',
//               state: 'UNREAD',
//               story_id: 'bbb-1',
//             },
//             created_at: '2024-06-07T14:36:41.587Z',
//             updated_at: '2024-06-07T14:36:41.587Z',
//           },
//         ],
//         collaborationNotifications: [
//           {
//             id: 36,
//             user_id: 3,
//             message: 'You have been invited to collaborate on the "gerard" Story in MEMVY as a collaborator.',
//             title: 'Story Invitation Collaborator',
//             avatar: 'mauricemiot18@gmail.com/434031546_367648066302881_5865827799105303827_n.jpg',
//             actions: {
//               role: 'Story_Collaborator',
//               type: 'COLLABORATION',
//               state: 'UNREAD',
//               story_id: 'bbb-1',
//             },
//             created_at: '2024-06-07T14:36:41.587Z',
//             updated_at: '2024-06-07T14:36:41.587Z',
//           },
//         ],
//         otherNotifications: [],
//       },
//     },
//   });

//   it('render story detail ', () => {
//     mount(
//       <AppContainer store={storePreview}>
//         <Memories />
//       </AppContainer>,
//     );
//     cy.get('#rectangle').click();
//     cy.get('.css-6dkdsl > :nth-child(2) > [data-cy="iconButton"] > .MuiButtonBase-root').click();
//   });
// });

// describe('Render  Collaborator Detail', () => {
//   beforeEach(() => {
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: '/app/memories',
//       query: {},
//       push: () => '/app/memories/create',
//     });
//   });

//   const storeEmpty = mockStore({
//     auth: {
//       isAuth: true,
//     },
//     story: {
//       story: [],
//     },
//     memory: {
//       createMemoryStep: 1,
//       mediaType: 'image',
//       showMediaButtons: false,
//       mediaScreenType: 'list',

//       memoriesLoaded: [],
//       newMemoryCreated: true,
//       memoryEdit: null,
//     },
//     intermitence: {
//       showPublishModal: true,
//     },
//     collaborator: {
//       collaborators: [
//         {
//           role_id: 3,
//           user_id: 6,
//           created_at: '2024-06-04T11:46:08.766Z',
//           updated_at: '2024-06-04T15:38:21.071Z',
//           story_id: 4,
//           id: 84,
//           validated: true,
//           user_type: null,
//           user: {
//             id: 6,
//             name: 'Loïc ',
//             lastname: 'Rafique',
//             email: 'memvytest2@yopmail.com',
//             password: '$2b$10$VqFN4Cb1artzCu.UhPsVvOoI0ncv40D3Yuq6zyD/vi3SpcetVcBcu',
//             phonenumber: '1222223252',
//             address_city: '',
//             address_country: null,
//             address_line_1: '',
//             address_line_2: null,
//             address_postal_code: null,
//             address_state: 'ID',
//             picture: null,
//             description:
//               'Test 🍓 ☀ 🌩 combien coûte une baguette bonjour combien coûtant une croissant une croissant une pizza bonjour merci combien coûte ',
//             recover_code: '335319',
//             created_at: '2024-05-16T15:52:37.915Z',
//             updated_at: '2024-08-17T05:21:43.979Z',
//             facebookAccessToken: null,
//             googleAccessToken: null,
//             appleuserAccessToken: null,
//             referalCode: ' XPQ6f',
//             referenceId: null,
//             viewMemories: [
//               250, 36, 38, 31, 40, 57, 343, 88, 39, 368, 35, 503, 283, 153, 221, 222, 216, 50, 507, 45, 32, 10, 19, 18,
//               53, 8, 26, 21, 37,
//             ],
//             referalsCodeId: null,
//           },
//           role: {
//             id: 3,
//             name: 'Story_Collaborator',
//             preset: true,
//             created_at: '2024-05-16T13:20:15.293Z',
//             updated_at: '2024-05-16T13:20:15.293Z',
//           },
//         },
//         {
//           role_id: 3,
//           user_id: 96,
//           created_at: '2024-06-25T16:18:19.740Z',
//           updated_at: '2024-06-25T16:18:19.909Z',
//           story_id: 4,
//           id: 194,
//           validated: true,
//           user_type: 'other',
//           user: {
//             id: 96,
//             name: 'maurice',
//             lastname: 'miot',
//             email: 'maurice.yggdrasil@gmail.com',
//             password: '',
//             phonenumber: '',
//             address_city: '',
//             address_country: '',
//             address_line_1: '',
//             address_line_2: '',
//             address_postal_code: '',
//             address_state: '',
//             picture: null,
//             description: null,
//             recover_code: null,
//             created_at: '2024-06-25T16:18:19.715Z',
//             updated_at: '2024-06-25T16:18:19.715Z',
//             facebookAccessToken: null,
//             googleAccessToken:
//               'ya29.a0AXooCgtk6mCeLjT6T9EQPsWNHmQCRq4-5uIJMsVIYSmAZnnaQyuFKVW1-m1-fx60PSQUse_o3MJUzLdQrAJGN5fhZR8nWGK0ijYubz2G_4-YBQ-JPvFkZRdAi5-pUB0WC2H64gVmGsJ1xpyXLg3Kot9q6BCImynL2QaCgYKAX4SARMSFQHGX2Mi4KgYWaxKCgYZmY13NxsabQ0169',
//             appleuserAccessToken: null,
//             referalCode: null,
//             referenceId: null,
//             viewMemories: [],
//             referalsCodeId: null,
//           },
//           role: {
//             id: 3,
//             name: 'Story_Collaborator',
//             preset: true,
//             created_at: '2024-05-16T13:20:15.293Z',
//             updated_at: '2024-05-16T13:20:15.293Z',
//           },
//         },
//       ],
//     },
//     notifications: [],
//   });

//   const storePublish = mockStore({
//     auth: {
//       isAuth: true,
//     },
//     story: {
//       story: [],
//     },
//     memory: {},
//     intermitence: {
//       showPublishModal: true,
//     },
//     collaborator: [
//       {
//         collaborators: [
//           {
//             role_id: 3,
//             user_id: 6,
//             created_at: '2024-06-04T11:46:08.766Z',
//             updated_at: '2024-06-04T15:38:21.071Z',
//             story_id: 4,
//             id: 84,
//             validated: true,
//             user_type: null,
//             user: {
//               id: 6,
//               name: 'Loïc ',
//               lastname: 'Rafique',
//               email: 'memvytest2@yopmail.com',
//               password: '$2b$10$VqFN4Cb1artzCu.UhPsVvOoI0ncv40D3Yuq6zyD/vi3SpcetVcBcu',
//               phonenumber: '1222223252',
//               address_city: '',
//               address_country: null,
//               address_line_1: '',
//               address_line_2: null,
//               address_postal_code: null,
//               address_state: 'ID',
//               picture: null,
//               description:
//                 'Test 🍓 ☀ 🌩 combien coûte une baguette bonjour combien coûtant une croissant une croissant une pizza bonjour merci combien coûte ',
//               recover_code: '335319',
//               created_at: '2024-05-16T15:52:37.915Z',
//               updated_at: '2024-08-17T05:21:43.979Z',
//               facebookAccessToken: null,
//               googleAccessToken: null,
//               appleuserAccessToken: null,
//               referalCode: ' XPQ6f',
//               referenceId: null,
//               viewMemories: [
//                 250, 36, 38, 31, 40, 57, 343, 88, 39, 368, 35, 503, 283, 153, 221, 222, 216, 50, 507, 45, 32, 10, 19,
//                 18, 53, 8, 26, 21, 37,
//               ],
//               referalsCodeId: null,
//             },
//             role: {
//               id: 3,
//               name: 'Story_Collaborator',
//               preset: true,
//               created_at: '2024-05-16T13:20:15.293Z',
//               updated_at: '2024-05-16T13:20:15.293Z',
//             },
//           },
//           {
//             role_id: 3,
//             user_id: 96,
//             created_at: '2024-06-25T16:18:19.740Z',
//             updated_at: '2024-06-25T16:18:19.909Z',
//             story_id: 4,
//             id: 194,
//             validated: true,
//             user_type: 'other',
//             user: {
//               id: 96,
//               name: 'maurice',
//               lastname: 'miot',
//               email: 'maurice.yggdrasil@gmail.com',
//               password: '',
//               phonenumber: '',
//               address_city: '',
//               address_country: '',
//               address_line_1: '',
//               address_line_2: '',
//               address_postal_code: '',
//               address_state: '',
//               picture: null,
//               description: null,
//               recover_code: null,
//               created_at: '2024-06-25T16:18:19.715Z',
//               updated_at: '2024-06-25T16:18:19.715Z',
//               facebookAccessToken: null,
//               googleAccessToken:
//                 'ya29.a0AXooCgtk6mCeLjT6T9EQPsWNHmQCRq4-5uIJMsVIYSmAZnnaQyuFKVW1-m1-fx60PSQUse_o3MJUzLdQrAJGN5fhZR8nWGK0ijYubz2G_4-YBQ-JPvFkZRdAi5-pUB0WC2H64gVmGsJ1xpyXLg3Kot9q6BCImynL2QaCgYKAX4SARMSFQHGX2Mi4KgYWaxKCgYZmY13NxsabQ0169',
//               appleuserAccessToken: null,
//               referalCode: null,
//               referenceId: null,
//               viewMemories: [],
//               referalsCodeId: null,
//             },
//             role: {
//               id: 3,
//               name: 'Story_Collaborator',
//               preset: true,
//               created_at: '2024-05-16T13:20:15.293Z',
//               updated_at: '2024-05-16T13:20:15.293Z',
//             },
//           },
//         ],
//       },
//     ],

//     notifications: [],
//   });
//   it('click Collaboration modal ', () => {
//     mount(
//       <AppContainer store={storeEmpty}>
//         <Memories />
//       </AppContainer>,
//     );
//     cy.get('.css-zto3xe > .MuiGrid-item > .MuiGrid-root > :nth-child(1)').click();
//     cy.get('.css-zto3xe > .MuiGrid-item > .MuiGrid-root > :nth-child(1)').click();
//     cy.get('#email').type('test@gmail.com');
//     cy.get('.css-13i4rnv-MuiGrid-root > .MuiButtonBase-root').click();
//     cy.get('.css-1nford9 > .MuiButton-contained').click();
//   });
//   it('click remove collab modal ', () => {
//     mount(
//       <AppContainer store={storePublish}>
//         <RemoveCollaborator
//           open={true}
//           onClose={() => {}}
//           values={{
//             role_id: 3,
//             user_id: 96,
//             created_at: '2024-06-25T16:18:19.740Z',
//             updated_at: '2024-06-25T16:18:19.909Z',
//             story_id: 4,
//             id: 194,
//             validated: true,
//             user_type: 'other',
//             user: {
//               id: 96,
//               name: 'maurice',
//               lastname: 'miot',
//               email: 'maurice.yggdrasil@gmail.com',
//               password: '',
//               phonenumber: '',
//               address_city: '',
//               address_country: '',
//               address_line_1: '',
//               address_line_2: '',
//               address_postal_code: '',
//               address_state: '',
//               picture: null,
//               description: null,
//               recover_code: null,
//               created_at: '2024-06-25T16:18:19.715Z',
//               updated_at: '2024-06-25T16:18:19.715Z',
//               facebookAccessToken: null,
//               googleAccessToken:
//                 'ya29.a0AXooCgtk6mCeLjT6T9EQPsWNHmQCRq4-5uIJMsVIYSmAZnnaQyuFKVW1-m1-fx60PSQUse_o3MJUzLdQrAJGN5fhZR8nWGK0ijYubz2G_4-YBQ-JPvFkZRdAi5-pUB0WC2H64gVmGsJ1xpyXLg3Kot9q6BCImynL2QaCgYKAX4SARMSFQHGX2Mi4KgYWaxKCgYZmY13NxsabQ0169',
//               appleuserAccessToken: null,
//               referalCode: null,
//               referenceId: null,
//               viewMemories: [],
//               referalsCodeId: null,
//             },
//             role: {
//               id: 3,
//               name: 'Story_Collaborator',
//               preset: true,
//               created_at: '2024-05-16T13:20:15.293Z',
//               updated_at: '2024-05-16T13:20:15.293Z',
//             },
//           }}
//           role={'Story_Collaborator'}
//         />
//       </AppContainer>,
//     );
//     cy.get(':nth-child(2) > .MuiButtonBase-root').click();
//     cy.get(':nth-child(1) > .MuiButtonBase-root').click();
//   });
// });

// describe('Render  Collaborator Detail', () => {
//   beforeEach(() => {
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: 'https://memvy.com/app/story/test-joker-1',
//       query: {},
//       push: () => '/app/memories/create',
//     });
//   });

//   const storePublish = mockStore({
//     auth: {
//       isAuth: true,
//     },
//     story: {
//       story: [],
//     },
//     memory: {},
//     intermitence: {
//       showPublishModal: true,
//     },
//     collaborator: [
//       {
//         collaborators: [
//           {
//             role_id: 3,
//             user_id: 6,
//             created_at: '2024-06-04T11:46:08.766Z',
//             updated_at: '2024-06-04T15:38:21.071Z',
//             story_id: 4,
//             id: 84,
//             validated: true,
//             user_type: null,
//             user: {
//               id: 6,
//               name: 'Loïc ',
//               lastname: 'Rafique',
//               email: 'memvytest2@yopmail.com',
//               password: '$2b$10$VqFN4Cb1artzCu.UhPsVvOoI0ncv40D3Yuq6zyD/vi3SpcetVcBcu',
//               phonenumber: '1222223252',
//               address_city: '',
//               address_country: null,
//               address_line_1: '',
//               address_line_2: null,
//               address_postal_code: null,
//               address_state: 'ID',
//               picture: null,
//               description:
//                 'Test 🍓 ☀ 🌩 combien coûte une baguette bonjour combien coûtant une croissant une croissant une pizza bonjour merci combien coûte ',
//               recover_code: '335319',
//               created_at: '2024-05-16T15:52:37.915Z',
//               updated_at: '2024-08-17T05:21:43.979Z',
//               facebookAccessToken: null,
//               googleAccessToken: null,
//               appleuserAccessToken: null,
//               referalCode: ' XPQ6f',
//               referenceId: null,
//               viewMemories: [
//                 250, 36, 38, 31, 40, 57, 343, 88, 39, 368, 35, 503, 283, 153, 221, 222, 216, 50, 507, 45, 32, 10, 19,
//                 18, 53, 8, 26, 21, 37,
//               ],
//               referalsCodeId: null,
//             },
//             role: {
//               id: 3,
//               name: 'Story_Collaborator',
//               preset: true,
//               created_at: '2024-05-16T13:20:15.293Z',
//               updated_at: '2024-05-16T13:20:15.293Z',
//             },
//           },
//           {
//             role_id: 3,
//             user_id: 96,
//             created_at: '2024-06-25T16:18:19.740Z',
//             updated_at: '2024-06-25T16:18:19.909Z',
//             story_id: 4,
//             id: 194,
//             validated: true,
//             user_type: 'other',
//             user: {
//               id: 96,
//               name: 'maurice',
//               lastname: 'miot',
//               email: 'maurice.yggdrasil@gmail.com',
//               password: '',
//               phonenumber: '',
//               address_city: '',
//               address_country: '',
//               address_line_1: '',
//               address_line_2: '',
//               address_postal_code: '',
//               address_state: '',
//               picture: null,
//               description: null,
//               recover_code: null,
//               created_at: '2024-06-25T16:18:19.715Z',
//               updated_at: '2024-06-25T16:18:19.715Z',
//               facebookAccessToken: null,
//               googleAccessToken:
//                 'ya29.a0AXooCgtk6mCeLjT6T9EQPsWNHmQCRq4-5uIJMsVIYSmAZnnaQyuFKVW1-m1-fx60PSQUse_o3MJUzLdQrAJGN5fhZR8nWGK0ijYubz2G_4-YBQ-JPvFkZRdAi5-pUB0WC2H64gVmGsJ1xpyXLg3Kot9q6BCImynL2QaCgYKAX4SARMSFQHGX2Mi4KgYWaxKCgYZmY13NxsabQ0169',
//               appleuserAccessToken: null,
//               referalCode: null,
//               referenceId: null,
//               viewMemories: [],
//               referalsCodeId: null,
//             },
//             role: {
//               id: 3,
//               name: 'Story_Collaborator',
//               preset: true,
//               created_at: '2024-05-16T13:20:15.293Z',
//               updated_at: '2024-05-16T13:20:15.293Z',
//             },
//           },
//         ],
//       },
//     ],

//     notifications: [],
//   });

//   it('show private modal ', () => {
//     mount(
//       <AppContainer store={storePublish}>
//         <PrivateStoryModal open={true} onClose={() => {}} />
//       </AppContainer>,
//     );
//     cy.get('#code').type('test12');
//     cy.get('form > .MuiButtonBase-root').click();
//   });
// });

// describe('Render  Collaborator Detail', () => {
//   beforeEach(() => {
//     cy.stub(NextRouter, 'useRouter').returns({
//       pathname: '/app/story/dragon-perigrifo-asombrosamente-grande-1',
//       query: {},
//       push: () => '/app/story/dragon-perigrifo-asombrosamente-grande-1',
//     });
//   });

//   const storePublish = mockStore({
//     auth: {
//       isAuth: true,
//       user: {
//         id: 3,
//         name: 'gerard',
//         lastname: 'ijiojio',
//         email: 'mauricemiot18@gmail.com',
//         phonenumber: '04211279301',
//         address_city: 'tu address',
//         address_country: null,
//         address_line_1: null,
//         address_line_2: null,
//         address_postal_code: null,
//         address_state: 'FL',
//         picture: 'userClient=3/test11.jpg',
//         description: 'about me',
//         recover_code: '999556',
//         created_at: '2024-05-16T13:21:31.987Z',
//         updated_at: '2024-08-07T14:28:56.401Z',
//         facebookAccessToken: null,
//         googleAccessToken:
//           'ya29.a0AXooCgtuGyCwH8MQBmeNa7rYWDP0r_EXZy1o_rrGwXOe51LFAls2mk4BNPxdCRrlCIQR0LBuT-TVqmhoYQr-i0fzh-ERCc3MuAQiDlecUKR3a0vThePnZQoNPiZfONWKCPkw0pipRsU1ZAK_1RvxBDqIX-fRfZFdZnO1aCgYKAeQSARESFQHGX2MibN9lYuGkfrQfCTbz823Qfg0171',
//         appleuserAccessToken: null,
//         referalCode: ' JimyE',
//         referenceId: null,
//         viewMemories: [
//           6, 153, 93, 154, 86, 279, 7, 162, 283, 309, 416, 417, 419, 443, 447, 449, 448, 450, 442, 446, 451, 367, 489,
//           492, 490, 371, 391, 562, 263,
//         ],
//         referalsCodeId: null,
//         roles: [
//           {
//             role_id: 1,
//             user_id: 3,
//             created_at: '2024-05-16T13:21:31.990Z',
//             updated_at: '2024-05-16T13:21:31.990Z',
//             story_id: null,
//             id: 3,
//             validated: false,
//             user_type: null,
//             role: {
//               id: 1,
//               name: 'Client',
//               preset: true,
//               created_at: '2024-05-16T13:20:14.887Z',
//               updated_at: '2024-07-22T12:24:44.576Z',
//               permissions: [
//                 {
//                   id: 1,
//                   name: 'CLIENT_STORY_CREATE',
//                   created_at: '2024-05-16T13:20:10.400Z',
//                   updated_at: '2024-05-16T13:20:10.400Z',
//                 },
//                 {
//                   id: 2,
//                   name: 'CLIENT_STORY_GET',
//                   created_at: '2024-05-16T13:20:10.650Z',
//                   updated_at: '2024-05-16T13:20:10.650Z',
//                 },
//               ],
//             },
//           },
//           {
//             role_id: 2,
//             user_id: 3,
//             created_at: '2024-08-01T13:32:42.221Z',
//             updated_at: '2024-08-01T13:32:42.221Z',
//             story_id: null,
//             id: 336,
//             validated: false,
//             user_type: null,
//             role: {
//               id: 2,
//               name: 'Story_Owner',
//               preset: true,
//               created_at: '2024-05-16T13:20:15.133Z',
//               updated_at: '2024-05-16T13:20:15.133Z',
//               permissions: [
//                 {
//                   id: 2,
//                   name: 'CLIENT_STORY_GET',
//                   created_at: '2024-05-16T13:20:10.650Z',
//                   updated_at: '2024-05-16T13:20:10.650Z',
//                 },
//                 {
//                   id: 3,
//                   name: 'CLIENT_STORY_UPDATE',
//                   created_at: '2024-05-16T13:20:10.806Z',
//                   updated_at: '2024-05-16T13:20:10.806Z',
//                 },
//                 {
//                   id: 4,
//                   name: 'CLIENT_STORY_DELETE',
//                   created_at: '2024-05-16T13:20:10.963Z',
//                   updated_at: '2024-05-16T13:20:10.963Z',
//                 },
//                 {
//                   id: 5,
//                   name: 'CLIENT_MEMORY_CREATE',
//                   created_at: '2024-05-16T13:20:11.124Z',
//                   updated_at: '2024-05-16T13:20:11.124Z',
//                 },
//                 {
//                   id: 6,
//                   name: 'CLIENT_MEMORY_GET',
//                   created_at: '2024-05-16T13:20:11.288Z',
//                   updated_at: '2024-05-16T13:20:11.288Z',
//                 },
//                 {
//                   id: 7,
//                   name: 'CLIENT_MEMORY_UPDATE',
//                   created_at: '2024-05-16T13:20:11.450Z',
//                   updated_at: '2024-05-16T13:20:11.450Z',
//                 },
//                 {
//                   id: 8,
//                   name: 'CLIENT_MEMORY_DELETE',
//                   created_at: '2024-05-16T13:20:11.615Z',
//                   updated_at: '2024-05-16T13:20:11.615Z',
//                 },
//                 {
//                   id: 9,
//                   name: 'CLIENT_COLLABORATOR_ADD',
//                   created_at: '2024-05-16T13:20:11.779Z',
//                   updated_at: '2024-05-16T13:20:11.779Z',
//                 },
//                 {
//                   id: 10,
//                   name: 'CLIENT_COLLABORATOR_REMOVE',
//                   created_at: '2024-05-16T13:20:11.942Z',
//                   updated_at: '2024-05-16T13:20:11.942Z',
//                 },
//               ],
//             },
//           },
//         ],
//         token:
//           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJtYXVyaWNlbWlvdDE4QGdtYWlsLmNvbSIsImlhdCI6MTcyMzk5MjI1OCwiZXhwIjoxNzI0NTk3MDU4fQ.7Lz4IdcmwFF6lhtJHOIQAeDDRWyh0GVwbxT_6s_SnhY',
//         password: '$2b$10$Y9J7H41Ri7vEvHRMmtoOrewaoniGRK5vZfegQ0EsIPSVXyS/EuYYm',
//         storyCount: 33,
//         collaboratorCount: 3,
//         collaborationsCount: 0,
//         collaborators: [
//           {
//             id: 95,
//             name: 'gerard',
//             lastname: 'miot',
//             email: 'gmiot@aimonkey.io',
//             phonenumber: '1223323223',
//             address_city: null,
//             address_country: null,
//             address_line_1: null,
//             address_line_2: null,
//             address_postal_code: null,
//             address_state: null,
//             picture: null,
//             description: 'sss',
//             recover_code: null,
//             created_at: '2024-06-25T11:39:27.060Z',
//             updated_at: '2024-06-25T11:39:27.060Z',
//             facebookAccessToken: null,
//             googleAccessToken: null,
//             appleuserAccessToken: null,
//             referalCode: null,
//             referenceId: null,
//             viewMemories: [],
//             referalsCodeId: null,
//             user_type: 'other',
//           },
//           {
//             id: 6,
//             name: 'Loïc ',
//             lastname: 'Rafique',
//             email: 'memvytest2@yopmail.com',
//             phonenumber: '1222223252',
//             address_city: '',
//             address_country: null,
//             address_line_1: '',
//             address_line_2: null,
//             address_postal_code: null,
//             address_state: 'ID',
//             picture: null,
//             description:
//               'Test 🍓 ☀ 🌩 combien coûte une baguette bonjour combien coûtant une croissant une croissant une pizza bonjour merci combien coûte ',
//             recover_code: '335319',
//             created_at: '2024-05-16T15:52:37.915Z',
//             updated_at: '2024-08-17T05:21:43.979Z',
//             facebookAccessToken: null,
//             googleAccessToken: null,
//             appleuserAccessToken: null,
//             referalCode: ' XPQ6f',
//             referenceId: null,
//             viewMemories: [
//               250, 36, 38, 31, 40, 57, 343, 88, 39, 368, 35, 503, 283, 153, 221, 222, 216, 50, 507, 45, 32, 10, 19, 18,
//               53, 8, 26, 21, 37,
//             ],
//             referalsCodeId: null,
//             user_type: null,
//           },
//           {
//             id: 96,
//             name: 'maurice',
//             lastname: 'miot',
//             email: 'maurice.yggdrasil@gmail.com',
//             phonenumber: '',
//             address_city: '',
//             address_country: '',
//             address_line_1: '',
//             address_line_2: '',
//             address_postal_code: '',
//             address_state: '',
//             picture: null,
//             description: null,
//             recover_code: null,
//             created_at: '2024-06-25T16:18:19.715Z',
//             updated_at: '2024-06-25T16:18:19.715Z',
//             facebookAccessToken: null,
//             googleAccessToken:
//               'ya29.a0AXooCgtk6mCeLjT6T9EQPsWNHmQCRq4-5uIJMsVIYSmAZnnaQyuFKVW1-m1-fx60PSQUse_o3MJUzLdQrAJGN5fhZR8nWGK0ijYubz2G_4-YBQ-JPvFkZRdAi5-pUB0WC2H64gVmGsJ1xpyXLg3Kot9q6BCImynL2QaCgYKAX4SARMSFQHGX2Mi4KgYWaxKCgYZmY13NxsabQ0169',
//             appleuserAccessToken: null,
//             referalCode: null,
//             referenceId: null,
//             viewMemories: [],
//             referalsCodeId: null,
//             user_type: 'other',
//           },
//         ],
//       },
//     },
//     story: {
//       story: {
//         id: 4,
//         title: 'test joker',
//         description:
//           "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hajsjs",
//         cover_image: 'stories/test joker/HD-wallpaper-comics-joker-dc-comics.jpeg',
//         story_details: {
//           prompts: {
//             share_a_memory_fun: true,
//           },
//           general_info: {
//             class_purpose: {
//               purpose_of_class: [
//                 {
//                   name_of_class: '',
//                   description_of_event: '',
//                 },
//               ],
//               general_notes_section: {
//                 general_information: '',
//               },
//             },
//             class_information: {
//               name_of_class: [
//                 {
//                   end_date: '',
//                   start_date: '',
//                   name_of_class: '',
//                 },
//               ],
//               associated_school: {
//                 city: '',
//                 state: '',
//                 street: '',
//                 province: '',
//                 zip_code: '',
//                 name_of_school: '',
//               },
//             },
//             classmates_involved: {
//               classmates_involved: [
//                 {
//                   name: 'tomas',
//                   suffix: 'in',
//                   lastname: 'issue',
//                   maiden_name: 'back office',
//                   second_name: 'test',
//                 },
//               ],
//             },
//           },
//           type_of_story: 'classmates_story',
//         },
//         user_id: 3,
//         private: true,
//         url: 'test-joker-1',
//         status: 'published',
//         password: 'Q3BLV0',
//         confirmPassword: false,
//       },
//     },
//     memory: [
//       {
//         id: 451,
//         user_id: 3,
//         story_id: 236,
//         title: 'hshshs',
//         description: 'aaaaaaa ver',
//         asset:
//           '[{"type":"paragraph","children":[{"text":"PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO PARA CUTIRIMICUARO SUPER CALIFRAGILISTICO ","fontSize":"1rem"}]}]',
//         type: 'text',
//         asset_type: 'text',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun2',
//         memory_details: {},
//         created_at: '2024-07-18T21:05:15.712Z',
//         updated_at: '2024-07-18T21:14:03.253Z',
//         approved: true,
//       },
//       {
//         id: 442,
//         user_id: 3,
//         story_id: 236,
//         title: 'joker',
//         description: '',
//         asset: 'stories/dragon/memory/JOKER.webp',
//         type: 'image',
//         asset_type: 'image/png',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun2',
//         memory_details: {},
//         created_at: '2024-07-18T19:14:50.687Z',
//         updated_at: '2024-07-18T19:14:50.687Z',
//         approved: true,
//       },
//       {
//         id: 447,
//         user_id: 3,
//         story_id: 236,
//         title: 'music',
//         description: '',
//         asset: 'stories/dragon/memory/Motherflowers  Flixi Flaxi ft Apache.mp3',
//         type: 'audio',
//         asset_type: 'audio/mpeg',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun2',
//         memory_details: {},
//         created_at: '2024-07-18T19:49:49.532Z',
//         updated_at: '2024-07-18T19:49:49.532Z',
//         approved: true,
//       },
//       {
//         id: 446,
//         user_id: 3,
//         story_id: 236,
//         title: 'ddddd',
//         description: '',
//         asset: 'stories/dragon/memory/434031546_367648066302881_5865827799105303827_n.webp',
//         type: 'image',
//         asset_type: 'image/jpeg',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun2',
//         memory_details: {
//           complementaryImage: [
//             'stories/dragon/memories/apple-touch-icon.webp',
//             'stories/dragon/memories/JOKER.webp',
//             'stories/dragon/memories/dgqmt5n-00504489-ce72-463e-b7f0-5453c9aab437.webp',
//             'stories/dragon/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.webp',
//             'stories/dragon/memories/3b412a42be49b18f3329dac35e2f9dbb02ec1ad1_high.webp_image.webp',
//             'stories/dragon/memories/434031546_367648066302881_5865827799105303827_n.webp',
//           ],
//         },
//         created_at: '2024-07-18T19:49:12.618Z',
//         updated_at: '2024-07-18T19:49:12.618Z',
//         approved: true,
//       },
//       {
//         id: 448,
//         user_id: 3,
//         story_id: 236,
//         title: 'flipsi',
//         description: '',
//         asset: 'stories/dragon/memory/Motherflowers  CAREY  ft HORUS Çantamarta.mp3',
//         type: 'audio',
//         asset_type: 'audio/mpeg',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun2',
//         memory_details: {
//           complementaryAudio: [
//             'stories/dragon/memories/Motherflowers  Rock II Murallas.mp3',
//             'stories/dragon/memories/Motherflowers  LA SALA.mp3',
//             'stories/dragon/memories/Motherflowers  Qué Quieres Tú de Mí.mp3',
//             'stories/dragon/memories/Motherflowers  CAREY  ft HORUS Çantamarta.mp3',
//             'stories/dragon/memories/Motherflowers  Flixi Flaxi ft Apache.mp3',
//           ],
//         },
//         created_at: '2024-07-18T19:53:24.765Z',
//         updated_at: '2024-07-18T19:53:24.765Z',
//         approved: true,
//       },
//       {
//         id: 449,
//         user_id: 3,
//         story_id: 236,
//         title: 'kiniku',
//         description: '',
//         asset: 'stories/dragon/memories/Kinnikuman Capitulo 52-1080p.mp4',
//         type: 'video',
//         asset_type: 'video/mp4',
//         preview_asset: 'stories/dragon/memories/Kinnikuman Capitulo 52-thumb-00001.png',
//         prompt: 'share_a_memory_fun2',
//         memory_details: {
//           complementaryVideo: [
//             {
//               thumb: 'stories/dragon/memories/Kinnikuman Capitulo 48-thumb-00001.png',
//               video: 'stories/dragon/memories/Kinnikuman Capitulo 48-1080p.mp4',
//             },
//             'videos/Kinnikuman Capitulo 47.mp4',
//             'videos/Kinnikuman Capitulo 49.mp4',
//             'videos/Kinnikuman Capitulo 45.mp4',
//             {
//               thumb: 'stories/dragon/memories/Kinnikuman Capitulo 46-thumb-00001.png',
//               video: 'stories/dragon/memories/Kinnikuman Capitulo 46-1080p.mp4',
//             },
//           ],
//         },
//         created_at: '2024-07-18T19:55:00.422Z',
//         updated_at: '2024-07-18T19:55:00.422Z',
//         approved: true,
//       },
//       {
//         id: 450,
//         user_id: 3,
//         story_id: 236,
//         title: 'joker',
//         description: '',
//         asset: 'stories/dragon/memory/peakpx.webp',
//         type: 'image',
//         asset_type: 'image/jpeg',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun2',
//         memory_details: {
//           complementaryAudio: [
//             'stories/dragon/memories/Motherflowers  Flixi Flaxi ft Apache.mp3',
//             'stories/dragon/memories/Motherflowers  LA SALA.mp3',
//             'stories/dragon/memories/Motherflowers  Qué Quieres Tú de Mí.mp3',
//             'stories/dragon/memories/Black Eyed Peas Shakira David Guetta  DONT YOU WORRY Official Audio.mp3',
//             'stories/dragon/memories/Eminem  From The D 2 The LBC ft Snoop Dogg Lyrics.mp3',
//             'stories/dragon/memories/Motherflowers  MACUNDALES.mp3',
//             'stories/dragon/memories/Motherflowers  Rock II Murallas.mp3',
//             'stories/dragon/memories/Motherflowers  CAREY  ft HORUS Çantamarta.mp3',
//             'stories/dragon/memories/Nach Foyone  AL CIEN.mp3',
//           ],
//           complementaryImage: [
//             'stories/dragon/memories/apple-touch-icon.webp',
//             'stories/dragon/memories/signature.webp',
//             'stories/dragon/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.webp',
//             'stories/dragon/memories/dgqmt5n-00504489-ce72-463e-b7f0-5453c9aab437.webp',
//             'stories/dragon/memories/434031546_367648066302881_5865827799105303827_n.webp',
//             'stories/dragon/memories/3b412a42be49b18f3329dac35e2f9dbb02ec1ad1_high.webp_image.webp',
//           ],
//           complementaryVideo: [
//             'videos/Kinnikuman Capitulo 47.mp4',
//             {
//               thumb: 'stories/dragon/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//               video: 'stories/dragon/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//             },
//             'videos/Kinnikuman Capitulo 44.mp4',
//             'videos/Kinnikuman Capitulo 46.mp4',
//             'videos/Kinnikuman Capitulo 49.mp4',
//             'videos/Kinnikuman Capitulo 45.mp4',
//             'videos/Kinnikuman Capitulo 48.mp4',
//           ],
//         },
//         created_at: '2024-07-18T20:41:32.892Z',
//         updated_at: '2024-07-18T20:41:32.892Z',
//         approved: true,
//       },
//     ],
//     intermitence: {
//       showPublishModal: true,
//     },
//     collaborator: [
//       {
//         collaborators: [
//           {
//             role_id: 3,
//             user_id: 6,
//             created_at: '2024-06-04T11:46:08.766Z',
//             updated_at: '2024-06-04T15:38:21.071Z',
//             story_id: 4,
//             id: 84,
//             validated: true,
//             user_type: null,
//             user: {
//               id: 6,
//               name: 'Loïc ',
//               lastname: 'Rafique',
//               email: 'memvytest2@yopmail.com',
//               password: '$2b$10$VqFN4Cb1artzCu.UhPsVvOoI0ncv40D3Yuq6zyD/vi3SpcetVcBcu',
//               phonenumber: '1222223252',
//               address_city: '',
//               address_country: null,
//               address_line_1: '',
//               address_line_2: null,
//               address_postal_code: null,
//               address_state: 'ID',
//               picture: null,
//               description:
//                 'Test 🍓 ☀ 🌩 combien coûte une baguette bonjour combien coûtant une croissant une croissant une pizza bonjour merci combien coûte ',
//               recover_code: '335319',
//               created_at: '2024-05-16T15:52:37.915Z',
//               updated_at: '2024-08-17T05:21:43.979Z',
//               facebookAccessToken: null,
//               googleAccessToken: null,
//               appleuserAccessToken: null,
//               referalCode: ' XPQ6f',
//               referenceId: null,
//               viewMemories: [
//                 250, 36, 38, 31, 40, 57, 343, 88, 39, 368, 35, 503, 283, 153, 221, 222, 216, 50, 507, 45, 32, 10, 19,
//                 18, 53, 8, 26, 21, 37,
//               ],
//               referalsCodeId: null,
//             },
//             role: {
//               id: 3,
//               name: 'Story_Collaborator',
//               preset: true,
//               created_at: '2024-05-16T13:20:15.293Z',
//               updated_at: '2024-05-16T13:20:15.293Z',
//             },
//           },
//           {
//             role_id: 3,
//             user_id: 96,
//             created_at: '2024-06-25T16:18:19.740Z',
//             updated_at: '2024-06-25T16:18:19.909Z',
//             story_id: 4,
//             id: 194,
//             validated: true,
//             user_type: 'other',
//             user: {
//               id: 96,
//               name: 'maurice',
//               lastname: 'miot',
//               email: 'maurice.yggdrasil@gmail.com',
//               password: '',
//               phonenumber: '',
//               address_city: '',
//               address_country: '',
//               address_line_1: '',
//               address_line_2: '',
//               address_postal_code: '',
//               address_state: '',
//               picture: null,
//               description: null,
//               recover_code: null,
//               created_at: '2024-06-25T16:18:19.715Z',
//               updated_at: '2024-06-25T16:18:19.715Z',
//               facebookAccessToken: null,
//               googleAccessToken:
//                 'ya29.a0AXooCgtk6mCeLjT6T9EQPsWNHmQCRq4-5uIJMsVIYSmAZnnaQyuFKVW1-m1-fx60PSQUse_o3MJUzLdQrAJGN5fhZR8nWGK0ijYubz2G_4-YBQ-JPvFkZRdAi5-pUB0WC2H64gVmGsJ1xpyXLg3Kot9q6BCImynL2QaCgYKAX4SARMSFQHGX2Mi4KgYWaxKCgYZmY13NxsabQ0169',
//               appleuserAccessToken: null,
//               referalCode: null,
//               referenceId: null,
//               viewMemories: [],
//               referalsCodeId: null,
//             },
//             role: {
//               id: 3,
//               name: 'Story_Collaborator',
//               preset: true,
//               created_at: '2024-05-16T13:20:15.293Z',
//               updated_at: '2024-05-16T13:20:15.293Z',
//             },
//           },
//         ],
//       },
//     ],

//     notifications: [],
//   });

//   it('show  memories', () => {
//     const dataTest = [
//       {
//         id: 562,
//         user_id: 3,
//         story_id: 4,
//         title: 'bbbbbb',
//         description: '',
//         asset: 'stories/test joker/memories/4003_5-1080p.mp4',
//         type: 'video',
//         asset_type: 'video/mp4',
//         preview_asset: 'stories/test joker/memories/4003_5-thumb-00001.png',
//         prompt: 'share_a_memory_fun',
//         memory_details: {},
//         created_at: '2024-07-31T14:33:11.007Z',
//         updated_at: '2024-07-31T14:33:11.007Z',
//         approved: true,
//         x: 878.6238556518974,
//         y: 160.1838567636417,
//       },
//       {
//         id: 391,
//         user_id: 3,
//         story_id: 4,
//         title: 'vdeo',
//         description: '',
//         asset: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//         type: 'video',
//         asset_type: 'video/mp4',
//         preview_asset: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//         prompt: 'share_a_memory_fun',
//         memory_details: {},
//         created_at: '2024-07-15T14:22:05.685Z',
//         updated_at: '2024-07-15T14:22:05.685Z',
//         approved: true,
//         x: 169.8751555714293,
//         y: 189.96147095905457,
//       },
//       {
//         id: 367,
//         user_id: 3,
//         story_id: 4,
//         title: 'ssss',
//         description: '',
//         asset:
//           'stories/test joker/memory/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.png',
//         type: '',
//         asset_type: 'image/png',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun',
//         memory_details: {
//           complementaryImage: [
//             'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.webp',
//             'stories/test joker/memories/apple-touch-icon.webp',
//             'stories/test joker/memories/dgqmt5n-00504489-ce72-463e-b7f0-5453c9aab437.webp',
//             'stories/test joker/memories/3b412a42be49b18f3329dac35e2f9dbb02ec1ad1_high.webp_image.webp',
//             'stories/test joker/memories/JOKER.webp',
//             'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.webp',
//             'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.webp',
//           ],
//         },
//         created_at: '2024-07-11T17:56:01.072Z',
//         updated_at: '2024-07-11T17:56:01.072Z',
//         approved: true,
//         x: 133.19355228506467,
//         y: 428.35701409506953,
//       },
//       {
//         id: 309,
//         user_id: 3,
//         story_id: 4,
//         title: 'prueba',
//         description: '',
//         asset: 'stories/test joker/memory/favicon-32x32.webp',
//         type: 'image',
//         asset_type: 'image/png',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun',
//         memory_details: {},
//         created_at: '2024-06-25T12:44:19.480Z',
//         updated_at: '2024-06-25T12:44:19.480Z',
//         approved: true,
//         x: 699.4275509822114,
//         y: 674.3462202508148,
//       },
//       {
//         id: 371,
//         user_id: 3,
//         story_id: 4,
//         title: 'test',
//         description: '',
//         asset: 'stories/test joker/memory/Shakira Rauw Alejandro  Te Felicito Letra.mp3',
//         type: 'audio',
//         asset_type: 'audio/mpeg',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun',
//         memory_details: {},
//         created_at: '2024-07-11T21:43:25.324Z',
//         updated_at: '2024-07-11T21:43:25.324Z',
//         approved: true,
//         x: 274.05378306718035,
//         y: 740.741010972182,
//       },
//       {
//         id: 279,
//         user_id: 3,
//         story_id: 4,
//         title: 'ssss',
//         description: '',
//         asset: 'stories/test joker/memory/favicon-32x32.png',
//         type: '',
//         asset_type: 'image/png',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun',
//         memory_details: {
//           complementaryText: [
//             {
//               type: 'paragraph',
//               children: [
//                 {
//                   text: 'ssss',
//                   fontSize: '1rem',
//                 },
//               ],
//             },
//           ],
//           complementaryAudio: ['stories/test joker/memories/sample.wav'],
//           complementaryImage: ['stories/test joker/memories/info-outlined.webp'],
//           complementaryVideo: [
//             {
//               thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//               video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//             },
//           ],
//         },
//         created_at: '2024-06-21T18:18:50.298Z',
//         updated_at: '2024-06-21T18:18:50.298Z',
//         approved: true,
//         x: 481.7640328166509,
//         y: 835.9155351185775,
//       },
//       {
//         id: 283,
//         user_id: 3,
//         story_id: 4,
//         title: 'ssss',
//         description: '',
//         asset: 'stories/test joker/memory/favicon-32x32.png',
//         type: '',
//         asset_type: 'image/png',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun',
//         memory_details: {
//           complementaryImage: [
//             'stories/test joker/memories/favicon-32x32.webp',
//             'stories/test joker/memories/dc-comics-joker-marvel-comics-comic-book-hero-batman-supervillain-tattoo-superhero-heroes.webp',
//             'stories/test joker/memories/434031546_367648066302881_5865827799105303827_n.webp',
//           ],
//         },
//         created_at: '2024-06-21T21:00:51.708Z',
//         updated_at: '2024-06-21T21:00:51.708Z',
//         approved: true,
//         x: 252.75182566235344,
//         y: 986.0390188473099,
//       },
//       {
//         id: 162,
//         user_id: 3,
//         story_id: 4,
//         title: 'test final',
//         description: '',
//         asset: 'stories/test joker/memory/PHOTO-2024-06-04-21-11-50 3.jpg',
//         type: 'image',
//         asset_type: 'image/jpeg',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun',
//         memory_details: {
//           complementaryText: [
//             {
//               type: 'paragraph',
//               children: [
//                 {
//                   text: '',
//                   fontSize: '1rem',
//                 },
//               ],
//             },
//           ],
//         },
//         created_at: '2024-06-05T12:55:46.705Z',
//         updated_at: '2024-06-05T12:55:46.705Z',
//         approved: true,
//         x: 402.58466146948757,
//         y: 1097.4005039038607,
//       },
//       {
//         id: 263,
//         user_id: 3,
//         story_id: 4,
//         title: 'tetetete',
//         description: '',
//         asset: 'stories/test joker/memory/PHOTO-2024-06-04-21-11-46.webp',
//         type: 'image',
//         asset_type: 'image/jpeg',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun',
//         memory_details: {
//           complementaryAudio: ['stories/test joker/memories/sample.wav'],
//           complementaryImage: ['stories/test joker/memories/apple-touch-icon.webp'],
//           complementaryVideo: [
//             {
//               thumb: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-thumb-00001.png',
//               video: 'stories/test joker/memories/3195394-uhd_3840_2160_25fps-1080p.mp4',
//             },
//           ],
//         },
//         created_at: '2024-06-19T12:33:36.227Z',
//         updated_at: '2024-06-19T12:33:36.227Z',
//         approved: true,
//         x: 849.8835216316908,
//         y: 1127.4686033958965,
//       },
//       {
//         id: 6,
//         user_id: 3,
//         story_id: 4,
//         title: 'Mariposa',
//         description: 'Vídeo ',
//         asset: 'videos/IMG_9665.mov',
//         type: 'video',
//         asset_type: 'video/quicktime',
//         preview_asset: null,
//         prompt: 'share_a_memory_fun',
//         memory_details: {
//           complementaryText: [
//             {
//               type: 'paragraph',
//               children: [
//                 {
//                   text: 'complementario estoy escribiendo rápido o normal, pero se demora mucho no sé ahora si vuelve a pasar… si, es muy lento',
//                   fontSize: '1rem',
//                 },
//               ],
//             },
//           ],
//           complementaryImage: [
//             'stories/test joker/memories/IMG_0426.webp',
//             'stories/test joker/memories/IMG_0560.webp',
//             'stories/test joker/memories/IMG_0343.webp',
//             'stories/test joker/memories/IMG_0254.webp',
//             'stories/test joker/memories/IMG_0248.webp',
//             'stories/test joker/memories/IMG_0227.webp',
//           ],
//         },
//         created_at: '2024-05-16T15:06:24.187Z',
//         updated_at: '2024-06-06T22:27:23.991Z',
//         approved: true,
//         x: 657.7226851032129,
//         y: 1155.7135912155904,
//       },
//     ];

//     const story = {
//       id: 4,
//       title: 'test joker',
//       description:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hajsjs",
//       cover_image: 'stories/test joker/HD-wallpaper-comics-joker-dc-comics.jpeg',
//       story_details: {
//         prompts: {
//           share_a_memory_fun: true,
//         },
//         general_info: {
//           class_purpose: {
//             purpose_of_class: [
//               {
//                 name_of_class: '',
//                 description_of_event: '',
//               },
//             ],
//             general_notes_section: {
//               general_information: '',
//             },
//           },
//           class_information: {
//             name_of_class: [
//               {
//                 end_date: '',
//                 start_date: '',
//                 name_of_class: '',
//               },
//             ],
//             associated_school: {
//               city: '',
//               state: '',
//               street: '',
//               province: '',
//               zip_code: '',
//               name_of_school: '',
//             },
//           },
//           classmates_involved: {
//             classmates_involved: [
//               {
//                 name: 'tomas',
//                 suffix: 'in',
//                 lastname: 'issue',
//                 maiden_name: 'back office',
//                 second_name: 'test',
//               },
//             ],
//           },
//         },
//         type_of_story: 'classmates_story',
//       },
//       user_id: 3,
//       private: true,
//       url: 'test-joker-1',
//       status: 'published',
//       password: 'Q3BLV0',
//       confirmPassword: false,
//     };

//     mount(
//       <AppContainer store={storePublish}>
//         {dataTest?.map((item: any) => {
//           return <MemoryFloatingItem key={item?.id} item={item} position={item} palette={{}} story={story} />;
//         })}
//       </AppContainer>,
//     );
//     cy.viewport(1000, 1000);
//     cy.wait(1000);
//     cy.viewport('iphone-6');
//   });
// });
