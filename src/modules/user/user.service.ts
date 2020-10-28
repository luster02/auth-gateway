import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientRedis, Transport } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
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

    async get(id: number): Promise<any> {
        const response = await this.client.send({ type: 'get' }, id).toPromise()
        return response
    }

    async getUsername(username: string): Promise<any> {
        const response = await this.client.send({ type: 'getUsername' }, username).toPromise()
        return response
    }

    async getEmail(email: string): Promise<any> {
        const response = await this.client.send({ type: 'getEmail' }, email).toPromise()
        return response
    }
}
