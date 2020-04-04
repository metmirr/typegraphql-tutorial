import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstname} ${parent.lastname}`;
  }

  @Column()
  password: string;
}
