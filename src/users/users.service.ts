import { Injectable } from '@nestjs/common';
import { identity } from 'rxjs';

@Injectable()
export class UsersService {
  private users = [
    { 
      id: '1', 
      name: 'Alice', 
      email: 'alice@example.com', 
      role: 'Admin' 
    },
    { 
      id: '2', 
      name: 'Bob', 
      email: 'bob@example.com', 
      role: 'Engineer' 
    },
    { 
      id: '3', 
      name: 'Charlie', 
      email: 'charlie@example.com', 
      role: 'Intern' 
    },
    {
      id: '4',
      name: 'Diana',
      email: 'diana@example.com',
      role: 'Engineer'
    },
    {
      id: '5',
      name: 'Ethan',
      email: 'ethan@example.com',
      role: 'Admin'
    }
  ]

  findAll(role?:'Intern' | 'Engineer' | 'Admin') {
    if (role) {
      return this.users.filter(user => user.role === role)
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id.toString())
    return user
  }

  create(user:{name:string, email:string, role:'Intern' | 'Engineer' | 'Admin'}) {
    const usersByHighestId =  [...this.users].sort((a, b) => Number(b.id) - Number(a.id))
    const newUser = {
      id: (parseInt(usersByHighestId[0].id) + 1).toString(),
      ...user
    }
    this.users.push(newUser)
    return newUser
  }

  update(id:number, updatedUser: {name?:string, email?:string, role?:'Intern' | 'Engineer' | 'Admin'}) {
    this.users = this.users.map(user => {
      if (user.id === id.toString()) {
        return {...user, ...updatedUser}
      }
      return user
    })
    return this.findOne(id)
  }

  delete(id:number) {
    const removedUser = this.findOne(id)
    this.users = this.users.filter(user => user.id !== id.toString())

    return removedUser
    // this.users = this,this.users.map(user => {
    //   if (user.id === id) {
    //     this.users.pop(id)
    //     return('user removed')
    //   }
    //   return ('no existing user')
    // })
  }
}
