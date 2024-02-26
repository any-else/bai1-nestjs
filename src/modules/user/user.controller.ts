import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  Param,
  Body,
  Put,
  Query,
} from '@nestjs/common';
import { log } from 'console';
import * as fs from 'fs';
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  photo: string;
  password: string;
}
@Controller('api/v1/user')
export class UserController {
  users: User[] = [];
  constructor() {
    this.users = JSON.parse(fs.readFileSync('src/data/user.json').toString());
  }
  // get all
  @Get()
  getAll(@Req() req, @Res() res) {
    res.status(200).json({
      message: 'ok',
      data: this.users,
    });
  }

  @Get('/search')
  search(@Query('name') query) {
    log(query);
    const data = this.users.filter((user) => user.name.includes(query));
    return data;
  }

  // get by id
  @Get(':id')
  getById(@Param('id') id) {
    return this.users.find((user) => user._id === id);
  }

  // create
  @Post('create')
  create(@Body() user) {
    this.users.push(user);
    fs.writeFileSync('src/data/user.json', JSON.stringify(this.users));
    return user;
  }

  // update
  @Patch('update/:id')
  update(@Body() user, @Param('id') id: string) {
    const index = this.users.findIndex((u) => u._id === id);
    this.users[index] = user;
    fs.writeFileSync('src/data/user.json', JSON.stringify(this.users));
    return user;
  }

  //delete
  @Delete('delete/:id')
  delete(@Param('id') id) {
    const index = this.users.findIndex((u) => u._id === id);
    if (index === -1) return 'khong co user';
    this.users.splice(index, 1);
    fs.writeFileSync('src/data/user.json', JSON.stringify(this.users));
    return this.users;
  }
}
