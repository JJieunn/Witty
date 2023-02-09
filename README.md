
# Witty
#### !. 리팩토링 예정
- 배포 전에 리팩토링과 포트폴리오를 위한 리드미 수정이 이루어질 것이므로 main 브랜치가 아닌 develop 브랜치에 임시로 리드미를 작성합니다.

<br>

## 프로젝트 소개
- 트위터, 인스타그램 등을 오마주한 Mini Project입니다.  
- __5가지 카테고리의 간단한 일상 글을 작성할 수 있는 커뮤니티 서비스__ 이며 게시글 및 댓글 작성, 이미지 업로드, 북마크, 좋아요 표시 등의 기능을 이용할 수 있습니다.
- 채팅 기능은 이후 추가될 예정입니다.

<br>

## 프로젝트 기간 및 인원
- 기간 : 2022.11.01 ~ 2023.02.01 (3개월)
- 인원 : FE 1명, BE 1명

<br>

## 레파지토리 주소
#### [📍 FRONTEND](https://github.com/2021bong/witty)

<br>

## DB 모델링

 <img width="700" alt="image" src="https://user-images.githubusercontent.com/108418225/215715436-ed25b4a8-3945-4e8c-b60d-d9b6d75442ad.png">

<br>

## 개발 환경 및 사용 기술
> __개발 환경__  
 
<img src="https://img.shields.io/badge/TypeScript-316896?style=for-the-badge&logo=TypeScript&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Node.js-338800?style=for-the-badge&logo=Node.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>&nbsp;

> __사용 기술__  

<img src="https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=TypeORM&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Bcryptjs-003A70?style=for-the-badge&logo=Bcryptjs&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/JSONWEBTOKEN-FBBA00?style=for-the-badge&logo=JWT&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Axios-FBBA00?style=for-the-badge&logo=Axios&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Swagger UI-39933?style=for-the-badge&logo=Bcryptjs&logoColor=white"/>&nbsp;

<br>

## 프로젝트 구조
```
📦 Witty
 ┣ 📂 modules
 ┣ 📂 src
    ┣ 📂 configs
    ┣ 📂 controllers
    ┣ 📂 dto
    ┣ 📂 entities
    ┣ 📂 middleware
    ┣ 📂 models
    ┣ 📂 routes
    ┣ 📂 services
    ┣ 📜 app.ts
    ┗ 📜 server.ts
 ┣ 📜 .prettierrc
 ┣ 📜 package-lock.json
 ┣ 📜 package.json
 ┗ 📜 tsconfig.json
```
<br>

## 구현 기능 소개

<details>
<summary>Auth</summary>
<div markdown="1">
  
기능 | 설명 |
------|------|
이메일/계정 중복 체크|- 이메일 혹은 계정을 중복 체크합니다.<br> - 이메일과 계정 체크를 동일한 함수를 이용할 수 있도록 Object.keys, values 메소드를 활용해 쿼리문을 작성합니다. <br> - Exists SQL문으로 조회한 결과, 중복일 경우 "Duplicate_Error" 예외 처리합니다.|
회원 가입|- 닉네임, 비밀번호, 계정을 정규표현식으로 검증합니다. <br> - bcryptJS로 해시 암호화된 비밀번호를 저장합니다. <br> - 회원 가입 성공 시 "User_Created" 메시지가 응답으로 전달됩니다.|
로그인 |- 유저가 존재하는지, 비밀번호가 일치하는지의 과정을 거쳐 로그인 성공 시 JWT를 이용한 토큰을 발행합니다. <br> - "Login_Success" 성공 메시지와 유저의 닉네임, 토큰을 함께 전달합니다. <br> - 유저가 존재하지 않거나 비밀번호 불일치 시 예외 처리합니다.
카카오 로그인 |- 프론트엔드에서 전달된 카카오 인가 코드를 Axios POST 요청에 담아 카카오 서버에 전달, 토큰을 발급받습니다. <br> - 발급된 토큰을 Axios GET 요청의 headers에 담아 카카오 서버에 저장된 유저 정보(이메일, 닉네임)을 조회합니다. <br> - 조회한 유저 정보(이메일)과 카카오 소셜 로그인을 위한 account인 "KAKAO"로 DB에 등록된 유저인지 확인합니다. <br> - 유저가 없을 때 분기되어 새로 유저를 등록합니다. <br> - account("KAKAO")와 카카오 유저 정보(이메일)을 JWT을 이용해 Witty에서 쓰일 새 토큰을 발행합니다.|
</div>
</details>

<br>
<details>
<summary>Users</summary>
<div markdown="1">
  
