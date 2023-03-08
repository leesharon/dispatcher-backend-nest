import { CanActivate, ExecutionContext } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { UnauthorizedException } from '@nestjs/common'

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const { accessToken } = request.session
        const { userId } = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET!,
            (err: any, userId: string) => {
                if (err) throw new UnauthorizedException('invalid access token')
                return userId
            }) as any || {}
        return userId
    }
}
