import { UserEntity } from './user.entity';

export interface IauthState {
    token_client: string;
    token_user: string;
    isLogged: boolean;
    name: string;
    surname: string;
    organism: string;
    user: UserEntity | null;
}