/* eslint-disable indent */
import { IsObject, IsOptional, IsString } from 'class-validator'

export class CreateHeadlineDto {
    @IsObject()
    @IsOptional()
    source?: {
        id: string | null
        name: string
    }

    @IsString()
    author?: string

    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    url?: string

    @IsString()
    @IsOptional()
    urlToImage?: string

    @IsString()
    @IsOptional()
    publishedAt?: string

    @IsString()
    @IsOptional()
    content?: string
}