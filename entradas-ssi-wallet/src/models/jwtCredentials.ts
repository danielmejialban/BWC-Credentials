export class HeaderJwtCredential{
    alg: "ES256";
    typ:"JWT";
    kid: string;
}

export class PayLoadJwtCredential{
    aud: string;
    iat: string;
    iss: string;
    vp: Verifiable_Presentation;
    email:string;
    name: string;
}

export class Verifiable_Presentation{
    context = [];
    proc: string;
    type = [];
    verifiableCredential = [];
}


export class ResponseQR{
    name: string;
    email:string;
    ticketId: string;
}


