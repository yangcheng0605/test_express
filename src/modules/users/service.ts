import "reflect-metadata";
import { Service } from 'typedi'
import { Users } from './model'
import { getRepository } from 'typeorm'
@Service()
export class UserRepository {
  private userList = [{
    id: 1, name: '11111'
  }]

  async queryAll() {
    const result = await getRepository(Users).find();
    return result
  }

  query(id: number) {
    let foundUser: any = undefined
    this.userList.forEach((user) => {
      if (user.id === id) foundUser = user
    })
    return foundUser
  }

  insert(input: any) {
    // const user = typeof input !== 'undefined' ? new User(input.id, input.name) : new User(-1, '')
    // this.userList.push(user)
    // return user
  }

  delete(id: number) {
    const user = this.query(id)
    if (typeof user !== 'undefined') {
      this.userList.splice(this.userList.indexOf(user), 1)
    }

    return user
  }
}
