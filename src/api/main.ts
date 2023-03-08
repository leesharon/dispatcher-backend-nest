import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session')

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(cookieSession({
        keys: ['secret'],
        maxAge: 15 * 60 * 1000,
        // secure: true
    }))
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(3000)
}
bootstrap()
