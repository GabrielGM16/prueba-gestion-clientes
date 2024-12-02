import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Create a new customer
  @Post()
  async createCustomer(@Body() data: CreateCustomerDto) {
    try {
      return await this.customerService.createCustomer(data);
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to create customer', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Get all customers
  @Get()
  async getAllCustomers() {
    try {
      return await this.customerService.getAllCustomers();
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to fetch customers', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get a single customer by ID
  @Get(':id')
  async getCustomerById(@Param('id') id: string) {
    try {
      return await this.customerService.getCustomerById(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Customer not found', error: error.message },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Update a customer by ID
  @Put(':id')
  async updateCustomer(@Param('id') id: string, @Body() data: UpdateCustomerDto) {
    try {
      return await this.customerService.updateCustomer(+id, data);
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to update customer', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Delete a customer by ID
  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    try {
      return await this.customerService.deleteCustomer(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to delete customer', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
