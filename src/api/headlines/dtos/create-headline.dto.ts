/* eslint-disable indent */
import { Type } from 'class-transformer'
import { IsObject, IsString, ValidateNested } from 'class-validator'

class HeadlineDto {
    @IsObject()
    source: {
        id: string | null
        name: string
    }

    @IsString()
    author: string

    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    url: string

    @IsString()
    urlToImage: string

    @IsString()
    publishedAt: string

    @IsString()
    content: string
}

export class CreateHeadlineDto {
    @IsObject()
    @ValidateNested()
    @Type(() => HeadlineDto)
    headline: HeadlineDto
}