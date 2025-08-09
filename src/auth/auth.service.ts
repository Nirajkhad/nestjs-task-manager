import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  async signup(createUserDto: AuthCredentialsDto): Promise<void> {
    await this.userRepository.create(createUserDto);
  }

  async signIn(
    createUserDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.userRepository.checkAuthCredentials(createUserDto);
  }
}
