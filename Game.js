const THREE = require("three");
const geom = require("./geom/geom");
const materials = require("./geom/materials");
const Blerb = require("./entities/Blerb");

class Game {

  constructor () {
    this.init();
    this.addGeom();

    this.entities = Array.from(new Array(25)).map(() => {
      const b = new Blerb(
        Math.random() * 300 - 150,
        ((Math.random() * 5 | 0) - 2.5) * 100 + 67,
        Math.random() * 300 - 150);
      this.scene.add(b);
      return b;
    });
    this.lightScene();

    this.update = this.update.bind(this);
    requestAnimationFrame(this.update);
  }

  init () {
    this.entities = [];
    this.scene = new THREE.Scene();
    const camera = this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000);
    camera.position.z = 1000;

    const renderer = this.renderer = new THREE.WebGLRenderer({antialias: true});
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize, false);
    resize();
    document.body.appendChild(renderer.domElement);
  }

  addGeom () {
    const {scene} = this;

    const w = 16;
    const h = 32;

    Array.from(new Array(w), (_, z) => {
      Array.from(new Array(h), (_, y) => {
        Array.from(new Array(w), (_, x) => {
          const isLadder = Math.random() < 0.1;
          if (!isLadder) {
            return;
          }
          const g = geom[isLadder ? "ladder" : "blank"];
          const gh = g.parameters.height;
          const mesh = new THREE.Mesh(g, materials.grey);
          mesh.position.x = (x - (w / 2)) * 100;
          mesh.position.y = (y - (h / 2)) * 100 + (gh / 2);
          mesh.position.z = (z - (w / 2)) * 100;
          scene.add(mesh);
        });
      });
    });
  }

  lightScene () {
    const {scene} = this;
    const amb = new THREE.AmbientLight(0x000000);
    scene.add(amb);

    const light = new THREE.PointLight(0x99ffff, 1, 1000);
    light.position.set(300, 300, 0);
    scene.add(light);

    const light2 = new THREE.PointLight(0xffff99, 1, 1000);
    light2.position.set(-300, -300, 0);
    scene.add(light2);
  }

  update () {
    const {camera, scene, renderer} = this;
    const spd = Date.now() / 5000;

    this.entities.map(e => e.update());

    renderer.render(scene, camera);

    camera.position.y = Math.cos(spd) * 2000;
    camera.position.x = Math.cos(spd) * 2000;
    camera.position.z = Math.sin(spd) * 2000;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    requestAnimationFrame(this.update);
  }

}

module.exports = Game;
