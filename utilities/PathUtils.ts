import { PathInfo } from './PathInfo';

export class PathUtils {
    public getPathInfo(path: string): PathInfo {
        return {
            path: path,
            directory: path.substr(0, path.lastIndexOf('/')),
            file: path.substr(path.lastIndexOf('/') + 1),
        };
    }
}
