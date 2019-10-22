import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TestService{

    development = "https://des-blockcha.in2.es/api";
    pro = "https://blockcha.in2.es/api";

    constructor(private _http: HttpClient) {}

    getUID(){
        let test = {
            "did":"345",
            "email":"daniel.alban@in2.es",
            "nombre":"Daniel",
            "apellido": "Albán",
            "ticketId":"t-00007251"
        };
        this._http.post(`${this.pro}`+"/v1/credential/",{ "did":"345",
            "email":"daniel.alban@in2.es",
            "nombre":"Daniel",
            "apellido": "Albán",
            "ticketId":"t-00007251"}).subscribe( data =>{
                console.log("ResultadoUID",data);
        })
    }

    getAlastriaID(){
        return this._http.get(`${this.pro}`+"/v1/credential/47fdbe3f-0618-4ea9-95cf-683b99d0cd72").subscribe(data =>{
            console.log("ResultadoAlastriaID",data);
        })
    }

    // getKid(kid:string){
    //     return this._http.post(`${this.development}`+"/v1/credential/didinplace",{"did":kid}).subscribe( data =>{
    //       console.log(data);
    //     })
    // }

    postValidateDid(id, did) {
        return  this._http.post("https://blockcha.in2.es/api/v1/credential/did", {
            id: id,
            did: did
        })
    }
}
