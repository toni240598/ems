import { Site } from "../site/site";
import { Security } from "../security/security";

export class SecuritySite {

    constructor(input?: SecuritySite) {
        Object.assign(this, input);

        if (input && input.security) {
            this.setSecurity(new Security(input.security));
        }

        if (input && input.site) {
            this.setSite(new Site(input.site));
        }
    }

    private id: Number;
    private site: Site;
    private site_id: Number;
    private security: Security;
    private security_id: Number;

    getId(): Number {
        return this.id;
    }

    setId(id: Number) {
        this.id = id;
    }

    getSite(): Site {
        return this.site;
    }

    setSite(site: Site) {
        this.site = site;
    }

    getSiteId(): Number {
        return this.site_id;
    }

    setSiteId(site_id: Number) {
        this.site_id = site_id;
    }

    getSecurity(): Security {
        return this.security;
    }

    setSecurity(security: Security) {
        this.security = security;
    }

    getSecurityId(): Number {
        return this.security_id;
    }

    setSecurityId(security_id: Number) {
        this.security_id = security_id;
    }
}