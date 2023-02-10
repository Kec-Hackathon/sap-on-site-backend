import { USER_TYPE } from "../schema/user.schema"

export class CreateUserDto {
    readonly name: string
    readonly email: string
    readonly roll_no: string
    readonly password: string
    readonly department: string
    readonly mentor_id: string
    readonly year: string
    readonly profile: {
        file: any,
        folder: string
    }
    readonly user_type: USER_TYPE
}