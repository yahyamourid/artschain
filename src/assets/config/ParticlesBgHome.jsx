import React from 'react';
import Particles from "react-tsparticles";
import particlesConfig from './particles-configHome';

const ParticlesBgHome = () => {
  return (
    <Particles
      id="tsparticles"
      options={particlesConfig}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    />
  );
};

export default ParticlesBgHome;
