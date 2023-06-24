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
 * @interface SrApiProductsCatalogueContractsCommonClothingSpecificationRequest
 */
export interface SrApiProductsCatalogueContractsCommonClothingSpecificationRequest {
    /**
     * 
     * @type {string}
     * @memberof SrApiProductsCatalogueContractsCommonClothingSpecificationRequest
     */
    size: string;
    /**
     * 
     * @type {string}
     * @memberof SrApiProductsCatalogueContractsCommonClothingSpecificationRequest
     */
    color: string;
}

/**
 * Check if a given object implements the SrApiProductsCatalogueContractsCommonClothingSpecificationRequest interface.
 */
export function instanceOfSrApiProductsCatalogueContractsCommonClothingSpecificationRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "size" in value;
    isInstance = isInstance && "color" in value;

    return isInstance;
}

export function SrApiProductsCatalogueContractsCommonClothingSpecificationRequestFromJSON(json: any): SrApiProductsCatalogueContractsCommonClothingSpecificationRequest {
    return SrApiProductsCatalogueContractsCommonClothingSpecificationRequestFromJSONTyped(json, false);
}

export function SrApiProductsCatalogueContractsCommonClothingSpecificationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SrApiProductsCatalogueContractsCommonClothingSpecificationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'size': json['Size'],
        'color': json['Color'],
    };
}

export function SrApiProductsCatalogueContractsCommonClothingSpecificationRequestToJSON(value?: SrApiProductsCatalogueContractsCommonClothingSpecificationRequest | null): any {
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

