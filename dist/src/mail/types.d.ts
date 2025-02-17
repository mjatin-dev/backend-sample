export interface SendMailData<T> {
    to: string;
    from?: string;
    templateId: string;
    dynamicTemplateData: T;
}
export interface SendHtmlMail {
    to: string;
    from?: string;
    subject: string;
    text: string;
    html: string;
}
export interface WelcomeTemplateData {
    dashboardUrl: string;
    password: string;
}
export interface PasswordResetTemplateData {
    resetPasswordLink: string;
}
export interface SignUpVerification {
    htmlContent: string;
}
