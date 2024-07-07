import { ConsoleLogger, LoggerService, LogLevel } from '@nestjs/common';
import * as fs from 'fs';

export class CustomLogger implements LoggerService {
  private logLevels: LogLevel[] = [];
  private consoleLogger;
  constructor() {
    this.consoleLogger = new ConsoleLogger('');
  }
  error(message: any) {
    if (this.validLogLevel('error')) {
      this.writeLine(`[error]:${message}`);
    }
  }

  log(message: any, ...optionalParams: any[]) {
    if (this.validLogLevel('log')) {
      this.writeLine(`[log]:${message}`);
    }
  }

  warn(message: any, ...optionalParams: any[]) {
    if (this.validLogLevel('warn')) {
      this.writeLine(`[warn]:${message}`);
    }
  }

  debug?(message: any, ...optionalParams: any[]) {
    if (this.validLogLevel('debug')) {
      this.writeLine(`[debug]:${message}`);
    }
  }

  verbose?(message: any, ...optionalParams: any[]) {
    if (this.validLogLevel('verbose')) {
      this.writeLine(`[verbose]:${message}`);
    }
  }
  setLogLevels?(levels: LogLevel[]) {
    this.logLevels = levels;
  }

  validLogLevel(logLevel: LogLevel) {
    return this.logLevels.length === 0 || this.logLevels.indexOf(logLevel) > -1;
  }

  writeLine(message: string, path = '') {
    const messageWithTimestamp = `${new Date().toUTCString()} ${message}\n`;
    this.consoleLogger.log(message);
    fs.appendFile(!!path ? path : 'log.txt', messageWithTimestamp, (err) => {
      if (err) throw err;
    });
  }
}
