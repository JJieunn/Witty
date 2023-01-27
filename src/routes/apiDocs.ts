// API 명세서
/**
 * @swagger
 * paths:
 *  /users/duplication:
 *    post:
 *       summary: 이메일 혹은 계정 중복 체크
 *       tags:
 *        - Users
 *       description: 회원 가입할 때 이메일이나 계정이 기존 회원과 중복되는지 체크
 *       produces:
 *        - application/json
 *       requestBody:
 *        description: email 혹은 account 둘 중 하나 입력
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - email(account)
 *              properties:
 *                email(account):
 *                  type: string
 *                  example: testing2@gmail.com(Test2test)
 *       responses:
 *        '200':
 *          description: 회원 가입 성공
 *          content:
 *            application/json:
 *             schema:
 *                example:
 *                  {"message": "Available"}
 *        '404':
 *          description: 키 값 미입력
 *          content:
 *             application/json:
 *              schema:
 *                example:                         
 *                  {"err": "Not_Found_Key"}
 *        '409':
 *          description: 중복 값 오류
 *          content:
 *             application/json:
 *              schema:
 *                example:                         
 *                  {"err": "Duplicate_Error"}
 * 
 * 
 *  /users/signup:
 *    post:
 *       summary: 회원 가입
 *       tags:
 *        - Users
 *       description: 닉네임, 계정, 이메일, 비밀번호를 입력하여 회원 가입
 *       produces:
 *        - application/json
 *       parameters:
 *         - in: body
 *           name: input
 *           type: string
 *           description : "account, email, password, nickname"
 *           required: true
 *       requestBody:
 *        description: 각각 input에 account, email, password, nickname 입력
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - account
 *                - email
 *                - password
 *                - nickname
 *              type: object
 *              properties:
 *                account:
 *                  type: string
 *                  example: Test2test
 *                email:
 *                  type: string
 *                  example: testing2@gmail.com
 *                password:
 *                  type: string
 *                  example: Test2test2!
 *                nickname:
 *                  type: string
 *                  example: test2
 *       responses:
 *        '201':
 *          description: 회원 가입 성공
 *          content:
 *            application/json:
 *             schema:
 *                example:
 *                  {"message": "User_Created"}
 *        '400':
 *          description: 정규표현식 오류
 *          content:
 *             application/json:
 *              schema:
 *                example:                         
 *                  {"err": "RegExp_Error"}
 *
 * 
 *  /users/signin:
 *    post:
 *      summary: 로그인
 *      tags:
 *      - Users
 *      description: account와 password를 입력하여 로그인
 *      produces:
 *      - application/json
 *      requestBody:
 *        description: account, password 입력하여 로그인
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - account
 *                - password
 *              type: object
 *              properties:
 *                account:
 *                  type: string
 *                  example: Test2test
 *                password:
 *                  type: string
 *                  example: Test2test2!
 *      responses:
 *        '200':
 *          description: 로그인 성공 메시지와 유저 nickname, token 전달 
 *          content:
 *            application/json:
 *             schema:
 *                example:
 *                  {"message": "Login_Success", "result": {"nickname": "test2", "token": "eyJhb..."}}
 *        '400-(1)':
 *          description: 존재하지 않는 유저
 *          content:
 *             application/json:
 *              schema:
 *                example:                         
 *                  {"err": "User_Not_Existed"}
 *        '400-(2)':
 *          description: 비밀번호 불일치
 *          content:
 *             application/json:
 *              schema:
 *                example:                         
 *                  {"err": "Password_Mismatch"}
 * 
 * 
 *  /users/my:
 *    get:
 *      summary: 마이페이지
 *      tags:
 *      - Users
 *      description: 마이페이지의 메인으로 유저 idx, account, nickname 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *      responses:
 *       '200':
 *         description: 마이 페이지 조회 성공, 유저 idx, account, nickname 전달
 * 
 *    delete:
 *      summary: 회원 탈퇴
 *      tags:
 *      - Users
 *      description: 회원 탈퇴
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *      responses:
 *       '200':
 *         description: 회원 탈퇴 성공 메시지 전달
 *         content:
 *            application/json:
 *             schema:
 *                example:
 *                  {"message": "Withdrow_Success"}
 *     
 * 
 *  /users/my/posts:
 *    get:
 *      summary: 마이페이지 내 게시글 목록
 *      tags:
 *      - Users
 *      description: 내가 작성한 게시글 전체 목록 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *      responses:
 *       '200':
 *         description: 내 게시글 전체 목록 전달
 * 
 * 
 *  /users/my/bookmarks:
 *    get:
 *      summary: 마이페이지 내 북마크 목록
 *      tags:
 *      - Users
 *      description: 내가 북마크한 게시글 전체 목록 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *      responses:
 *       '200':
 *         description: 내가 북마크한 전체 게시글 목록 전달
 * 
 * 
 *  /users/my/bookmarks/{post_id}:
 *    patch:
 *      summary: 마이페이지 내 북마크 목록 수정
 *      tags:
 *      - Users
 *      description: 내 북마크 전체 목록 중 특정 게시글의 북마크 취소
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *        - in: path
 *          name: postId
 *          required: true
 *          type: string
 *          description : 북마크 취소 할 게시글의 고유키
 *      responses:
 *       '200':
 *         description: 목록 수정 후 최신 북마크 목록 전달
 * 
 * 
 *  /users/my/name:
 *    patch:
 *      summary: 이용자 닉네임 수정
 *      tags:
 *      - Users
 *      description: 닉네임 수정
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *      requestBody:
 *        description: 수정할 nickname 입력
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - nickname
 *              type: object
 *              properties:
 *                nickname:
 *                  type: string
 *                  example: 안녕하세요
 *      responses:
 *       '200':
 *         description: 닉네임 수정 완료 메시지 전달
 *         content:
 *            application/json:
 *             schema:
 *                example:
 *                  {"message": "Nickname_Updated"}
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *  /posts:
 *    post:
 *      summary: 새 게시글 작성
 *      tags:
 *      - Posts
 *      description: 새 게시글 작성
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *      requestBody:
 *        description: 작성할 게시글의 category, content, images 입력
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - category
 *                - content
 *                - images
 *              type: object
 *              properties:
 *                category:
 *                  type: array
 *                  items:
 *                    type: string
 *                    example: 오늘잡담
 *                images:
 *                  type: array
 *                  items:
 *                    type: string
 *                    example: imageURLs
 *                content:
 *                  type: string
 *                  example: 작성할 내용을 입력해주세요.
 *      responses:
 *       '201':
 *         description: 새 게시글 작성 완료 메시지 전달
 *         content:
 *            application/json:
 *             schema:
 *                example:
 *                  {"message": "Post_Created"}
 * 
 *
 *    get:
 *      summary: 전체 게시글 목록 조회
 *      tags:
 *      - Posts
 *      description: 전체 게시글 목록 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          type: string
 *          description : 로그인 시 발급된 토큰(optional)
 *        - in: query
 *          name: offset
 *          required: true
 *          schema:
 *            type: string
 *          description : 스크롤링을 위한 offset값 (0, 1, 2 ...)
 *      responses:
 *       '200':
 *         description: 전체 게시글의 정보 전달. 토큰 입력 시 is_marked, is_liked, is_owner 정보도 전달.
 * 
 * 
 *  /posts/{post_id}:
 *    get:
 *      summary: 특정 게시글 상세 정보 조회
 *      tags:
 *      - Posts
 *      description: 특정 게시글 상세 정보 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          type: string
 *          description : 로그인 시 발급된 토큰(optional)
 *        - in: path
 *          name: postId
 *          required: true
 *          type: string
 *          description : 특정 게시글의 고유키
 *      responses:
 *       '200':
 *         description: 특정 게시글 상세 정보 전달. 토큰 입력 시 특정 게시글에 대한 is_marked, is_liked, is_owner 정보도 전달.
 * 
 *    delete:
 *      summary: 특정 게시글 삭제
 *      tags:
 *      - Posts
 *      description: 특정 게시글 삭제
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *        - in: path
 *          name: postId
 *          required: true
 *          type: string
 *          description : 특정 게시글의 고유키
 *      responses:
 *       '204':
 *         description: 메시지 전달 없음
 * 
 * 
 * 
 *  /posts/update/{post_id}:
 *    get:
 *      summary: 수정할 특정 게시글의 기존 정보 조회
 *      tags:
 *      - Posts
 *      description: 수정할 게시글의 기존 정보 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *        - in: path
 *          name: postId
 *          required: true
 *          type: string
 *          description : 수정할 게시글의 고유키
 *      responses:
 *       '200':
 *         description: 수정할 특정 게시글의 idx, category, content, file(이미지들) 값 전달
 * 
 *    patch:
 *      summary: 특정 게시글의 수정
 *      tags:
 *      - Posts
 *      description: 특정 게시글을 입력한 내용으로 수정
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *        - in: path
 *          name: postId
 *          required: true
 *          type: string
 *          description : 수정할 게시글의 고유키
 *      requestBody:
 *        description: 수정할 내용 입력
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                category:
 *                  type: array
 *                  items:
 *                    type: string
 *                    example: 오늘잡담(optionaal)
 *                images:
 *                  type: array
 *                  items:
 *                    type: string
 *                    example: imageURLs(optional)
 *                content:
 *                  type: string
 *                  example: 수정할 내용을 입력해주세요.(optional)
 *      responses:
 *       '200':
 *         description: 수정 완료 메시지 전달
 *         content:
 *            application/json:
 *             schema:
 *                example:
 *                  {"message": "Update_Success"}
 * 
 * 
 *  /posts/{post_id}/bookmark:
 *    patch:
 *      summary: 특정 게시글 북마크
 *      tags:
 *      - Posts
 *      description: 특정 게시글 북마크 누르기 / 취소
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *        - in: path
 *          name: postId
 *          required: true
 *          type: string
 *          description : 북마크 누를 게시글의 고유키
 *      responses:
 *       '200':
 *         description: 현 이용자의 게시글 북마크 상태 값
 *         content:
 *            application/json:
 *             schema:
 *                example:
 *                  { "is_marked": 1 }
 * 
 * 
 *  /posts/{post_id}/like:
 *    patch:
 *      summary: 특정 게시글 좋아요
 *      tags:
 *      - Posts
 *      description: 특정 게시글에 좋아요 누르기 / 취소
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *        - in: path
 *          name: postId
 *          required: true
 *          type: string
 *          description : 좋아요 누를 게시글의 고유키
 *      responses:
 *       '200':
 *         description: 현 이용자의 게시글 좋아요 상태 값 및 게시글의 총 좋아요 갯수 전달
 *         content:
 *            application/json:
 *             schema:
 *                example:
 *                  { "is_liked": 1, "count_likes": 1 }
 * 
 * 
 * 
 * 
 * 
 * 
 *  /posts/{post_id}/comment:
 *    post:
 *      summary: 새 댓글 작성
 *      tags:
 *      - Posts
 *      description: 특정 게시글에 새 댓글 작성
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *        - in: path
 *          name: postId
 *          required: true
 *          type: string
 *          description : 댓글 작성할 게시글의 고유키
 *      responses:
 *       '201':
 *         description: 새 댓글 작성 완료 메시지 전달
 *         content:
 *            application/json:
 *             schema:
 *                example:
 *                  {"message": "Comment_Created"}
 * 
 * 
 *  /posts/{post_id}/{comment_id}:
 *    patch:
 *      summary: 게시글의 댓글 삭제
 *      tags:
 *      - Posts
 *      description: 특정 게시글의 특정 댓글 삭제
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *        - in: path
 *          name: postId
 *          required: true
 *          type: string
 *          description : 삭제할 댓글이 작성된 게시글의 고유키
 *        - in: path
 *          name: commentId
 *          required: true
 *          type: string
 *          description : 삭제할 댓글의 고유키
 *      responses:
 *       '200':
 *         description: 댓글 삭제 후 게시글의 댓글 갱신된 목록 조회
 *         content:
 *            application/json:
 *             schema:
 *                example:
 *                  [{"id": 1, "comment": "댓글 작성", "user_id": 1, "is_liked": null, "nickname": "test2", "created_at": "2023-01-27 18:10:39.708213", "count_likes": null, "is_owner": true}]
 * 
 * 
 * 
 * 
 *  /comments/{comment_id}/like:
 *    patch:
 *      summary: 특정 댓글 좋아요
 *      tags:
 *      - Comments
 *      description: 특정 댓글 좋아요 누르기 / 취소
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          type: string
 *          description : 로그인 시 발급된 토큰
 *        - in: path
 *          name: commentId
 *          required: true
 *          type: string
 *          description : 좋아요 누를 댓글의 고유키
 *      responses:
 *       '200':
 *         description: 현 이용자의 해당 댓글 좋아요 상태 값 및 댓글의 총 좋아요 갯수 전달
 *         content:
 *            application/json:
 *             schema:
 *                example:
 *                  { "is_liked": 1, "count_likes": 1 }
 *                  
 * 
 *
 * 
 *  
 * 
 * 
 * 
 *  /search/like:
 *    patch:
 *      summary: 검색 메인 페이지, 게시글 인기순 조회
 *      tags:
 *      - Search
 *      description: 검색 메인 페이지에 표시되는 게시글 인기순(좋아요 순) 12개 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          type: string
 *          description : 로그인 시 발급된 토큰(optional)
 *      responses:
 *       '200':
 *         description: 좋아요 순으로 조회된 12개의 게시글 정보 전달
 *         content:
 *            application/json:
 *             schema:
 *                example:
 *                  { "is_liked": 1, "count_likes": 1 } 
 * 
 * 
 *  /search:
 *    get:
 *      summary: 키워드 혹은 카테고리 검색
 *      tags:
 *      - Search
 *      description: 키워드(q) 혹은 카테고리(category) 검색
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          type: string
 *          description : 로그인 시 발급된 토큰(optional)
 *        - in: qeury
 *          name: q
 *          type: string
 *          description : 검색할 키워드
 *        - in: query
 *          name: category
 *          type: string
 *          description : 검색할 카테고리
 *      responses:
 *       '200':
 *         description: 검색된 게시글 정보 전달
 * 
 * 
 *     
 *
 */