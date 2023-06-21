import React, { Suspense } from "react";
import Soldier_model from "./Soldier_model";//import the model

//this is a component (can be geometries or models)
const Soldier = () => {
    
    return (
        <>
            <mesh >
                <Suspense> {/* We use FallbackCube with personalized props for every model */}
                    <Soldier_model /> {/* add the model */}
                </Suspense>
            </mesh>
        </>
    );
}
export default Soldier;