import ICredentialsDto from "./credentialsDto"

interface IRegisterDto extends ICredentialsDto {
    name: string,
    email: string,
    birthdate: string,
    nDni: number,
}

export default IRegisterDto