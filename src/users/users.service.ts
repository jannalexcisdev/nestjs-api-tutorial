import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { 
      id: 1, 
      name: 'Alice', 
      email: 'alice@example.com', 
      role: 'Admin' 
    },
    { 
      id: 2, 
      name: 'Bob', 
      email: 'bob@example.com', 
      role: 'Engineer' 
    },
    { 
      id: 3, 
      name: 'Charlie', 
      email: 'charlie@example.com', 
      role: 'Intern' 
    },
    {
      id: 4,
      name: 'Diana',
      email: 'diana@example.com',
      role: 'Engineer'
    },
    {
      id: 5,
      name: 'Ethan',
      email: 'ethan@example.com',
      role: 'Admin'
    }
  ]

  findAll(role?:'Intern' | 'Engineer' | 'Admin') {
    if (role) {
      const rolesArray = this.users.filter(user => user.role === role)
      if (rolesArray.length === 0) throw new NotFoundException('User Role Found') 
        return rolesArray
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id)

    if (!user) throw new NotFoundException('User Not Found')

    return user
  }

  create(createUserDto:CreateUserDto) {
    const usersByHighestId =  [...this.users].sort((a, b) => Number(b.id) - Number(a.id))
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto
    }
    this.users.push(newUser)
    return newUser
  }

  update(id:number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return {...user, ...updateUserDto}
      }
      return user
    })
    return this.findOne(id)
  }

  delete(id:number) {
    const removedUser = this.findOne(id)
    this.users = this.users.filter(user => user.id !== id)

    return removedUser
  }
}
