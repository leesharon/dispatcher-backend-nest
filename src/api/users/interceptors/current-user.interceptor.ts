import { Injectable, NestInterceptor, ExecutionContext, CallHandler, } from '@nestjs/common'
import { UsersService } from '../users.service'
import { AuthService } from '../auth.service'

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest()
        const { accessToken } = request.session

        const { userId } = accessToken && this.authService.verifyAccessToken(accessToken) as any || {}

        if (userId) {
            const user = await this.usersService.getById(userId)
            request.currentUser = user
        }

        return handler.handle()
    }
}
