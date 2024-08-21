import mongoose, { Aggregate, InsertManyOptions, Model, MongooseQueryOptions, Query } from 'mongoose';

if (!/^5/.test(mongoose.version)) {
  mongoose.Promise = Promise;
}

mongoose.connect = jest.fn().mockImplementation(() => Promise.resolve());

mongoose.createConnection = jest.fn().mockReturnValue({
  catch() {
    /* no op */
  },
  model: mongoose.model.bind(mongoose),
  on: jest.fn(),
  once: jest.fn(),
  then(resolve: (arg0: any) => any) {
    return Promise.resolve(resolve(this));
  },
});

const ops = [
  'find',
  'findOne',
  // 'count',
  'countDocuments',
  'estimatedDocumentCount',
  'distinct',
  'findOneAndUpdate',
  'findOneAndDelete',
  // 'findOneAndRemove',
  // 'findOneAndReplace',
  // 'remove',
  // 'update',
  'updateOne',
  'updateMany',
  'deleteOne',
  'deleteMany',
  // 'save',
  // 'aggregate',
  // '$save',
] as const;

declare type Ops = typeof ops[number];
declare type ReturnFunction = (param: mongoose.Query<any, any, any, any> | mongoose.Aggregate<any>) => {};
declare type ExpectedReturnType = string | number | boolean | symbol | object | {} | void | null | undefined;
interface Mock {
  /**
   * Specify an expected result for a specific mongoose function. This can be a primitive value or a function.
   * If used with a function, you will have access to the Query or Aggregate mongoose class.
   * @param expected Primitive value or function that returns the mocked value
   * @param op The operation to mock
   */
  toReturn(expected: ExpectedReturnType | ReturnFunction, op?: Ops): this;
  /**
   * Reset all mocks
   * @param op Optional parameter to reset, if not specified, resets everything
   */
  reset(op?: Ops): this;
  /**
   * Returns an object of mocks for this model. Only serializable if all mock results are primitives, not functions.
   */
  toJSON(): any;
}
interface Target {
  __mocks: Record<string, any>;
  /**
   * Resets all mocks.
   */
  resetAll(): void;
  /**
   * Returns an object of mocks for all models. Only serializable if all mock results are primitives, not functions.
   */
  toJSON(): any;
}
declare type Proxy = typeof mockModel & Target & {
  [index: string]: Mock;
};

// type Q = Pick<Query<any, any>, Ops>;
type MockedReturn = { op: Ops; model: { modelName: string }; _mongooseOptions: MongooseQueryOptions; }

const mockedReturn = async function (this: MockedReturn, cb: (arg0: Error | null, arg1: any) => any) {
  const {
    op,
    model: { modelName },
    _mongooseOptions = {},
  } = this;
  const Model = mongoose.model(modelName);

  let mock =
    mockingoose.__mocks[modelName] && mockingoose.__mocks[modelName][op];

  let err = null;

  if (mock instanceof Error) {
    err = mock;
  }

  if (typeof mock === 'function') {
    mock = await mock(this);
  }

  /* if (!mock && op === 'save') {
    mock = this;
  }

  if (!mock && op === '$save') {
    mock = this;
  } */

  if (
    mock &&
    !(mock instanceof Model) &&
    ![
      // 'remove',
      'deleteOne',
      'deleteMany',
      // 'update',
      'updateOne',
      'updateMany',
      // 'count',
      'countDocuments',
      'estimatedDocumentCount',
      'distinct',
    ].includes(op)
  ) {
    mock = Array.isArray(mock)
      ? mock.map((item) => new Model(item))
      : new Model(mock);

    /* if (op === 'insertMany') {
      if (!Array.isArray(mock)) mock = [mock];

      for (const doc of mock) {
        const e = doc.validateSync();
        if (e) throw e;
      }
    } */

    if (_mongooseOptions.lean || _mongooseOptions.rawResult) {
      mock = Array.isArray(mock)
        ? mock.map((item) => item.toObject())
        : mock.toObject();
    }
  }

  if (cb) {
    return cb(err, mock);
  }

  if (err) {
    throw err;
  }

  return mock;
};

ops.forEach((op) => {
  mongoose.Query.prototype[op] = jest
    .fn()
    .mockImplementation(function (this: Query<any, any> & { op: string }, criteria, doc, options, callback) {
      if (
        [
          'find',
          'findOne',
          // 'count',
          'countDocuments',
          // 'remove',
          'deleteOne',
          'deleteMany',
          // 'update',
          'updateOne',
          'updateMany',
          'findOneAndUpdate',
          // 'findOneAndRemove',
          'findOneAndDelete',
          // 'findOneAndReplace',
        ].includes(op) &&
        typeof criteria !== 'function'
      ) {
        // find and findOne can take conditions as the first paramter
        // ensure they make it into the Query conditions
        this.merge(criteria);
      }

      if (['distinct'].includes(op) && typeof doc !== 'function') {
        // distinct has the conditions as the second parameter
        this.merge(doc);
      }

      if (/update/i.test(op) && typeof doc !== 'function' && doc) {
        this.setUpdate(doc);
      }

      switch (arguments.length) {
        case 4:
        case 3:
          if (typeof options === 'function') {
            callback = options;
            options = {};
          }
          break;
        case 2:
          if (typeof doc === 'function') {
            callback = doc;
            doc = criteria;
            criteria = undefined;
          }
          options = undefined;
          break;
        case 1:
          if (typeof criteria === 'function') {
            callback = criteria;
            criteria = options = doc = undefined;
          } else {
            doc = criteria;
            criteria = options = undefined;
          }
      }

      this.op = op;

      if (!callback) {
        return this;
      }

      return this.exec.call(this).then(callback);
    });
});

