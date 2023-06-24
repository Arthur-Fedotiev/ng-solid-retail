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

import {
    SrApiProductsCatalogueContractsUpdateProductUpdateBookRequest,
    instanceOfSrApiProductsCatalogueContractsUpdateProductUpdateBookRequest,
    SrApiProductsCatalogueContractsUpdateProductUpdateBookRequestFromJSON,
    SrApiProductsCatalogueContractsUpdateProductUpdateBookRequestFromJSONTyped,
    SrApiProductsCatalogueContractsUpdateProductUpdateBookRequestToJSON,
} from './SrApiProductsCatalogueContractsUpdateProductUpdateBookRequest';
import {
    SrApiProductsCatalogueContractsUpdateProductUpdateClothingRequest,
    instanceOfSrApiProductsCatalogueContractsUpdateProductUpdateClothingRequest,
    SrApiProductsCatalogueContractsUpdateProductUpdateClothingRequestFromJSON,
    SrApiProductsCatalogueContractsUpdateProductUpdateClothingRequestFromJSONTyped,
    SrApiProductsCatalogueContractsUpdateProductUpdateClothingRequestToJSON,
} from './SrApiProductsCatalogueContractsUpdateProductUpdateClothingRequest';
import {
    SrApiProductsCatalogueContractsUpdateProductUpdateShoesRequest,
    instanceOfSrApiProductsCatalogueContractsUpdateProductUpdateShoesRequest,
    SrApiProductsCatalogueContractsUpdateProductUpdateShoesRequestFromJSON,
    SrApiProductsCatalogueContractsUpdateProductUpdateShoesRequestFromJSONTyped,
    SrApiProductsCatalogueContractsUpdateProductUpdateShoesRequestToJSON,
} from './SrApiProductsCatalogueContractsUpdateProductUpdateShoesRequest';

/**
 * @type ApiV1CataloguePutRequest
 * 
 * @export
 */
export type ApiV1CataloguePutRequest = SrApiProductsCatalogueContractsUpdateProductUpdateBookRequest | SrApiProductsCatalogueContractsUpdateProductUpdateClothingRequest | SrApiProductsCatalogueContractsUpdateProductUpdateShoesRequest;

export function ApiV1CataloguePutRequestFromJSON(json: any): ApiV1CataloguePutRequest {
    return ApiV1CataloguePutRequestFromJSONTyped(json, false);
}

export function ApiV1CataloguePutRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiV1CataloguePutRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...SrApiProductsCatalogueContractsUpdateProductUpdateBookRequestFromJSONTyped(json, true), ...SrApiProductsCatalogueContractsUpdateProductUpdateClothingRequestFromJSONTyped(json, true), ...SrApiProductsCatalogueContractsUpdateProductUpdateShoesRequestFromJSONTyped(json, true) };
}

export function ApiV1CataloguePutRequestToJSON(value?: ApiV1CataloguePutRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfSrApiProductsCatalogueContractsUpdateProductUpdateBookRequest(value)) {
        return SrApiProductsCatalogueContractsUpdateProductUpdateBookRequestToJSON(value as SrApiProductsCatalogueContractsUpdateProductUpdateBookRequest);
    }
    if (instanceOfSrApiProductsCatalogueContractsUpdateProductUpdateClothingRequest(value)) {
        return SrApiProductsCatalogueContractsUpdateProductUpdateClothingRequestToJSON(value as SrApiProductsCatalogueContractsUpdateProductUpdateClothingRequest);
    }
    if (instanceOfSrApiProductsCatalogueContractsUpdateProductUpdateShoesRequest(value)) {
        return SrApiProductsCatalogueContractsUpdateProductUpdateShoesRequestToJSON(value as SrApiProductsCatalogueContractsUpdateProductUpdateShoesRequest);
    }

    return {};
}

