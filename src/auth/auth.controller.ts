import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorators';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly autservice: AuthService) {}

  @Post('register')
  register(@Body() registerdto: RegisterDto) {
    return this.autservice.register(registerdto);
  }
  @Post('login')
  login(@Body() logindto: LoginDto) {
    return this.autservice.login(logindto);
  }
  // @Get('profile')
  // @Roles(Role.USER)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(@Request() req: RequestWithUser) {
  //   return this.autservice.profile(req.user);
  // }

  @Get('profile')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth',
  })
  @Auth(Role.ADMIN)
  profile2(@ActiveUser() user: ActiveUserInterface) {
    return this.autservice.profile(user);
  }
}
