import { NestMiddleware } from '@nestjs/common/interfaces';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

export class TokenMiddlware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // const authHeader = req.headers.authorization;

    // if (authHeader && authHeader.startsWith('Bearer ')) {
    //   const token = authHeader.split(' ')[1];
    //   try {
    //     const decoded = this.jwtService.verify(token);
    //     req.user = decoded.sub; // Assuming user ID is stored in the 'sub' field of the JWT payload
    //   } catch (err) {
    //     // Handle JWT verification error (e.g., invalid token)
    //   }
    // }
    
    next();
  }
}
