import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl, headers, ip } = request;
    const body = request.body as unknown;
    const start = process.hrtime();

    response.on('finish', () => {
      const { statusCode } = response;
      const [sec, ns] = process.hrtime(start);
      const responseTime = sec * 1000 + ns / 1e6;
      const duration = responseTime.toFixed(3) + 'ms';
      const log = {
        method,
        originalUrl,
        headers,
        body,
        duration,
        statusCode,
        ip,
      };
      this.logger.log(JSON.stringify(log));
    });
    next();
  }
}
