import { gsap } from 'https://esm.sh/gsap@3.12.2';
import * as THREE from 'https://esm.sh/three@0.157.0';
import { GLTFLoader } from 'https://esm.sh/three@0.157.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://esm.sh/three@0.157.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://esm.sh/three@0.157.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://esm.sh/three@0.157.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://esm.sh/three@0.157.0/examples/jsm/postprocessing/UnrealBloomPass.js';

//import { OutputPass } from 'https://threejs.org/examples/jsm/postprocessing/OutputPass.js';


import { toggleSpin } from './toggleSpin.js';
import { applyLighting } from './lighting/cinematicThreePoint.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.01, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: false });


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);

const gltfLoader = new GLTFLoader();

const mouse = {
    x: undefined,
    y: undefined
}

const cameraPositionTimeline = gsap.timeline({});
const cameraTargetTimeline = gsap.timeline({});

const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), 
0.5, //intensity
1.4, // radius
0.5); // threshold

composer.addPass(bloomPass);

//const outputPass = new OutputPass();
//composer.addPass(outputPass);

let glowTweens = new Map(); // Keep track to stop animations later

var object01;
var object02;
var object03;
var object04;
var object05;
var object06;
var object07;
var object08;
var object09;
var object10;

var dustBoxInserted = true;
var wetRollerInserted = true;



const wetRollerButton = document.getElementById('wetRollerButton');
const wetRollerSpinTimeline = gsap.timeline({
    paused: true,  // Start paused
    repeat: -1,    // Repeat indefinitely
    ease: "power1.inOut", // Smooth easing for acceleration/deceleration
});

const brushBarButton = document.getElementById('brushBarButton');
const brushBarSpinTimeline = gsap.timeline({
    paused: true,  // Start paused
    repeat: -1,    // Repeat indefinitely
    ease: "power1.inOut", // Smooth easing for acceleration/deceleration
});

const sideCleanerButton = document.getElementById('sideCleanerButton');
const sideCleaner01SpinTimeline = gsap.timeline({
    paused: true,  // Start paused
    repeat: -1,    // Repeat indefinitely
    ease: "power1.inOut", // Smooth easing for acceleration/deceleration
});
const sideCleaner02SpinTimeline = gsap.timeline({
    paused: true,  // Start paused
    repeat: -1,    // Repeat indefinitely
    ease: "power1.inOut", // Smooth easing for acceleration/deceleration
});

const wheelsButton = document.getElementById('wheelsButton');
const wheel01SpinTimeline = gsap.timeline({
    paused: true,  // Start paused
    repeat: -1,    // Repeat indefinitely
    ease: "power1.inOut", // Smooth easing for acceleration/deceleration
});
const wheel02SpinTimeline = gsap.timeline({
    paused: true,  // Start paused
    repeat: -1,    // Repeat indefinitely
    ease: "power1.inOut", // Smooth easing for acceleration/deceleration
});



scene.background = new THREE.Color(0x111111);
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.domElement.id = 'myCanvas';
document.body.appendChild(renderer.domElement);


window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update camera aspect ratio and projection matrix
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Resize renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    //bloomPass.setSize(width, height);
});



var cameraControls = new OrbitControls(camera, renderer.domElement);

cameraControls.minDistance = 0.5;
cameraControls.maxDistance = 1.0;


camera.position.z = 1.5;
camera.position.x = 0.0;
camera.position.y = 5;

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.22;
renderer.shadowMap.enabled = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;

let textureVid = document.createElement("video");
textureVid.src = `./glb/cordfree/LCD_battery.mp4`; // transform gif to mp4
textureVid.loop = true;

//textureVid.play();


// Load video texture
let videoTexture = new THREE.VideoTexture(textureVid);
videoTexture.format = THREE.RGBFormat;
videoTexture.minFilter = THREE.NearestFilter;
videoTexture.maxFilter = THREE.NearestFilter;
videoTexture.generateMipmaps = false;

