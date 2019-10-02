export class HeaderJwtCredential{
    alg: "ES256";
    typ:"JWT";
    kid: string;
}

export class PayLoadJwtCredential{
    iss: string;
    iat: 1525465044;
    exp: 1530735444;
    pr: PresentationRequest;
}

export class PresentationRequest{
    context: Context;
    type: Type;
    procUrl: "https://www.direccion_evento.com/alastria/businessprocess/0001";
    procHash: "H398sjHd...kldjUYn475n";
    data: Data;
}

export class Context{
    url:  "https://www.w3.org/2018/credentials/v1";
    typeCode: "JWT";
}

export class Type{
    verifiablePresentationRequest: "VerifiablePresentationRequest";
    alastriaVPRTicket: "AlastriaVPRTicket"
}

export class Data{
    content: "JWT";
    levelOfAssurance: "Low";
    requeried: true;
    field_name: "ticketID"
}
