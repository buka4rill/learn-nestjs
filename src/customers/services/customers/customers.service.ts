import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
import { ICustomer } from '../../interfaces/ICustomer';

@Injectable()
export class CustomersService {
  private customers: Array<ICustomer> = [
    {
      id: 1,
      email: 'xyz@gmail.com',
      name: 'Danny Devito',
    },
    {
      id: 2,
      email: 'abc@gmail.com',
      name: 'Brad Pitt',
    },
    {
      id: 3,
      email: 'efg@gmail.com',
      name: 'Elijah Wood',
    },
  ];

  getCustomers() {
    return this.customers;
  }

  findCustomersById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }
}
