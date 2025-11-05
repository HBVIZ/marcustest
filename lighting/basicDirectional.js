import * as THREE from 'https://esm.sh/three@0.157.0';

export function applyLighting(scene, renderer) {
  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(5, 10, 7.5);
  light.castShadow = true;

  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}
