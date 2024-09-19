# MiniBlog 개인 블로그 플랫폼
### 🔖 프로젝트 개요
사용자들이 개인 블로그를 생성하고 게시글을 작성, 공유할 수 있는 플랫폼 개발

### 팀원 구성
- 최호석(PM)
- 김용현
- 노유정
  
### 역할 분담

- **최호석**

  - UI: 회원가입/ 로그인 구현
  - 기능: 데이터베이스 구현, 서버 구현

- **김용현**

  - UI: 메인페이지, 마이페이지, 회원가입/로그인 구현
  - 기능: 무한 스크롤 기능 및 글 목록 불러오기 구현

- **노유정**

  - UI: 게시글 작성 페이지, 게시글상세페이지 구현
  - 기능: 좋아요, 댓글 기능 구현

## 파일구조
- 프로젝트시 코드를 효율적으로 관리하고 개발 팀 간의 협업을 위해 모듈성, 재사용성, 그리고 유지보수성을 고려하여 설계하였습니다.

  
![구조](https://github.com/user-attachments/assets/88a6963c-b1a0-4021-a46e-93d5cb2b4189)

### 🛠️ 개발 환경
- Front:
  - **React**, **HTML**, **tailwindCSS**, **TypeScript**
- Back:
  - **Java**, **SpringBoot**, **JWT**, **SpringSecurity**, **Docker**
- DataBase:
  - **MySQL**, **Dbeaver**, **Redis**, **Postman**
- TeamSpace:
  - **Notion**, **Github**, **Figma**, **Git**
### 🖥️ERD
![erd](https://github.com/user-attachments/assets/0c38ddb8-f30f-4c5a-ac67-8145d8124985)

###👩‍💻 프로젝트 주요 기능

💡 외부API를 사용한 회원가입/로그인


💡 게시글 작성, 수정, 삭제


💡게시글 목록 및 상세보기


💡 댓글 및 좋아요 기능

💡 무한 스크롤을 통한 게시글 불러오기

### 🌿 역할 및 성장 경험

메인페이지와 마이페이지 구현
InterSectionObserver API를 사용하여 무한스크롤 구현

팀프로젝트 Mini Blog에서는 프론트엔드쪽을 담당하여 회원가입, 로그인, 메인페이지, 마이페이지를 맡아서 진행했습니다. 제가 맡은 부분중 핵심 기능인 무한스크롤기능을 InterSectionObserver API를 사용하여 개발하였습니다.
이 프로젝트는 현재 AWS를 사용하여 배포를 해보려고 하는 과정 중에 있습니다. Azure로는 배포를 해보았지만 AWS로는 배포를 해본적이 없기에 유튜브와 인터넷에 게시되어있는 자료들을 참고하여 배포 해보려고 합니다.
