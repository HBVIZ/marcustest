import * as THREE from 'https://esm.sh/three@0.157.0';
import { RGBELoader } from 'https://esm.sh/three@0.152.2/examples/jsm/loaders/RGBELoader.js;

const hdrTextureURL = new URL('hdr/studio_small_09_4k.hdr', import.meta.url);

export function applyLighting(scene, renderer, onReady = () => {}) {
  const rgbeLoader = new RGBELoader();

  rgbeLoader.load(hdrTextureURL.href, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;

    scene.environment = texture;
    // Optional: scene.background = texture;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;

    // Notify that lighting is ready (optional callback)
    onReady();
  });
}
