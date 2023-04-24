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
import type { BookSpecification } from './BookSpecification';
import {
    BookSpecificationFromJSON,
    BookSpecificationFromJSONTyped,
    BookSpecificationToJSON,
} from './BookSpecification';
import type { Category } from './Category';
import {
    CategoryFromJSON,
    CategoryFromJSONTyped,
    CategoryToJSON,
} from './Category';
import type { CreateProductRequest } from './CreateProductRequest';
import {
    CreateProductRequestFromJSON,
    CreateProductRequestFromJSONTyped,
    CreateProductRequestToJSON,
} from './CreateProductRequest';
import type { Price } from './Price';
import {
    PriceFromJSON,
    PriceFromJSONTyped,
    PriceToJSON,
} from './Price';

/**
 * 
 * @export
 * @interface CreateBookRequest
 */
export interface CreateBookRequest extends CreateProductRequest {
    /**
     * 
     * @type {BookSpecification}
     * @memberof CreateBookRequest
     */
    specifications?: BookSpecification | null;
}

/**
 * Check if a given object implements the CreateBookRequest interface.
 */
export function instanceOfCreateBookRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CreateBookRequestFromJSON(json: any): CreateBookRequest {
    return CreateBookRequestFromJSONTyped(json, false);
}

export function CreateBookRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateBookRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...CreateProductRequestFromJSONTyped(json, ignoreDiscriminator),
        'specifications': !exists(json, 'Specifications') ? undefined : BookSpecificationFromJSON(json['Specifications']),
    };
}

export function CreateBookRequestToJSON(value?: CreateBookRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...CreateProductRequestToJSON(value),
        'Specifications': BookSpecificationToJSON(value.specifications),
    };
}

