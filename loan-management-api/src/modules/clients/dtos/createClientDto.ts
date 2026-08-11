import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";

export class createClientDto{
    @IsNotEmpty()
    name!:string;

    @IsNotEmpty()
    lastName!:string;

    @IsNotEmpty()
    @Length(8, 8, { message: "El DNI debe tener exactamente 8 dígitos" })
    @Matches(/^\d+$/, { message: "El DNI solo debe contener números" })
    dni!: string;

    @IsNotEmpty()
    @IsEmail()
    email!:string;

    @IsNotEmpty({message:"El telefono es campo obligatorio!"})
    phone!:string;

    @IsNotEmpty()
    address!:string;
}