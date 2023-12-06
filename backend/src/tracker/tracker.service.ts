import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { JwtHeader } from 'jsonwebtoken'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom, map } from 'rxjs'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ICreatedIssue, IFoundIssue, IPayload } from 'src/tracker/types'
import { CreateIssueDto } from 'src/tracker/dto'

type Response = {
  iamToken: string
  expiresAt: string
}

@Injectable()
export class TrackerService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async getTicket(id: string) {
    const token: string = await this.getIAMToken()
    const orgId = this.configService.get('X-Cloud-Org-ID')
    const url: string = `https://api.tracker.yandex.net/v2/issues/${id}`
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Cloud-Org-ID': orgId,
        'Content-Type': 'application/json',
      },
    }

    try {
      const responseData: IFoundIssue = await lastValueFrom(
        this.httpService.get(url, requestConfig).pipe(
          map((response) => {
            return response.data
          }),
        ),
      )
      return responseData
    } catch (e) {
      console.log(e.response.data)
    }
  }

  async createTicket(data: CreateIssueDto): Promise<ICreatedIssue> {
    const token: string = await this.getIAMToken()
    const orgId = this.configService.get('X-Cloud-Org-ID')
    const url: string = `https://api.tracker.yandex.net/v2/issues/`
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Cloud-Org-ID': orgId,
        'Content-Type': 'application/json',
      },
    }

    const payload: IPayload = {
      summary: data.summary,
      queue: data.queue,
      description: data.description,
    }

    try {
      return await lastValueFrom(
        this.httpService.post(url, payload, requestConfig).pipe(
          map((response: AxiosResponse<ICreatedIssue>) => {
            return response.data
          }),
        ),
      )
    } catch (e) {
      console.log(e.response.data)
    }
  }

  async getIAMToken(): Promise<string> {
    const key: string = this.configService.get('TRACKER_PRIVATE_KEY')
    const keyId: string = this.configService.get('TRACKER_ID')
    const serviceAccountId: string = this.configService.get(
      'TRACKER_SERVICE_ACCOUNT_ID',
    )
    const now: number = Math.floor(new Date().getTime() / 1000)
    const header: JwtHeader = { kid: keyId, alg: 'PS256' }

    const payload = {
      aud: 'https://iam.api.cloud.yandex.net/iam/v1/tokens',
      iss: serviceAccountId,
      iat: now,
      exp: now + 3600,
    }

    const jwtToken: string = await this.jwtService.signAsync(payload, {
      secret: key,
      header,
    })

    const IAMUrl: string = 'https://iam.api.cloud.yandex.net/iam/v1/tokens'
    const body: { jwt: string } = { jwt: jwtToken }
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const responseData: Response = await lastValueFrom(
      this.httpService.post(IAMUrl, body, requestConfig).pipe(
        map((response) => {
          return response.data
        }),
      ),
    )

    return responseData.iamToken
  }
}
