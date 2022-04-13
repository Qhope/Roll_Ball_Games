const CreateMenu = (engine) => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.FreeCamera(
    "cameraMenu",
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  camera.setTarget(BABYLON.Vector3.Zero());

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;

  const menu = document.querySelector(".MainMenu");
  menu.style.display = "flex";
  const status = document.querySelector(".status");
  const heartInfo = document.getElementById("heart");
  status.style.display = "none";
  heartInfo.style.display = "none";

  let state = {
    scene: scene,
    level: "easy",
    switch: false,
  };
  const easy = document.getElementById("easy");
  easy.addEventListener("click", function () {
    menu.style.display = "none";
    state.level = "easy";
    state.switch = true;
    console.log("Switch");

    const status = document.querySelector(".status");
    const heartInfo = document.getElementById("heart");
    status.style.display = "block";
    heartInfo.style.display = "block";
  });

  const normal = document.getElementById("normal");
  normal.addEventListener("click", function () {
    menu.style.display = "none";
    state.level = "normal";
    state.switch = true;
    console.log("Switch");

    const status = document.querySelector(".status");
    const heartInfo = document.getElementById("heart");
    status.style.display = "block";
    heartInfo.style.display = "block";
  });

  return state;
};

export default CreateMenu;