기능 | 설명 |
------|------|
마이페이지 메인|- req header에 담긴 토큰을 authorization 미들웨어로 유효성 판단을 합니다. <br> - 유저에 대한 간단한 정보(idx, 닉네임, 계정)을 조회합니다. |
마이 페이지 - 닉네임 수정 |- 토큰에서 얻은 idx로 where 조건문을 작성하여 유저 닉네임을 수정합니다.|
마이 페이지 - 내 북마크 |- 유저가 북마크한 게시글 목록을 조회합니다. <br> - 유저 idx와 북마크(is_marked = 1)를 조건으로 북마크 idx, 게시글 idx, 게시글 내용, 카테고리, 좋아요 및 댓글 수를 가져오고 이미지 url 1개를 조회하여 프론트엔드에서 이미지 아이콘을 표시할 수 있도록 합니다.|
마이 페이지 - 내 북마크 목록 수정 |- 북마크 목록에 있는 게시글의 북마크를 취소합니다. <br> - 유저 idx, 게시글 idx를 전달하여 북마크 값(is_marked)을 0으로 update합니다. <br> - 응답으로 갱신된 북마크 목록을 조회하여 전달합니다. |
마이 페이지 - 내 게시글 |- 내가 작성한 게시글 목록을 조회합니다. <br> - 북마크 목록과 달리 이미지 유무가 아니라 url을 함께 조회합니다. |
마이 페이지 - 회원 탈퇴 |- 유저 idx를 조건으로 유저 정보를 delete 합니다. |

</div>
</details>

<br>
<details>
<summary>Posts</summary>
<div markdown="1">
  
기능 | 설명 |
------|------|
게시글 공통 |- String 타입의 좋아요, 댓글 수를 Number로 전환하기 위해 map 함수를 사용합니다. <br> - 게시글 수정, 삭제를 위해 idx와 인자로 전달된 user_id를 비교해 분기한 후, is_owner 값을 Boolean으로 표현합니다.|
새 게시글 작성  |- 토큰, 내용, 카테고리를 필수 값으로 합니다. <br> - 카테고리와 이미지는 Array로 전달받습니다. <br> - 카테고리는 string으로 변환 후 전달, 이미지는 map 함수를 이용해 Post_images Entity에 insert하는 함수를 반복적으로 실행합니다. |
전체 게시글 조회  |- 게시글의 idx, 유저 idx, 닉네임, 이미지, 카테고리, 내용, 댓글 수, 좋아요 수, 북마크를 조회합니다. <br> - 서브쿼리를 JOIN 하여 이미지, 댓글 및 좋아요 수, 북마크를 조회합니다. |
특정 게시글 상세 조회 |- 게시글의 정보와 댓글 목록을 조회합니다. <br> - 댓글의 idx, 유저 닉네임, is_owner, 좋아요 갯수 등의 정보를 조회합니다.|
게시글 수정 페이지 - 기존 데이터 조회 |- 게시글 수정할 때 기존에 이미 저장된 내용, 카테고리, 이미지를 불러옵니다. |
게시글 수정 페이지 - 새 데이터 수정 |- 변경된 내용을 입력한 후 새로운 내용으로 수정합니다. <br> - 수정 요청에 이미지가 포함된 경우 DB에 있던 이미지들을 삭제한 후 새롭게 저장합니다. |
게시글 삭제 |- 토큰과 게시글 idx를 전달 받아 삭제합니다. <br> - Entity에 설정된 cascade 옵션에 따라 댓글, 좋아요, 이미지, 북마크가 같이 삭제됩니다. |
게시글 좋아요 |- is_liked 값을 update하기 전에 Post_likes Entity에 해당 게시글에 대한 데이터가 있는지 조회합니다. <br> - switch 분기문으로 데이터가 없다면(case "0") is_liked = 1을 insert, 있으면(case "1") is_liked를 CASE 쿼리문을 이용해 변경합니다. <br> - 응답으로 좋아요 갯수와 좋아요 상태(is_liked)를 전달합니다. |
게시글 북마크 |- 좋아요와 동일하게 동작합니다. <br> - 응답으로 북마크 상태 (is_marked)를 전달합니다. |

</div>
</details>

<br>
<details>
<summary>Comments</summary>
<div markdown="1">

  기능 | 설명 |
------|------|
새 댓글 작성 |- 댓글을 작성할 게시글의 post_id를 path param으로 전달합니다. <br> - post_id와 토큰으로 얻은 user_id, 댓글 내용으로 작성합니다. |
댓글 삭제 |- 댓글의 idx와 토큰에서 얻은 유저 idx로 댓글 삭제 후, postDao에서 쓰던 댓글 조회 API를 재활용하여 특정 게시글의 댓글 정보를 가져옵니다. |
댓글 좋아요 |- 게시글 좋아요와 동일하게 동작합니다. |
  

</div>
</details>

<br>
<details>
<summary>Search</summary>
<div markdown="1">

기능 | 설명 |
------|------|
게시글 인기순 조회 |- 검색 페이지 메인에 뜨는 결과로 전체 게시글 중 count_likes를 기준으로 order by를 하여 limit 12개를 조회합니다. |
키워드 검색 |- 게시글 검색, 유저 검색, 카테고리 검색으로 나뉩니다. <br> - UI가 탭으로 구분되어 있어 선택한 탭에 따라 요청 URI가 달라집니다. |

</div>
</details>

<br>

## 프로젝트 실행 방법
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

## API 명세 (Swagger 명세서 확인 방법)
```
npm run start

https://localhost:PORT/api-docs/
```
