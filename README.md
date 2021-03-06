# Vue.js 퀵 스타트(2판) : 빠르게 배워서 바르게 적용하는
- 저자: 원형섭
- 출판사: 루비페이퍼
<img src="cover_vuejs_quickstart.png" data-canonical-src="cover_vuejs_quickstart.png" width="300" height="300" />

----------------------------


## 오탈자, 공지사항
* 오탈자는 [여기](오탈자.MD)를 확인합니다.
* http://sample.bmaster.kro.kr 서비스 주소가 크롬에서 멀웨어가 있다고 나타나네요.. 아마도 연락처서비스다보니 전화번호 같은 부분이 있어서 그런것 같습니다. 멀웨어 아니니 그냥 쓰셔도 됩니다. 정 걱정이 되신다면 https://contactsvc.herokuapp.com 로 접속해서 테스트하시거나 http://github.com/stepanowon/contactsvc에 있는 코드를 내려받아 로컬에서 직접 실행하세요.

----------------------------

## 업그레이드 변경사항

### 0. 연락처 서비스( http://sample.bmaster.kro.kr )가 가끔 작동하지 않을 경우가 있습니다. 그런 경우에는 다음의 주소를 이용하세요.
* http://sample2.bmaster.kro.kr
* https://contactsvc.herokuapp.com

- 특히 작성한 Vue 앱을 netlify와 같은 배포 서비스에 등록하여 테스트할 때는 https를 지원하는 연락처 서비스가 필요합니다. 이 경우에는 https://contactsvc.herokuapp.com 를 이용하면 됩니다.

### 1. Vue CLI 3.0 정식버전이 출시되었습니다. 축하합니다!!
이 책은 Vue CLI 3.0 rc.3 기준으로 쓰여졌지만 예제와 기능 테스트에는 문제가 없을 것으로 생각됩니다.

### 2. vuejs-paginate 컴포넌트 버전업 문제
집필 당시의 version은 1.9.3버전 이었으나 2.x로 업그레이드 되었습니다. 일부기능의 오류가 발생합니다. 이 문제를 해결하기 위해 282페이지에서 패키지를 다운로드하는 부분을 다음과 같이 바꿔주세요.
~~~
yarn add vuejs-paginate@1.9.3 bootstrap@3.3.7
- 또는 -
npm install --save  vuejs-paginate@1.9.3 bootstrap@3.3.7
~~~

### 3. Vue CLI 3.x으로 작성한 코드를 IE11에서 작동하도록 설정하기
- 다음 문서를 참조하세요.
- https://steemit.com/vue-cli3/@stepanowon/vue-cli-3-x-ie11

-------------------------------

