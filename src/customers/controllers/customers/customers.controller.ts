import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';
import { Request, Response } from 'express';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get('')
  getCustomers() {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  getCustomerById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // console.log(ty)
    const customer = this.customerService.findCustomersById(id);

    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send({ msg: 'Customer not found' });
    }
  }

  // Nest JS way
  @Get('/search/:id')
  searchCustomersById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customerService.findCustomersById(id);
    if (customer) return customer;
    else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto);

    // Create customer
    this.customerService.createCustomer(createCustomerDto);
  }
}
