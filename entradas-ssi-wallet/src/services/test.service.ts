import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TestService{


    constructor(private _http: HttpClient) {}


    getUID(){

        let test = {
            "did":"345",
            "email":"daniel.alban@in2.es",
            "nombre":"Daniel",
            "apellido": "Albán",
            "ticketId":"t-00002"
        };

        this._http.post("http://10.14.3.80:8080/api/v1/credential/",{test}).subscribe( data =>{
                console.log("Resultado",data);
        })
    }
}
