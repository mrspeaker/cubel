const THREE = require("three");
const geom = require("../geom/geom");
const materials = require("../geom/materials");

class Blerb extends THREE.Object3D {
  constructor(x, y, z) {
    super();
    this.position.set(x, y, z);
    this.speed = Math.random() * (Math.random() < 0 ? -1 : 1) * 0.4;
    this.add(new THREE.Mesh(geom.blerb, materials.green));
  }

  update () {
    this.position.x += this.speed;
    if (this.position.x > 150) this.speed *= -1;
    if (this.position.x < -150) this.speed *= -1;
  }
}

module.exports = Blerb;
