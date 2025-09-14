import {
  U as j,
  _ as ee,
  V as q,
  r as D,
  s as re,
  e as se,
  v as P,
  D as le,
  w as ie,
  o as p,
} from './index-DaADHxGU.js';
import { r as l, g as ae, R as h } from './index-D_zSVikN.js';
import { c as ce } from './async-storage-CbWkip1I.js';
import { j as m } from './jsx-runtime-BjG_zV1W.js';
import { o as te, p as de, q as ue } from './ThemeProvider-CPKCwPQ2.js';
import { r as he } from './index-VT2245Mq.js';
var A = {
    _currentlyFocusedNode: null,
    currentlyFocusedField() {
      return (
        document.activeElement !== this._currentlyFocusedNode &&
          (this._currentlyFocusedNode = null),
        this._currentlyFocusedNode
      );
    },
    focusTextInput(r) {
      r !== null &&
        ((this._currentlyFocusedNode = r),
        document.activeElement !== r && j.focus(r));
    },
    blurTextInput(r) {
      r !== null &&
        ((this._currentlyFocusedNode = null),
        document.activeElement === r && j.blur(r));
    },
  },
  pe = () => {
    A.blurTextInput(A.currentlyFocusedField());
  },
  fe = [
    'onScroll',
    'onTouchMove',
    'onWheel',
    'scrollEnabled',
    'scrollEventThrottle',
    'showsHorizontalScrollIndicator',
    'showsVerticalScrollIndicator',
    'style',
  ];
function K(r) {
  return {
    nativeEvent: {
      contentOffset: {
        get x() {
          return r.target.scrollLeft;
        },
        get y() {
          return r.target.scrollTop;
        },
      },
      contentSize: {
        get height() {
          return r.target.scrollHeight;
        },
        get width() {
          return r.target.scrollWidth;
        },
      },
      layoutMeasurement: {
        get height() {
          return r.target.offsetHeight;
        },
        get width() {
          return r.target.offsetWidth;
        },
      },
    },
    timeStamp: Date.now(),
  };
}
function Se(r, e) {
  var t = Date.now() - r;
  return e > 0 && t >= e;
}
var me = l.forwardRef((r, e) => {
    var t = r.onScroll,
      o = r.onTouchMove,
      s = r.onWheel,
      n = r.scrollEnabled,
      i = n === void 0 ? !0 : n,
      a = r.scrollEventThrottle,
      d = a === void 0 ? 0 : a,
      T = r.showsHorizontalScrollIndicator,
      f = r.showsVerticalScrollIndicator,
      v = r.style,
      y = ee(r, fe),
      S = l.useRef({ isScrolling: !1, scrollLastTick: 0 }),
      b = l.useRef(null),
      _ = l.useRef(null);
    function w(c) {
      return (ne) => {
        i && c && c(ne);
      };
    }
    function I(c) {
      c.stopPropagation(),
        c.target === _.current &&
          (c.persist(),
          b.current != null && clearTimeout(b.current),
          (b.current = setTimeout(() => {
            W(c);
          }, 100)),
          S.current.isScrolling
            ? Se(S.current.scrollLastTick, d) && R(c)
            : x(c));
    }
    function x(c) {
      (S.current.isScrolling = !0), R(c);
    }
    function R(c) {
      (S.current.scrollLastTick = Date.now()), t && t(K(c));
    }
    function W(c) {
      (S.current.isScrolling = !1), t && t(K(c));
    }
    var C = T === !1 || f === !1;
    return l.createElement(
      q,
      D({}, y, {
        onScroll: I,
        onTouchMove: w(o),
        onWheel: w(s),
        ref: se(_, e),
        style: [v, !i && U.scrollDisabled, C && U.hideScrollbar],
      })
    );
  }),
  U = re.create({
    scrollDisabled: {
      overflowX: 'hidden',
      overflowY: 'hidden',
      touchAction: 'none',
    },
    hideScrollbar: { scrollbarWidth: 'none' },
  });
