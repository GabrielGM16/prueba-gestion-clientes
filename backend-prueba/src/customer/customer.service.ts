import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un cliente
  async createCustomer(data: CreateCustomerDto) {
    // Validar si el correo ya existe
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { email: data.email },
    });
    if (existingCustomer) {
      throw new BadRequestException('Email already in use');
    }

    return this.prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  // Obtener todos los clientes
  async getAllCustomers() {
    return this.prisma.customer.findMany();
  }

  // Obtener un cliente por ID
  async getCustomerById(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  // Actualizar un cliente por ID
  async updateCustomer(id: number, data: UpdateCustomerDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    // Validar si el correo ya existe para otro cliente
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { email: data.email },
    });
    if (existingCustomer && existingCustomer.id !== id) {
      throw new BadRequestException('Email already in use');
    }

    return this.prisma.customer.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  // Eliminar un cliente por ID
  async deleteCustomer(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
