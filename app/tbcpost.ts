    export interface CHAR{
        username:string;
        charname:string;
        sign:string;
    }

    export interface EDITCHAR{
        username:string;
        charname:string;
        newcharname:string;
        edittype:number;
        sign:string;
    }

    export interface CHANGEPASS{
        username:string;
        password:string;
        newpassword:string;
        sign:string;
    }

    export interface CHANGEEMAIL{
        username:string;
        email:string;
        sign:string;
    }

    export interface LOGIN{
        username:string;
        password:string;
        time:number;
        sign:string;
    }

    export interface TOKEN{
        accountid: string;
        logintime: string;
        token: string;
    }