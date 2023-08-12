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
import type { SrApiProductsCatalogueContractsCreateProductPrice } from './SrApiProductsCatalogueContractsCreateProductPrice';
import {
    SrApiProductsCatalogueContractsCreateProductPriceFromJSON,
    SrApiProductsCatalogueContractsCreateProductPriceFromJSONTyped,
    SrApiProductsCatalogueContractsCreateProductPriceToJSON,
} from './SrApiProductsCatalogueContractsCreateProductPrice';

import {
     SrApiProductsCatalogueContractsCreateProductCreateBookRequestFromJSONTyped,
     SrApiProductsCatalogueContractsCreateProductCreateClothingRequestFromJSONTyped,
     SrApiProductsCatalogueContractsCreateProductCreateShoesRequestFromJSONTyped
} from './';

/**
 * 
 * @export
 * @interface SrApiProductsCatalogueContractsCreateProductCreateProductRequest
 */
export interface SrApiProductsCatalogueContractsCreateProductCreateProductRequest {
    /**
     * 
     * @type {SrApiProductsCatalogueCommonProductCategory}
     * @memberof SrApiProductsCatalogueContractsCreateProductCreateProductRequest
     */
    category: SrApiProductsCatalogueCommonProductCategory;
    /**
     * 
     * @type {string}
     * @memberof SrApiProductsCatalogueContractsCreateProductCreateProductRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof SrApiProductsCatalogueContractsCreateProductCreateProductRequest
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof SrApiProductsCatalogueContractsCreateProductCreateProductRequest
     */
    sku: string;
    /**
     * 
     * @type {string}
     * @memberof SrApiProductsCatalogueContractsCreateProductCreateProductRequest
     */
    url: string;
    /**
     * 
     * @type {Array<SrApiProductsCatalogueContractsCreateProductPrice>}
     * @memberof SrApiProductsCatalogueContractsCreateProductCreateProductRequest
     */
    prices: Array<SrApiProductsCatalogueContractsCreateProductPrice>;
    /**
     * 
     * @type {SrApiProductsCatalogueCommonProductRetailer}
     * @memberof SrApiProductsCatalogueContractsCreateProductCreateProductRequest
     */
    retailer: SrApiProductsCatalogueCommonProductRetailer;
}

/**
 * Check if a given object implements the SrApiProductsCatalogueContractsCreateProductCreateProductRequest interface.
 */
export function instanceOfSrApiProductsCatalogueContractsCreateProductCreateProductRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "category" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "sku" in value;
    isInstance = isInstance && "url" in value;
    isInstance = isInstance && "prices" in value;
    isInstance = isInstance && "retailer" in value;

    return isInstance;
}

export function SrApiProductsCatalogueContractsCreateProductCreateProductRequestFromJSON(json: any): SrApiProductsCatalogueContractsCreateProductCreateProductRequest {
    return SrApiProductsCatalogueContractsCreateProductCreateProductRequestFromJSONTyped(json, false);
}

export function SrApiProductsCatalogueContractsCreateProductCreateProductRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SrApiProductsCatalogueContractsCreateProductCreateProductRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
        if (json['category'] === 'Sr.Api.ProductsCatalogue.Contracts.CreateProduct.CreateBookRequest') {
            return SrApiProductsCatalogueContractsCreateProductCreateBookRequestFromJSONTyped(json, true);
        }
        if (json['category'] === 'Sr.Api.ProductsCatalogue.Contracts.CreateProduct.CreateClothingRequest') {
            return SrApiProductsCatalogueContractsCreateProductCreateClothingRequestFromJSONTyped(json, true);
        }
        if (json['category'] === 'Sr.Api.ProductsCatalogue.Contracts.CreateProduct.CreateShoesRequest') {
            return SrApiProductsCatalogueContractsCreateProductCreateShoesRequestFromJSONTyped(json, true);
        }
    }
    return {
        
        'category': SrApiProductsCatalogueCommonProductCategoryFromJSON(json['category']),
        'name': json['name'],
        'description': json['description'],
        'sku': json['sku'],
        'url': json['url'],
        'prices': ((json['prices'] as Array<any>).map(SrApiProductsCatalogueContractsCreateProductPriceFromJSON)),
        'retailer': SrApiProductsCatalogueCommonProductRetailerFromJSON(json['retailer']),
    };
}

export function SrApiProductsCatalogueContractsCreateProductCreateProductRequestToJSON(value?: SrApiProductsCatalogueContractsCreateProductCreateProductRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'category': SrApiProductsCatalogueCommonProductCategoryToJSON(value.category),
        'name': value.name,
        'description': value.description,
        'sku': value.sku,
        'url': value.url,
        'prices': ((value.prices as Array<any>).map(SrApiProductsCatalogueContractsCreateProductPriceToJSON)),
        'retailer': SrApiProductsCatalogueCommonProductRetailerToJSON(value.retailer),
    };
}

