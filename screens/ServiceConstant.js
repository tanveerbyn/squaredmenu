export class ServiceConstant {
    static fcm_token = '';
    static notification_count = '0'


    static set_fcm_Token(token) {
        this.fcm_token = token
    }

    static get_fcm_Token() {
        return this.fcm_token
    }

    static set_notf_count(count) {
        this.notification_count = count
    }

    static get_notf_count() {
        return this.notification_count
    }

}