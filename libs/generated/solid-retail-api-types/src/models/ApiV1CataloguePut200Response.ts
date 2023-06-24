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
    SrApiProductsCatalogueContractsCommonBookResponse,
    instanceOfSrApiProductsCatalogueContractsCommonBookResponse,
    SrApiProductsCatalogueContractsCommonBookResponseFromJSON,
    SrApiProductsCatalogueContractsCommonBookResponseFromJSONTyped,
    SrApiProductsCatalogueContractsCommonBookResponseToJSON,
} from './SrApiProductsCatalogueContractsCommonBookResponse';
import {
    SrApiProductsCatalogueContractsCommonClothingResponse,
    instanceOfSrApiProductsCatalogueContractsCommonClothingResponse,
    SrApiProductsCatalogueContractsCommonClothingResponseFromJSON,
    SrApiProductsCatalogueContractsCommonClothingResponseFromJSONTyped,
    SrApiProductsCatalogueContractsCommonClothingResponseToJSON,
} from './SrApiProductsCatalogueContractsCommonClothingResponse';
import {
    SrApiProductsCatalogueContractsCommonShoesResponse,
    instanceOfSrApiProductsCatalogueContractsCommonShoesResponse,
    SrApiProductsCatalogueContractsCommonShoesResponseFromJSON,
    SrApiProductsCatalogueContractsCommonShoesResponseFromJSONTyped,
    SrApiProductsCatalogueContractsCommonShoesResponseToJSON,
} from './SrApiProductsCatalogueContractsCommonShoesResponse';

/**
 * @type ApiV1CataloguePut200Response
 * 
 * @export
 */
export type ApiV1CataloguePut200Response = SrApiProductsCatalogueContractsCommonBookResponse | SrApiProductsCatalogueContractsCommonClothingResponse | SrApiProductsCatalogueContractsCommonShoesResponse;

export function ApiV1CataloguePut200ResponseFromJSON(json: any): ApiV1CataloguePut200Response {
    return ApiV1CataloguePut200ResponseFromJSONTyped(json, false);
}

export function ApiV1CataloguePut200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiV1CataloguePut200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...SrApiProductsCatalogueContractsCommonBookResponseFromJSONTyped(json, true), ...SrApiProductsCatalogueContractsCommonClothingResponseFromJSONTyped(json, true), ...SrApiProductsCatalogueContractsCommonShoesResponseFromJSONTyped(json, true) };
}

export function ApiV1CataloguePut200ResponseToJSON(value?: ApiV1CataloguePut200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfSrApiProductsCatalogueContractsCommonBookResponse(value)) {
        return SrApiProductsCatalogueContractsCommonBookResponseToJSON(value as SrApiProductsCatalogueContractsCommonBookResponse);
    }
    if (instanceOfSrApiProductsCatalogueContractsCommonClothingResponse(value)) {
        return SrApiProductsCatalogueContractsCommonClothingResponseToJSON(value as SrApiProductsCatalogueContractsCommonClothingResponse);
    }
    if (instanceOfSrApiProductsCatalogueContractsCommonShoesResponse(value)) {
        return SrApiProductsCatalogueContractsCommonShoesResponseToJSON(value as SrApiProductsCatalogueContractsCommonShoesResponse);
    }

    return {};
}
