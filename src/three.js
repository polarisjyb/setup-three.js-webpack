import './style.css';
import * as THREE from 'three';

const init = () => {
  const scene = new THREE.Scene();
  // Scene은 렌더링 할 모든 객체와 카메라 광원을 저장하는 컨테이너 개념이다.

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  // THREE.PerspectiveCamera(fov, aspect, near, far)

  /*
  camera에는 PerspectiveCamera, OrthographicCamera 두 가지가 존재한다.
  PerspectiveCamera : 일상생활에서 우리가 보는 외관이라고 생각할 수 있다.
  OrthographicCamera : 직교 카메라, 시점으로부터 거리의 상관없이 모든 물체가 동일한 크기.
 */

  const renderer = new THREE.WebGLRenderer(/* { antialias: true } */);
  // WebGLRenderer 는 WebGL을 사용하여 scene을 렌더링한다.

  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  // 헥스 코드를 사용하여 색 지정
  
  /*
  헥스 코드는 특정한 색을 표현하기 위한 색상 표현법이다.
  RGB 색상은 약 16,777,216가지의 색상을 표현할 수 있는데 이 많은 색상들을
  디지털 상에서 간편하고 정확하게 표현하기 위해 마련된 코드이다.
 */

  renderer.setSize(window.innerWidth, window.innerHeight);
  // .setSize(width: integer, height: integer, updateStyle: Boolean) 

  /*
  디바이스 픽셀 비율을 고려하여 출력 캔버스의 크기 (너비, 높이)를 조정한다.
  updateStyle을 false로 설정하면 출력 캔버스의 스타일이 변경되지 않는다.
  */

};

window.onload = init;