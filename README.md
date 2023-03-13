# setup-three.js-webpack

three.js 와 webpack 개발 환경 설정을 하기 위해 만들었습니다.

앞으로 개인 프로젝트 환경 설정을 하기 위한 사전 연습입니다.

멈추지 않고 꾸준하게 합시다.

-------------------------------------------------------
23/01/10

main 브랜치에서는 웹팩 기본 설정을 마쳤습니다.
다음 작업은 three.js 모델링을 브라우저에 출력하는 작업을 진행할 예정입니다.

-------------------------------------------------------
23/01/11

threejs-1 브랜치에서는 3d 모델링을 브라우저에 출력하는 작업을 진행합니다.

-------------------------------------------------------
23/01/12

threejs-1 브랜치에서 three.js 공식 문서를 참고로 간단한 BoxGeometry를 브라우저에 출력하는 작업을 진행했습니다.
webpack dev server ( npm run dev ), webpack prod ( npm run build ) 모두 브라우저 정상 출력되는 것을 확인했습니다.

-------------------------------------------------------
23/01/13

threejs-2 브랜치에서 간단하게 평면과 그 위에 BoxGeometry 와 SphereGeometry를 활용하여 wireframe 형태로 된 오브젝트를 생성, 출력했습니다.
camera가 오브젝트를 향하도록 하기 위해 lookAt 메서드로 장면의 중앙을 가리키도록 했습니다.
html 요소 root 태그 안에 렌더링이 되도록 설정했습니다.

-------------------------------------------------------
23/01/18

threejs-3 브랜치에서 plane (평면 바닥)을 삭제하고 간단하게 회전 애니메이션을 구현했습니다.
다음 작업은 SphereGeomtery를 사용하지 않고 텍스처 매핑을 진행할 예정입니다.

-------------------------------------------------------
23/02/26

1. 태양계 구현을 위한 기본 설정 및 태양과 각 행성 생성, 크기 및 거리 비율 조정, 자전 애니메이션 추가

-------------------------------------------------------
23/02/27

1. 태양과 각 행성의 보다 정확한 크기 및 거리 비율 조정
- 실제 거리 계산과 좌표 거리 계산에 혼동이 있었으나 실제 비율과 근사한 값으로 해결 (추후 수정이 있을 수 있음)
- 거리 계산의 기준은 태양에서 지구까지의 거리
- 크기 계산의 기준은 지구의 지름(diameter)
  a. three.js 에서는 구체 생성 함수 매개변수로 반지름(radius)을 받기 때문에 혼동에 주의

2. 공전 애니메이션 추가 예정

3. 자전과 공전의 속도(기준) & 주기 & 궤도, 자전축의 기울기, 각 행성의 위성 등 세부적으로 설정할 것들이 많으나 간단하게 표현하기 위해서 근사하는 값들을 사용할 예정

-------------------------------------------------------
23/02/28

1. class 문법을 이용하여 태양과 각 행성을 생성하는 함수 모듈화 적용 및 확인
- 자전과 공전 애니메이션 이외에 three.js 구성요소 ( scene, camera, light, axes 등) 들도 필요시 모듈화 진행 예정

2. Mesh - material 요소에 매개변수로 wireframe 속성 추가 ( true or false 로 적용/비적용 가능 )

-------------------------------------------------------
23/03/02

1. Satellite 모듈 생성
- 달을 포함하여 추후에 위성 생성을 위해 새로운 모듈 생성

2. Satellite, Plante, Sun 모듈 - 자전, 공전 애니메이션 추가 및 수정
- 모든 행성의 자전 방향을 모두 반시계 방향으로 일시적으로 설정

- 자전 방향이 시계 방향인 예외 행성이 있기 때문에 추후 수정 필요

3. 애니메이션 구현을 위해서 검색을 통해 Math 메서드를 활용했으나 해당 메서드에 대한 이해가 아직 부족하기 때문에 보충 학습 필요

4. 지구와 달만 공전 애니메이션을 적용한 상태로 다른 행성들은 다음 작업에 적용할 예정

- 실제 속도 비율과 최대한으로 근사한 비율 적용 예정

5. 작업 중간에 주석 추가 및 수정하려는 노력 필요
- 불필요한 주석 처리
- 코드에 대한 설명

-------------------------------------------------------
23/03/04

1. THREE.EllipseCurve를 사용하여 태양계 행성의 공전 궤도를 시각적으로 표현
- EllipseCurve는 타원 모양의 2D 곡선을 생성한다. xRadius를 yRadius와 동일한 값으로 설정하면 원이 생성된다.
- 처음에는 CircleGeometry를 사용하여 공전 궤도를 표현하려 했으나 CircleGeometry는 두번째 매개변수로 segments(삼각형)의 수를 받기 때문에 공전 궤도를 line(선) 만을 이용해서 표현하기에는 부적절하다고 판단했다. 그 이유는 three.js 에서 원(면)을 표현할 때 삼각형으로 이루어진 선분(segments)을 조합하여 원 형태의 면을 표현하기 때문에 segments의 수가 많아지면 더 정교하고 부드러운 원 형태의 면이 만들어지지만, 그 수 많은 segments도 표현되기 때문에 피자를 수 많은 조각으로 잘라놓은 듯한 장면을 볼 수 있다.
- THREE.EllipseCurve 에서 생성된 THREE.Line 객체는 z축에 정렬되어 있으므로 x축을 중심으로 90도(π/2 라디안과 동일) 회전해야 한다. 태양계 행성의 궤도 평면인 x-z 평면에 평평하게 놓이도록 설정했다. (x축과 z축에 맞닿는 평면)

