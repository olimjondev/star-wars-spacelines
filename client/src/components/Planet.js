import React, { Component } from "react";
import * as THREE from "three-full";

class Planet extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 15;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("rgba(0, 0, 0, 0)");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    
    var loader = new THREE.TextureLoader();
    loader.load(
      `/images/${this.props.planetTexture}.jpg`,
      this.onLoad,
      this.onProgress,
      this.onError
    );
    
    var lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    if(this.props.planetTexture === 'earth'){
        lights[0].position.set(70, 70, 100);
    }
    else{
        lights[0].position.set(-70, 70, 100);
    }
    
    this.scene.add(lights[0]);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    this.planetMesh.rotation.y += 0.004;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  onLoad = texture => {
    console.log(this.props.size, 'Planet.js');
    var objGeometry = new THREE.SphereBufferGeometry(this.props.size, 35, 35);
    var objMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    shading: THREE.FlatShading
    });

    this.planetMesh = new THREE.Mesh(objGeometry, objMaterial);
    this.scene.add(this.planetMesh);
    this.renderScene();
    this.start();
  };

  onProgress = xhr => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  };

  onError = error => {
    console.log(error, "An error happened");
  };

  render() {
    const {planet} = this.props;
    return (
      <div
        className={`planet floating ${this.props.class}`}
        style={{ width: "400px", height: "400px" }}
        ref={mount => {
          this.mount = mount;
        }}
      >
        <div className="content">
          <h1>{planet.name}</h1>
          <span><b>Diameter:</b> {planet.diameter}</span>
          <span><b>Rotation period:</b> {planet.rotation_period}</span>
          <span><b>Climate:</b> {planet.climate}</span>
          <span><b>Population:</b> {planet.population / 1000000000} bln.</span>
        </div>
      </div>
    );
  }
}

Planet.defaultProps = {
  planet:{
    name: 'Earth',
    diameter: '12500',
    rotation_period: '24',
    climate: 'mixed',
    population: '7530000000'
  }
}

export default Planet;