function F(r) {
  return function () {
    return r;
  };
}
var g = function () {};
g.thatReturns = F;
g.thatReturnsFalse = F(!1);
g.thatReturnsTrue = F(!0);
g.thatReturnsNull = F(null);
g.thatReturnsThis = function () {
  return this;
};
g.thatReturnsArgument = function (r) {
  return r;
};
var ge = g,
  ve = ge,
  Re = ve,
  Te = Re;
const ye = ae(Te);
var be = [
    'contentContainerStyle',
    'horizontal',
    'onContentSizeChange',
    'refreshControl',
    'stickyHeaderIndices',
    'pagingEnabled',
    'forwardedRef',
    'keyboardDismissMode',
    'onScroll',
    'centerContent',
  ],
  Z = {},
  we = 16;
class Ee extends h.Component {
  constructor() {
    super(...arguments),
      (this._scrollNodeRef = null),
      (this._innerViewRef = null),
      (this.isTouching = !1),
      (this.lastMomentumScrollBeginTime = 0),
      (this.lastMomentumScrollEndTime = 0),
      (this.observedScrollSinceBecomingResponder = !1),
      (this.becameResponderWhileAnimating = !1),
      (this.scrollResponderHandleScrollShouldSetResponder = () =>
        this.isTouching),
      (this.scrollResponderHandleStartShouldSetResponderCapture = (e) =>
        this.scrollResponderIsAnimating()),
      (this.scrollResponderHandleTerminationRequest = () =>
        !this.observedScrollSinceBecomingResponder),
      (this.scrollResponderHandleTouchEnd = (e) => {
        var t = e.nativeEvent;
        (this.isTouching = t.touches.length !== 0),
          this.props.onTouchEnd && this.props.onTouchEnd(e);
      }),
      (this.scrollResponderHandleResponderRelease = (e) => {
        this.props.onResponderRelease && this.props.onResponderRelease(e);
        var t = A.currentlyFocusedField();
        !this.props.keyboardShouldPersistTaps &&
          t != null &&
          e.target !== t &&
          !this.observedScrollSinceBecomingResponder &&
          !this.becameResponderWhileAnimating &&
          (this.props.onScrollResponderKeyboardDismissed &&
            this.props.onScrollResponderKeyboardDismissed(e),
          A.blurTextInput(t));
      }),
      (this.scrollResponderHandleScroll = (e) => {
        (this.observedScrollSinceBecomingResponder = !0),
          this.props.onScroll && this.props.onScroll(e);
      }),
      (this.scrollResponderHandleResponderGrant = (e) => {
        (this.observedScrollSinceBecomingResponder = !1),
          this.props.onResponderGrant && this.props.onResponderGrant(e),
          (this.becameResponderWhileAnimating =
            this.scrollResponderIsAnimating());
      }),
      (this.scrollResponderHandleScrollBeginDrag = (e) => {
        this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e);
      }),
      (this.scrollResponderHandleScrollEndDrag = (e) => {
        this.props.onScrollEndDrag && this.props.onScrollEndDrag(e);
      }),
      (this.scrollResponderHandleMomentumScrollBegin = (e) => {
        (this.lastMomentumScrollBeginTime = Date.now()),
          this.props.onMomentumScrollBegin &&
            this.props.onMomentumScrollBegin(e);
      }),
      (this.scrollResponderHandleMomentumScrollEnd = (e) => {
        (this.lastMomentumScrollEndTime = Date.now()),
          this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e);
      }),
      (this.scrollResponderHandleTouchStart = (e) => {
        (this.isTouching = !0),
          this.props.onTouchStart && this.props.onTouchStart(e);
      }),
      (this.scrollResponderHandleTouchMove = (e) => {
        this.props.onTouchMove && this.props.onTouchMove(e);
      }),
      (this.scrollResponderIsAnimating = () => {
        var e = Date.now(),
          t = e - this.lastMomentumScrollEndTime,
          o =
            t < we ||
            this.lastMomentumScrollEndTime < this.lastMomentumScrollBeginTime;
        return o;
      }),
      (this.scrollResponderScrollTo = (e, t, o) => {
        if (typeof e == 'number')
          console.warn(
            '`scrollResponderScrollTo(x, y, animated)` is deprecated. Use `scrollResponderScrollTo({x: 5, y: 5, animated: true})` instead.'
          );
        else {
          var s = e || Z;
          (e = s.x), (t = s.y), (o = s.animated);
        }
        var n = this.getScrollableNode(),
          i = e || 0,
          a = t || 0;
        n != null &&
          (typeof n.scroll == 'function'
            ? n.scroll({ top: a, left: i, behavior: o ? 'smooth' : 'auto' })
            : ((n.scrollLeft = i), (n.scrollTop = a)));
      }),
      (this.scrollResponderZoomTo = (e, t) => {
        P('zoomToRect is not implemented');
      }),
      (this.scrollResponderScrollNativeHandleToKeyboard = (e, t, o) => {
        (this.additionalScrollOffset = t || 0),
          (this.preventNegativeScrollOffset = !!o),
          j.measureLayout(
            e,
            this.getInnerViewNode(),
            this.scrollResponderTextInputFocusError,
            this.scrollResponderInputMeasureAndScrollToKeyboard
          );
      }),
      (this.scrollResponderInputMeasureAndScrollToKeyboard = (e, t, o, s) => {
        var n = le.get('window').height;
        this.keyboardWillOpenTo &&
          (n = this.keyboardWillOpenTo.endCoordinates.screenY);
        var i = t - n + s + this.additionalScrollOffset;
        this.preventNegativeScrollOffset && (i = Math.max(0, i)),
          this.scrollResponderScrollTo({ x: 0, y: i, animated: !0 }),
          (this.additionalOffset = 0),
          (this.preventNegativeScrollOffset = !1);
      }),
      (this.scrollResponderKeyboardWillShow = (e) => {
        (this.keyboardWillOpenTo = e),
          this.props.onKeyboardWillShow && this.props.onKeyboardWillShow(e);
      }),
      (this.scrollResponderKeyboardWillHide = (e) => {
        (this.keyboardWillOpenTo = null),
          this.props.onKeyboardWillHide && this.props.onKeyboardWillHide(e);
      }),
      (this.scrollResponderKeyboardDidShow = (e) => {
        e && (this.keyboardWillOpenTo = e),
          this.props.onKeyboardDidShow && this.props.onKeyboardDidShow(e);
      }),
      (this.scrollResponderKeyboardDidHide = (e) => {
        (this.keyboardWillOpenTo = null),
          this.props.onKeyboardDidHide && this.props.onKeyboardDidHide(e);
      }),
      (this.flashScrollIndicators = () => {
        this.scrollResponderFlashScrollIndicators();
      }),
      (this.getScrollResponder = () => this),
      (this.getScrollableNode = () => this._scrollNodeRef),
      (this.getInnerViewRef = () => this._innerViewRef),
      (this.getInnerViewNode = () => this._innerViewRef),
      (this.getNativeScrollRef = () => this._scrollNodeRef),
      (this.scrollTo = (e, t, o) => {
        if (typeof e == 'number')
          console.warn(
            '`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.'
          );
        else {
          var s = e || Z;
          (t = s.x), (e = s.y), (o = s.animated);
        }
        this.scrollResponderScrollTo({
          x: t || 0,
          y: e || 0,
          animated: o !== !1,
        });
      }),
      (this.scrollToEnd = (e) => {
        var t = (e && e.animated) !== !1,
          o = this.props.horizontal,
          s = this.getScrollableNode(),
          n = o ? s.scrollWidth : 0,
          i = o ? 0 : s.scrollHeight;
        this.scrollResponderScrollTo({ x: n, y: i, animated: t });
      }),
      (this._handleContentOnLayout = (e) => {
        var t = e.nativeEvent.layout,
          o = t.width,
          s = t.height;
        this.props.onContentSizeChange(o, s);
      }),
      (this._handleScroll = (e) => {
        this.props.keyboardDismissMode === 'on-drag' && pe(),
          this.scrollResponderHandleScroll(e);
      }),
      (this._setInnerViewRef = (e) => {
        this._innerViewRef = e;
      }),
      (this._setScrollNodeRef = (e) => {
        (this._scrollNodeRef = e),
          e != null &&
            ((e.getScrollResponder = this.getScrollResponder),
            (e.getInnerViewNode = this.getInnerViewNode),
            (e.getInnerViewRef = this.getInnerViewRef),
            (e.getNativeScrollRef = this.getNativeScrollRef),
            (e.getScrollableNode = this.getScrollableNode),
            (e.scrollTo = this.scrollTo),
            (e.scrollToEnd = this.scrollToEnd),
            (e.flashScrollIndicators = this.flashScrollIndicators),
            (e.scrollResponderZoomTo = this.scrollResponderZoomTo),
            (e.scrollResponderScrollNativeHandleToKeyboard =
              this.scrollResponderScrollNativeHandleToKeyboard));
        var t = ie(this.props.forwardedRef);
        t(e);
      });
  }
  scrollResponderHandleStartShouldSetResponder() {
    return !1;
  }
  scrollResponderHandleResponderReject() {
    ye(!1, "ScrollView doesn't take rejection well - scrolls anyway");
  }
  scrollResponderFlashScrollIndicators() {}
  scrollResponderTextInputFocusError(e) {
    console.error('Error measuring text field: ', e);
  }
  render() {
    var e = this.props,
      t = e.contentContainerStyle,
      o = e.horizontal,
      s = e.onContentSizeChange,
      n = e.refreshControl,
      i = e.stickyHeaderIndices,
      a = e.pagingEnabled;
    e.forwardedRef, e.keyboardDismissMode, e.onScroll;
    var d = e.centerContent,
      T = ee(e, be),
      f = {};
    s && (f = { onLayout: this._handleContentOnLayout });
    var v = !o && Array.isArray(i),
      y =
        v || a
          ? h.Children.map(this.props.children, (R, W) => {
              var C = v && i.indexOf(W) > -1;
              return R != null && (C || a)
                ? h.createElement(
                    q,
                    { style: [C && u.stickyHeader, a && u.pagingEnabledChild] },
                    R
                  )
                : R;
            })
          : this.props.children,
      S = h.createElement(
        q,
        D({}, f, {
          children: y,
          collapsable: !1,
          ref: this._setInnerViewRef,
          style: [
            o && u.contentContainerHorizontal,
            d && u.contentContainerCenterContent,
            t,
          ],
        })
      ),
      b = o ? u.baseHorizontal : u.baseVertical,
      _ = o ? u.pagingEnabledHorizontal : u.pagingEnabledVertical,
      w = p(
        p({}, T),
        {},
        {
          style: [b, a && _, this.props.style],
          onTouchStart: this.scrollResponderHandleTouchStart,
          onTouchMove: this.scrollResponderHandleTouchMove,
          onTouchEnd: this.scrollResponderHandleTouchEnd,
          onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
          onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
          onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
          onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
          onStartShouldSetResponder:
            this.scrollResponderHandleStartShouldSetResponder,
          onStartShouldSetResponderCapture:
            this.scrollResponderHandleStartShouldSetResponderCapture,
          onScrollShouldSetResponder:
            this.scrollResponderHandleScrollShouldSetResponder,
          onScroll: this._handleScroll,
          onResponderGrant: this.scrollResponderHandleResponderGrant,
          onResponderTerminationRequest:
            this.scrollResponderHandleTerminationRequest,
          onResponderTerminate: this.scrollResponderHandleTerminate,
          onResponderRelease: this.scrollResponderHandleResponderRelease,
          onResponderReject: this.scrollResponderHandleResponderReject,
        }
      ),
      I = me;
    P(I !== void 0, 'ScrollViewClass must not be undefined');
    var x = h.createElement(I, D({}, w, { ref: this._setScrollNodeRef }), S);
    return n ? h.cloneElement(n, { style: w.style }, x) : x;
  }
}
var G = {
    flexGrow: 1,
    flexShrink: 1,
    transform: 'translateZ(0)',
    WebkitOverflowScrolling: 'touch',
  },
  u = re.create({
    baseVertical: p(
      p({}, G),
      {},
      { flexDirection: 'column', overflowX: 'hidden', overflowY: 'auto' }
    ),
    baseHorizontal: p(
      p({}, G),
      {},
      { flexDirection: 'row', overflowX: 'auto', overflowY: 'hidden' }
    ),
    contentContainerHorizontal: { flexDirection: 'row' },
    contentContainerCenterContent: { justifyContent: 'center', flexGrow: 1 },
    stickyHeader: { position: 'sticky', top: 0, zIndex: 10 },
    pagingEnabledHorizontal: { scrollSnapType: 'x mandatory' },
    pagingEnabledVertical: { scrollSnapType: 'y mandatory' },
    pagingEnabledChild: { scrollSnapAlign: 'start' },
  }),
  _e = h.forwardRef((r, e) =>
    h.createElement(Ee, D({}, r, { forwardedRef: e }))
  );
