import * as THREE from 'https://esm.sh/three@0.157.0';

export function applyLighting(scene, renderer) {

  const key = new THREE.DirectionalLight(0xffffff, 2);
  key.position.set(5, 10, 10);
  key.castShadow = true;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xffffff, 0.5);
  fill.position.set(-5, 2, 5);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffffff, 1);
  rim.position.set(0, 5, -10);
  scene.add(rim);

  const ambient = new THREE.AmbientLight(0x444444, 0.2);
  scene.add(ambient);

  const upLight = new THREE.DirectionalLight(0xffffff, 2);
  upLight.position.set(0, -5, 0);
  upLight.target.position.set(0, 0, 0);
  scene.add(upLight);
  scene.add(upLight.target);

  /*const hemi = new THREE.HemisphereLight(0xffffff, 0x222222, 0.6);
  scene.add(hemi);*/

  renderer.shadowMap.enabled = true;

  return { key, fill, rim, ambient, upLight };
}
