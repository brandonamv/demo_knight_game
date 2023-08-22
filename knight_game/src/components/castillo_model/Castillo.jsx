import React, { Suspense } from "react";
import { Castillo_model } from "./Castillo_model";//import the model

//this is a component (can be geometries or models)
const Castillo = () => {
    
    return (
        <>
            <mesh >
                <Suspense> {/* We use FallbackCube with personalized props for every model */}
                    <Castillo_model /> {/* add the model */}
                </Suspense>
            </mesh>
        </>
    );
}
export default Castillo;