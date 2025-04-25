import {Suspense, useEffect, useMemo, useRef, useState} from 'react';
import {Canvas, useLoader, useThree} from '@react-three/fiber'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {Physics, RapierRigidBody, RigidBody} from "@react-three/rapier";
import * as THREE from 'three';

interface DiceProps {
    model: GLTF,
    scale: number,
    position: THREE.Vector3,
    rotation: THREE.Euler,
    throwFactor: number,
}

function Walls() {
    const {viewport} = useThree();

    const width = viewport.width;
    const height = viewport.height;
    const depth = 5;
    const thickness = 0.1;

    return (
        <>
            {/* Sol */}
            <RigidBody type="fixed">
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[width * 2, height * 2, 1]}/>
                    <meshStandardMaterial opacity={0} transparent={true}/>
                </mesh>
            </RigidBody>

            {/* Mur gauche */}
            <RigidBody type="fixed">
                <mesh position={[-width / 2, 0, depth / 2]}>
                    <boxGeometry args={[thickness, height, depth]}/>
                    <meshStandardMaterial opacity={0} transparent={true}/>
                </mesh>
            </RigidBody>

            {/* Mur droit */}
            <RigidBody type="fixed">
                <mesh position={[width / 2, 0, depth / 2]}>
                    <boxGeometry args={[thickness, height, depth]}/>
                    <meshStandardMaterial opacity={0} transparent={true}/>
                </mesh>
            </RigidBody>

            {/* Mur arrière */}
            {/*<RigidBody type="fixed">*/}
            {/*    <mesh position={[0, -height / 2, depth / 2]}>*/}
            {/*        <boxGeometry args={[width, thickness, 1]}/>*/}
            {/*        <meshStandardMaterial opacity={0} transparent={true}/>*/}
            {/*    </mesh>*/}
            {/*</RigidBody>*/}

            {/* Mur avant */}
            <RigidBody type="fixed">
                <mesh position={[0, height / 2, depth / 2]}>
                    <boxGeometry args={[width, thickness, depth]}/>
                    <meshStandardMaterial opacity={0} transparent={true}/>
                </mesh>
            </RigidBody>
        </>
    )
}

function Dice(props: DiceProps) {
    const uniqueModel = useMemo(() => props.model.scene.clone(), [props.model]);
    const rigidBody = useRef<RapierRigidBody>(null);

    useEffect(() => {
        const rand = 0.8 + Math.random() * 0.4;
        setTimeout(() => {
            if (null !== rigidBody.current) {
                // A one-off "push"
                rigidBody.current.addForce({
                    x: -2 * rand * props.throwFactor,
                    y: 8 * rand * props.throwFactor,
                    z: 0
                }, true);

                // A one-off torque rotation
                rigidBody.current.addTorque({
                    x: -0.5 * rand * props.throwFactor,
                    y: -0.2 * rand * props.throwFactor,
                    z: 0
                }, true);
                setTimeout(() => {
                    rigidBody.current.resetForces(true)
                    rigidBody.current.resetTorques(true)
                }, 50 * rand)
            }
        }, 50)
    }, []);

    return (
        <RigidBody ref={rigidBody}>
            <primitive object={uniqueModel} position={props.position} rotation={props.rotation} scale={props.scale}/>
        </RigidBody>
    )
}

const DiceRoller = () => {
    const d20 = useLoader(GLTFLoader, '/d20.gltf')
    const d4 = useLoader(GLTFLoader, '/d4.gltf')
    const d6 = useLoader(GLTFLoader, '/d6.gltf')
    const d8 = useLoader(GLTFLoader, '/d8.gltf')
    const d10 = useLoader(GLTFLoader, '/d10.gltf')
    const d10_2 = useLoader(GLTFLoader, '/d10-2.gltf')

    const [, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});

    // Gérer le redimensionnement de la fenêtre
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight});
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div id="dice-roller" className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
            <Canvas orthographic camera={{zoom: 100, position: [0, 0, 10], rotation: [0, 0, 0], far: 1000, fov: 90}}>
                <ambientLight intensity={Math.PI / 2}/>
                <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
                <pointLight position={[-100, -100, -100]} decay={0} intensity={Math.PI}/>
                <Suspense>
                    <Physics gravity={[0, 0, -9.81]} colliders="hull">
                        <Dice model={d4} position={new THREE.Vector3(0.5, -4, 4)}
                              rotation={new THREE.Euler(45, 10, 0)} scale={0.6} throwFactor={0.2}/>
                        <Dice model={d6} position={new THREE.Vector3(0, -5, 7)}
                              rotation={new THREE.Euler(95, 100, 0)} scale={0.22} throwFactor={1.5}/>
                        <Dice model={d8} position={new THREE.Vector3(-0.5, -8, 3)}
                              rotation={new THREE.Euler(45, 30, 75)} scale={0.3} throwFactor={1.5}/>
                        <Dice model={d10} position={new THREE.Vector3(-0.5, -8, 5)}
                              rotation={new THREE.Euler(15, 90, 75)} scale={0.4} throwFactor={0.7}/>
                        <Dice model={d10_2} position={new THREE.Vector3(-4, -10, 5)}
                              rotation={new THREE.Euler(35, 60, 75)} scale={0.4} throwFactor={0.7}/>
                        <Dice model={d20} position={new THREE.Vector3(-0.5, -6, 6.5)}
                              rotation={new THREE.Euler(5, 45, 0)} scale={0.4} throwFactor={1.5}/>
                        <Walls/>
                    </Physics>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default DiceRoller;