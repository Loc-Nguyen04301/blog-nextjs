import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
    @EventPattern('log_created')
    handleLog(data: any) {
        console.log('Received message from RabbitMQ:', data);
    }
}