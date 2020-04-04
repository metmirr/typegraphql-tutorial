import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  async hello() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { firstname, lastname, email, password }: RegisterInput
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
