import { Body, Controller, Post } from "@nestjs/common";
import { MailService } from "./mail.service";
import { SendMailDto } from "./dto/send-mail.dto";
import { Public } from "src/common/decorators/public.decorator";

@Controller("api/v1/mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Post("send")
  sendMail(@Body() dto: SendMailDto) {
    return this.mailService.sendMail(dto);
  }
}
