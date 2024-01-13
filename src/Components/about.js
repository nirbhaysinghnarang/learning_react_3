import React, { useRef, Suspense, useState, useEffect } from 'react';
import {
    Text3D,
    Center,
    Float,
    useMatcapTexture,
    Html
} from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Stack, Typography, IconButton, CardContent, Card } from '@mui/material';
import { SocialIcon } from 'react-social-icons';
import { Mesh } from 'three';

function Cube({ children, ...props }) {
    const ref = useRef();
    return (
        <mesh ref={ref} {...props}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="lightgray" opacity={0} transparent />
            {children}
        </mesh>
    );
}

function About() {
    const [matcapTexture] = useMatcapTexture("CB4E88_F99AD6_F384C3_ED75B9");

    return (
        <>
            <Center scale={[1, 1, 1]}>
                <Physics gravity={10}>
                    <Float speed={1}>
                            <Html position={[-17.5, 0, 0]} scale={[-1,1,1]} transform occlude>
                                <Card sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.5)', border: '2px solid white', }} >
                                    <CardContent>
                                        <Stack direction="row" sx={{ width: '100%' }} justifyContent="space-between" alignContent={"center"}>
                                            <Typography variant="h5" component="div" sx={{ color: 'hotpink', fontFamily: "Dela Gothic One" }}>
                                                About
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body2" sx={{ color: 'white', fontFamily: "Dela Gothic One" }}>
                                            Current CS student at Cornell University, broadly interested in
                                            the applications of technology in the humanities.
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'white', fontFamily: "Dela Gothic One" }}>
                                            Research interests include HCI and the applications of Large Language Models
                                            to better understand human behaviours.
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'white', fontFamily: "Dela Gothic One" }}>
                                            Passionate about using technology to create aesthetic and artistic value.
                                        </Typography>
                                        <Stack
                                            sx={{ marginTop: 2 }}
                                            flex={1}
                                            flexDirection="row"
                                            justifyContent="flex-start"
                                        >
                                            <SocialIcon
                                                style={{ width: 32, height: 32 }}
                                                url="https://github.com/nirbhaysinghnarang"
                                            ></SocialIcon>
                                            <SocialIcon
                                                style={{ marginLeft: 10, width: 32, height: 32 }}
                                                url="https://www.linkedin.com/in/nirbhay-singh-narang-6188a11ab/"
                                            ></SocialIcon>
                                            <SocialIcon
                                                style={{ marginLeft: 10, width: 32, height: 32 }}
                                                url="https://twitter.com/nirbhay_narang"
                                            ></SocialIcon>
                                            <SocialIcon
                                                style={{ marginLeft: 10, width: 32, height: 32 }}
                                                url="mailto:nsn8@cornell.edu"
                                            ></SocialIcon>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Html>
                            <Text3D
                                position={[0, 5, 0]}
                                scale={[-1, 1, 1]}
                                font={"/gt.json"}
                                curveSegments={24}
                                brevelSegments={1}
                                bevelEnabled
                                bevelSize={0.08}
                                bevelThickness={0.005}
                                height={1}
                                lineHeight={0.9}
                                letterSpacing={0.3}
                            >
                                {"Engineer | Aesthete | Entrepreneur"}
                                <meshMatcapMaterial color="white" matcap={matcapTexture} />
                                <ambientLight intensity={0.6} color={"#dee2ff"} />
                            </Text3D>
                    </Float>
                </Physics>
            </Center>
        </>
    );
}

export default About;
