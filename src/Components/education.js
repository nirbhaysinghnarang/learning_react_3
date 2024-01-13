import React, { useRef, Suspense, useState, useEffect } from 'react';
import {
    Text3D,
    Center,
    Float,
    useMatcapTexture,
    Html
} from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Avatar, Divider, Stack, Typography, IconButton, CardContent, Card } from '@mui/material';


function EducationCard() {
  return (
    <Stack sx={{ p: 2, width: "100%" }}>
      <Typography variant="h4" sx={{ color: "hotpink", p: 2, fontFamily: "Dela Gothic One" }}>
        Education
      </Typography>
      <Card spacing={1} sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.5)', border:'2px solid white' }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack sx={{ flexDirection: "column" }}>
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar src="https://clipartcraft.com/images/cornell-university-logo-svg.png"></Avatar>

              <Typography variant="h6" sx={{ marginLeft: 1, color:"hotpink",  fontFamily: "Dela Gothic One" }}>
                Cornell University
              </Typography>
            </Stack>
            <Typography
              variant="subtitle2"
              sx={{ fontStyle: "italic", color: "white",  fontFamily: "Dela Gothic One" }}
            >
              B.A. in Computer Science, minoring in History
            </Typography>
          </Stack>

          <Typography variant="caption" sx={{color: "white",  fontFamily: "Dela Gothic One"}}>GPA: 3.96/4.00</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: "white",  fontFamily: "Dela Gothic One"}}>
          Algorithms, Networks II, Functional Programming, Discrete Math,
          Networks, Linear Algebra, Statistics, OOP & DS
        </Typography>
      </Card>
      <Card spacing={1} sx={{ marginTop: 2, p: 2, backgroundColor: 'rgba(0,0,0,0.5)', border:'2px solid white'  }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack sx={{ flexDirection: "column" }}>
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar src="https://www.logolynx.com/images/logolynx/5b/5bb82047b329490042821168fa5237af.png"></Avatar>

              <Typography variant="h6" sx={{ marginLeft: 1,  color:"hotpink",  fontFamily: "Dela Gothic One" }}>
                International Baccalaureate
              </Typography>
            </Stack>
            <Typography
              variant="subtitle2"
              sx={{ fontStyle: "italic",color: "white",  fontFamily: "Dela Gothic One"}}
            >
              Jayshree Periwal HS, Jaipur
            </Typography>
          </Stack>

          <Typography variant="caption"  sx={{color: "white",  fontFamily: "Dela Gothic One"}}>
            Score: 45/45. SAT: 1590/1600
          </Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: "white",  fontFamily: "Dela Gothic One" }}>
          CS, Math, Physics, Economics
        </Typography>
      </Card>
      <Typography variant="h4" sx={{ color: "hotpink", p: 2, fontFamily: "Dela Gothic One" }}>
        Teaching
      </Typography>
      <Card spacing={1} sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.5)', border:'2px solid white'  }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack sx={{ flexDirection: "column" }}>
            <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar src="https://clipartcraft.com/images/cornell-university-logo-svg.png"></Avatar>

              <Typography variant="h6" sx={{ marginLeft: 1, color: "white",  fontFamily: "Dela Gothic One" }}>
                Cornell Bowers CIS
              </Typography>
            </Stack>
            <Typography
              variant="subtitle2"
              sx={{ fontStyle: "italic", color: "white",  fontFamily: "Dela Gothic One", marginTop: 1 }}
            >
              CS 1110 - Intro to Computing using Python (Consultant)
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontStyle: "italic", color: "white",  fontFamily: "Dela Gothic One"}}
            >
              INFO 1998 - Trends in Modern Web Development (TA)
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}

 


function Education() {
    const [matcapTexture] = useMatcapTexture("CB4E88_F99AD6_F384C3_ED75B9");

    return (
        <>
            <Center scale={[1, 1, 1]}>
                <Physics gravity={10}>
                    <Float speed={1}>
                            <Html position={[0, 0, 0]} scale={[-1,1,1]} transform occlude>
                                <EducationCard></EducationCard>
                            </Html>
                           
                    </Float>
                </Physics>
            </Center>
        </>
    );
}

export default Education;
