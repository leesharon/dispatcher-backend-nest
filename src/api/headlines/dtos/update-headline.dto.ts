/* eslint-disable indent */
import { Type } from 'class-transformer'
import { IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'

class HeadlineDto {
    @IsObject()
    @IsOptional()
    source?: {
        id: string | null
        name: string
    }

    @IsString()
    @IsOptional()
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

export class UpdateHeadlineDto {
    @IsObject()
    @ValidateNested()
    @Type(() => HeadlineDto)
    headline: HeadlineDto
}