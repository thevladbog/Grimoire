import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateIssueDto {
  @ApiProperty({
    example: 'New hire readonly  Ivan Borisov',
    description: 'Summary',
    required: true,
  })
  @IsNotEmpty()
  readonly summary: string

  @ApiProperty({
    example: 'HIRE',
    description: 'Name or id of queue',
    required: true,
  })
  @IsNotEmpty()
  readonly queue: string | number

  @ApiProperty({
    example: 'New hire start at ...',
    description: 'Description of issue',
    required: true,
  })
  @IsNotEmpty()
  readonly description: string
}
