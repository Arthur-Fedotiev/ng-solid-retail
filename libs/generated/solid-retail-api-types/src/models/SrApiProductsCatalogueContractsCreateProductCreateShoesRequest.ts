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
import type { SrApiProductsCatalogueCommonProductCategory } from './SrApiProductsCatalogueCommonProductCategory';
import {
    SrApiProductsCatalogueCommonProductCategoryFromJSON,
    SrApiProductsCatalogueCommonProductCategoryFromJSONTyped,
    SrApiProductsCatalogueCommonProductCategoryToJSON,
} from './SrApiProductsCatalogueCommonProductCategory';
import type { SrApiProductsCatalogueCommonProductRetailer } from './SrApiProductsCatalogueCommonProductRetailer';
import {
    SrApiProductsCatalogueCommonProductRetailerFromJSON,
    SrApiProductsCatalogueCommonProductRetailerFromJSONTyped,
    SrApiProductsCatalogueCommonProductRetailerToJSON,
} from './SrApiProductsCatalogueCommonProductRetailer';
import type { SrApiProductsCatalogueContractsCommonShoesSpecificationRequest } from './SrApiProductsCatalogueContractsCommonShoesSpecificationRequest';
import {
    SrApiProductsCatalogueContractsCommonShoesSpecificationRequestFromJSON,
    SrApiProductsCatalogueContractsCommonShoesSpecificationRequestFromJSONTyped,
    SrApiProductsCatalogueContractsCommonShoesSpecificationRequestToJSON,
} from './SrApiProductsCatalogueContractsCommonShoesSpecificationRequest';
import type { SrApiProductsCatalogueContractsCreateProductCreateProductRequest } from './SrApiProductsCatalogueContractsCreateProductCreateProductRequest';
import {
    SrApiProductsCatalogueContractsCreateProductCreateProductRequestFromJSON,
    SrApiProductsCatalogueContractsCreateProductCreateProductRequestFromJSONTyped,
    SrApiProductsCatalogueContractsCreateProductCreateProductRequestToJSON,
} from './SrApiProductsCatalogueContractsCreateProductCreateProductRequest';
import type { SrApiProductsCatalogueContractsCreateProductPrice } from './SrApiProductsCatalogueContractsCreateProductPrice';
import {
    SrApiProductsCatalogueContractsCreateProductPriceFromJSON,
    SrApiProductsCatalogueContractsCreateProductPriceFromJSONTyped,
    SrApiProductsCatalogueContractsCreateProductPriceToJSON,
} from './SrApiProductsCatalogueContractsCreateProductPrice';

/**
 * 
 * @export
 * @interface SrApiProductsCatalogueContractsCreateProductCreateShoesRequest
 */
export interface SrApiProductsCatalogueContractsCreateProductCreateShoesRequest extends SrApiProductsCatalogueContractsCreateProductCreateProductRequest {
    /**
     * 
     * @type {SrApiProductsCatalogueContractsCommonShoesSpecificationRequest}
     * @memberof SrApiProductsCatalogueContractsCreateProductCreateShoesRequest
     */
    specifications: SrApiProductsCatalogueContractsCommonShoesSpecificationRequest;
}

/**
 * Check if a given object implements the SrApiProductsCatalogueContractsCreateProductCreateShoesRequest interface.
 */
export function instanceOfSrApiProductsCatalogueContractsCreateProductCreateShoesRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "specifications" in value;

    return isInstance;
}

export function SrApiProductsCatalogueContractsCreateProductCreateShoesRequestFromJSON(json: any): SrApiProductsCatalogueContractsCreateProductCreateShoesRequest {
    return SrApiProductsCatalogueContractsCreateProductCreateShoesRequestFromJSONTyped(json, false);
}

export function SrApiProductsCatalogueContractsCreateProductCreateShoesRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SrApiProductsCatalogueContractsCreateProductCreateShoesRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...SrApiProductsCatalogueContractsCreateProductCreateProductRequestFromJSONTyped(json, ignoreDiscriminator),
        'specifications': SrApiProductsCatalogueContractsCommonShoesSpecificationRequestFromJSON(json['Specifications']),
    };
}

export function SrApiProductsCatalogueContractsCreateProductCreateShoesRequestToJSON(value?: SrApiProductsCatalogueContractsCreateProductCreateShoesRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...SrApiProductsCatalogueContractsCreateProductCreateProductRequestToJSON(value),
        'Specifications': SrApiProductsCatalogueContractsCommonShoesSpecificationRequestToJSON(value.specifications),
    };
}

