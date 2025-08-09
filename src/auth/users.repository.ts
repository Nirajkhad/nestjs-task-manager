import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto, CustomError } from './dtos/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = createUserDto;

    // Hash the password
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const user = this.repo.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.repo.save(user);
    } catch (error) {
      if (error instanceof Error && (error as CustomError)?.code === '23505') {
        throw new ConflictException('User already exists');
      }
      throw new InternalServerErrorException(error);
    }
  }

  async checkAuthCredentials(
    authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentials;
    const user = await this.repo.findOneBy({
      username,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return { accessToken: this.jwtService.sign({ username: user.username }) };
    }

    throw new UnauthorizedException('Invalid Credentials');
  }
}
