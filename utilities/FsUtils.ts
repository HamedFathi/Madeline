export class FsUtils {
    public isThirdParty(text: string): boolean {
        return text.startsWith('.');
    }
}
