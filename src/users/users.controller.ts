import { Body, Controller, Get, Param, Post, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: 'Intern' | 'Engineer' | 'Admin') {
    return this.usersService.findAll(role)
  }

  @Get(':id')
  findOne(@Param('id') id:string) {
    return this.usersService.findOne(+id)
  }

  @Post()
  create(@Body() user: {name:string, email:string, role:'Intern' | 'Engineer' | 'Admin'}) {
    return this.usersService.create(user)
  }

  @Patch(':id')
    update(@Param('id') id:string, @Body() userUpdate:{name?:string, email?:string, role?:'Intern' | 'Engineer' | 'Admin'}) {
      return this.usersService.update(+id, userUpdate)
    }

  @Delete(':id')
  delete(@Param('id') id:String) {
    return this.usersService.delete(+id)
  }

}
