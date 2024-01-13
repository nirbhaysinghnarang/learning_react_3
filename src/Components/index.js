import React, { useRef, Suspense, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import {
    Html,
    OrbitControls,
    Stars,
    Text3D,
    useMatcapTexture
} from "@react-three/drei";
import Home from './home';
import Experience from './experience';
import { Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { EffectComposer } from '@react-three/postprocessing';
import Projects from './projects';
import About from './about';
import { projects } from "../Data/projects";
import { passion_projs } from '../Data/passion_projs';
import Education from './education';
import PassionProjects from './passions';

export function CameraSetup() {
    const { camera } = useThree();


    useEffect(() => {
        camera.position.set(0, 0, -100);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
    }, [camera]);
    return null;
}


function Index({tab}) {
    const { camera, gl } = useThree();
    const controlsRef = useRef();
    return (
        <>

            <CameraSetup></CameraSetup>
            <EffectComposer>
                <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                <Noise opacity={0.02} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
                <OrbitControls
                    enableZoom={true}
                    autoRotate={true}
                    ref={controlsRef}
                    args={[camera, gl.domElement]}
                    autoRotateSpeed={-0.1}
                    enablePan={true}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                    zoomSpeed={0.15}
                    dampingFactor={0.05}
                />
                <ambientLight intensity={0.5} />
                <Suspense fallback={"Loading"}>
                    <Stars
                        radius={100}
                        depth={100}
                        count={4000}
                        factor={4}
                        saturation={0}
                        fade
                        speed={0.2}
                    />
                  

                    {tab.name === 'home' && <Home />}
                    {tab.name === 'experience' && <Experience ref={controlsRef} camera={camera} gl={gl}></Experience>}
                    {tab.name === 'projects' && <Projects ref={controlsRef} camera={camera} gl={gl} projects={projects} title={"Projects"}></Projects>}
                    {tab.name === 'about' && <About></About>}
                    {tab.name === 'education' && <Education></Education>}
                    {tab.name === 'passion projects' && <PassionProjects ref={controlsRef} camera={camera} gl={gl} projects={passion_projs} title={"Passion Projects"}></PassionProjects>}

                </Suspense>


            </EffectComposer>

        </>
    );
}

export default Index;
