import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstname} ${parent.lastname}`;
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstname: string,
    @Arg("lastName") lastname: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: passwordHash,
    }).save();

    return user;
  }
}
