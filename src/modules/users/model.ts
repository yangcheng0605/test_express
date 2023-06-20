// export class User {
//   id: number;
//   name: string;
//   constructor(id: number, name: string) {
//       this.id = id;
//       this.name = name;
//   }
// }
import { Entity, Column } from "typeorm";
import ENV from '../../config'
@Entity('users', { database: ENV.DB_DATABASE })
export class Users {
    @Column('int', {
      primary: true,
      name: "id",
      comment: "用户id",
    })
    id: number;

    @Column('varchar',{
      name: "name",
      comment: "用户名称",
      length: 255
    })
    name: string;
    @Column('int',{
      name: "sex",
      comment: "用户性别",
      default: () => 0,
    })
    sex: string;
}