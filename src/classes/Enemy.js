import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

export default class Enemy extends GameObject {
  constructor(size, game) {
    super("enemy", game);
    const vertexData = BABYLON.VertexData.CreateSphere(
      { diameter: size },
      game.scene
    );
    vertexData.applyToMesh(this);
    const material = new BABYLON.StandardMaterial("enemyMaterial", game.scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    material.alpha = 0.6;
    material.specularPower = 16;
    material.specularColor = new BABYLON.Color3(0.7, 0.7, 1);
    this.material = material;
    game.shadows.getShadowMap().renderList.push(this);
  }
}
