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
 * @interface ShoesSpecification
 */
export interface ShoesSpecification {
    /**
     * 
     * @type {string}
     * @memberof ShoesSpecification
     */
    size?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ShoesSpecification
     */
    color?: string | null;
}

/**
 * Check if a given object implements the ShoesSpecification interface.
 */
export function instanceOfShoesSpecification(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ShoesSpecificationFromJSON(json: any): ShoesSpecification {
    return ShoesSpecificationFromJSONTyped(json, false);
}

export function ShoesSpecificationFromJSONTyped(json: any, ignoreDiscriminator: boolean): ShoesSpecification {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'size': !exists(json, 'Size') ? undefined : json['Size'],
        'color': !exists(json, 'Color') ? undefined : json['Color'],
    };
}

export function ShoesSpecificationToJSON(value?: ShoesSpecification | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'Size': value.size,
        'Color': value.color,
    };
}

