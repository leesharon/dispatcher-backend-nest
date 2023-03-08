/* eslint-disable indent */
import { Type } from 'class-transformer'
import { IsObject, IsString, ValidateNested } from 'class-validator'

class CredentialsDto {
    @IsString()
    email: string

    @IsString()
    password: string
}

export class SignupDto {
    @IsObject()
    @ValidateNested()
    @Type(() => CredentialsDto)
    credentials: CredentialsDto
}