const THREE = require("three");

const materials = {
  "grey": new THREE.MeshLambertMaterial({ color: 0x999999 }),
  "green": new THREE.MeshLambertMaterial({ color: 0x44ff44 })
};

module.exports = materials;
