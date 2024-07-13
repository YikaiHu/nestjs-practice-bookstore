import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';

@Controller('state')
@CacheKey('users')
@UseInterceptors(CacheInterceptor)
export class StateController {
  @Get()
  @CacheTTL(20000)
  getAllStatue(): string[] {
    console.log(`GetAllStates called at: ${new Date().toISOString()}`);
    return ['ACT', 'QLD', 'NSW', 'SA', 'NT', 'TAS', 'VIC'];
  }
}
