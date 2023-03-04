# setup-three.js-webpack

solar-system

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