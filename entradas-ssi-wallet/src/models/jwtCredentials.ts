export class HeaderJwtCredential{
    alg: string;
    typ: string;
    kid:string;
}

export class PayLoadJwtCredential{
    iss: string;
    sub: string;
    iat: string;
    exp: string;
    nbf: string;
    vc: VerifiableCredential;
}

export class VerifiableCredential{
    context: string[];
    type: Type[];
}

export class Type{
    verifiableCredential: string;
    alastriaVCTicket: string;
    credentialSubject:  CredentialSubject
}

export class CredentialSubject{
    levelOfAssurance: string;
    ticketId: string;
}
