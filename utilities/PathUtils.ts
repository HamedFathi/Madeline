import { PathInfo } from './PathInfo';

const getPathInfo = function(path: string): PathInfo {
    const d = path.substr(0, path.lastIndexOf('/'));
    const f = path.substr(path.lastIndexOf('/') + 1);
    let e = '';
    const eIndex = f.indexOf('.');
    if (eIndex !== -1) {
        e = f.substr(eIndex + 1);
    }
    return {
        path: path,
        directory: d,
        file: f,
        extension: e,
    };
};

export { getPathInfo };
