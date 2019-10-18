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
            "ticketId":"t-00007251"
        };
        this._http.post("http://10.14.3.80:8080/api/v1/credential/",{ "did":"345",
            "email":"daniel.alban@in2.es",
            "nombre":"Daniel",
            "apellido": "Albán",
            "ticketId":"t-00007251"}).subscribe( data =>{
                console.log("ResultadoUID",data);
        })
    }

    getAlastriaID(){
        return this._http.get("http://10.14.3.80:8080/api/v1/credential/47fdbe3f-0618-4ea9-95cf-683b99d0cd72").subscribe(data =>{
            console.log("ResultadoAlastriaID",data);
        })
    }
}
