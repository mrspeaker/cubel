const THREE = require("three");

const geom = {
  "blank": new THREE.BoxGeometry(100, 10, 100),
  "ladder": new THREE.BoxGeometry(100, 100, 100),
  "blerb": new THREE.BoxGeometry(7, 15, 7)
};

module.exports = geom;