2. 기존 three.js 파일 이름을 index.js 로 변경했다.
- entry 파일을 three.js 에서 index.js 로 변경했기 때문에 webpack.common.js 에서 entry 파일을 index.js로 바꿔주었다.

3. 실제 자전, 공전 속도 비율을 계산하여 적용 예정
- 자전과 공전의 속도 비율을 계산하는 기준 필요
- ex) 지구의 자전, 공전 속도 = 1

4. 배경과 태양, 행성 및 위성 텍스처링 적용 예정

5. 모듈화 작업 진행 예정 (수시로 확인 및 작업)
- 작업을 하면서 구현되는 애니메이션과 늘어가는 코드에 따라 더 세밀한 모듈화가 필요하다고 생각

6. React.js 작업 진행 예정(추후)
- react.js에서 지원하는 react-three-fiber 를 활용하여 작업 예정

-------------------------------------------------------
23/03/06

1. BufferGeometry를 이용한 은하계 배경 생성 

- BufferGeometry - three.js의 모든 Geometry들을 구성하는 방식으로 BufferAttributes 라는 데이터 배열들의 집합으로 구성된다.
BoxGeometry(정육면체) 나 PlaneGeometry(평면체) 등은 이미 데이터가 세팅이 되어있는 Geometry들이라면,
BufferGeometry는 사용자가 데이터를 생성해서 커스텀할 수 있는 Geometry라고 볼 수 있다.

Geometry는 기본적으로 정점(Vertex)들의 집합이다. 그 정점에 속성을 부여해서 특정한 형태와 속성을 가진 Geometry를 만들 수 있다.
BufferAttributes는 바로 이 속성값을 부여하는데 사용된다.

- 애니메이션 효과 개선이나 모듈화 작업 등 추가 수정이 더 필요할 듯 하다.

-------------------------------------------------------
23/03/07

1. 포트폴리오 메인 페이지에서 보여줄 main.js (TagCloud 모형) 작성 및 text.html 파일 생성으로 작동 확인
- 컨디션 난조로 주석 및 상세 작업 일지는 다음 작업에 진행

-------------------------------------------------------
23/03/08

1. three.js 의 Object3D hierarchy (계층적 변화) 를 이용한 구조로 변경 예정 중
- Object3D 는 three의 많은 개체에 대한 기본 클래스로 3D 공간에서 개체를 조작하기 위한 메서드와 속성을 제공한다.
- 가장 일반적인 예는 mesh, light, camera 및 Object3D 그룹이 있다.
- Object3D 는 객체를 자식으로 추가하는 .add(object) 메서드를 통해 객체를 그룹화하는데 사용할 수 있지만 Group을 사용하는 것이 더 좋은 방법이다.
- Group 은 객체 그룹 작업을 구문적으로, 즉 문법적으로 더 명시성이 있는 작업이 되도록 도와줍니다.

-------------------------------------------------------
23/03/09

1. test.html (포트폴리오 메인 페이지 - TagCloud)

- script 파일 수정 중
- 재할당 되지 않는 변수에 let 대신 const 상수 사용
- 배열 리터럴을 사용하여 createTags 함수 단순화
- 불필요한 공백 및 세미콜론 제거
- 템플릿 리터럴을 사용하여 CSS 스타일 설정

2. main.js (TagCloud 생성 함수)

- main.js 파일 내에 var 변수 키워드를 let 키워드로 변경
- test.html 파일 내 script 코드를 main.js 파일로 옮기고 script 파일을 읽도록 변경 및 동일 작동 확인

3. TagCloud 생성 함수 코드 분석 및 수정, 모듈화 작업은 수시로 진행할 예정

-------------------------------------------------------
23/03/10

1. TextureLoader
- TextureLoader를 사용하여 배경 이미지 로드 및 SphereGeometry로 구체형 배경 적용
- 은하 배경 이미지 추가 (dark.jpg, galaxy.jpg)

2. 간단한 수정
- BuggerGeometry를 이용한 particle 효과 코드 주석 처리
- 각 행성의 공전 궤도 선을 기본 컬러로 설정 - 기본 컬러 : 0xffffff
- camera.position.set() 코드를 상위 줄로 변경
- camera - PerspectiveCamera(fov, near, far 값 조정)
- 불필요한 이미지 삭제 및 코드 제거

3. 코드 모듈화는 수시로 진행 예정

4. 태양과 각 행성의 텍스처 작업 진행 예정

-------------------------------------------------------
23/03/13

1. 태양과 각 행성의 텍스처 맵핑 작업 적용 및 확인
- sun.js 모듈에서는 태양만 생성하는 함수이기에 모듈 내부에서 이미지를 불러와서 적용
- planet.js 모듈에서는 여러 개의 행성을 생성하는 함수이기 때문에 index.js 에서 이미지를 불러와서 적용
- 텍스처 맵핑은 3차원 물체의 표면에 세부적인 질감의 묘사를 하거나 색을 칠하는 기법이기 때문에 mesh를 구성하는 요소 중에서 material 쪽에서 표현해줘야 하는 것으로 생각했고, three.js 의 공식문서 textureLoader 항목을 참고하여 적용

2. 태양계의 물리적인 요소 비율과 표현 고려 (크기, 자전과 공전 속도, 자전 축의 기울기, 원근감)
- 실사와 근접한 비율로 표현하려 했으나 브라우저에서 확인했을 때 크기가 작은 개체들은 육안으로 확인하는데 어려움이 있어 조정 예정
- 현재 작업 우선 순위가 아니기 때문에 마무리 작업으로 적용할 예정

3. 리소스 이미지 추가로 이미지 최적화 작업 고려

4. npm run build 명령 수행 시 CORS 에러 문제 해결 중
- 이미지 파일을 추가한 뒤로 문제가 발생한 것으로 예상
