import { Center, Html, useMatcapTexture, } from "@react-three/drei";
import { Text3D, Float } from "@react-three/drei";
import { useState, useEffect, useRef, useMemo } from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Box, Card, Typography, Stack, CardContent, Chip, IconButton, Divider } from "@mui/material";
import { useThree } from '@react-three/fiber';
import { LineBasicMaterial, Line, BufferGeometry } from 'three';
import { extend } from '@react-three/fiber';
import CloseIcon from '@mui/icons-material/Close'; 
extend({ LineBasicMaterial, Line });


const Orbit = ({ radiusX, radiusZ }) => {
    const curve = new THREE.EllipseCurve(
        0, 0,
        radiusX, radiusZ,
        0, 2 * Math.PI,
        false,
        0
    );
    const points = curve.getPoints(50).map(p => new THREE.Vector3(p.x, 0, p.y));
    const geometry = new BufferGeometry().setFromPoints(points);
    return (
        <line geometry={geometry}>
            <lineBasicMaterial attach="material" color="white" />
        </line>
    );
};


function Model({ path, scale = [0.4, 0.4, 0.4] }) {
    const gltf = useLoader(GLTFLoader, path)
    return <primitive object={gltf.scene} scale={scale} />
}



function Projects({projects, title}) {

    const STARTING_RADIUS = 35
    const [currExp, setCurrExp] = useState(null);
    


    const speeds = useMemo(() => projects.map(_ => (Math.floor(Math.random() * 10) + 10) / 100), [])
    const orbitRadius = useMemo(() => projects.map((_, index) => STARTING_RADIUS + index * 15), [projects]);
    const posRefs = useRef([]);


    const positions = useMemo(() => {
        return orbitRadius.map(radius => {
            const angle = Math.random() * Math.PI * 2;
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);
            return [x, 0, z];
        });
    }, [orbitRadius]);



    useFrame(({ clock }) => {
        positions.forEach((position, index) => {
            const mesh = posRefs.current[index];
            if (mesh) {
                const elapsedTime = clock.getElapsedTime()
                const speed = speeds[index]
                const radius = STARTING_RADIUS + index * 15;
                const angle = speed * elapsedTime;
                mesh.position.x = radius * Math.cos(angle);
                mesh.position.y = 0;
                mesh.position.z = radius * Math.sin(angle);
            }
        });
    });

    const handleSphereClick = (index) => {
        setCurrExp(projects[index])
    };
    const [matcapTexture] = useMatcapTexture("CB4E88_F99AD6_F384C3_ED75B9");
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 0, -50);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    const portalRef = document.getElementById('portal');


    return (
        <>
            <Center scale={[0.9, 1, 1]}>

                <Float speed={1}>
                    <pointLight position={[100, 100, 100]} color="white" intensity={1} distance={10} decay={2} ></pointLight>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 3, 5]} intensity={1} />
                    <hemisphereLight skyColor={0xffffbb} groundColor={0x080820} intensity={0.5} />
                    <Text3D
                        position={[20, 0, 0]}
                        scale={[-4, 4, 4]}
                        font={"/gt.json"}
                        curveSegments={24}
                        brevelSegments={1}
                        bevelEnabled
                        bevelSize={0.08}
                        bevelThickness={0.03}
                        height={1}
                        lineHeight={0.9}
                        letterSpacing={0.3}
                        anchorX="middle"
                        anchorY="middle"
                    >
                        {title}
                        <meshMatcapMaterial color="white" matcap={matcapTexture} />
                        <ambientLight intensity={1} color={"#dee2ff"} />

                    </Text3D>
                    {projects.map((exp, index) => {
                        console.log(exp)
                        return (

                            <mesh castShadow={true} ref={el => posRefs.current[index] = el} receiveShadow={true} key={index} position={positions[index]}
                                onClick={(e) => { e.stopPropagation(); handleSphereClick(index) }}>
                                {exp !== currExp && <Model path={`Models/Planet_${index + 1}.glb`}></Model>}
                                {exp === currExp && <Model path={`Models/Planet_${index + 1}.glb`} scale={[0.5, 0.5, 0.5]}></Model>}
                            </mesh>
                        );
                    })}
                    {projects.map((exp, index) => {
                        const orbitRadius = STARTING_RADIUS + index * 15;
                        return <Orbit key={index} radiusX={orbitRadius} radiusZ={orbitRadius} />;
                    })}
                    {currExp && (
                        <Html portal={portalRef} position={[10 + (projects.length - 1) * 15 + 20, 30, 0]} prepend>
                            <Card sx={{ display: 'flex', flexDirection: 'column', minWidth: 345, backgroundColor: 'rgba(0,0,0,0.5)', border:'2px solid white',  }} >

                                <CardContent>
                                    <Stack direction="row" sx={{width:'100%'}} justifyContent="space-between" alignContent={"center"}>
                                    <Typography variant="h5" component="div" sx={{ color: 'hotpink', fontFamily: "Dela Gothic One" }}>
                                        {currExp.name}
                                    </Typography>
                                    <IconButton   style={{ color: 'hotpink' }} onClick={()=>{setCurrExp(null)}}><CloseIcon ></CloseIcon></IconButton>
                                    </Stack>
                                   
                                    <Typography variant="body2" sx={{ color: 'white', fontFamily: "Dela Gothic One" }}>
                                        Stack: {currExp.stack}
                                    </Typography>
                                    <Divider sx={{color:'hotpink', marginTop:'10px', }}></Divider>
                                    <Typography variant="body2" sx={{ color: 'white', fontFamily: "Dela Gothic One" }}>
                                        {currExp.desc}
                                    </Typography>
                                   
                                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, marginTop: 1 }}>
                                        {currExp.tags.map((tech, index) => (
                                            <Chip key={index} sx={{ color: 'hotpink', fontFamily: "Dela Gothic One" }} label={tech} variant="outlined" />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Html>
                    )}


                </Float>
            </Center>
        </>
    );
}

export default Projects;