_e.displayName = 'ScrollView';
class Ie {
  constructor(e) {
    var t = e.onMoreTasks;
    (this._onMoreTasks = t), (this._queueStack = [{ tasks: [], popable: !0 }]);
  }
  enqueue(e) {
    this._getCurrentQueue().push(e);
  }
  enqueueTasks(e) {
    e.forEach((t) => this.enqueue(t));
  }
  cancelTasks(e) {
    this._queueStack = this._queueStack
      .map((t) =>
        p(p({}, t), {}, { tasks: t.tasks.filter((o) => e.indexOf(o) === -1) })
      )
      .filter((t, o) => t.tasks.length > 0 || o === 0);
  }
  hasTasksToProcess() {
    return this._getCurrentQueue().length > 0;
  }
  processNext() {
    var e = this._getCurrentQueue();
    if (e.length) {
      var t = e.shift();
      try {
        typeof t == 'object' && t.gen
          ? this._genPromise(t)
          : typeof t == 'object' && t.run
            ? t.run()
            : (P(
                typeof t == 'function',
                `Expected Function, SimpleTask, or PromiseTask, but got:
` + JSON.stringify(t, null, 2)
              ),
              t());
      } catch (o) {
        throw (
          ((o.message =
            'TaskQueue: Error with task ' + (t.name || '') + ': ' + o.message),
          o)
        );
      }
    }
  }
  _getCurrentQueue() {
    var e = this._queueStack.length - 1,
      t = this._queueStack[e];
    return t.popable && t.tasks.length === 0 && e > 0
      ? (this._queueStack.pop(), this._getCurrentQueue())
      : t.tasks;
  }
  _genPromise(e) {
    var t = this._queueStack.push({ tasks: [], popable: !1 }),
      o = t - 1,
      s = this._queueStack[o];
    e.gen()
      .then(() => {
        (s.popable = !0), this.hasTasksToProcess() && this._onMoreTasks();
      })
      .catch((n) => {
        setTimeout(() => {
          throw (
            ((n.message =
              'TaskQueue: Error resolving Promise in task ' +
              e.name +
              ': ' +
              n.message),
            n)
          );
        }, 0);
      });
  }
}
class xe {
  constructor() {
    this._registry = {};
  }
  addListener(e, t, o) {
    var s = Ce(this._registry, e),
      n = {
        context: o,
        listener: t,
        remove() {
          s.delete(n);
        },
      };
    return s.add(n), n;
  }
  emit(e) {
    var t = this._registry[e];
    if (t != null) {
      for (
        var o = arguments.length, s = new Array(o > 1 ? o - 1 : 0), n = 1;
        n < o;
        n++
      )
        s[n - 1] = arguments[n];
      for (var i = 0, a = [...t]; i < a.length; i++) {
        var d = a[i];
        d.listener.apply(d.context, s);
      }
    }
  }
  removeAllListeners(e) {
    e == null ? (this._registry = {}) : delete this._registry[e];
  }
  listenerCount(e) {
    var t = this._registry[e];
    return t == null ? 0 : t.size;
  }
}
function Ce(r, e) {
  var t = r[e];
  return t == null && ((t = new Set()), (r[e] = t)), t;
}
var He = function (e, t) {
    return setTimeout(() => {
      var o = Date.now();
      e({
        didTimeout: !1,
        timeRemaining() {
          return Math.max(0, 50 - (Date.now() - o));
        },
      });
    }, 1);
  },
  ke = ce && typeof window.requestIdleCallback < 'u',
  Me = ke ? window.requestIdleCallback : He,
  V = new xe(),
  $ = {
    Events: {
      interactionStart: 'interactionStart',
      interactionComplete: 'interactionComplete',
    },
    runAfterInteractions(r) {
      var e = [],
        t = new Promise((o) => {
          E(),
            r && e.push(r),
            e.push({ run: o, name: 'resolve ' + ((r && r.name) || '?') }),
            z.enqueueTasks(e);
        });
      return {
        then: t.then.bind(t),
        done: t.then.bind(t),
        cancel: () => {
          z.cancelTasks(e);
        },
      };
    },
    createInteractionHandle() {
      E();
      var r = ++De;
      return N.add(r), r;
    },
    clearInteractionHandle(r) {
      P(!!r, 'Must provide a handle to clear.'), E(), N.delete(r), B.add(r);
    },
    addListener: V.addListener.bind(V),
    setDeadline(r) {
      O = r;
    },
  },
  H = new Set(),
  N = new Set(),
  B = new Set(),
  z = new Ie({ onMoreTasks: E }),
  M = 0,
  De = 0,
  O = -1;
