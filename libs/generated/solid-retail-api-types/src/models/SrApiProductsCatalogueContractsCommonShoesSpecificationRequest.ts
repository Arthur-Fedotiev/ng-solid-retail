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
 * @interface SrApiProductsCatalogueContractsCommonShoesSpecificationRequest
 */
export interface SrApiProductsCatalogueContractsCommonShoesSpecificationRequest {
    /**
     * 
     * @type {number}
     * @memberof SrApiProductsCatalogueContractsCommonShoesSpecificationRequest
     */
    size?: number;
    /**
     * 
     * @type {string}
     * @memberof SrApiProductsCatalogueContractsCommonShoesSpecificationRequest
     */
    color?: string | null;
}

/**
 * Check if a given object implements the SrApiProductsCatalogueContractsCommonShoesSpecificationRequest interface.
 */
export function instanceOfSrApiProductsCatalogueContractsCommonShoesSpecificationRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SrApiProductsCatalogueContractsCommonShoesSpecificationRequestFromJSON(json: any): SrApiProductsCatalogueContractsCommonShoesSpecificationRequest {
    return SrApiProductsCatalogueContractsCommonShoesSpecificationRequestFromJSONTyped(json, false);
}

export function SrApiProductsCatalogueContractsCommonShoesSpecificationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SrApiProductsCatalogueContractsCommonShoesSpecificationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'size': !exists(json, 'Size') ? undefined : json['Size'],
        'color': !exists(json, 'Color') ? undefined : json['Color'],
    };
}

export function SrApiProductsCatalogueContractsCommonShoesSpecificationRequestToJSON(value?: SrApiProductsCatalogueContractsCommonShoesSpecificationRequest | null): any {
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

