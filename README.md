
# Witty
#### !. 리팩토링 예정
- 배포 예정의 서비스
- 배포 전 기능에 대한 리팩토링과 포트폴리오를 위한 리드미 수정이 이루어질 것이므로 main 브랜치가 아닌 develop 브랜치에 임시로 리드미를 작성합니다.

<br>

## 1. 프로젝트 소개
- 트위터, 인스타그램 등을 오마주한 Mini Project입니다.  
- 5가지 카테고리의 간단한 일상 글을 작성할 수 있는 커뮤니티 서비스이며 게시글 및 댓글 작성, 이미지 업로드, 북마크, 좋아요 표시 등의 기능을 이용할 수 있습니다.
- 채팅 기능은 이후 추가될 예정입니다.

<br>

## 2. 프로젝트 목적
- 기존 프로젝트로 경험하지 못한 일부 기능을 직접 구현, Swagger나 Socket.io와 같은 새로운 기술의 사용 경험을 쌓고 AWS를 이용한 배포 경험을 만들기 위함입니다.

<br>

## 3. 프로젝트 기간 및 인원
- 기간 : 2022.11.01 ~ 2023.02.01 (3개월)
- 인원 : FE 1명, BE 1명

<br>

## 4. 링크
- [배포 서비스 주소 넣을 예정] 
- [FE Github](https://github.com/2021bong/witty)

<br>

## 5. DB 모델링

 <img width="707" alt="image" src="https://user-images.githubusercontent.com/108418225/215715436-ed25b4a8-3945-4e8c-b60d-d9b6d75442ad.png">

<br>

## 6. 개발 환경 및 사용 기술
> __개발 환경__  
 
<img src="https://img.shields.io/badge/TypeScript-F7DF1E?style=for-the-badge&logo=TypeScript&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Node.js-39933?style=for-the-badge&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>&nbsp;
> __사용 기술__  

<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=TypeORM&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Bcryptjs-003A70?style=for-the-badge&logo=Bcryptjs&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/JWT-FBBA00?style=for-the-badge&logo=JWT&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Axios-FBBA00?style=for-the-badge&logo=Axios&logoColor=white"/>&nbsp;

<br>

## 7. 프로젝트 구조
```
📦 Witty
 ┣ 📂modules
 ┣ 📂src
    ┣ 📂configs
    ┣ 📂controllers
    ┣ 📂dto
    ┣ 📂entities
    ┣ 📂middleware
    ┣ 📂models
    ┣ 📂routes
    ┣ 📂services
    ┣ 📜app.ts
    ┗ 📜server.ts
 ┣ 📜.prettierrc
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜tsconfig.json
```
<br>

## 8. 구현 기능 소개

<details>
<summary>Auth</summary>
<div markdown="1">
  
기능 | 설명 |
------|------|
회원 가입| . |
로그인 | . |
카카오 로그인 | . |

</div>
</details>

<br>
<details>
<summary>Users</summary>
<div markdown="1">
  
기능 | 설명 |
------|------|
마이페이지 메인| . |
마이 페이지 - 닉네임 수정 | . |
마이 페이지 - 내 북마크 | . |
마이 페이지 - 북마크 목록 수정 | . |
마이 페이지 - 내 게시글 | . |
마이 페이지 - 회원 탈퇴 | . |

</div>
</details>

<br>
<details>
<summary>Posts</summary>
<div markdown="1">
  
기능 | 설명 |
------|------|
새 게시글 작성  | . |
전체 게시글 조회  | . |
특정 게시글 상세 조회 | . |
게시글 수정 페이지 - 기존 데이터 조회 | . |
게시글 수정 페이지 - 새 데이터 수정 | . |
게시글 삭제 | . |
게시글 좋아요 | . |
게시글 북마크 | . |
게시글 좋아요 | . |

</div>
</details>

<br>
<details>
<summary>Comments</summary>
<div markdown="1">

  기능 | 설명 |
------|------|
새 댓글 작성 | . |
댓글 삭제 | . |
댓글 좋아요 | . |
  

</div>
</details>

<br>
<details>
<summary>Search</summary>
<div markdown="1">

기능 | 설명 |
------|------|
게시글 인기순 조회 | 검색 페이지 메인에 뜨는 결과로 전체 게시글 중 count_likes를 기준으로 order by를 하여 limit 12개를 조회합니다. |
키워드 검색 | 게시글 검색, 유저 검색, 카테고리 검색으로 나뉩니다. |

</div>
</details>

<br>

## 9. 프로젝트 실행 방법
#### 배포된 서비스가 아닌 직접 Clone하여 프로젝트를 실행하려면 다음 순서대로 실행합니다.  

### Git Clone

```
$ git clone https://github.com/JJieunn/Witty.git
$ cd Witty
```
### Installation

```
$ npm install
```
### Make .env
```
(미리 사용할 DB/Schema를 만들어 둡니다.)

DATABASE_URL = mysql://USERNAME:PASSWORD@127.0.0.1:3306/DATABASE
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = 127.0.0.1
TYPEORM_PORT = 3306
TYPEORM_USERNAME = 계정
TYPEORM_PASSWORD = 비밀번호
TYPEORM_DATABASE = 미리 생성한 데이터베이스

PORT = 애플리케이션 서버 포트 번호
```
### Make keyConfig.ts
```
(src/configs/keyConfig.ts 파일을 생성합니다.)

export const SECRET_KEY: string = 비밀번호 해시 암호화를 위한 시크릿 키
export const JavaScript_Key: string = developers.kakao.com에 등록한 앱 키(JavaScript)
export const REDIRECT_URI: string = 카카오 로그인 사용을 위해 앱에 등록한 Redirect URI
```
### DataBase

```
src/configs/typeorm_config.ts 

synchronize: true 로 변경

(npm run start하여 table이 만들어진 후, 다시 false로 변경합니다.)
```
### Running the app

```
$ npm run build
$ npm run start
```

<br>

## 10. API 명세 (Swagger 명세서 확인 방법)
```
npm run start

https://localhost:PORT/api-docs/
```
