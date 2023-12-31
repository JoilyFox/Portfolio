// Imports
import { ref } from "vue";
import { 
    MEDIA_QUERY_SIZE_MAP,
    EMPTY_VALUE,
} from "@/config/constants";


/**
 * Checks if the given value is considered empty.
 * A value is considered empty if it meets one of the following conditions:
 * - null
 * - undefined
 * - empty string ('')
 * - has a length of 0 (e.g., empty array)
 * - evaluates to false (e.g., NaN, false)
 * Note: The function does not check for EMPTY_VALUE as it's a non-standard JavaScript value.
 *
 * @param {any} value - The value to be checked for emptiness.
 * @return {boolean} - Returns true if the value is considered empty, otherwise false.
 */
function isValueEmpty(value: any): boolean {
    return (
        value === null ||
        value === undefined ||
        value === '' ||
        (typeof value === 'object' && value !== null && 'length' in value && value.length === 0) ||
        (!value && value !== 0)
    );
}


/**
 * Retrieves a nested value from an object based on a given key or array of keys.
 * If the key path does not exist, a fallback value is returned. The fallback value
 * can be a value of type T or a function that returns a value of type T.
 *
 * @param {string | string[]} key - The key or array of keys for the nested value. If an array of keys is provided, it navigates through the object map to the nested value.
 * @param {{ [key: string]: any }} objectMap - The object from which the value is retrieved.
 * @param {T | (() => T)} [fallbackValue=null] - The fallback value to return if the key path is not found in the object. This can be a direct value or a function that returns a value. Defaults to null.
 * @returns {T | any} - The value from the object map corresponding to the key path, or the result of the fallback function if the path is not found.
 * @template T - The type of the fallback value and the expected return type. This can be any type, including null, or a function returning any type.
 
 *
 * @example
 * // Using a single key
 * getValueFromObject('name', { name: 'Alice', age: 30 }, 'Unknown');
 * // returns 'Alice'
 */
function getValueFromObject<T>(
    key: string | string[],
    objectMap: { [key: string]: any },
    fallbackValue: T | (() => T) = null as any
): T | any {
    let value: any = fallbackValue;
  
    if (!isValueEmpty(key) && Array.isArray(key)) {
		value = objectMap;
	
		for (const k of key) {
			if (value && Object.prototype.hasOwnProperty.call(value, k)) {
				value = value[k];
			} else {
				// Check if fallbackValue is a function and call it if it is.
				return typeof fallbackValue === 'function' ? fallbackValue() : fallbackValue;
			}
		}
    }
  
    return value;
}

/**
 * Determines whether the current viewport width satisfies the specified screen size condition.
 *
 * @param {string|Array<string>} size - The screen size(s) to check. Can be a single size or an array of sizes.
 *                                      Supported sizes: 'sm', 'md', 'lg', 'xl', 'xxl'.
 * @param {string} [operator='<'] - The comparison operator to use. Default is '<'.
 *                                 Supported operators: '<', '>', '<=', '>=', '='.
 * @returns {boolean} True if the current viewport width satisfies the specified screen size condition, false otherwise.
 *                   If the input is invalid or the size condition is not satisfied, it will log an error and return false.
 *
 * @example
 * // Check if the current viewport width is greater than or equal to the 'xl' size (1280 pixels)
 * const result1 = isScreenSize('xl', '>=');
 * console.log(result1); // Output: true (if the viewport width is 1280 pixels or more)
 *
 * // Check if the current viewport width is between the 'sm' size (640 pixels) and 'lg' size (1024 pixels)
 * const result2 = isScreenSize(['sm', 'lg']);
 * console.log(result2); // Output: true (if the viewport width is between 640 and 1024 pixels)
 */

