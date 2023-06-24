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
import type { SrApiProductsCatalogueContractsCommonBookSpecificationRequest } from './SrApiProductsCatalogueContractsCommonBookSpecificationRequest';
import {
    SrApiProductsCatalogueContractsCommonBookSpecificationRequestFromJSON,
    SrApiProductsCatalogueContractsCommonBookSpecificationRequestFromJSONTyped,
    SrApiProductsCatalogueContractsCommonBookSpecificationRequestToJSON,
} from './SrApiProductsCatalogueContractsCommonBookSpecificationRequest';
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
 * @interface SrApiProductsCatalogueContractsCreateProductCreateBookRequest
 */
export interface SrApiProductsCatalogueContractsCreateProductCreateBookRequest extends SrApiProductsCatalogueContractsCreateProductCreateProductRequest {
    /**
     * 
     * @type {SrApiProductsCatalogueContractsCommonBookSpecificationRequest}
     * @memberof SrApiProductsCatalogueContractsCreateProductCreateBookRequest
     */
    specifications: SrApiProductsCatalogueContractsCommonBookSpecificationRequest;
}

/**
 * Check if a given object implements the SrApiProductsCatalogueContractsCreateProductCreateBookRequest interface.
 */
export function instanceOfSrApiProductsCatalogueContractsCreateProductCreateBookRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "specifications" in value;

    return isInstance;
}

export function SrApiProductsCatalogueContractsCreateProductCreateBookRequestFromJSON(json: any): SrApiProductsCatalogueContractsCreateProductCreateBookRequest {
    return SrApiProductsCatalogueContractsCreateProductCreateBookRequestFromJSONTyped(json, false);
}

export function SrApiProductsCatalogueContractsCreateProductCreateBookRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SrApiProductsCatalogueContractsCreateProductCreateBookRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...SrApiProductsCatalogueContractsCreateProductCreateProductRequestFromJSONTyped(json, ignoreDiscriminator),
        'specifications': SrApiProductsCatalogueContractsCommonBookSpecificationRequestFromJSON(json['Specifications']),
    };
}

export function SrApiProductsCatalogueContractsCreateProductCreateBookRequestToJSON(value?: SrApiProductsCatalogueContractsCreateProductCreateBookRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...SrApiProductsCatalogueContractsCreateProductCreateProductRequestToJSON(value),
        'Specifications': SrApiProductsCatalogueContractsCommonBookSpecificationRequestToJSON(value.specifications),
    };
}

