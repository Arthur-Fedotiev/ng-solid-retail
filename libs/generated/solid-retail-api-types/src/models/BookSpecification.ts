/* tslint:disable */
/* eslint-disable */
/**
 * SOLID Retail API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface BookSpecification
 */
export interface BookSpecification {
    /**
     * 
     * @type {string}
     * @memberof BookSpecification
     */
    cover?: string | null;
}

/**
 * Check if a given object implements the BookSpecification interface.
 */
export function instanceOfBookSpecification(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BookSpecificationFromJSON(json: any): BookSpecification {
    return BookSpecificationFromJSONTyped(json, false);
}

export function BookSpecificationFromJSONTyped(json: any, ignoreDiscriminator: boolean): BookSpecification {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'cover': !exists(json, 'Cover') ? undefined : json['Cover'],
    };
}

export function BookSpecificationToJSON(value?: BookSpecification | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Cover': value.cover,
    };
}
