import React from 'react';
import { mount } from '@cypress/react18';
import { VideoPlayer } from '@/components';

describe('VideoPlayer component', () => {
  it('renders video and play', () => {
    mount(
      <VideoPlayer
        url={
          'https://memvy-bucket.s3.amazonaws.com/stories/test%20joker/memories/3195394-uhd_3840_2160_25fps.mp4?AWSAccessKeyId=AKIAZI2LG56MLQ3SH5W5&Expires=1716219675&Signature=wD16YGs68sPbxZcjQ05Fub3ZQ%2F0%3D'
        }
      />,
    );
    cy.get('video').click();
  });
  it('renders video and play and pause ', () => {
    mount(
      <VideoPlayer
        url={
          'https://memvy-bucket.s3.amazonaws.com/stories/test%20joker/memories/3195394-uhd_3840_2160_25fps.mp4?AWSAccessKeyId=AKIAZI2LG56MLQ3SH5W5&Expires=1716219675&Signature=wD16YGs68sPbxZcjQ05Fub3ZQ%2F0%3D'
        }
      />,
    );
    cy.get('video').click();
    cy.get(':nth-child(3) > .MuiButtonBase-root > img').click();
  });
  it('renders video and play and goback and fordwar ', () => {
    mount(
      <VideoPlayer
        url={
          'https://memvy-bucket.s3.amazonaws.com/stories/test%20joker/memories/3195394-uhd_3840_2160_25fps.mp4?AWSAccessKeyId=AKIAZI2LG56MLQ3SH5W5&Expires=1716219675&Signature=wD16YGs68sPbxZcjQ05Fub3ZQ%2F0%3D'
        }
      />,
    );
    cy.get('video').click();
    cy.get(':nth-child(3) > .MuiButtonBase-root > img').click();
    cy.get(':nth-child(4) > .MuiButtonBase-root > img').click();
    cy.get('.css-1f2sn6d > :nth-child(2)').click();
  });
  it('renders video and play repeat ', () => {
    mount(
      <VideoPlayer
        url={
          'https://memvy-bucket.s3.amazonaws.com/stories/test%20joker/memories/3195394-uhd_3840_2160_25fps.mp4?AWSAccessKeyId=AKIAZI2LG56MLQ3SH5W5&Expires=1716219675&Signature=wD16YGs68sPbxZcjQ05Fub3ZQ%2F0%3D'
        }
      />,
    );
    cy.get('video').click();
    cy.get(':nth-child(3) > .MuiButtonBase-root > img').click();
    cy.get(':nth-child(1) > .MuiButtonBase-root > img').click();
    cy.get(':nth-child(3) > .MuiButtonBase-root > img').click();
    cy.get('.MuiLinearProgress-bar').click();
  });
});
