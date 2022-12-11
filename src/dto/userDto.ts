export class CreateUserDTO {
  account!: string;
  password!: string;
  email!: string; 
  nickname!: string;
}


export class UpdateUserDTO {
  foundUser!: string;
  nickname!: string;
}