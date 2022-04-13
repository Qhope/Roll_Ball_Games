import * as BABYLON from "babylonjs";
import Ground from "./Ground";
import Cube from "./Cube";
import Player from "./Player";
import Enemy from "./Enemy";
import CreateMenu from "./MainMenu";

//const NUM_OF_CUBES = 1;
const GROUND_SIZE = 20;
const HEART = 3;
//const NUM_OF_ENEMY = 5;

export default class Game {
  constructor(canvasId) {
    // get element from html file.
    const canvas = document.getElementById(canvasId);
    // initiate the engine.
    this.engine = new BABYLON.Engine(canvas, true);
    // create a scene.
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.ambientColor = BABYLON.Color3.White();
    // set up a camera.
    this.camera = new BABYLON.ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 3,
      25,
      BABYLON.Vector3.Zero(),
      this.scene
    );
    this.heart = HEART;

    // this.camera = new BABYLON.FreeCamera(
    //   "camera",
    //   new BABYLON.Vector3(-15, 10, -15),
    //   this.scene
    // );
    // sets where the camera is looking at.
    this.camera.setTarget(BABYLON.Vector3.Zero());
    // allows user to control camera.
    this.camera.attachControl(this.engine.getRenderingCanvas(), true);
    // lighting.
    this.light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    // directional light for shadows
    this.dirLight = new BABYLON.DirectionalLight(
      "dirLight",
      new BABYLON.Vector3(0, -1, -1),
      this.scene
    );
    this.dirLight.position = new BABYLON.Vector3(0, 20, 0);
    this.shadows = new BABYLON.ShadowGenerator(1024, this.dirLight);
    this.shadows.useBlurExponentialShadowMap = true;
    this.shadows.setTransparencyShadow(true);

    // physics engine
    this.scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.CannonJSPlugin()
    );

    // ground
    this.ground = new Ground(GROUND_SIZE, this);
    this.ground.rotation.x = Math.PI / 2;
    this.numOfCubes = 10;
    this.numOfEnemys = 3;
    // cubes
    this.placeCubes(this.numOfCubes);
    //Enemy
    this.placeEnemy(this.numOfEnemys);

    // player
    this.player = new Player(1, this);
    this.player.position = new BABYLON.Vector3(0, 1, 0);

    //Menu State
    this.state = CreateMenu(this.engine);

    this.initLevel(this.state);
    //Sound hit score
    const hitScore = new BABYLON.Sound(
      "Music",
      "./sound/hitScore.wav",
      this.scene
    );

    // check collisions before render.
    this.scene.registerBeforeRender(() => {
      //Cube hit
      let idx;
      this.cubes.forEach((cube, i) => {
        if (cube.intersectsMesh(this.player)) {
          cube.dispose();
          idx = i;
        }
      });
      if (idx !== undefined) {
        this.cubes.splice(idx, 1);
        hitScore.play();
      }
      document.getElementById(
        "info"
      ).innerText = `Cubes left: ${this.cubes.length}`;

      //Enemy Hit
      let idx2;
      this.enemy.forEach((enemy, i) => {
        if (enemy.intersectsMesh(this.player)) {
          console.log("Enemy hit");
          enemy.dispose();
          idx2 = i;
        }
      });
      if (idx2 !== undefined) {
        this.enemy.splice(idx2, 1);
        this.heart -= 1;
      }
      document.getElementById(
        "enemy"
      ).innerText = `Enemy left: ${this.enemy.length}`;
      //Heart remaining
      document.getElementById("heart").innerText = `Heart: ${this.heart}`;
      if (this.heart <= 0) {
        this.pause();
        this.engine.dispose();
        this.gameOverScene();
        this.restart();
      }
      if (this.cubes.length <= 0) {
        this.pause();
        this.engine.dispose();
        this.winningScene();
        this.restart();
      }
    });

    this.render();
  }

  pause() {
    this.engine.stopRenderLoop();
  }

  gameOverScene() {
    document.querySelector(".GameOver").style.display = "flex";
    document.querySelector(".status").style.display = "none";
    document.getElementById("heart").style.display = "none";
  }

  winningScene() {
    document.querySelector(".Winning").style.display = "flex";
    document.querySelector(".status").style.display = "none";
    document.getElementById("heart").style.display = "none";
  }

  restart() {
    setTimeout(function () {
      document.querySelector(".GameOver").style.display = "none";
      document.querySelector(".Winning").style.display = "none";
      const game = new Game("gameCanvas");
    }, 3000);
  }
  render() {
    this.engine.runRenderLoop(() => {
      if (this.state.switch) {
        this.state.scene = this.scene;
      }
      this.state.scene.render();
    });
  }

  initLevel(state) {
    switch (state.level) {
      case "easy":
        this.numOfCubes = 10;
        this.numOfEnemys = 3;
        break;
      case "normal":
        this.numOfCubes = 15;
        this.numOfEnemys = 5;
        break;
      default:
        this.numOfCubes = 10;
        this.numOfEnemys = 3;
        break;
    }
  }

  placeCubes(numOfCubes) {
    this.cubes = [];
    for (let i = 0; i < numOfCubes; i++) {
      const cube = new Cube(0.35, this);
      cube.position.y = 0.5;
      cube.rotation.x = Math.PI / 4;
      cube.rotation.z = Math.PI / 4;
      // RANDOM NUMBER BETWEEN MIN MAX
      const max = GROUND_SIZE / 2 - 1.5;
      const min = -GROUND_SIZE / 2 + 1.5;

      cube.position.x = Math.random() * (max - min) + min;
      cube.position.z = Math.random() * (max - min) + min;
      this.cubes.push(cube);
    }
  }

  placeEnemy(numOfEnemys) {
    this.enemy = [];
    for (let i = 0; i < numOfEnemys; i++) {
      const enemy = new Enemy(0.5, this);
      enemy.position.y = 0.5;
      enemy.rotation.x = Math.PI / 4;
      enemy.rotation.z = Math.PI / 4;
      // RANDOM NUMBER BETWEEN MIN MAX
      const max = GROUND_SIZE / 2 - 1.5;
      const min = -GROUND_SIZE / 2 + 1.5;
      console.log("enemy", enemy);
      enemy.position.x = Math.random() * (max - min) + min;
      enemy.position.z = Math.random() * (max - min) + min;
      this.enemy.push(enemy);
    }
  }
}
