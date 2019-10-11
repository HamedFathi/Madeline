import * as _ from 'lodash';

export class ObjectUtils {
    public query(obj: unknown, path: string, ...args: unknown[]): unknown {
        const len = args.length;
        let result: unknown = undefined;
        if (len === 0) {
            result = _(obj).result(path);
        } else {
            result = _.invoke(obj, path, ...args);
        }
        return result;
    }

    public multipleGroupBy<T>(array: T[], func: (x: T) => unknown[]): T[][] {
        /* eslint-disable */
        const groups: any = {};
        /* eslint-disable */
        array.forEach(function(o) {
            const group = JSON.stringify(func(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(function(group) {
            return groups[group];
        });
    }

    public isFunction(value: unknown): boolean {
        if (value instanceof Function) {
            return true;
        }
        return false;
    }
    public isNumber(value: unknown): boolean {
        return value && typeof value === 'number' && isFinite(value);
    }

    public isString(value: unknown): boolean {
        return value && (typeof value === 'string' || value instanceof String);
    }

    public isObject(value: unknown): boolean {
        return value && typeof value === 'object' && (value as object).constructor === Object;
    }

    public isArray(value: unknown): boolean {
        return value && typeof value === 'object' && (value as object).constructor === Array;
    }

    public isBoolean(value: unknown): boolean {
        return value && typeof value === 'boolean';
    }

    public isRegex(value: unknown): boolean {
        return value && typeof value === 'object' && (value as object).constructor === RegExp;
    }

    public isNull(value: unknown): boolean {
        return value === null;
    }

    public isUndefined(value: unknown): boolean {
        return value === void 0;
    }

    public isNullOrUndefined(value: unknown): boolean {
        return this.isNull(value) || this.isUndefined(value);
    }

    public hasLength(value: string | unknown[]): boolean {
        return value.length > 0;
    }

    public isDate(value: unknown): boolean {
        return value instanceof Date;
    }

    public isSymbol(value: unknown): boolean {
        return typeof value === 'symbol';
    }

    public isNullOrEmpty(value: string): boolean {
        return this.isNull(value) || this.isEmpty(value);
    }

    public isUndefinedOrEmpty(value: string): boolean {
        return this.isUndefined(value) || this.isEmpty(value);
    }

    public isNullOrUndefinedOrEmpty(value: string): boolean {
        return this.isNull(value) || this.isUndefined(value) || this.isEmpty(value);
    }

    public isEmpty(value: string): boolean {
        return value === '';
    }

    public isWhitespaceOrEmpty(value: string): boolean {
        return !/[^\s]/.test(value);
    }

    public isWhitespace(value: string): boolean {
        return !/[^\s]/.test(value) && this.hasLength(value);
    }

    public isAvailable(value: string | unknown[]): boolean {
        if (!value) return false;
        if (this.isString(value) && this.isEmpty(value as string)) return false;
        if (this.isArray(value) && !this.hasLength(value)) return false;
        return true;
    }

    public isStrictAvailable(value: string | unknown[]): boolean {
        if (!this.isAvailable(value)) {
            return false;
        } else {
            if (this.isArray(value)) {
                return (value as unknown[]).filter(x => this.isNullOrUndefined(x)).length === 0;
            }
            return true;
        }
    }
}
