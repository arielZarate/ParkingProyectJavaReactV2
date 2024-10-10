export interface IEmployee {
  //id: number;
  fullName: string;
  dni: string;
  phoneNumber: string;
  roleUser: string;
  email: string;
  bio: string;

  /**
   
    password: string;
  authorities:[
    {
      authority:string;
    }
  ],
  accountNonExpired:boolean;
  accountNonLocked: boolean,
  credentialsNonExpired: boolean,
  enabled: boolean
 */
}

/*
{
  "id": 3,
  "fullName": "juan perez",
  "dni": "40.597.123",
  "phoneNumber": "35845697",
  "roleUser": "ROLE_EMPLOYEE",
  "email": "juan@gmail.com",
  "password": "$2a$10$W.4582tfTpTVL0eTyEZ0.e2zCfCYPcqjGSz5hY96AH0GIFth9aBb6",
  "username": "juan@gmail.com",
  "authorities": [
      {
          "authority": "ROLE_EMPLOYEE"
      }
  ],
  "accountNonExpired": true,
  "accountNonLocked": true,
  "credentialsNonExpired": true,
  "enabled": true
}




*/
