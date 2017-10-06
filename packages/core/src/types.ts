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

// We re-export everything we import, so dependents don't need to know about
// indefinite-observable.
import {
  Disconnect,
  NextChannel,
  Observable,
  Observer,
  Subscription,
} from 'indefinite-observable';

export {
  Connect,
  Disconnect,
  NextChannel,
  Observable,
  Observer,
  ObserverOrNext,
  Subscription,
} from 'indefinite-observable';

export {
  MotionAppendUnitable,
  MotionDebounceable,
  MotionDelayable,
  MotionDeduplicable,
  MotionFilterable,
  MotionFlattenable,
  MotionIgnorable,
  MotionInvertible,
  MotionIsAnyOfable,
  MotionLoggable,
  MotionLowerBoundable,
  MotionMappable,
  MotionMathOperable,
  MotionMeasurable,
  MotionMemorable,
  MotionMergeable,
  MotionMulticastable,
  MotionNextOperable,
  MotionDivisible,
  MotionAddable,
  MotionPluckable,
  MotionReactiveMappable,
  MotionReactiveNextOperable,
  MotionReadable,
  MotionRewritable,
  MotionRewriteRangeable,
  MotionRewriteToable,
  MotionMultipliable,
  MotionSeedable,
  MotionSubtractable,
  MotionTappable,
  MotionThresholdable,
  MotionThresholdRangeable,
  MotionTimestampable,
  MotionUpperBoundable,
  MotionVelocityMeasurable,
  MotionWindowable,
  ObservableWithFoundationalMotionOperators,
  ObservableWithMotionOperators,
} from './operators'

import {
  ObservableWithMotionOperators,
} from './operators';

import {
  State,
} from './enums';

export type Constructor<T> = new(...args: Array<any>) => T;
export type Predicate<T> = (value: T) => boolean;

export interface Subject<T> extends Observable<T> {
  next(value: T): void;
}

export type NextOperation<T, U> = (value: T, nextChannel: NextChannel<U>) => void;
export type ReactiveNextOperation<T, U> = (nextChannel: NextChannel<U>, ...values: Array<any>) => void;

export type Point2D = {
  x: number,
  y: number,
};

export interface Spring<T> {
  readonly destination$: ObservableWithMotionOperators<T>;
  destination: T;

  readonly initialValue$: ObservableWithMotionOperators<T>;
  initialValue: T;

  readonly initialVelocity$: ObservableWithMotionOperators<T>;
  initialVelocity: T;

  readonly stiffness$: ObservableWithMotionOperators<number>;
  stiffness: number;

  readonly damping$: ObservableWithMotionOperators<number>;
  damping: number;

  readonly threshold$: ObservableWithMotionOperators<number>;
  threshold: number;

  readonly enabled$: ObservableWithMotionOperators<boolean>;
  enabled: boolean;

  readonly state$: ObservableWithMotionOperators<State>;
  readonly state: State;

  value$: ObservableWithMotionOperators<T>;
}

/**
 * There are 2 competing input events on the Web: `PointerEvent`s and
 * `TouchEvent`s. Our gesture system only needs 4 properties: x, y, type and an
 * ID. In both models, `pageX` and `pageY` are provided. `TouchEvent` calls its
 * ID `identifier`; whereas, `PointerEvent` uses `pointerId`.
 *
 * `PartialPointerEvent` is the subset we care about.  `PointerEvent` already
 * has this shape.  `TouchEvent` can be trivially converted by extracting the
 * touches and renaming `identifier` to `pointerId`.
 */
export type PartialPointerEvent = {
  pageX: number;
  pageY: number;
  pointerId?: number; // Can be undefined for MouseEvent
  // Uses string rather than ('pointerdown' | 'pointermove' | 'pointerup')
  // because the PointerEvent.type is a string and it makes life easier if we
  // match that.
  type: string;
};

export type PointerEventStreams = {
  down$: ObservableWithMotionOperators<PartialPointerEvent>,
  move$: ObservableWithMotionOperators<PartialPointerEvent>,
  up$: ObservableWithMotionOperators<PartialPointerEvent>,
  cancel$: ObservableWithMotionOperators<PartialPointerEvent>,
  contextMenu$: ObservableWithMotionOperators<PartialPointerEvent>,
  capturedClick$: ObservableWithMotionOperators<MouseEvent>,
  capturedDragStart$: ObservableWithMotionOperators<DragEvent>,
};

export type Read<T> = () => T;
export interface ScopedReadable<T> {
  read: Read<T>;
}

export type Write<T> = (value: T) => void;
export interface ScopedWritable<T> {
  write: Write<T>;
}

export type WillChangeStyleStreams = {
  readonly willChange$: ObservableWithMotionOperators<string>,
};

export type TranslateStyleStreams = WillChangeStyleStreams & {
  readonly translate$: ObservableWithMotionOperators<Point2D>,
};

export type ScaleStyleStreams = WillChangeStyleStreams & {
  readonly scale$: ObservableWithMotionOperators<number>,
};

export type OpacityStyleStreams = WillChangeStyleStreams & {
  readonly opacity$: ObservableWithMotionOperators<number>,
};

export type BoxShadowStyleStreams = {
  readonly boxShadow$: ObservableWithMotionOperators<string>,
};

export type BorderRadiusStyleStreams = {
  readonly borderRadius$: ObservableWithMotionOperators<number | string | Array<number> | Array<string>>,
};

export type StyleStreams = WillChangeStyleStreams & TranslateStyleStreams &
    ScaleStyleStreams & OpacityStyleStreams & BoxShadowStyleStreams &
    BorderRadiusStyleStreams;

export type EqualityCheck = (a: any, b: any) => boolean;

export interface Timestamped<T> {
  value: T,
  timestamp: number,
};

export type MaybeReactive<D> = {
  [K in keyof D]: D[K] | Observable<D[K]>
};

/**
 * `Array` has both members and methods.  `MaybeReactive` iterates over all the
 * keys in an object.  `MaybeReactive<NumericallyKeyed<T>>` allows you to
 * represent an array with potentially reactive members without worrying about
 * the methods.
 */
export type NumericallyKeyed<T> = {
  [index: number]: T,
};

export type Dict<T> = {
  [index: string]: T,
};

export type NumericDict = Dict<number>;
export type StreamDict<T> = Dict<Observable<T>>;
export type SubjectDict<T> = Dict<Subject<T>>;
export type SubscriptionDict = Dict<Subscription>;