// Create mesh
var videogeometry = new THREE.PlaneGeometry(.0271, .0271);
var videomaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
var videomesh = new THREE.Mesh(videogeometry, videomaterial);
videomesh.rotateX(0 - (Math.PI * 0.5));
videomesh.rotateZ(0 - (Math.PI * 1));
videomesh.translateZ(0.141);
videomesh.translateY(0.146);

const lights = applyLighting(scene, renderer);


// Start all lights off (dark)
lights.key.intensity = 0;
lights.fill.intensity = 0;
lights.rim.intensity = 0;
lights.ambient.intensity = 0;


gltfLoader.load('./glb/robot/804_A_test_001.glb', (gltf) => {


    let sc = 1
    gltf.scene.scale.x = sc;
    gltf.scene.scale.y = sc;
    gltf.scene.scale.z = sc;

    scene.add(gltf.scene)


    object01 = gltf.scene.getObjectByName(replaceSpacesWithUnderscores("rotor brush null A"))
    object02 = gltf.scene.getObjectByName(replaceSpacesWithUnderscores("rotor brush null B"))
    object03 = gltf.scene.getObjectByName(replaceSpacesWithUnderscores("SB-430273_AA - WET ROLLER ASSY_43089"))
    object04 = gltf.scene.getObjectByName(replaceSpacesWithUnderscores("SB-430272_AA - DUST BOX ASSY"))
    object05 = gltf.scene.getObjectByName(replaceSpacesWithUnderscores("SB-430287_AA - TRACTION WHEEL ASSY_30408"))
    object06 = gltf.scene.getObjectByName(replaceSpacesWithUnderscores("SB-430287_AA - TRACTION WHEEL ASSY_38412"))
    object07 = gltf.scene.getObjectByName(replaceSpacesWithUnderscores("SB-430273_AA - WET ROLLER ASSY_37478"))
    object08 = gltf.scene.getObjectByName(replaceSpacesWithUnderscores("SB-430275_AA - BRUSHBAR ASSY_22072"))
    object09 = gltf.scene.getObjectByName(replaceSpacesWithUnderscores("SB-430279_AA - FRONT WHEEL ASSY_5505"))
    object10 = gltf.scene.getObjectByName(replaceSpacesWithUnderscores("SB-430287_AA - TRACTION WHEEL ASSY_41617"))
    //gsap.to(cameraControls.target, { duration: 0.001, x: object09.position.x, y: object09.position.y, z: object09.position.z, ease: "none", onUpdate: function () { cameraControls.update(); } });



    playOpeningAnimation();

})

animate()

function animate() {
    requestAnimationFrame(animate)
    //renderer.render(scene, camera); // fallback if composer not yet ready
    composer.render(); // render with composer if available
}



function animateGlow(object3D, glowColor = 0xffffff) {
    object3D.traverse((child) => {
        if (child.isMesh) {
            // Clone material if needed
            child.material = child.material.clone();
            child.material.emissive = new THREE.Color(child.material.color);
            child.material.emissiveIntensity = 0;

            // Animate emissiveIntensity with GSAP
            const tween = gsap.fromTo(child.material, 
                {emissiveIntensity: 5, duration: 0.8, ease: "sine.inOut" },
                {emissiveIntensity: 0, duration: 0.8,ease: "sine.inOut" }
            );

            glowTweens.set(child, tween);
        }
    });
}

function stopGlow(object3D) {
    object3D.traverse((child) => {
        if (child.isMesh && glowTweens.has(child)) {
            glowTweens.get(child).kill();
            glowTweens.delete(child);

            // Reset emissive
            child.material.emissiveIntensity = 0;
        }
    });
}





