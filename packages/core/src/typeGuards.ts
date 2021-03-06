/** @license
 *  Copyright 2016 - present The Material Motion Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import $$observable from 'symbol-observable';

import {
  Observable,
  Observer,
  Point2D,
  Timestamped,
} from './types';

/**
 * Checks if an object is a Boolean.
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Checks if an object is not undefined.
 */
export function isDefined(value: any): boolean {
  return typeof value !== 'undefined';
}

/**
 * Checks if an object is a Number.
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

/**
 * Checks if an object is an observable by checking if it returns itself from
 * [Symbol.observable]()
 */
export function isObservable(value: any): value is Observable<any> {
  return value && value[$$observable] && value === value[$$observable]();
}

/**
 * Checks if an object is a `Map` using `instanceof`.
 */
export function isMap(value: any): value is Map<any, any> {
  return value instanceof Map;
}

/**
 * Checks if an object has numeric values for both `x` and `y`.
 */
export function isPoint2D(value: any): value is Point2D {
  return typeof value.x === 'number' && typeof value.y === 'number';
}

/**
 * Checks if a value is an `Observer` by checking if the value has a `next`
 * method.
 */
export function isObserver<T = any>(value: any): value is Observer<T> {
  return typeof value.next === 'function';
}

/**
 * Checks if a value is a `PointerEvent` by checking if the value is an `Event`
 * whose `type` starts with `pointer`.
 *
 * This is useful for ensuring that `downEvent.target.setPointerCapture()` can
 * be called:  To avoid using the PointerEvent polyfill, a developer could
 * create an object that had the subset of `PointerEvent` that we care about
 * (`PartialPointerEvent`) and populate its values from `event.targetTouches`.
 * However, we only need to call `setPointerCapture()` on a true `PointerEvent`,
 * so `isPointerEvent(value)` needs to be able to distinguish between them.
 */
export function isPointerEvent(value: any): value is PointerEvent {
  return value instanceof Event && value.type.startsWith('pointer');
}

/**
 * Checks if value is iterable; that is, usable in a `for of` loop.
 */
export function isIterable(value: any): value is Iterable<any> {
  return value && value[Symbol.iterator] !== undefined;
}

/**
 * Checks if value has a timestamp property.
 */
export function isTimestamped(value: any): value is Timestamped<any> {
  return value && value.hasOwnProperty('timestamp');
}
