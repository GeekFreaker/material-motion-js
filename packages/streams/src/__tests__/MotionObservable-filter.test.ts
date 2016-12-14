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

import { expect } from 'chai';

import {
  beforeEach,
  describe,
  it,
} from 'mocha-sugar-free';

import {
  stub,
} from 'sinon';

import MotionObservable from '../MotionObservable';

declare function require(name: string);

// chai really doesn't like being imported as an ES2015 module; will be fixed in v4
require('chai').use(
  require('sinon-chai')
);

describe('MotionObservable._filter',
  () => {
    let next;
    let stream;
    let listener1;
    let disconnect;

    beforeEach(
      () => {
        stream = new MotionObservable(
          observer => {
            next = (value) => {
              observer.next(value);
            }

            return disconnect;
          }
        );

        listener1 = stub();
        disconnect = stub();
      }
    );

    it('should only pass through values that pass the test',
      () => {
        const isOdd = x => x % 2;

        stream._filter(isOdd).subscribe(listener1);

        next(1);
        next(2);
        next(3);

        expect(listener1).to.have.been.calledWith(1);
        expect(listener1).not.to.have.been.calledWith(2);
        expect(listener1).to.have.been.calledWith(3);
      }
    );
  }
);

