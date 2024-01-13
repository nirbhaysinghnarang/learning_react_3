import './App.css';
import { Canvas } from '@react-three/fiber';
import Index from './Components';
import { useState } from 'react';
import HamburgerMenu from './Components/menu';
function App() {
  const [tab, setTab] = useState({name:"home"})
  return (
    <div className="scene">
      <Canvas>
        <Index tab={tab}></Index>

      </Canvas>
      <HamburgerMenu setTab={setTab}></HamburgerMenu>
    </div>
  );
}

export default App;
