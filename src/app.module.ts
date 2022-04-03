import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from './customers/controllers/customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { CustomersService } from './customers/services/customers/customers.service';
import { UsersController } from './users/controllers/users/users.controller';
import { UsersService } from './users/services/users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://buka:buka1234@cluster0.d2h01.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    CustomersModule,
    UsersModule,
  ],
  // controllers: [UsersController, CustomersController],
  // providers: [UsersService, CustomersService],
})
export class AppModule {}