function E() {
  M || (O > 0 ? (M = setTimeout(Q)) : (M = Me(Q)));
}
function Q() {
  M = 0;
  var r = H.size;
  N.forEach((o) => H.add(o)), B.forEach((o) => H.delete(o));
  var e = H.size;
  if (
    (r !== 0 && e === 0
      ? V.emit($.Events.interactionComplete)
      : r === 0 && e !== 0 && V.emit($.Events.interactionStart),
    e === 0)
  ) {
    for (var t = Date.now(); z.hasTasksToProcess(); )
      if ((z.processNext(), O > 0 && Date.now() - t >= O)) {
        E();
        break;
      }
  }
  N.clear(), B.clear();
}
const Y = l.createContext(null),
  ir = (r) => {
    const e = l.useContext(Y);
    return m.jsx(Y.Provider, {
      value: r.disable ? e : null,
      children: r.children,
    });
  };
function Pe(r, e, t) {
  const o = l.useRef(e ?? r);
  return (
    te(() => {
      o.current = r;
    }),
    l.useCallback(
      t
        ? (...s) => {
            var n;
            return (n = o.current) == null ? void 0 : n.apply(null, s);
          }
        : () => o.current,
      []
    )
  );
}
function ar(r) {
  return Pe(r, Ae, !0);
}
const Ae = () => {
    throw new Error('Cannot call an event handler while rendering.');
  },
  Ve = (r) => {
    l.startTransition(r);
  };
