import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        allowNull: false,
    })
    password: string;

    @Column({
        allowNull: false,
        defaultValue: false
    })
    isEmailConfirmed: boolean;

    @Column({
        allowNull: true,
        defaultValue: false
    })
    token: string;
}