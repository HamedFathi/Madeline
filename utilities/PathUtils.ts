import { PathInfo } from './PathInfo';

const getPathInfo = function(path: string): PathInfo {
    return {
        path: path,
        directory: path.substr(0, path.lastIndexOf('/')),
        file: path.substr(path.lastIndexOf('/') + 1),
    };
};

export { getPathInfo };
