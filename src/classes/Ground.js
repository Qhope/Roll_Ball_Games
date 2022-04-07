import * as BABYLON from "babylonjs";
import GameObject from "./GameObject";

export default class Ground extends GameObject {
  constructor(size, game) {
    super("ground", game);
    const vertexData = BABYLON.VertexData.CreateBox({
      width: size,
      height: size,
      depth: 0.05,
    });
    vertexData.applyToMesh(this);

    this.physicsImpostor = this.makeStaticImposter(this, game.scene);
    // make walls
    this.makeWalls(game.scene, size);

    // materials
    const material = new BABYLON.StandardMaterial("groundMaterial", game.scene);
    material.diffuseColor = new BABYLON.Color3(0.25, 0.5, 1);
    material.specularColor = BABYLON.Color3.White();
    material.ambientColor = new BABYLON.Color3(0.1, 0, 0);
    const groundMat = new BABYLON.StandardMaterial("groundMat", game.scene);
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

    this.material = material;
    this.northWall.material = material;
    this.southWall.material = material;
    this.eastWall.material = material;
    this.westWall.material = material;
    this.ground.material = material;

    this.receiveShadows = true;
  }

  makeWalls(scene, size) {
    // create walls
    this.northWall = new BABYLON.MeshBuilder.CreateBox(
      "wall",
      {
        width: size,
        height: 1,
        depth: 1.5,
      },
      scene
    );
    this.northWall.position.y = -size / 2;
    this.northWall.physicsImpostor = this.makeStaticImposter(
      this.northWall,
      scene
    );

    this.southWall = new BABYLON.MeshBuilder.CreateBox(
      "wall",
      {
        width: size,
        height: 1,
        depth: 1.5,
      },
      scene
    );
    this.southWall.position.y = size / 2;
    this.southWall.physicsImpostor = this.makeStaticImposter(
      this.southWall,
      scene
    );

    this.eastWall = new BABYLON.MeshBuilder.CreateBox(
      "wall",
      {
        width: size - 1,
        height: 1,
        depth: 1.5,
      },
      scene
    );
    this.eastWall.rotation.z = Math.PI / 2;
    this.eastWall.position.x = 0.5 - size / 2;
    this.eastWall.physicsImpostor = this.makeStaticImposter(
      this.eastWall,
      scene
    );

    this.westWall = new BABYLON.MeshBuilder.CreateBox(
      "wall",
      {
        width: size - 1,
        height: 1,
        depth: 1.5,
      },
      scene
    );
    this.westWall.rotation.z = Math.PI / 2;
    this.westWall.position.x = size / 2 - 0.5;
    this.westWall.physicsImpostor = this.makeStaticImposter(
      this.westWall,
      scene
    );
    this.ground = new BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: size, height: size },
      scene
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.z = 0;
    this.ground.physicsImpostor = this.makeStaticImposter(this.ground, scene);

    // attaches wall meshes to the root game object.
    this.northWall.parent = this;
    this.southWall.parent = this;
    this.westWall.parent = this;
    this.eastWall.parent = this;
    this.ground.parent = this;
  }

  makeStaticImposter(object, scene) {
    return new BABYLON.PhysicsImpostor(
      object,
      BABYLON.PhysicsImpostor.BoxImpostor,
      {
        mass: 0,
        restitution: 0.9,
      },
      scene
    );
  }
}