function playOpeningAnimation() {


    // Animate to full brightness
    gsap.to(lights.key, { intensity: 2, duration: 1 });
    gsap.to(lights.fill, { intensity: 0.5, duration: 1, delay: 0.2 });
    gsap.to(lights.rim, { intensity: 1, duration: 1, delay: 0.4 });
    gsap.to(lights.ambient, { intensity: 0.2, duration: 1, delay: 0.6 });

    const tl = gsap.timeline();
    cameraPositionTimeline.to(camera.position, { id: 'openingAnimation', duration: 3, x: 0, y: -1.5, z: 1.75, ease: "power2.inOut", onUpdate: function () { cameraControls.update(); } });

    tl.call(() => {
        handleSideEdgeCleanersToggle();
    }, null, 2.25);

    tl.call(() => {
        handleWetRollerToggle();
    }, null, 1.75);

    tl.call(() => {
        handleWheelToggle();
    }, null, 2.0);

    tl.call(() => {
        handleBrushBarToggle();
    }, null, 2.25);

}

function replaceSpacesWithUnderscores(input) {
    return input.replace(/ /g, "_");
}

addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1;

})

function checkCameraPostition() {

    if (camera.position.y > 0.1) {

        // The camera is positioned over the top of the object. 
        // We probably want to move the camera underneath to see the nessecary objects.

        // Is the camera already moving?
        const result = isCameraTweening(camera);

        if (result.tweening) {
            console.log("Camera is tweening to:", result.target);
            if (
                result.target &&
                result.target.x === 0 &&
                result.target.y === -1.5 &&
                result.target.z === 1.75
            ) {
                // We are OK to do nothing, camera is moving to required destination
                console.log("Camera is tweening to starting position");
            } else {
                // Camera is moving, but not to the starting position.
                cameraPositionTimeline.clear();
                cameraPositionTimeline.to(camera.position, { duration: 1.5, x: 0, y: -1.5, z: 1.75, overwrite: "true", ease: "power1.inOut", onUpdate: function () { cameraControls.update(); } });
            }

        } else {
            // Camera is not moving, so we can move it to the starting position.
            console.log("Camera is idle.");
            cameraPositionTimeline.clear();
            cameraPositionTimeline.to(camera.position, { duration: 1.5, x: 0, y: -1.5, z: 1.75, overwrite: "true", ease: "power1.inOut", onUpdate: function () { cameraControls.update(); } });
        }



    } else {
        // Assume camera shows enough underside to remain where it is.
    }

    resetCameraTarget();
}


function isCameraTweening(camera) {
    const tweens = gsap.getTweensOf(camera.position);

    for (const tween of tweens) {
        if (tween.isActive()) {
            const vars = tween.vars;
            const targetPos = {
                x: vars.x ?? camera.position.x,
                y: vars.y ?? camera.position.y,
                z: vars.z ?? camera.position.z,
            };

            return {
                tweening: true,
                target: targetPos,
            };
        }
    }

    return {
        tweening: false,
        target: null,
    };
}


var btn2 = document.getElementById('btn2');
btn2.addEventListener("click", toggleDustBox);


var btn5 = document.getElementById('btn5');
btn5.addEventListener("click", toggleWetRollerTray);


sideCleanerButton.addEventListener('click', (event) => { handleSideEdgeCleanersToggle(event); });
function handleSideEdgeCleanersToggle(triggerSource) {
    if (triggerSource instanceof Event) {
        animateGlow(object01, 0xff0000);
        animateGlow(object02);
    }
    toggleSpin(object01, sideCleaner01SpinTimeline, updateButtonClass, "sideCleanerButton", "y");
    toggleSpin(object02, sideCleaner02SpinTimeline, updateButtonClass, "sideCleanerButton", "y", -1);
    checkCameraPostition();
}


brushBarButton.addEventListener('click', (event) => { handleBrushBarToggle(event); });
function handleBrushBarToggle(triggerSource) {
     if (triggerSource instanceof Event) {
    animateGlow(object08);
     }
    toggleSpin(object08, brushBarSpinTimeline, updateButtonClass, "brushBarButton", "x");
    checkCameraPostition();
}

