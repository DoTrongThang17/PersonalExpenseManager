import { Entity, PrimaryColumn, Column } from 'typeorm';
@Entity()
export class TOPICS {
  @PrimaryColumn()
  TId: number;
  @Column({ length: 100 })
  Tdesc: string;
  @Column({ length: 15 })
  Mod_Id: string;
}
