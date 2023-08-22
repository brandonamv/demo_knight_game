import { Canvas } from '@react-three/fiber';
import React, { useState } from "react";
import '../styles/App.css';
import { Environment, OrbitControls, useEnvironment } from '@react-three/drei';
import { Stats } from '@react-three/drei'
//models
import Soldier from './soldier_model/Soldier';
import { Castillo_model } from './castillo_model/Castillo_model';




export const App = () => {
  return(
    <>
      <Canvas /* camera={{ position: [0, 5, -25] }} */>
        <Stats />
        <OrbitControls />{/* controles por defaul del drei */}
        <ambientLight />{/* luz ambiental por default del react-three */}
        {/* modelo */}
        <Soldier />
        <Castillo_model />
        
      </Canvas>
    </>
  )
}