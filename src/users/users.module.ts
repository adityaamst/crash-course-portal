// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from './schemas/user.schema';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       {
//         name: User.name,
//         schema: UserSchema,
//       },
//     ]),
//   ],

//   controllers: [UsersController],

//   providers: [UsersService],

//   exports: [MongooseModule, UsersService],
// })
// export class UsersModule {}







import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import {
  User,
  UserSchema,
} from './schemas/user.schema';

import {
  Student,
  StudentSchema,
} from './schemas/student.schema';

import { UsersService } from './users.service';

import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },

      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
  ],

  controllers: [UsersController],

  providers: [UsersService],

  exports: [MongooseModule, UsersService],
})
export class UsersModule {}