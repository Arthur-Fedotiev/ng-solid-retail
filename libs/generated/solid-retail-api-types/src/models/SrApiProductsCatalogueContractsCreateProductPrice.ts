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
import type { SrApiProductsCatalogueCommonCurrencyCode } from './SrApiProductsCatalogueCommonCurrencyCode';
import {
    SrApiProductsCatalogueCommonCurrencyCodeFromJSON,
    SrApiProductsCatalogueCommonCurrencyCodeFromJSONTyped,
    SrApiProductsCatalogueCommonCurrencyCodeToJSON,
} from './SrApiProductsCatalogueCommonCurrencyCode';
import type { SrApiProductsCatalogueCommonProductTier } from './SrApiProductsCatalogueCommonProductTier';
import {
    SrApiProductsCatalogueCommonProductTierFromJSON,
    SrApiProductsCatalogueCommonProductTierFromJSONTyped,
    SrApiProductsCatalogueCommonProductTierToJSON,
} from './SrApiProductsCatalogueCommonProductTier';

/**
 * 
 * @export
 * @interface SrApiProductsCatalogueContractsCreateProductPrice
 */
export interface SrApiProductsCatalogueContractsCreateProductPrice {
    /**
     * 
     * @type {number}
     * @memberof SrApiProductsCatalogueContractsCreateProductPrice
     */
    value: number;
    /**
     * 
     * @type {SrApiProductsCatalogueCommonProductTier}
     * @memberof SrApiProductsCatalogueContractsCreateProductPrice
     */
    tier: SrApiProductsCatalogueCommonProductTier;
    /**
     * 
     * @type {SrApiProductsCatalogueCommonCurrencyCode}
     * @memberof SrApiProductsCatalogueContractsCreateProductPrice
     */
    currency: SrApiProductsCatalogueCommonCurrencyCode;
}

/**
 * Check if a given object implements the SrApiProductsCatalogueContractsCreateProductPrice interface.
 */
export function instanceOfSrApiProductsCatalogueContractsCreateProductPrice(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "value" in value;
    isInstance = isInstance && "tier" in value;
    isInstance = isInstance && "currency" in value;

    return isInstance;
}

export function SrApiProductsCatalogueContractsCreateProductPriceFromJSON(json: any): SrApiProductsCatalogueContractsCreateProductPrice {
    return SrApiProductsCatalogueContractsCreateProductPriceFromJSONTyped(json, false);
}

export function SrApiProductsCatalogueContractsCreateProductPriceFromJSONTyped(json: any, ignoreDiscriminator: boolean): SrApiProductsCatalogueContractsCreateProductPrice {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': json['value'],
        'tier': SrApiProductsCatalogueCommonProductTierFromJSON(json['tier']),
        'currency': SrApiProductsCatalogueCommonCurrencyCodeFromJSON(json['currency']),
    };
}

export function SrApiProductsCatalogueContractsCreateProductPriceToJSON(value?: SrApiProductsCatalogueContractsCreateProductPrice | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
        'tier': SrApiProductsCatalogueCommonProductTierToJSON(value.tier),
        'currency': SrApiProductsCatalogueCommonCurrencyCodeToJSON(value.currency),
    };
}

