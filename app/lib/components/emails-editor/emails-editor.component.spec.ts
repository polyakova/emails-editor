import { EmailsService } from './emails.service';
import { } from 'jasmine';

describe('EmailsService', () => {
    let service: EmailsService;

    beforeEach(() => { service = new EmailsService(); });

    it('#isValidEmail returns true if email is valid', () => {
        expect(service.isValidEmail('e@polyakova.net')).toBe(true);
    });

    it('#isValidEmail returns false if email is invalid', () => {
        expect(service.isValidEmail('foo.bar')).toBe(false);
    });

    it('#parseEmails returns single email', () => {
        expect(service.parseEmails('e@polyakova.net   ')).toEqual(['e@polyakova.net']);
    });

    it('#parseEmails returns multiple emails splitted by comma', () => {
        expect(service.parseEmails('e@polyakova.net,rgarcia@optonline.net,mxiao@yahoo.com,firstpr@att.net,'))
            .toEqual(['e@polyakova.net', 'rgarcia@optonline.net', 'mxiao@yahoo.com', 'firstpr@att.net']);
    });
})