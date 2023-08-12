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
 * @interface SrApiProductsCatalogueContractsCommonShoesSpecificationResponse
 */
export interface SrApiProductsCatalogueContractsCommonShoesSpecificationResponse {
    /**
     * 
     * @type {number}
     * @memberof SrApiProductsCatalogueContractsCommonShoesSpecificationResponse
     */
    size: number;
    /**
     * 
     * @type {string}
     * @memberof SrApiProductsCatalogueContractsCommonShoesSpecificationResponse
     */
    color: string;
}

/**
 * Check if a given object implements the SrApiProductsCatalogueContractsCommonShoesSpecificationResponse interface.
 */
export function instanceOfSrApiProductsCatalogueContractsCommonShoesSpecificationResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "size" in value;
    isInstance = isInstance && "color" in value;

    return isInstance;
}

export function SrApiProductsCatalogueContractsCommonShoesSpecificationResponseFromJSON(json: any): SrApiProductsCatalogueContractsCommonShoesSpecificationResponse {
    return SrApiProductsCatalogueContractsCommonShoesSpecificationResponseFromJSONTyped(json, false);
}

export function SrApiProductsCatalogueContractsCommonShoesSpecificationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SrApiProductsCatalogueContractsCommonShoesSpecificationResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'size': json['size'],
        'color': json['color'],
    };
}

export function SrApiProductsCatalogueContractsCommonShoesSpecificationResponseToJSON(value?: SrApiProductsCatalogueContractsCommonShoesSpecificationResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'size': value.size,
        'color': value.color,
    };
}

