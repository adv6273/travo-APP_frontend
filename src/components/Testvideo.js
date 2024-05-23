import React from 'react';
import { baseUrl } from '../Urls';

const TestVideo = () => {
  return (
    <div>
      <video autoPlay muted loop width="600">
        <source src={`${baseUrl}/uploads/resortvideo.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default TestVideo;
