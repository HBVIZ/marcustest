// Draw a simple scene and apply blur pass
import { Scene, Vector2, PerspectiveCamera, WebGLRenderer, 
  BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { BlurPass, RenderPass, EffectPass, ShaderPass, UnrealBloomPass } from '../src/passes';
import { EffectComposer } from '../src/core';
import { BloomEffect } from '../src/effects'
import { FXAAShader } from '../src/shaders'

export default class BlurDemo {
  
  initialize() {
    // create a simple scene
    const scene = new Scene();

    // create camera
    const fov = 75;
    const aspect = window.innerWidth/window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 4;

    // create a renderer with antialiasing
    const renderer = new WebGLRenderer({antialiasing: true});
    // config renderer size
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor("#000000");

    document.body.appendChild( renderer.domElement );

    // create cubes
    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial( { color: "#fff" } );
    const cube = new Mesh( geometry, material );

    // Add cube to Scene
    scene.add( cube );

    // Add Post processing
    const blurPass = new BlurPass();
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);

    const effectPass = new EffectPass(camera, new BloomEffect());
    effectPass.renderToScreen = true;

    // unreal
    const params = {
      exposure: 1,
      bloomStrength: 1.5,
      bloomThreshold: 0,
      bloomRadius: 0
    };
    const bloomPass = new UnrealBloomPass( new Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
			bloomPass.renderToScreen = true;
			bloomPass.threshold = params.bloomThreshold;
			bloomPass.strength = params.bloomStrength;
      bloomPass.radius = params.bloomRadius;

    const effectFXAA = new ShaderPass(FXAAShader);
    composer.setSize( window.innerWidth, window.innerHeight );
    composer.addPass( renderPass );
    composer.addPass(effectFXAA);
    composer.addPass(bloomPass);

    // Render Loop
    var render = function () {
      requestAnimationFrame( render );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      composer.render();
    };

    render();

  }
}