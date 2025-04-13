import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { Credential } from "./Credentials"
import { Appointment } from "./Appointment"

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    name: string

    @Column()
    email: string

    @Column()
    birthdate: string

    @Column("integer")
    nDni: number

    @Column({ type: 'varchar', length: 255, default: 'https://example.com/default-image.jpg'})
    imgUrl: string
    
    @OneToOne(()=> Credential, (credential) => credential.user)
    @JoinColumn()
    credentials: Credential

    @OneToMany(()=>Appointment, (appointment)=>appointment.user)
    appointments: Appointment[]
}