function isScreenSize(size = null, operator = '<') {

    function validateSizeArray(size) {
        const values = size.map((s) => {
            const val = MEDIA_QUERY_SIZE_MAP[s];
            if (typeof val !== 'number') {
                console.error(`Invalid size name "${s}" in function isScreenSize.`);
                return false;
            }
            return val;
        });

        if (values.some((val) => val === false)) {
            console.error('Invalid "size" value in function isScreenSize. Each "size" in the array must be a valid size name.');
            return false;
        }

        if (values.length !== 2) {
            console.error('Invalid "size" array length in function isScreenSize. The "size" array must have exactly 2 items.');
            return false;
        }

        return values;
    }

    function getSizeValue(size) {
        const sizeValue = MEDIA_QUERY_SIZE_MAP[size];

        if (isValueEmpty(sizeValue)) {
            console.error(`Invalid size name "${size}" in function isScreenSize.`);
            return false;
        }

        return sizeValue;
    }

    function generateMediaQuery(operator, sizeValue) {

        const mediaQueries = {
            '<': (sizeValue) => `(max-width: ${sizeValue - 1}px)`,
            '>': (sizeValue) => `(min-width: ${sizeValue}px)`,
            '<=': (sizeValue) => `(max-width: ${sizeValue}px)`,
            '>=': (sizeValue) => `(min-width: ${sizeValue}px)`,
            '=': (sizeValue) => `(width: ${sizeValue}px)`,
        };

        const getMediaQuery = mediaQueries[operator];

        if (!getMediaQuery) {
            console.error('Invalid operator in function isScreenSize.');
            return false;
        }

        return getMediaQuery(sizeValue);
    }

    function matchesMediaQuery(mediaQuery) {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia(mediaQuery).matches;
        }
        return false;
    }

    if (isValueEmpty(size)) {
        console.error('Invalid "size" parameter in function isScreenSize. Please provide a valid value or an array of sizes.');
        return false;
    }

    if (Array.isArray(size)) {
        const [minValue, maxValue] = validateSizeArray(size);

        if (!minValue || !maxValue) {
            return false;
        }

        const mediaQuery = `(min-width: ${minValue}px) and (max-width: ${maxValue}px)`;
        return matchesMediaQuery(mediaQuery);
    } else {
        const sizeValue = getSizeValue(size);

        if (!sizeValue) {
            return false;
        }

        const mediaQuery = generateMediaQuery(operator, sizeValue);

        if (!mediaQuery) {
            return false;
        }

        return matchesMediaQuery(mediaQuery);
    }
}

/**
 * Returns the input value or default value from config if the value is null or an empty string.
 *
 * @param {*} value - The input value to be checked.
 * @param fallbackValue
 * @returns {*} - The input value or '...' if the input value is null or an empty string.
 */
function getValueOrFallback(value, fallbackValue = EMPTY_VALUE) {
    return !isValueEmpty(value) ? value : fallbackValue;
}

/**
 * Retrieves the value of a nested property within an object.
 *
 * @param {Object} obj - The object to traverse.
 * @param {string} path - The dot-separated path of the nested property.
 * @param defaultValue
 * @returns {*} The value of the nested property if all levels exist, or `false` otherwise.
 *
 * @example
 *  getNestedValue(userData, 'user.address.street', 'No street');
 *  getNestedValue(userData, 'user.nonexistentKey', null);
 */
function getNestedValue(obj, path, defaultValue = EMPTY_VALUE) {
    const keys = path.split('.');
    let value = obj;

    for (const key of keys) {
        if (value && value.hasOwnProperty(key)) {
            value = value[key];
        } else {
            return defaultValue;
        }
    }

    return value;
}

/**
 * Generates a unique ID string.
 *
 * This function creates a unique identifier using a random number, which is then
 * converted to a base-36 (alphanumeric) string and sliced to obtain a substring.
 * The unique ID can be prefixed with a custom string to make it more identifiable.
 *
 * @param {string} [prefix='unique-id'] - Optional prefix for the unique ID.
 * @returns {string} A unique ID string with an optional prefix.
 *
 * @example
 * // returns a unique ID like 'unique-id-5g8xwvh5z'
 * const uniqueId = useUniqueId();
 */
function generateUUID() {
    return `${Math.random().toString(36).substr(2, 9)}`;
}



// Export
export {
    isValueEmpty,
    getValueFromObject,
    isScreenSize,
    getValueOrFallback,
    getNestedValue,
    generateUUID
}