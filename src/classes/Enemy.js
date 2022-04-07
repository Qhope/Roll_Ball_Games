import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

export default class Enemy extends GameObject {
  constructor(size, game) {
    super("enemy", game);
    const vertexData = BABYLON.VertexData.CreateBox({ size });
    vertexData.applyToMesh(this);

    const material = new BABYLON.StandardMaterial("enemyMaterial", game.scene);
    //Fix this color
    material.emissiveColor = new BABYLON.Color3(0.929, 1, 0.341);
    material.specularColor = new BABYLON.Color3(1, 0, 0);

    this.material = material;
    game.shadows.getShadowMap().renderList.push(this);

    //animation
    const animation = new BABYLON.Animation(
      "animEnemy",
      "rotation.y",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keys = [
      {
        frame: 0,
        value: 0,
      },
      {
        frame: 30,
        value: Math.PI / 2,
      },
      {
        frame: 60,
        value: Math.PI,
      },
      {
        frame: 90,
        value: (3 * Math.PI) / 2,
      },
      {
        frame: 120,
        value: 2 * Math.PI,
      },
    ];
    animation.setKeys(keys);
    this.animations.push(animation);
    game.scene.beginAnimation(this, 0, 120, true, 1.0);
  }
}