typeof globalThis.__DEV__ > 'u' && (globalThis.__DEV__ = !1);
const Ne = l.createContext(1),
  ze = l.createContext(void 0);
var Oe = {};
const k = {},
  L = {},
  Fe = (r) => {
    if (Oe.TAMAGUI_STACK_Z_INDEX_GLOBAL) {
      const { stackZIndex: e, zIndex: t } = r,
        o = l.useId(),
        s = l.useMemo(() => {
          if (e && e !== 'global' && t === void 0) {
            const n = Object.values(L).reduce((i, a) => Math.max(i, a), 0);
            return Math.max(e === !0 ? 1 : e, n + 1);
          }
          return t ?? 1e3;
        }, [e]);
      return (
        l.useEffect(() => {
          if (typeof e == 'number')
            return (
              (L[o] = e),
              () => {
                delete L[o];
              }
            );
        }, [e]),
        s
      );
    } else {
      const { stackZIndex: e, zIndex: t } = r,
        o = l.useId(),
        s = l.useContext(Ne),
        n = e === 'global' ? 0 : s,
        i = l.useContext(ze);
      k[n] || (k[n] = {});
      const a = k[n],
        d = l.useMemo(() => {
          if (typeof t == 'number') return t;
          if (e) {
            if (i) return i + 1;
            const T = Object.values(a).reduce((v, y) => Math.max(v, y), 0),
              f = n * 5e3 + T + 1;
            return typeof e == 'number' ? e + f : f;
          }
          return 1;
        }, [n, t, e]);
      return (
        l.useEffect(() => {
          if (e)
            return (
              (a[o] = d),
              () => {
                delete a[o];
              }
            );
        }, [d]),
        d
      );
    }
  },
  We = (r) => ({ stackZIndex: r.stackZIndex, zIndex: Le(r.zIndex) }),
  Le = (r) =>
    typeof r > 'u' || r === 'unset'
      ? void 0
      : typeof r == 'number'
        ? r
        : de(r, 'zIndex'),
  cr = l.memo((r) => {
    var n;
    if (ue) return null;
    const e = (n = globalThis.document) == null ? void 0 : n.body;
    if (!e) return r.children;
    const { children: t, passThrough: o } = r,
      s = Fe(We(r));
    return o
      ? t
      : he.createPortal(
          m.jsx('span', {
            style: {
              zIndex: s,
              position: 'fixed',
              inset: 0,
              contain: 'strict',
              pointerEvents: 'none',
            },
            children: t,
          }),
          e
        );
  });
