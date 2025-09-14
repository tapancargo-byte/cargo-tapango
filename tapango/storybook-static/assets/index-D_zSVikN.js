function Y(t, e) {
  for (var r = 0; r < e.length; r++) {
    const n = e[r];
    if (typeof n != 'string' && !Array.isArray(n)) {
      for (const o in n)
        if (o !== 'default' && !(o in t)) {
          const f = Object.getOwnPropertyDescriptor(n, o);
          f &&
            Object.defineProperty(
              t,
              o,
              f.get ? f : { enumerable: !0, get: () => n[o] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' })
  );
}
var F =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
      ? window
      : typeof globalThis < 'u'
        ? globalThis
        : typeof self < 'u'
          ? self
          : {};
function I(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default')
    ? t.default
    : t;
}
function tt(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == 'function') {
    var r = function n() {
      return this instanceof n
        ? Reflect.construct(e, arguments, this.constructor)
        : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return (
    Object.defineProperty(r, '__esModule', { value: !0 }),
    Object.keys(t).forEach(function (n) {
      var o = Object.getOwnPropertyDescriptor(t, n);
      Object.defineProperty(
        r,
        n,
        o.get
          ? o
          : {
              enumerable: !0,
              get: function () {
                return t[n];
              },
            }
      );
    }),
    r
  );
}
var j = { exports: {} },
  u = {},
  y = { env: {} };
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var v = Symbol.for('react.transitional.element'),
  D = Symbol.for('react.portal'),
  L = Symbol.for('react.fragment'),
  U = Symbol.for('react.strict_mode'),
  k = Symbol.for('react.profiler'),
  x = Symbol.for('react.consumer'),
  q = Symbol.for('react.context'),
  z = Symbol.for('react.forward_ref'),
  G = Symbol.for('react.suspense'),
  K = Symbol.for('react.memo'),
  A = Symbol.for('react.lazy'),
  g = Symbol.iterator;
function B(t) {
  return t === null || typeof t != 'object'
    ? null
    : ((t = (g && t[g]) || t['@@iterator']), typeof t == 'function' ? t : null);
}
var S = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  P = Object.assign,
  b = {};
function l(t, e, r) {
  (this.props = t),
    (this.context = e),
    (this.refs = b),
    (this.updater = r || S);
}
l.prototype.isReactComponent = {};
l.prototype.setState = function (t, e) {
  if (typeof t != 'object' && typeof t != 'function' && t != null)
    throw Error(
      'takes an object of state variables to update or a function which returns an object of state variables.'
    );
  this.updater.enqueueSetState(this, t, e, 'setState');
};
l.prototype.forceUpdate = function (t) {
  this.updater.enqueueForceUpdate(this, t, 'forceUpdate');
};
function H() {}
H.prototype = l.prototype;
function d(t, e, r) {
  (this.props = t),
    (this.context = e),
    (this.refs = b),
    (this.updater = r || S);
}
var m = (d.prototype = new H());
m.constructor = d;
P(m, l.prototype);
m.isPureReactComponent = !0;
var C = Array.isArray,
  i = { H: null, A: null, T: null, S: null, V: null },
  $ = Object.prototype.hasOwnProperty;
function R(t, e, r, n, o, f) {
  return (
    (r = f.ref),
    { $$typeof: v, type: t, key: e, ref: r !== void 0 ? r : null, props: f }
  );
}
function W(t, e) {
  return R(t.type, e, void 0, void 0, void 0, t.props);
}
function T(t) {
  return typeof t == 'object' && t !== null && t.$$typeof === v;
}
function Q(t) {
  var e = { '=': '=0', ':': '=2' };
  return (
    '$' +
    t.replace(/[=:]/g, function (r) {
      return e[r];
    })
  );
}
var w = /\/+/g;
function E(t, e) {
  return typeof t == 'object' && t !== null && t.key != null
    ? Q('' + t.key)
    : e.toString(36);
}
function h() {}
function X(t) {
  switch (t.status) {
    case 'fulfilled':
      return t.value;
    case 'rejected':
      throw t.reason;
    default:
      switch (
        (typeof t.status == 'string'
          ? t.then(h, h)
          : ((t.status = 'pending'),
            t.then(
              function (e) {
                t.status === 'pending' &&
                  ((t.status = 'fulfilled'), (t.value = e));
              },
              function (e) {
                t.status === 'pending' &&
                  ((t.status = 'rejected'), (t.reason = e));
              }
            )),
        t.status)
      ) {
        case 'fulfilled':
          return t.value;
        case 'rejected':
          throw t.reason;
      }
  }
  throw t;
}
function a(t, e, r, n, o) {
  var f = typeof t;
  (f === 'undefined' || f === 'boolean') && (t = null);
  var s = !1;
  if (t === null) s = !0;
  else
    switch (f) {
      case 'bigint':
      case 'string':
      case 'number':
        s = !0;
        break;
      case 'object':
        switch (t.$$typeof) {
          case v:
          case D:
            s = !0;
            break;
          case A:
            return (s = t._init), a(s(t._payload), e, r, n, o);
        }
    }
  if (s)
    return (
      (o = o(t)),
      (s = n === '' ? '.' + E(t, 0) : n),
      C(o)
        ? ((r = ''),
          s != null && (r = s.replace(w, '$&/') + '/'),
          a(o, e, r, '', function (N) {
            return N;
          }))
        : o != null &&
          (T(o) &&
            (o = W(
              o,
              r +
                (o.key == null || (t && t.key === o.key)
                  ? ''
                  : ('' + o.key).replace(w, '$&/') + '/') +
                s
            )),
          e.push(o)),
      1
    );
  s = 0;
  var p = n === '' ? '.' : n + ':';
  if (C(t))
    for (var c = 0; c < t.length; c++)
      (n = t[c]), (f = p + E(n, c)), (s += a(n, e, r, f, o));
  else if (((c = B(t)), typeof c == 'function'))
    for (t = c.call(t), c = 0; !(n = t.next()).done; )
      (n = n.value), (f = p + E(n, c++)), (s += a(n, e, r, f, o));
  else if (f === 'object') {
    if (typeof t.then == 'function') return a(X(t), e, r, n, o);
    throw (
      ((e = String(t)),
      Error(
        'Objects are not valid as a React child (found: ' +
          (e === '[object Object]'
            ? 'object with keys {' + Object.keys(t).join(', ') + '}'
            : e) +
          '). If you meant to render a collection of children, use an array instead.'
      ))
    );
  }
  return s;
}
function _(t, e, r) {
  if (t == null) return t;
  var n = [],
    o = 0;
  return (
    a(t, n, '', '', function (f) {
      return e.call(r, f, o++);
    }),
    n
  );
}
function Z(t) {
  if (t._status === -1) {
    var e = t._result;
    (e = e()),
      e.then(
        function (r) {
          (t._status === 0 || t._status === -1) &&
            ((t._status = 1), (t._result = r));
        },
        function (r) {
          (t._status === 0 || t._status === -1) &&
            ((t._status = 2), (t._result = r));
        }
      ),
      t._status === -1 && ((t._status = 0), (t._result = e));
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var O =
  typeof reportError == 'function'
    ? reportError
    : function (t) {
        if (
          typeof window == 'object' &&
          typeof window.ErrorEvent == 'function'
        ) {
          var e = new window.ErrorEvent('error', {
            bubbles: !0,
            cancelable: !0,
            message:
              typeof t == 'object' && t !== null && typeof t.message == 'string'
                ? String(t.message)
                : String(t),
            error: t,
          });
          if (!window.dispatchEvent(e)) return;
        } else if (typeof y == 'object' && typeof y.emit == 'function') {
          y.emit('uncaughtException', t);
          return;
        }
        console.error(t);
      };
function J() {}
u.Children = {
  map: _,
  forEach: function (t, e, r) {
    _(
      t,
      function () {
        e.apply(this, arguments);
      },
      r
    );
  },
  count: function (t) {
    var e = 0;
    return (
      _(t, function () {
        e++;
      }),
      e
    );
  },
  toArray: function (t) {
    return (
      _(t, function (e) {
        return e;
      }) || []
    );
  },
  only: function (t) {
    if (!T(t))
      throw Error(
        'React.Children.only expected to receive a single React element child.'
      );
    return t;
  },
};
u.Component = l;
u.Fragment = L;
u.Profiler = k;
u.PureComponent = d;
u.StrictMode = U;
u.Suspense = G;
u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i;
u.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function (t) {
    return i.H.useMemoCache(t);
  },
};
u.cache = function (t) {
  return function () {
    return t.apply(null, arguments);
  };
};
u.cloneElement = function (t, e, r) {
  if (t == null)
    throw Error(
      'The argument must be a React element, but you passed ' + t + '.'
    );
  var n = P({}, t.props),
    o = t.key,
    f = void 0;
  if (e != null)
    for (s in (e.ref !== void 0 && (f = void 0),
    e.key !== void 0 && (o = '' + e.key),
    e))
      !$.call(e, s) ||
        s === 'key' ||
        s === '__self' ||
        s === '__source' ||
        (s === 'ref' && e.ref === void 0) ||
        (n[s] = e[s]);
  var s = arguments.length - 2;
  if (s === 1) n.children = r;
  else if (1 < s) {
    for (var p = Array(s), c = 0; c < s; c++) p[c] = arguments[c + 2];
    n.children = p;
  }
  return R(t.type, o, void 0, void 0, f, n);
};
u.createContext = function (t) {
  return (
    (t = {
      $$typeof: q,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
    }),
    (t.Provider = t),
    (t.Consumer = { $$typeof: x, _context: t }),
    t
  );
};
u.createElement = function (t, e, r) {
  var n,
    o = {},
    f = null;
  if (e != null)
    for (n in (e.key !== void 0 && (f = '' + e.key), e))
      $.call(e, n) &&
        n !== 'key' &&
        n !== '__self' &&
        n !== '__source' &&
        (o[n] = e[n]);
  var s = arguments.length - 2;
  if (s === 1) o.children = r;
  else if (1 < s) {
    for (var p = Array(s), c = 0; c < s; c++) p[c] = arguments[c + 2];
    o.children = p;
  }
  if (t && t.defaultProps)
    for (n in ((s = t.defaultProps), s)) o[n] === void 0 && (o[n] = s[n]);
  return R(t, f, void 0, void 0, null, o);
};
u.createRef = function () {
  return { current: null };
};
u.forwardRef = function (t) {
  return { $$typeof: z, render: t };
};
u.isValidElement = T;
u.lazy = function (t) {
  return { $$typeof: A, _payload: { _status: -1, _result: t }, _init: Z };
};
u.memo = function (t, e) {
  return { $$typeof: K, type: t, compare: e === void 0 ? null : e };
};
u.startTransition = function (t) {
  var e = i.T,
    r = {};
  i.T = r;
  try {
    var n = t(),
      o = i.S;
    o !== null && o(r, n),
      typeof n == 'object' &&
        n !== null &&
        typeof n.then == 'function' &&
        n.then(J, O);
  } catch (f) {
    O(f);
  } finally {
    i.T = e;
  }
};
u.unstable_useCacheRefresh = function () {
  return i.H.useCacheRefresh();
};
u.use = function (t) {
  return i.H.use(t);
};
u.useActionState = function (t, e, r) {
  return i.H.useActionState(t, e, r);
};
u.useCallback = function (t, e) {
  return i.H.useCallback(t, e);
};
u.useContext = function (t) {
  return i.H.useContext(t);
};
u.useDebugValue = function () {};
u.useDeferredValue = function (t, e) {
  return i.H.useDeferredValue(t, e);
};
u.useEffect = function (t, e, r) {
  var n = i.H;
  if (typeof r == 'function')
    throw Error(
      'useEffect CRUD overload is not enabled in this build of React.'
    );
  return n.useEffect(t, e);
};
u.useId = function () {
  return i.H.useId();
};
u.useImperativeHandle = function (t, e, r) {
  return i.H.useImperativeHandle(t, e, r);
};
u.useInsertionEffect = function (t, e) {
  return i.H.useInsertionEffect(t, e);
};
u.useLayoutEffect = function (t, e) {
  return i.H.useLayoutEffect(t, e);
};
u.useMemo = function (t, e) {
  return i.H.useMemo(t, e);
};
u.useOptimistic = function (t, e) {
  return i.H.useOptimistic(t, e);
};
u.useReducer = function (t, e, r) {
  return i.H.useReducer(t, e, r);
};
u.useRef = function (t) {
  return i.H.useRef(t);
};
u.useState = function (t) {
  return i.H.useState(t);
};
u.useSyncExternalStore = function (t, e, r) {
  return i.H.useSyncExternalStore(t, e, r);
};
u.useTransition = function () {
  return i.H.useTransition();
};
u.version = '19.1.0';
j.exports = u;
var M = j.exports;
const V = I(M),
  et = Y({ __proto__: null, default: V }, [M]);
export { V as R, et as a, tt as b, F as c, I as g, M as r };
