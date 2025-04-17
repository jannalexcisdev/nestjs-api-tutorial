import { Body, Controller, Get, Param, Post, Patch, Delete, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query('role') role?: 'Intern' | 'Engineer' | 'Admin') {
      return []
  }

  @Get(':id')
  findOne(@Param('id') id:string) {
    return { id }
  }

  @Post()
  addUser(@Body() user: {}) {
    return user
  }

  @Patch(':id')
    update(@Param('id') id:string, @Body() userUpdate:{}) {
      return {id, ...userUpdate}
    }

  @Delete(':id')
  deleteUser(@Param('id') id:String) {
    return {id}
  }

}
