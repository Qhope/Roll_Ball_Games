import * as BABYLON from 'babylonjs';
import GameObject from './GameObject';

export default class Cube extends GameObject {
  constructor(size, game) {
    super('cube', game);
    const vertexData = BABYLON.VertexData.CreateBox({ size });
    vertexData.applyToMesh(this);

    const material = new BABYLON.StandardMaterial('cubeMaterial', game.scene);
    material.emissiveColor = new BABYLON.Color3(0.7, 0, 0.5);
    material.specularColor = new BABYLON.Color3(0, 1, 0);

    this.material = material;
    game.shadows.getShadowMap().renderList.push(this);

    // animation
    const animation = new BABYLON.Animation('animCube', 'rotation.y', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keys = [
      {
        frame: 0,
        value: 0
      },
      {
        frame: 30,
        value: Math.PI / 2
      },
      {
        frame: 60,
        value: Math.PI
      },
      {
        frame: 90,
        value: 3 * Math.PI / 2
      },
      {
        frame: 120,
        value: 2 * Math.PI
      }
    ];
    animation.setKeys(keys);
    this.animations.push(animation);
    game.scene.beginAnimation(this, 0, 120, true, 1.0);
  }
}
