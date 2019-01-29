import { SecuritySite } from "../security-site/security-site";

export class Security {
    
    constructor(input?: Security) {
        Object.assign(this, input);
    }

    private id: Number;
    private username: String;
    private name: String;
    private phone: String;
    private email: String;
    private password: String;
    private addSecuritySites: SecuritySite[];
    private removeSecuritySites: SecuritySite[];

    getAddSecuritySites(): SecuritySite[] {
        return this.addSecuritySites;
    }

    setAddSecuritySites(temp: SecuritySite[]) {
        this.addSecuritySites = temp;
    }

    getRemoveSecuritySites(): SecuritySite[] {
        return this.removeSecuritySites;
    }

    setRemoveSecuritySites(temp: SecuritySite[]) {
        this.removeSecuritySites = temp;
    }

    setSecurityIds(id: Number) {
        this.addSecuritySites.forEach( result => result.setSecurityId(id));
        this.removeSecuritySites.forEach( result => result.setSecurityId(id));
    }

    getId(): Number {
        return this.id
    }

    setId(id: Number) {
        this.id = id;
    }

    getUsername(): String {
        return this.username;
    }

    setUsername(username: String) {
        this.username = username;
    }

    getName(): String {
        return this.name;
    }

    setName(name: String) {
        this.name = name;
    }

    getPhone(): String {
        return this.phone;
    }

    setPhone(phone: String) {
        this.phone = phone;
    }

    getEmail(): String {
        return this. email;
    }

    setEmail(email: String) {
        this.email = email;   
    }

    getPassword(): String {
        return this.password;
    }

    setPassword(password: String) {
        this.password = password;
    }
}