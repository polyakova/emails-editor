import { Injectable } from '@angular/core';

@Injectable()
export class EmailsService {
    
    isValidEmail(email: string): boolean {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    parseEmails(content: string): string[]{
        return content.trim().split(',').filter((x) => !!x).map(x => x.trim());
    }

    generateEmail(): string {
        var length = Math.random() * 10 + 1;
        var email = "";
        var domain = "";
        var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        var domains = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < length; i++)
            email += chars.charAt(Math.floor(Math.random() * chars.length));

        for (var i = 0; i < length; i++)
            domain += domains.charAt(Math.floor(Math.random() * chars.length));

        return email + "@" + domain + ".com";
    }
}