mongoose.Query.prototype.exec = jest.fn().mockImplementation(function (this: MockedReturn, cb) {
  return mockedReturn.call(this, cb);
});

mongoose.Query.prototype.orFail = jest
  .fn()
  .mockImplementation(async function (this: Query<any, any>, err) {
    return this.then((doc: string | any[]) => {
      const hasAnyDocs = doc && Array.isArray(doc) && doc.length > 0;

      if (!doc || !hasAnyDocs) {
        if (!err) throw new Error();

        const isErrorFn = typeof err === 'function';
        throw isErrorFn ? err() : new Error(err);
      }

      return this;
    }).catch((err: any) => {
      throw err;
    });
  });

mongoose.Aggregate.prototype.exec = jest
  .fn()
  .mockImplementation(async function (this: Aggregate<any>, cb) {
    const { modelName } = this.model();

    let mock =
      mockingoose.__mocks[modelName] &&
      mockingoose.__mocks[modelName].aggregate;

    let err = null;

    if (mock instanceof Error) {
      err = mock;
    }

    if (typeof mock === 'function') {
      mock = await mock(this);
    }

    if (cb) {
      return cb(err, mock);
    }

    if (err) {
      throw err;
    }

    return mock;
  });

mongoose.Model.insertMany = jest
  .fn()
  .mockImplementation(function (this: Model<any> & MockedReturn, arr, options: InsertManyOptions, cb) {
    const op = 'insertMany';
    const { modelName } = this;

    if (typeof options === 'function') {
      cb = options;
      // options = null;
    } else {
      this._mongooseOptions = options;
    }

    Object.assign(this, { op, model: { modelName } });
    return mockedReturn.call(this, cb);
  });

const instance = ['remove', 'save', '$save'];

instance.forEach((methodName) => {
  mongoose.Model.prototype[methodName] = jest
    .fn()
    .mockImplementation(function (this: Model<any>['prototype'], options, cb) {
      const op = methodName;
      const { modelName } = this.constructor;

      if (typeof options === 'function') {
        cb = options;
      }

      Object.assign(this, { op, model: { modelName } });

      const hooks = this.constructor.hooks;

      return new Promise((resolve, reject) => {
        hooks.execPre(op, this, [cb], (err: any) => {
          if (err) {
            reject(err);
            return;
          }

          const ret = mockedReturn.call(this, cb);

          if (cb) {
            hooks.execPost(op, this, [ret], (err2: any) => {
              if (err2) {
                reject(err2);
                return;
              }

              resolve(ret);
            });
          } else {
            ret
              .then((ret2) => {
                hooks.execPost(op, this, [ret2], (err3: any) => {
                  if (err3) {
                    reject(err3);
                    return;
                  }

                  resolve(ret2);
                });
              })
              .catch(reject);
          }
        });
      });
    });
});

jest.doMock('mongoose', () => mongoose);

// extend a plain function, we will override it with the Proxy later
const proxyTarget: Target = Object.assign(() => void 0, {
  __mocks: {},
  resetAll() {
    this.__mocks = {};
  },
  toJSON() {
    return this.__mocks;
  },
});

const getMockController = (prop: string): Mock => {
  return {
    toReturn(o: any, op = 'find') {
      proxyTarget.__mocks.hasOwnProperty(prop)
        ? (proxyTarget.__mocks[prop][op] = o)
        : (proxyTarget.__mocks[prop] = { [op]: o });

      return this;
    },

    reset(op: Ops) {
      if (op) {
        delete proxyTarget.__mocks[prop][op];
      } else {
        delete proxyTarget.__mocks[prop];
      }

      return this;
    },

    toJSON() {
      return proxyTarget.__mocks[prop] || {};
    },
  };
};

const proxyTraps = {
  get(target: { hasOwnProperty: (arg0: any) => any; }, prop: any) {
    if (target.hasOwnProperty(prop)) {
      return Reflect.get(target, prop);
    }

    return getMockController(prop);
  },
  apply: (target: any, thisArg: any, [prop]: any) => mockModel(prop),
};

const mockingoose: Proxy = new Proxy(proxyTarget, proxyTraps);

/**
 * Returns a helper with which you can set up mocks for a particular Model
 * @param {string | mongoose.Model} model either a string model name, or a mongoose.Model instance
 */
const mockModel = (model: string | mongoose.Model<any, {}>): Mock => {
  const modelName = typeof model === 'function' ? model.modelName : model;
  if (typeof modelName === 'string') {
    return getMockController(modelName);
  } else {
    throw new Error('model must be a string or mongoose.Model');
  }
};

export default mockingoose;
