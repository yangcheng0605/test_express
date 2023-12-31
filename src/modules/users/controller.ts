import 'reflect-metadata'
import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers'
import { Service } from 'typedi'
import { UserRepository } from './service'

@Service()
@JsonController("/api")
export class UserController {
  userRepository = new UserRepository()

  constructor() {
    this.userRepository = new UserRepository()
  }

  @Get('/user')
  getAll() {
    return this.userRepository.queryAll()
  }

  @Get('/user/:id')
  getOne(@Param('id') id: number) {
    return this.userRepository.query(id)
  }

  @Post('/user')
  post(@Body() input: any) {
    console.log(input)
    return this.userRepository.insert(input)
  }

  @Delete('/user/:id')
  remove(@Param('id') id: number) {
    return this.userRepository.delete(id)
  }
}
