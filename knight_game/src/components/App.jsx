import { Canvas } from '@react-three/fiber';
import React, { Suspense, useMemo, useState } from "react";
import '../styles/App.css';
import { Environment, KeyboardControls, OrbitControls, useEnvironment } from '@react-three/drei';
import { Stats } from '@react-three/drei'
//models
import Soldier from './soldier_model/Soldier';
import { Castillo_model } from './castillo_model/Castillo_model';
import { CapsuleCollider, CylinderCollider, Physics, RigidBody } from '@react-three/rapier';
import { CharacterController } from './CharacterController';


export const Controls = {
  forward : 'forward',
  back : 'back',
  left : 'left',
  right :'right',
  jump : 'jump',
};

export const App = () => {

  const map = useMemo<import('@react-three/drei').KeyboardControlsEntry<Controls>[]>(()=>[
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Space'] },
  ], [])

  return(
    <>
      <KeyboardControls map={map}>
        <Canvas camera={{ position: [0, 4, 4] }}>
          <Stats />
          <Suspense>
            <Physics debug>
              <OrbitControls />{/* controles por defaul del drei */}
              <ambientLight />{/* luz ambiental por default del react-three */}
              {/* Personaje */}
              {/* <Soldier /> */}
              <CharacterController />
              {/* Mapa */}
              <RigidBody colliders={false} type='fixed' /* position-y={0.5} */>
                <CylinderCollider args={[1/100, 10]} />
                <Castillo_model />
              </RigidBody>
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  )
}