import {JSX, useMemo} from 'react';
import {Canvas, useLoader} from '@react-three/fiber'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {Vector3} from "three";

interface DiceProps {
    model: GLTF,
    position: Vector3
}

function Dice(props: DiceProps) {
    const uniqueModel = useMemo(() => props.model.scene.clone(), [props.model]);

    return <primitive object={uniqueModel} position={props.position} scale={0.3}/>
}

function DiceRoller(): JSX.Element {
    const dice = useLoader(GLTFLoader, '/d20.gltf')

    return (
        <div id="dice-roller" className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
            <Canvas>
                <ambientLight intensity={Math.PI / 2}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
                <Dice model={dice} position={new Vector3(-2, 0, 0)}/>
                <Dice model={dice} position={new Vector3(2, 0, 0)}/>
                <Dice model={dice} position={new Vector3(0, 0, 0)}/>
            </Canvas>
        </div>
    );
}

export default DiceRoller;