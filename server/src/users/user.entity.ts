import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column({ unique: true })
  public email: string;
 
  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column()
  public password: string;
}
 
export default User;