/* eslint-disable indent */
import { Type } from 'class-transformer'
import { IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'

class UserDto {
    @IsOptional()
    @IsString()
    name: string

    @IsString()
    email: string

    @IsOptional()
    @IsString({ each: true })
    favoriteHeadlinesIds: string[]

    @IsOptional()
    @IsString()
    photoURL: string
}

export class UpdateUserDto {
    @IsObject()
    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto
}