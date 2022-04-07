import * as BABYLON from "babylonjs";

export default class GameObject extends BABYLON.Mesh {
  constructor(name, game) {
    super(name, game.scene);
    this.game = game;
    this.scene = game.scene;
  }
}
