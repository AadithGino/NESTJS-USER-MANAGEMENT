import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(id: string) {
    return this.jwtService.sign({ id: id });
  }

  async decodeToken(token: string) {
    console.log(token+"THJIS ISDFHI");
    
    const data = await this.jwtService.verify(token);
    console.log(data);
    
    return data;
  }
}