wetRollerButton.addEventListener('click', (event) => { handleWetRollerToggle(event); });
function handleWetRollerToggle(triggerSource) {
    if (triggerSource instanceof Event) {
    animateGlow(object03);
    }
    toggleSpin(object03, wetRollerSpinTimeline, updateButtonClass, "wetRollerButton", "x", -1, 0.75, 0.75, 1.5);
    checkCameraPostition();
}

wheelsButton.addEventListener('click', (event) => { handleWheelToggle(event); });
function handleWheelToggle(triggerSource) {
    if (triggerSource instanceof Event) {
    animateGlow(object05);
    animateGlow(object06);
    }
    toggleSpin(object05, wheel01SpinTimeline, updateButtonClass, "wheelsButton", "x", 1, 1, 1, 3);
    toggleSpin(object06, wheel02SpinTimeline, updateButtonClass, "wheelsButton", "x", 1, 1, 1, 3);
    checkCameraPostition();
}




function toggleDustBox(event) {

    cameraPositionTimeline.clear();
    cameraTargetTimeline.clear();
animateGlow(object04);
    if (dustBoxInserted == true) {

        gsap.to(object04.position, { duration: 1.4, z: -300, ease: "power1.inOut", delay: 0.5 });
        cameraPositionTimeline.to(camera.position, { overwrite: "true", duration: 1.5, x: -3, y: 3.0, z: 1.0, ease: "power1.inOut", onUpdate: function () { cameraControls.update(); } });
        cameraTargetTimeline.to(cameraControls.target, { overwrite: "true", duration: 1.5, x: 0, y: 0.2, z: 0, ease: "power1.inOut", onUpdate: function () { cameraControls.update(); } });
        dustBoxInserted = false;
        updateButtonClass('spinning', event.currentTarget.id);
    } else {

        gsap.to(object04.position, { duration: 1.75, z: 0, ease: "power1.inOut" });
        cameraPositionTimeline.to(camera.position, { overwrite: "true", duration: 1.75, x: -6, y: 3.0, z: 1.0, ease: "power1.inOut", delay: 0.0, onUpdate: function () { cameraControls.update(); } });
        resetCameraTarget();
        dustBoxInserted = true;
        updateButtonClass('idle', event.currentTarget.id);
    }

}


function toggleWetRollerTray(event) {
animateGlow(object07);
    cameraPositionTimeline.clear();
    cameraTargetTimeline.clear();

    if (wetRollerInserted == true) {
        gsap.to(object07.position, { duration: 1.4, x: 400, ease: "power1.inOut" });
        cameraPositionTimeline.to(camera.position, { overwrite: "true", duration: 1.5, x: -0.4, y: 4.0, z: 1.4, ease: "power1.inOut", onUpdate: function () { cameraControls.update(); } });
        cameraTargetTimeline.to(cameraControls.target, { overwrite: "true", duration: 1.5, x: -0.4, y: -0.25, z: -0.1, ease: "power1.inOut", onUpdate: function () { cameraControls.update(); } });
        wetRollerInserted = false;
        updateButtonClass('spinning', event.currentTarget.id);
    } else {
        gsap.to(object07.position, { duration: 1.2, x: 0, ease: "power1.inOut" });
        cameraPositionTimeline.to(camera.position, { overwrite: "true", duration: 1.2, x: -6, y: 3.0, z: 1.0, ease: "power1.inOut", onUpdate: function () { cameraControls.update(); } });
        resetCameraTarget();
        wetRollerInserted = true;
        updateButtonClass('idle', event.currentTarget.id);
    }


}

function resetCameraTarget(myDuration = 1.5) {
    cameraTargetTimeline.clear();
    cameraTargetTimeline.to(cameraControls.target, { overwrite: "true", duration: myDuration, x: 0, y: 0, z: 0, ease: "power1.inOut", delay: 0.0, onUpdate: function () { cameraControls.update(); } });
}




function updateButtonClass(state, button) {
    const btn = document.getElementById(button);
    const circle = btn.querySelector('.circle');
    circle.classList.remove("idle", "spinning", "decelerating");
    circle.classList.add(state);
}
