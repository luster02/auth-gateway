import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientRedis, Transport } from '@nestjs/microservices';
import { SigninDto, SignupDto } from './dto'

@Injectable()
export class AuthService implements OnModuleInit {
    @Client({
        transport: Transport.REDIS,
        options: {
            url: 'redis://localhost:6379'
        }
    })
    private client: ClientRedis;

    async onModuleInit() {
        await this.client.connect()
    }

    async signup(userData: SignupDto): Promise<any> {
        const response = await this.client.send({ type: 'signup' }, userData).toPromise()
        return response
    }

    async signin(userData: SigninDto): Promise<any> {
        const response = await this.client.send({ type: 'signin' }, userData).toPromise()
        return response
    }

    async getUsername(username: string): Promise<any> {
        const response = await this.client.send({ type: 'getUsername' }, username).toPromise()
        return response
    }
}
