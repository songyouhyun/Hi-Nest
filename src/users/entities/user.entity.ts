import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as argon2 from "argon2";

// 이 annotation 이 있으면 nestjs가 보고 있다가 DB 스키마 적용을 위해 참고
// 이후 repository 클래스에서도 참고할 수 있는 클래스가 된다. 괄호안에 넣은 내용이 테이블의 이름이 된다.
@Entity("user")
export class User {
  // PrimaryGeneratedColumn annotion이 있다면 이 테이블은 해당 필드가 primary key 가 된다.
  //괄호 안에 아무런 내용을 넣지 않으면 id 는 auto increment 가 적용
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // 데이터베이스에 insert 하기 전에 수행되는 annotation.
  // 비밀번호를 복호화 할 수 없게 hash 함수(argon)를 이용해 저장
  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  // Column annotation 이 있으면 테이블의 필드로 만들어지게 됩니다.
  // 괄호 안에 여러 옵션을 넣을 수 있습니다.
  @Column({ default: "" })
  imageLink: string;
}