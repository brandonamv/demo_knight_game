import { CapsuleCollider, RigidBody } from "@react-three/rapier"
import Soldier from "./soldier_model/Soldier"
import { useKeyboardControls } from "@react-three/drei"
import { Controls } from "./App"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

const JUMP_FORCE = 0.5;
const MOVEMENT_SPEED = 0.1

export const CharacterController = () => {

    const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
    const izquierdaPressed = useKeyboardControls((state) => state[Controls.left]);
    const derechaPressed = useKeyboardControls((state) => state[Controls.right]);
    const atrasPressed = useKeyboardControls((state) => state[Controls.back]);
    const adelantePressed = useKeyboardControls((state) => state[Controls.forward]);

    const rigidBody = useRef();

    useFrame(() => {
        const impulse = {x: 0,y: 0,z: 0};
        if (jumpPressed) {
            impulse.y += JUMP_FORCE;
        }
        if (izquierdaPressed) {
            impulse.x -= MOVEMENT_SPEED;
        }
        if (derechaPressed) {
            impulse.x += MOVEMENT_SPEED;
        }
        if (atrasPressed) {
            impulse.z += MOVEMENT_SPEED;
        }
        if (adelantePressed) {
            impulse.z -= MOVEMENT_SPEED;
        }

        rigidBody.current.applyImpulse(impulse, true);
    });

    return (
        <group>
            <RigidBody ref={rigidBody} /* position-y={0.5} */ colliders={false} scale={[0.5,0.5,0.5]} enabledRotations={[false,false,false]}>
                <CapsuleCollider args={[0.8,0.4]} position={[0,1.2,0]} />
                <Soldier />
            </RigidBody>
        </group>
    )
}