import { Exclude } from 'class-transformer';

export class UserEntity {
    id: string;
    email: string;
    name?: string;

    @Exclude()
    password: string; // will be hidden when you return JSON

    @Exclude()
    hashedRefreshToken?: string;


    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
