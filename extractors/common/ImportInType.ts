export interface ImportInType {
    importedFrom: string;
    name: string;
    preType: string | undefined;
    fromNodeModules: string | undefined;
    text: string;
}
