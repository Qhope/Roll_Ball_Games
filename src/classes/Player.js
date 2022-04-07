import * as BABYLON from 'babylonjs';
import GameObject from './GameObject';

export default class Player extends GameObject {
  constructor(diameter, game) {
    super('player', game);
    const vertexData = BABYLON.VertexData.CreateSphere({ diameter });
    vertexData.applyToMesh(this);

    const material = new BABYLON.StandardMaterial(
      'player material',
      game.scene
    );

    material.diffuseColor = new BABYLON.Color3(0.3, 0, 0.8);
    material.emissiveColor = new BABYLON.Color3(0.3, 0, 0.8);
    material.alpha = 0.6;
    material.specularPower = 16;
    material.specularColor = new BABYLON.Color3(0.7, 0.7, 1);

    // Fresnel
    material.reflectionFresnelParameters = new BABYLON.FresnelParameters();

    material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    material.emissiveFresnelParameters.bias = 0.6;
    material.emissiveFresnelParameters.power = 4;
    material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
    material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

    material.opacityFresnelParameters = new BABYLON.FresnelParameters();
    material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
    material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

    this.material = material;
    game.shadows.getShadowMap().renderList.push(this);

    // physics
    this.physicsImpostor = new BABYLON.PhysicsImpostor(
      this,
      BABYLON.PhysicsImpostor.SphereImpostor,
      {
        mass: 5,
        friction: 0.9,
        restitution: 0.9
      },
      game.scene
    );

    this.direction = BABYLON.Vector3.Zero();
    // user input
    window.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 87: // W
          this.direction = new BABYLON.Vector3(0, 0, -1);
          break;
        case 65: // A
          this.direction = new BABYLON.Vector3(1, 0, 0);
          break;
        case 83: // S
          this.direction = new BABYLON.Vector3(0, 0, 1);
          break;
        case 68: // D
          this.direction = new BABYLON.Vector3(-1, 0, 0);
          break;
        default:
      }
    })

    window.addEventListener('keyup', event => {
      this.direction = BABYLON.Vector3.Zero();
    })

    this.getScene().registerBeforeRender(() => {
      // move player.
      this.applyImpulse(this.direction, this.position);
    });
  }
}