## 예제파일
* 각 장별로 examples 디렉터리에 예제를 분류하였습니다.
* 장별로 여러개의 프로젝트가 있는 경우는 장별로 Readme파일이 있습니다. 각 절마다 어떤 프로젝트를 사용하는지 명시되어 있습니다.
* 예제 파일을 압축파일로 받고 싶다면 [여기](https://github.com/stepanowon/vuejs_book_2nd/archive/master.zip)를 클릭하세요.
* 이 책에서 사용하는 서비스 API 예제는 다음을 확인하세요.    
   * API 다운로드 : https://github.com/stepanowon/contactsvc 
   * API 사용법 : http://sample.bmaster.kro.kr
--------------------------------

## 목차
- CHAPTER 01 시작하기
  - 1.1 Vue.js란?
  - 1.2 개발 환경 설정
    - 1.2.1 Node.js 설치
    - 1.2.2 Visual Studio Code 설치
    - 1.2.3 크롬 브라우저 및 Vue.js devtools 설치 
    - 1.2.4 Vue-CLI 설치 
  - 1.3 첫 번째 Vue.js 애플리케이션

- CHAPTER 02 Vue.js 기초
  - 2.1 hellovuejs 예제 분석
  - 2.2 기본 디렉티브
    - 2.2.1 v-text, v-html 디렉티브
    - 2.2.2 v-bind 디렉티브
    - 2.2.3 v-model 디렉티브
    - 2.2.4 v-show, v-if, v-else, v-else-if 디렉티브
  - 2.3 반복 렌더링 디렉티브
  - 2.4 기타 디렉티브
  - 2.5 계산형 속성

- CHAPTER 03 Vue 인스턴스
  - 3.1 el, data, computed 옵션
  - 3.2 메서드
  - 3.3 관찰 속성
  - 3.4 v-cloak 디렉티브
  - 3.5 Vue 인스턴스 라이프 사이클

- CHAPTER 04 이벤트 처리
  - 4.1 인라인 이벤트 처리
  - 4.2 이벤트 핸들러 메서
  - 4.3 이벤트 객체
  - 4.4 기본 이벤트 
  - 4.5 이벤트 전파와 버블링
  - 4.6 이벤트 수식어
    - 4.6.1 once 수식어
    - 4.6.2 키코드 수식어
    - 4.6.3 마우스 버튼 수식어

- CHAPTER 05 스타일
  - 5.1 스타일 적용
  - 5.2 인라인 스타일
  - 5.3 CSS 클래스 바인딩
  - 5.4 계산형 속성, 메서드를 이용한 스타일 적용
  - 5.5 컴포넌트에서의 스타일 적용
  - 5.6 스타일 예제

- CHAPTER 06 컴포넌트 기초
  - 6.1 컴포넌트 조합
  - 6.2 컴포넌트의 작성
  - 6.3 DOM 템플릿 구문 작성 시 주의 사항
  - 6.4 컴포넌트에서의 data 옵션
  - 6.5 props와 event
    - 6.5.1 props를 이용한 정보 전달
    - 6.5.2 event를 이용한 정보 전달
    - 6.5.3 props와 event 예제
  - 6.6 이벤트 버스 객체를 이용한 통신

- CHAPTER 07 ECMAScript 2015
  - 7.1 ES2015를 사용하기 위한 프로젝트 설정
  - 7.2 let과 const
  - 7.3 기본 파라미터와 가변 파라미터
  - 7.4 구조분해 할당(destructuring assignment)
  - 7.5 화살표 함수(Arrow function)
  - 7.6 새로운 객체 리터럴
  - 7.7 템플릿 리터럴
  - 7.8 컬렉션
  - 7.9 클래스
  - 7.10 모듈
  - 7.11 Promise
  - 7.12 전개연산자(Spread Operator)

- CHAPTER 08 Vue CLI 도구
  - 8.1 Vue CLI 구성요수와 설치
  - 8.2 프로젝트 생성과 기본 사용법
    - 8.2.1 프로젝트 생성
    - 8.2.2 명령어 기본 사용법
    - 8.2.3 vue-cli-service 사용법
  - 8.3 플러그인
  - 8.4 vue.config.js
  - 8.5 vue CLI GUI 도구
  
- CHAPTER 09 컴포넌트 심화
  - 9.1 단일 파일 컴포넌트
  - 9.2 컴포넌트에서의 스타일
    - 9.2.1 범위 CSS(Scoped CSS)
    - 9.2.2 CSS 모듈(CSS Module)
  - 9.3 슬롯
    - 9.3.1 슬롯의 기본 사용법
    - 9.3.2 명명된 슬롯
    - 9.3.3 범위 슬롯
  - 9.4 동적 컴포넌트
  - 9.5 재귀 컴포넌트

- CHAPTER 10 axios를 이용한 서버통신
  - 10.1 서비스 API 소개
  - 10.2 axios 기능 테스트
    - 10.2.1 http 프록시 설정
    - 10.2.2 axios 사용
    - 10.2.3 axios 요청 방법
    - 10.2.4 axios 응답 형식
    - 10.2.5 기타 메서드
    - 10.2.6 파일 업로드 처리
    - 10.2.7. axios 요청과 config 옵션
    - 10.2.8 Vue 인스턴스에서 axios 이용하기
    - 10.2.9 axios 사용 시 주의 사항
  - 10.3. 연락처 애플리케이션 예제
    - 10.3.1 기초 작업
    - 10.3.2 App.vue 작성
    - 10.3.3 ContactList.vue 작성
    - 10.3.4 입력폼, 수정폼 작성
    - 10.3.5 사진 변경폼 작성
  - 10.4 정리

- CHAPTER 11 Vuex를 이용한 상태 관리
  - 11.1 왜 Vuex를 사용하는가?
  - 11.2 Vuex란?
  - 11.3 상태와 변이
    - 11.3.1 상태와 변이 적용 예제
    - 11.3.2 헬퍼 메서드
  - 11.4 게터
  - 11.5 액션
    - 11.5.1 액션 이용하기
    - 11.5.2 액션을 이용한 비동기 처리
    - 11.5.3 액션의 기능
  - 11.6 대규모 애플리케이션의 저장소 파일
    - 11.6.1 역할별 분리
    - 11.6.2 모듈 이용하기
  - 11.7 Vuex를 이용하도록 연락처 애플리케이션 작성
    - 11.7.1 상수 정의
    - 11.7.2 Vuex 저장소 객체 작성
    - 11.7.3 App.vue 변경
    - 11.7.4 ContactList.vue 변경
    - 11.7.5 ContactForm.vue 변경
    - 11.7.6 UpdatePhoto.vue 변경
    - 11.7.7 main.js 변경
    - 11.7.8 정리

- CHAPTER 12 vue-router를 이용한 라우팅
  - 12.1 vue-router란?
  - 12.2 vue-router 기초
  - 12.3 동적 라우트
  - 12.4 중첩 라우트
  - 12.5 명명된 라우트
  - 12.6 프로그래밍 방식의 라우팅 제어
    - 12.6.1 라우터 객체의 push 메서드
    - 12.6.2 내비게이션 보호
  - 12.7 라우팅 모드
  - 12.8 라우트 정보를 속성으로 연결하기
  - 12.9 연락처 애플리케이션에 라우팅 기능 적용
    - 12.9.1 초기 설정 작업
    - 12.9.2 vuex 상태 관리 기능 변경
    - 12.9.3 main.js에 라우팅 기능 추가
    - 12.9.4 App.vue 파일 변경
    - 12.9.5 ContactList.vue 컴포넌트 변경
    - 12.9.6 ContactForm.vue, UpdatePhoto.vue 컴포넌트 수정
  - 12.10 지연 시간에 대한 처리
    - 12.10.1 API 호출 지연 시간 발생
    - 12.10.2 스피너 컴포넌트 작성
    - 12.10.3 상태와 변이, 액션 변경

- CHAPTER 13 트랜지션 효과
  - 13.1 CSS 트랜지션 기초
  - 13.2 트랜지션 컴포넌트 기초
  - 13.3 CSS 애니메이션 처리
  - 13.4 트랜지션 이벤트 훅
  - 13.5 리스트에 대한 트랜지션
  - 13.6 연락처 애플리케이션에 트랜지션 적용하기

- 부록 A 단위 테스트
- 부록 B 서버 사이드 렌더링