var X = {};
const je =
    typeof globalThis < 'u' &&
    !!(globalThis._IS_FABRIC ?? globalThis.nativeFabricUIManager),
  dr =
    X.TAMAGUI_USE_NATIVE_PORTAL && X.TAMAGUI_USE_NATIVE_PORTAL !== 'false'
      ? !0
      : !je,
  J = new Map(),
  qe = {},
  Be = {},
  oe = (r, e) => (e in r || (r[e] = []), r),
  Ke = (r, e) => (delete r[e], r),
  Ue = (r, e, t, o) => {
    e in r || (r = oe(r, e));
    const s = r[e].findIndex((n) => n.name === t);
    return s !== -1 ? (r[e][s].node = o) : r[e].push({ name: t, node: o }), r;
  },
  Ze = (r, e, t) => {
    if (!(e in r))
      return (
        console.info(
          `Failed to remove portal '${t}', '${e}' was not registered!`
        ),
        r
      );
    const o = r[e].findIndex((s) => s.name === t);
    return o !== -1 && r[e].splice(o, 1), r;
  },
  Ge = (r, e) => {
    const { type: t } = e;
    switch (t) {
      case 0:
        return oe({ ...r }, e.hostName);
      case 1:
        return Ke({ ...r }, e.hostName);
      case 2:
        return Ue({ ...r }, e.hostName, e.portalName, e.node);
      case 3:
        return Ze({ ...r }, e.hostName, e.portalName);
      default:
        return r;
    }
  },
  $e = l.createContext(null),
  Qe = l.createContext(null),
  Ye = ({
    rootHostName: r = 'root',
    shouldAddRootHost: e = !0,
    children: t,
  }) => {
    const [o, s] = l.useReducer(Ge, Be),
      n = l.useMemo(
        () => (i) => {
          Ve(() => {
            s(i);
          });
        },
        [s]
      );
    return m.jsx(Qe.Provider, {
      value: n,
      children: m.jsxs($e.Provider, {
        value: o,
        children: [t, e && m.jsx(Je, { name: r })],
      }),
    });
  },
  Xe = l.memo(Ye);
Xe.displayName = 'PortalProvider';
const Je = l.memo(function (r) {
  return m.jsx(er, { ...r });
});
function er(r) {
  return (
    te(
      () => () => {
        J.delete(r.name);
      },
      [r.name]
    ),
    m.jsx('div', {
      style: { display: 'contents' },
      ref: (e) => {
        var t;
        e &&
          (J.set(r.name, e),
          (t = qe[r.name]) == null || t.forEach((o) => o(e)));
      },
    })
  );
}
export {
  xe as E,
  _e as F,
  $ as I,
  Xe as P,
  ir as R,
  A as T,
  dr as U,
  Ne as Z,
  Y as a,
  ze as b,
  J as c,
  Je as d,
  cr as e,
  Pe as f,
  qe as p,
  Le as r,
  Ve as s,
  ar as u,
};
