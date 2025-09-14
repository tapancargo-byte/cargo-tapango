import {
  P as ur,
  U as Xi,
  o as ir,
  W as Zi,
  b as ea,
  j as ar,
  g as ta,
} from './ThemeProvider-CPKCwPQ2.js';
import {
  I as sr,
  F as nr,
  E as ra,
  a as ia,
  R as mi,
  u as aa,
} from './GorhomPortal-CbY2Y53n.js';
import { R as ae, r as g, g as sa } from './index-D_zSVikN.js';
import {
  _ as Fe,
  V as U,
  v,
  o as y,
  s as de,
  r as K,
  x as gi,
  u as Tr,
  D as Ir,
  T as na,
  f as oa,
  y as la,
} from './index-DaADHxGU.js';
import { T as ha } from './index-CMWoXOLJ.js';
var ua = function r(e, t, i) {
  if ((i === void 0 && (i = -1), i === 0)) return !0;
  if (e === t || (typeof e == 'function' && typeof t == 'function')) return !1;
  if (typeof e != 'object' || e === null) return e !== t;
  if (typeof t != 'object' || t === null || e.constructor !== t.constructor)
    return !0;
  if (Array.isArray(e)) {
    var a = e.length;
    if (t.length !== a) return !0;
    for (var n = 0; n < a; n++) if (r(e[n], t[n], i - 1)) return !0;
  } else {
    for (var o in e) if (r(e[o], t[o], i - 1)) return !0;
    for (var s in t) if (e[s] === void 0 && t[s] !== void 0) return !0;
  }
  return !1;
};
function Nr(r, e) {
  (e == null || e > r.length) && (e = r.length);
  for (var t = 0, i = Array(e); t < e; t++) i[t] = r[t];
  return i;
}
function da(r, e) {
  if (r) {
    if (typeof r == 'string') return Nr(r, e);
    var t = {}.toString.call(r).slice(8, -1);
    return (
      t === 'Object' && r.constructor && (t = r.constructor.name),
      t === 'Map' || t === 'Set'
        ? Array.from(r)
        : t === 'Arguments' ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? Nr(r, e)
          : void 0
    );
  }
}
function se(r, e) {
  var t = (typeof Symbol < 'u' && r[Symbol.iterator]) || r['@@iterator'];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = da(r)) || e) {
    t && (r = t);
    var i = 0;
    return function () {
      return i >= r.length ? { done: !0 } : { done: !1, value: r[i++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var ca = [
  'colors',
  'enabled',
  'onRefresh',
  'progressBackgroundColor',
  'progressViewOffset',
  'refreshing',
  'size',
  'tintColor',
  'title',
  'titleColor',
];
function _a(r) {
  r.colors,
    r.enabled,
    r.onRefresh,
    r.progressBackgroundColor,
    r.progressViewOffset,
    r.refreshing,
    r.size,
    r.tintColor,
    r.title,
    r.titleColor;
  var e = Fe(r, ca);
  return ae.createElement(U, e);
}
class fa {
  constructor(e, t) {
    (this._delay = t), (this._callback = e);
  }
  dispose(e) {
    e === void 0 && (e = { abort: !1 }),
      this._taskHandle &&
        (this._taskHandle.cancel(),
        e.abort || this._callback(),
        (this._taskHandle = null));
  }
  schedule() {
    if (!this._taskHandle) {
      var e = setTimeout(() => {
        this._taskHandle = sr.runAfterInteractions(() => {
          (this._taskHandle = null), this._callback();
        });
      }, this._delay);
      this._taskHandle = { cancel: () => clearTimeout(e) };
    }
  }
}
function Lr(r, e, t) {
  return e < r ? r : e > t ? t : e;
}
function ma() {
  return console.log(...arguments);
}
class ga {
  constructor(e) {
    v(e >= 0, 'CellRenderMask must contain a non-negative number os cells'),
      (this._numCells = e),
      e === 0
        ? (this._regions = [])
        : (this._regions = [{ first: 0, last: e - 1, isSpacer: !0 }]);
  }
  enumerateRegions() {
    return this._regions;
  }
  addCells(e) {
    if (
      (v(
        e.first >= 0 &&
          e.first < this._numCells &&
          e.last >= -1 &&
          e.last < this._numCells &&
          e.last >= e.first - 1,
        'CellRenderMask.addCells called with invalid cell range'
      ),
      !(e.last < e.first))
    ) {
      var t = this._findRegion(e.first),
        i = t[0],
        a = t[1],
        n = this._findRegion(e.last),
        o = n[0],
        s = n[1];
      if (!(a === s && !i.isSpacer)) {
        var l = [],
          h = [],
          u = y(y({}, e), {}, { isSpacer: !1 });
        i.first < u.first &&
          (i.isSpacer
            ? l.push({ first: i.first, last: u.first - 1, isSpacer: !0 })
            : (u.first = i.first)),
          o.last > u.last &&
            (o.isSpacer
              ? h.push({ first: u.last + 1, last: o.last, isSpacer: !0 })
              : (u.last = o.last));
        var d = [...l, u, ...h],
          c = s - a + 1;
        this._regions.splice(a, c, ...d);
      }
    }
  }
  numCells() {
    return this._numCells;
  }
  equals(e) {
    return (
      this._numCells === e._numCells &&
      this._regions.length === e._regions.length &&
      this._regions.every(
        (t, i) =>
          t.first === e._regions[i].first &&
          t.last === e._regions[i].last &&
          t.isSpacer === e._regions[i].isSpacer
      )
    );
  }
  _findRegion(e) {
    for (var t = 0, i = this._regions.length - 1; t <= i; ) {
      var a = Math.floor((t + i) / 2),
        n = this._regions[a];
      if (e >= n.first && e <= n.last) return [n, a];
      e < n.first ? (i = a - 1) : e > n.last && (t = a + 1);
    }
    v(!1, 'A region was not found containing cellIdx ' + e);
  }
}
class va {
  constructor() {
    (this._cellKeyToChildren = new Map()),
      (this._childrenToCellKey = new Map());
  }
  add(e, t) {
    var i;
    v(
      !this._childrenToCellKey.has(e),
      'Trying to add already present child list'
    );
    var a =
      (i = this._cellKeyToChildren.get(t)) !== null && i !== void 0
        ? i
        : new Set();
    a.add(e),
      this._cellKeyToChildren.set(t, a),
      this._childrenToCellKey.set(e, t);
  }
  remove(e) {
    var t = this._childrenToCellKey.get(e);
    v(t != null, 'Trying to remove non-present child list'),
      this._childrenToCellKey.delete(e);
    var i = this._cellKeyToChildren.get(t);
    v(i, '_cellKeyToChildren should contain cellKey'),
      i.delete(e),
      i.size === 0 && this._cellKeyToChildren.delete(t);
  }
  forEach(e) {
    for (var t = se(this._cellKeyToChildren.values()), i; !(i = t()).done; )
      for (var a = i.value, n = se(a), o; !(o = n()).done; ) {
        var s = o.value;
        e(s);
      }
  }
  forEachInCell(e, t) {
    for (
      var i,
        a =
          (i = this._cellKeyToChildren.get(e)) !== null && i !== void 0
            ? i
            : [],
        n = se(a),
        o;
      !(o = n()).done;

    ) {
      var s = o.value;
      t(s);
    }
  }
  anyInCell(e, t) {
    for (
      var i,
        a =
          (i = this._cellKeyToChildren.get(e)) !== null && i !== void 0
            ? i
            : [],
        n = se(a),
        o;
      !(o = n()).done;

    ) {
      var s = o.value;
      if (t(s)) return !0;
    }
    return !1;
  }
  size() {
    return this._childrenToCellKey.size;
  }
}
class Ar {
  constructor() {
    (this.any_blank_count = 0),
      (this.any_blank_ms = 0),
      (this.any_blank_speed_sum = 0),
      (this.mostly_blank_count = 0),
      (this.mostly_blank_ms = 0),
      (this.pixels_blank = 0),
      (this.pixels_sampled = 0),
      (this.pixels_scrolled = 0),
      (this.total_time_spent = 0),
      (this.sample_count = 0);
  }
}
var Qe = [],
  xr = 10,
  Ot = null;
class pa {
  static addListener(e) {
    return (
      Ot === null &&
        console.warn(
          'Call `FillRateHelper.setSampleRate` before `addListener`.'
        ),
      Qe.push(e),
      {
        remove: () => {
          Qe = Qe.filter((t) => e !== t);
        },
      }
    );
  }
  static setSampleRate(e) {
    Ot = e;
  }
  static setMinSampleCount(e) {
    xr = e;
  }
  constructor(e) {
    (this._anyBlankStartTime = null),
      (this._enabled = !1),
      (this._info = new Ar()),
      (this._mostlyBlankStartTime = null),
      (this._samplesStartTime = null),
      (this._getFrameMetrics = e),
      (this._enabled = (Ot || 0) > Math.random()),
      this._resetData();
  }
  activate() {
    this._enabled &&
      this._samplesStartTime == null &&
      (this._samplesStartTime = globalThis.performance.now());
  }
  deactivateAndFlush() {
    if (this._enabled) {
      var e = this._samplesStartTime;
      if (e != null) {
        if (this._info.sample_count < xr) {
          this._resetData();
          return;
        }
        var t = globalThis.performance.now() - e,
          i = y(y({}, this._info), {}, { total_time_spent: t });
        Qe.forEach((a) => a(i)), this._resetData();
      }
    }
  }
  computeBlankness(e, t, i) {
    if (
      !this._enabled ||
      e.getItemCount(e.data) === 0 ||
      t.last < t.first ||
      this._samplesStartTime == null
    )
      return 0;
    var a = i.dOffset,
      n = i.offset,
      o = i.velocity,
      s = i.visibleLength;
    this._info.sample_count++,
      (this._info.pixels_sampled += Math.round(s)),
      (this._info.pixels_scrolled += Math.round(Math.abs(a)));
    var l = Math.round(Math.abs(o) * 1e3),
      h = globalThis.performance.now();
    this._anyBlankStartTime != null &&
      (this._info.any_blank_ms += h - this._anyBlankStartTime),
      (this._anyBlankStartTime = null),
      this._mostlyBlankStartTime != null &&
        (this._info.mostly_blank_ms += h - this._mostlyBlankStartTime),
      (this._mostlyBlankStartTime = null);
    for (
      var u = 0, d = t.first, c = this._getFrameMetrics(d, e);
      d <= t.last && (!c || !c.inLayout);

    )
      (c = this._getFrameMetrics(d, e)), d++;
    c && d > 0 && (u = Math.min(s, Math.max(0, c.offset - n)));
    for (
      var f = 0, _ = t.last, m = this._getFrameMetrics(_, e);
      _ >= t.first && (!m || !m.inLayout);

    )
      (m = this._getFrameMetrics(_, e)), _--;
    if (m && _ < e.getItemCount(e.data) - 1) {
      var p = m.offset + m.length;
      f = Math.min(s, Math.max(0, n + s - p));
    }
    var C = Math.round(u + f),
      k = C / s;
    return (
      k > 0
        ? ((this._anyBlankStartTime = h),
          (this._info.any_blank_speed_sum += l),
          this._info.any_blank_count++,
          (this._info.pixels_blank += C),
          k > 0.5 &&
            ((this._mostlyBlankStartTime = h), this._info.mostly_blank_count++))
        : (l < 0.01 || Math.abs(a) < 1) && this.deactivateAndFlush(),
      k
    );
  }
  enabled() {
    return this._enabled;
  }
  _resetData() {
    (this._anyBlankStartTime = null),
      (this._info = new Ar()),
      (this._mostlyBlankStartTime = null),
      (this._samplesStartTime = null);
  }
}
class ba extends g.PureComponent {
  constructor(e) {
    super(e), (this._inAsyncStateUpdate = !1), this._installSetStateHooks();
  }
  setState(e, t) {
    typeof e == 'function'
      ? super.setState((i, a) => {
          this._inAsyncStateUpdate = !0;
          var n;
          try {
            n = e(i, a);
          } catch (o) {
            throw o;
          } finally {
            this._inAsyncStateUpdate = !1;
          }
          return n;
        }, t)
      : super.setState(e, t);
  }
  _installSetStateHooks() {
    var e = this,
      t = this.props,
      i = this.state;
    Object.defineProperty(this, 'props', {
      get() {
        return (
          v(
            !e._inAsyncStateUpdate,
            '"this.props" should not be accessed during state updates'
          ),
          t
        );
      },
      set(a) {
        t = a;
      },
    }),
      Object.defineProperty(this, 'state', {
        get() {
          return (
            v(
              !e._inAsyncStateUpdate,
              '"this.state" should not be acceessed during state updates'
            ),
            i
          );
        },
        set(a) {
          i = a;
        },
      });
  }
}
class Er {
  constructor(e) {
    e === void 0 && (e = { viewAreaCoveragePercentThreshold: 0 }),
      (this._hasInteracted = !1),
      (this._timers = new Set()),
      (this._viewableIndices = []),
      (this._viewableItems = new Map()),
      (this._config = e);
  }
  dispose() {
    this._timers.forEach(clearTimeout);
  }
  computeViewableItems(e, t, i, a, n) {
    var o = e.getItemCount(e.data),
      s = this._config,
      l = s.itemVisiblePercentThreshold,
      h = s.viewAreaCoveragePercentThreshold,
      u = h != null,
      d = u ? h : l;
    v(
      d != null && (l != null) != (h != null),
      'Must set exactly one of itemVisiblePercentThreshold or viewAreaCoveragePercentThreshold'
    );
    var c = [];
    if (o === 0) return c;
    var f = -1,
      _ = n || { first: 0, last: o - 1 },
      m = _.first,
      p = _.last;
    if (p >= o)
      return (
        console.warn(
          'Invalid render range computing viewability ' +
            JSON.stringify({ renderRange: n, itemCount: o })
        ),
        []
      );
    for (var C = m; C <= p; C++) {
      var k = a(C, e);
      if (k) {
        var L = k.offset - t,
          N = L + k.length;
        if (L < i && N > 0) (f = C), ya(u, d, L, N, i, k.length) && c.push(C);
        else if (f >= 0) break;
      }
    }
    return c;
  }
  onUpdate(e, t, i, a, n, o, s) {
    var l = e.getItemCount(e.data);
    if (
      !(
        (this._config.waitForInteraction && !this._hasInteracted) ||
        l === 0 ||
        !a(0, e)
      )
    ) {
      var h = [];
      if (
        (l && (h = this.computeViewableItems(e, t, i, a, s)),
        !(
          this._viewableIndices.length === h.length &&
          this._viewableIndices.every((d, c) => d === h[c])
        ))
      )
        if (((this._viewableIndices = h), this._config.minimumViewTime)) {
          var u = setTimeout(() => {
            this._timers.delete(u), this._onUpdateSync(e, h, o, n);
          }, this._config.minimumViewTime);
          this._timers.add(u);
        } else this._onUpdateSync(e, h, o, n);
    }
  }
  resetViewableIndices() {
    this._viewableIndices = [];
  }
  recordInteraction() {
    this._hasInteracted = !0;
  }
  _onUpdateSync(e, t, i, a) {
    t = t.filter((k) => this._viewableIndices.includes(k));
    for (
      var n = this._viewableItems,
        o = new Map(
          t.map((k) => {
            var L = a(k, !0, e);
            return [L.key, L];
          })
        ),
        s = [],
        l = se(o),
        h;
      !(h = l()).done;

    ) {
      var u = h.value,
        d = u[0],
        c = u[1];
      n.has(d) || s.push(c);
    }
    for (var f = se(n), _; !(_ = f()).done; ) {
      var m = _.value,
        p = m[0],
        C = m[1];
      o.has(p) || s.push(y(y({}, C), {}, { isViewable: !1 }));
    }
    s.length > 0 &&
      ((this._viewableItems = o),
      i({
        viewableItems: Array.from(o.values()),
        changed: s,
        viewabilityConfig: this._config,
      }));
  }
}
function ya(r, e, t, i, a, n) {
  if (ka(t, i, a)) return !0;
  var o = Ca(t, i, a),
    s = 100 * (r ? o / a : o / n);
  return s >= e;
}
function Ca(r, e, t) {
  var i = Math.min(e, t) - Math.max(r, 0);
  return Math.max(0, i);
}
function ka(r, e, t) {
  return r >= 0 && e <= t && e > r;
}
var Lt = g.createContext(null);
function wa(r) {
  var e = r.children,
    t = r.value,
    i = g.useMemo(
      () => ({
        cellKey: null,
        getScrollMetrics: t.getScrollMetrics,
        horizontal: t.horizontal,
        getOutermostParentListRef: t.getOutermostParentListRef,
        registerAsNestedChild: t.registerAsNestedChild,
        unregisterAsNestedChild: t.unregisterAsNestedChild,
      }),
      [
        t.getScrollMetrics,
        t.horizontal,
        t.getOutermostParentListRef,
        t.registerAsNestedChild,
        t.unregisterAsNestedChild,
      ]
    );
  return g.createElement(Lt.Provider, { value: i }, e);
}
function Nt(r) {
  var e = r.cellKey,
    t = r.children,
    i = g.useContext(Lt),
    a = g.useMemo(
      () => (i == null ? null : y(y({}, i), {}, { cellKey: e })),
      [i, e]
    );
  return g.createElement(Lt.Provider, { value: a }, t);
}
class Sa extends g.Component {
  constructor() {
    super(...arguments),
      (this.state = {
        separatorProps: { highlighted: !1, leadingItem: this.props.item },
      }),
      (this._separators = {
        highlight: () => {
          var e = this.props,
            t = e.cellKey,
            i = e.prevCellKey;
          this.props.onUpdateSeparators([t, i], { highlighted: !0 });
        },
        unhighlight: () => {
          var e = this.props,
            t = e.cellKey,
            i = e.prevCellKey;
          this.props.onUpdateSeparators([t, i], { highlighted: !1 });
        },
        updateProps: (e, t) => {
          var i = this.props,
            a = i.cellKey,
            n = i.prevCellKey;
          this.props.onUpdateSeparators([e === 'leading' ? n : a], t);
        },
      }),
      (this._onLayout = (e) => {
        this.props.onCellLayout &&
          this.props.onCellLayout(e, this.props.cellKey, this.props.index);
      });
  }
  static getDerivedStateFromProps(e, t) {
    return {
      separatorProps: y(y({}, t.separatorProps), {}, { leadingItem: e.item }),
    };
  }
  updateSeparatorProps(e) {
    this.setState((t) => ({ separatorProps: y(y({}, t.separatorProps), e) }));
  }
  componentWillUnmount() {
    this.props.onUnmount(this.props.cellKey);
  }
  _renderElement(e, t, i, a) {
    if (
      (e &&
        t &&
        console.warn(
          'VirtualizedList: Both ListItemComponent and renderItem props are present. ListItemComponent will take precedence over renderItem.'
        ),
      t)
    )
      return g.createElement(t, {
        item: i,
        index: a,
        separators: this._separators,
      });
    if (e) return e({ item: i, index: a, separators: this._separators });
    v(
      !1,
      'VirtualizedList: Either ListItemComponent or renderItem props are required but none were found.'
    );
  }
  render() {
    var e = this.props,
      t = e.CellRendererComponent,
      i = e.ItemSeparatorComponent,
      a = e.ListItemComponent,
      n = e.cellKey,
      o = e.horizontal,
      s = e.item,
      l = e.index,
      h = e.inversionStyle,
      u = e.onCellFocusCapture,
      d = e.onCellLayout,
      c = e.renderItem,
      f = this._renderElement(c, a, s, l),
      _ = g.isValidElement(i)
        ? i
        : i && g.createElement(i, this.state.separatorProps),
      m = h
        ? o
          ? [zt.rowReverse, h]
          : [zt.columnReverse, h]
        : o
          ? [zt.row, h]
          : h,
      p = t
        ? g.createElement(
            t,
            K(
              { cellKey: n, index: l, item: s, style: m, onFocusCapture: u },
              d && { onLayout: this._onLayout }
            ),
            f,
            _
          )
        : g.createElement(
            U,
            K(
              { style: m, onFocusCapture: u },
              d && { onLayout: this._onLayout }
            ),
            f,
            _
          );
    return g.createElement(Nt, { cellKey: this.props.cellKey }, p);
  }
}
var zt = de.create({
  row: { flexDirection: 'row' },
  rowReverse: { flexDirection: 'row-reverse' },
  columnReverse: { flexDirection: 'column-reverse' },
});
function Ta(r, e, t, i) {
  i === void 0 && (i = 1);
  for (var a = e.getItemCount(e.data), n = [], o = 0; o < r.length; o++)
    for (var s = r[o], l = 0, h = a - 1; l <= h; ) {
      var u = l + ((h - l) >>> 1),
        d = t(u, e),
        c = d.offset * i,
        f = (d.offset + d.length) * i;
      if ((u === 0 && s < c) || (u !== 0 && s <= c)) h = u - 1;
      else if (s > f) l = u + 1;
      else {
        n[o] = u;
        break;
      }
    }
  return n;
}
function Ia(r, e) {
  return (
    e.last -
    e.first +
    1 -
    Math.max(0, 1 + Math.min(e.last, r.last) - Math.max(e.first, r.first))
  );
}
function Na(r, e, t, i, a, n) {
  var o = r.getItemCount(r.data);
  if (o === 0) return { first: 0, last: -1 };
  var s = n.offset,
    l = n.velocity,
    h = n.visibleLength,
    u = n.zoomScale,
    d = u === void 0 ? 1 : u,
    c = Math.max(0, s),
    f = c + h,
    _ = (t - 1) * h,
    m = 0.5,
    p = l > 1 ? 'after' : l < -1 ? 'before' : 'none',
    C = Math.max(0, c - (1 - m) * _),
    k = Math.max(0, f + m * _),
    L = a(o - 1, r).offset * d;
  if (L < C) return { first: Math.max(0, o - 1 - e), last: o - 1 };
  var N = Ta([C, c, f, k], r, a, d),
    E = N[0],
    w = N[1],
    S = N[2],
    T = N[3];
  (E = E ?? 0),
    (w = w ?? Math.max(0, E)),
    (T = T ?? o - 1),
    (S = S ?? Math.min(T, w + e - 1));
  for (var R = { first: w, last: S }, A = Ia(i, R); !(w <= E && S >= T); ) {
    var O = A >= e,
      H = w <= i.first || w > i.last,
      M = w > E && (!O || !H),
      V = S >= i.last || S < i.first,
      W = S < T && (!O || !V);
    if (O && !M && !W) break;
    M && !(p === 'after' && W && V) && (H && A++, w--),
      W && !(p === 'before' && M && H) && (V && A++, S++);
  }
  if (
    !(
      S >= w &&
      w >= 0 &&
      S < o &&
      w >= E &&
      S <= T &&
      w <= R.first &&
      S >= R.last
    )
  )
    throw new Error(
      'Bad window calculation ' +
        JSON.stringify({
          first: w,
          last: S,
          itemCount: o,
          overscanFirst: E,
          overscanLast: T,
          visible: R,
        })
    );
  return { first: w, last: S };
}
function qe(r, e) {
  return typeof r == 'object' && (r == null ? void 0 : r.key) != null
    ? r.key
    : typeof r == 'object' && (r == null ? void 0 : r.id) != null
      ? r.id
      : String(e);
}
var Pt = { exports: {} };
function vi(r, e) {
  if (r != null) return r;
  var t = new Error(e !== void 0 ? e : 'Got unexpected ' + r);
  throw ((t.framesToPop = 1), t);
}
Pt.exports = vi;
Pt.exports.default = vi;
Object.defineProperty(Pt.exports, '__esModule', { value: !0 });
var La = Pt.exports;
const Aa = sa(La);
var Rr = 0.001,
  Ht = !1,
  Dt = '';
function Ne(r) {
  return r ?? !1;
}
function xa(r) {
  return r ?? 10;
}
function $t(r) {
  return r ?? 10;
}
function Ea(r) {
  return r ?? 2;
}
function Vr(r) {
  return r ?? 2;
}
function Pr(r, e) {
  return (r * e) / 2;
}
function Ra(r) {
  return r ?? 50;
}
function Fr(r) {
  return r ?? 21;
}
function Va(r, e) {
  for (var t = r.length - 1; t >= 0; t--) if (e(r[t])) return r[t];
  return null;
}
class G extends ba {
  scrollToEnd(e) {
    var t = e ? e.animated : !0,
      i = this.props.getItemCount(this.props.data) - 1;
    if (!(i < 0)) {
      var a = this.__getFrameMetricsApprox(i, this.props),
        n = Math.max(
          0,
          a.offset +
            a.length +
            this._footerLength -
            this._scrollMetrics.visibleLength
        );
      if (this._scrollRef != null) {
        if (this._scrollRef.scrollTo == null) {
          console.warn(
            'No scrollTo method provided. This may be because you have two nested VirtualizedLists with the same orientation, or because you are using a custom component that does not implement scrollTo.'
          );
          return;
        }
        this._scrollRef.scrollTo(
          Ne(this.props.horizontal)
            ? { x: n, animated: t }
            : { y: n, animated: t }
        );
      }
    }
  }
  scrollToIndex(e) {
    var t = this.props,
      i = t.data,
      a = t.horizontal,
      n = t.getItemCount,
      o = t.getItemLayout,
      s = t.onScrollToIndexFailed,
      l = e.animated,
      h = e.index,
      u = e.viewOffset,
      d = e.viewPosition;
    if (
      (v(
        h >= 0,
        'scrollToIndex out of range: requested index ' + h + ' but minimum is 0'
      ),
      v(
        n(i) >= 1,
        'scrollToIndex out of range: item length ' + n(i) + ' but minimum is 1'
      ),
      v(
        h < n(i),
        'scrollToIndex out of range: requested index ' +
          h +
          ' is out of 0 to ' +
          (n(i) - 1)
      ),
      !o && h > this._highestMeasuredFrameIndex)
    ) {
      v(
        !!s,
        'scrollToIndex should be used in conjunction with getItemLayout or onScrollToIndexFailed, otherwise there is no way to know the location of offscreen indices or handle failures.'
      ),
        s({
          averageItemLength: this._averageCellLength,
          highestMeasuredFrameIndex: this._highestMeasuredFrameIndex,
          index: h,
        });
      return;
    }
    var c = this.__getFrameMetricsApprox(Math.floor(h), this.props),
      f =
        Math.max(
          0,
          this._getOffsetApprox(h, this.props) -
            (d || 0) * (this._scrollMetrics.visibleLength - c.length)
        ) - (u || 0);
    if (this._scrollRef != null) {
      if (this._scrollRef.scrollTo == null) {
        console.warn(
          'No scrollTo method provided. This may be because you have two nested VirtualizedLists with the same orientation, or because you are using a custom component that does not implement scrollTo.'
        );
        return;
      }
      this._scrollRef.scrollTo(
        a ? { x: f, animated: l } : { y: f, animated: l }
      );
    }
  }
  scrollToItem(e) {
    for (
      var t = e.item,
        i = this.props,
        a = i.data,
        n = i.getItem,
        o = i.getItemCount,
        s = o(a),
        l = 0;
      l < s;
      l++
    )
      if (n(a, l) === t) {
        this.scrollToIndex(y(y({}, e), {}, { index: l }));
        break;
      }
  }
  scrollToOffset(e) {
    var t = e.animated,
      i = e.offset;
    if (this._scrollRef != null) {
      if (this._scrollRef.scrollTo == null) {
        console.warn(
          'No scrollTo method provided. This may be because you have two nested VirtualizedLists with the same orientation, or because you are using a custom component that does not implement scrollTo.'
        );
        return;
      }
      this._scrollRef.scrollTo(
        Ne(this.props.horizontal)
          ? { x: i, animated: t }
          : { y: i, animated: t }
      );
    }
  }
  recordInteraction() {
    this._nestedChildLists.forEach((e) => {
      e.recordInteraction();
    }),
      this._viewabilityTuples.forEach((e) => {
        e.viewabilityHelper.recordInteraction();
      }),
      this._updateViewableItems(this.props, this.state.cellsAroundViewport);
  }
  flashScrollIndicators() {
    this._scrollRef != null && this._scrollRef.flashScrollIndicators();
  }
  getScrollResponder() {
    if (this._scrollRef && this._scrollRef.getScrollResponder)
      return this._scrollRef.getScrollResponder();
  }
  getScrollableNode() {
    return this._scrollRef && this._scrollRef.getScrollableNode
      ? this._scrollRef.getScrollableNode()
      : this._scrollRef;
  }
  getScrollRef() {
    return this._scrollRef && this._scrollRef.getScrollRef
      ? this._scrollRef.getScrollRef()
      : this._scrollRef;
  }
  _getCellKey() {
    var e;
    return ((e = this.context) == null ? void 0 : e.cellKey) || 'rootList';
  }
  hasMore() {
    return this._hasMore;
  }
  constructor(e) {
    var t;
    if (
      (super(e),
      (this._getScrollMetrics = () => this._scrollMetrics),
      (this._getOutermostParentListRef = () =>
        this._isNestedWithSameOrientation()
          ? this.context.getOutermostParentListRef()
          : this),
      (this._registerAsNestedChild = (s) => {
        this._nestedChildLists.add(s.ref, s.cellKey),
          this._hasInteracted && s.ref.recordInteraction();
      }),
      (this._unregisterAsNestedChild = (s) => {
        this._nestedChildLists.remove(s.ref);
      }),
      (this._onUpdateSeparators = (s, l) => {
        s.forEach((h) => {
          var u = h != null && this._cellRefs[h];
          u && u.updateSeparatorProps(l);
        });
      }),
      (this._getSpacerKey = (s) => (s ? 'height' : 'width')),
      (this._averageCellLength = 0),
      (this._cellRefs = {}),
      (this._frames = {}),
      (this._footerLength = 0),
      (this._hasTriggeredInitialScrollToIndex = !1),
      (this._hasInteracted = !1),
      (this._hasMore = !1),
      (this._hasWarned = {}),
      (this._headerLength = 0),
      (this._hiPriInProgress = !1),
      (this._highestMeasuredFrameIndex = 0),
      (this._indicesToKeys = new Map()),
      (this._lastFocusedCellKey = null),
      (this._nestedChildLists = new va()),
      (this._offsetFromParentVirtualizedList = 0),
      (this._prevParentOffset = 0),
      (this._scrollMetrics = {
        contentLength: 0,
        dOffset: 0,
        dt: 10,
        offset: 0,
        timestamp: 0,
        velocity: 0,
        visibleLength: 0,
        zoomScale: 1,
      }),
      (this._scrollRef = null),
      (this._sentStartForContentLength = 0),
      (this._sentEndForContentLength = 0),
      (this._totalCellLength = 0),
      (this._totalCellsMeasured = 0),
      (this._viewabilityTuples = []),
      (this._captureScrollRef = (s) => {
        this._scrollRef = s;
      }),
      (this._defaultRenderScrollComponent = (s) => {
        var l = s.onRefresh;
        if (this._isNestedWithSameOrientation()) return g.createElement(U, s);
        if (l) {
          var h;
          return (
            v(
              typeof s.refreshing == 'boolean',
              '`refreshing` prop must be set as a boolean in order to use `onRefresh`, but got `' +
                JSON.stringify(
                  (h = s.refreshing) !== null && h !== void 0 ? h : 'undefined'
                ) +
                '`'
            ),
            g.createElement(
              nr,
              K({}, s, {
                refreshControl:
                  s.refreshControl == null
                    ? g.createElement(_a, {
                        refreshing: s.refreshing,
                        onRefresh: l,
                        progressViewOffset: s.progressViewOffset,
                      })
                    : s.refreshControl,
              })
            )
          );
        } else return g.createElement(nr, s);
      }),
      (this._onCellLayout = (s, l, h) => {
        var u = s.nativeEvent.layout,
          d = {
            offset: this._selectOffset(u),
            length: this._selectLength(u),
            index: h,
            inLayout: !0,
          },
          c = this._frames[l];
        !c || d.offset !== c.offset || d.length !== c.length || h !== c.index
          ? ((this._totalCellLength += d.length - (c ? c.length : 0)),
            (this._totalCellsMeasured += c ? 0 : 1),
            (this._averageCellLength =
              this._totalCellLength / this._totalCellsMeasured),
            (this._frames[l] = d),
            (this._highestMeasuredFrameIndex = Math.max(
              this._highestMeasuredFrameIndex,
              h
            )),
            this._scheduleCellsToRenderUpdate())
          : (this._frames[l].inLayout = !0),
          this._triggerRemeasureForChildListsInCell(l),
          this._computeBlankness(),
          this._updateViewableItems(this.props, this.state.cellsAroundViewport);
      }),
      (this._onCellUnmount = (s) => {
        delete this._cellRefs[s];
        var l = this._frames[s];
        l && (this._frames[s] = y(y({}, l), {}, { inLayout: !1 }));
      }),
      (this._onLayout = (s) => {
        this._isNestedWithSameOrientation()
          ? this.measureLayoutRelativeToContainingList()
          : (this._scrollMetrics.visibleLength = this._selectLength(
              s.nativeEvent.layout
            )),
          this.props.onLayout && this.props.onLayout(s),
          this._scheduleCellsToRenderUpdate(),
          this._maybeCallOnEdgeReached();
      }),
      (this._onLayoutEmpty = (s) => {
        this.props.onLayout && this.props.onLayout(s);
      }),
      (this._onLayoutFooter = (s) => {
        this._triggerRemeasureForChildListsInCell(this._getFooterCellKey()),
          (this._footerLength = this._selectLength(s.nativeEvent.layout));
      }),
      (this._onLayoutHeader = (s) => {
        this._headerLength = this._selectLength(s.nativeEvent.layout);
      }),
      (this._onContentSizeChange = (s, l) => {
        s > 0 &&
          l > 0 &&
          this.props.initialScrollIndex != null &&
          this.props.initialScrollIndex > 0 &&
          !this._hasTriggeredInitialScrollToIndex &&
          (this.props.contentOffset == null &&
            (this.props.initialScrollIndex <
            this.props.getItemCount(this.props.data)
              ? this.scrollToIndex({
                  animated: !1,
                  index: Aa(this.props.initialScrollIndex),
                })
              : this.scrollToEnd({ animated: !1 })),
          (this._hasTriggeredInitialScrollToIndex = !0)),
          this.props.onContentSizeChange &&
            this.props.onContentSizeChange(s, l),
          (this._scrollMetrics.contentLength = this._selectLength({
            height: l,
            width: s,
          })),
          this._scheduleCellsToRenderUpdate(),
          this._maybeCallOnEdgeReached();
      }),
      (this._convertParentScrollMetrics = (s) => {
        var l = s.offset - this._offsetFromParentVirtualizedList,
          h = s.visibleLength,
          u = l - this._scrollMetrics.offset,
          d = this._scrollMetrics.contentLength;
        return { visibleLength: h, contentLength: d, offset: l, dOffset: u };
      }),
      (this._onScroll = (s) => {
        this._nestedChildLists.forEach((C) => {
          C._onScroll(s);
        }),
          this.props.onScroll && this.props.onScroll(s);
        var l = s.timeStamp,
          h = this._selectLength(s.nativeEvent.layoutMeasurement),
          u = this._selectLength(s.nativeEvent.contentSize),
          d = this._selectOffset(s.nativeEvent.contentOffset),
          c = d - this._scrollMetrics.offset;
        if (this._isNestedWithSameOrientation()) {
          if (this._scrollMetrics.contentLength === 0) return;
          var f = this._convertParentScrollMetrics({
            visibleLength: h,
            offset: d,
          });
          (h = f.visibleLength),
            (u = f.contentLength),
            (d = f.offset),
            (c = f.dOffset);
        }
        var _ = this._scrollMetrics.timestamp
            ? Math.max(1, l - this._scrollMetrics.timestamp)
            : 1,
          m = c / _;
        _ > 500 &&
          this._scrollMetrics.dt > 500 &&
          u > 5 * h &&
          !this._hasWarned.perf &&
          (ma(
            'VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc.',
            { dt: _, prevDt: this._scrollMetrics.dt, contentLength: u }
          ),
          (this._hasWarned.perf = !0));
        var p = s.nativeEvent.zoomScale < 0 ? 1 : s.nativeEvent.zoomScale;
        (this._scrollMetrics = {
          contentLength: u,
          dt: _,
          dOffset: c,
          offset: d,
          timestamp: l,
          velocity: m,
          visibleLength: h,
          zoomScale: p,
        }),
          this._updateViewableItems(this.props, this.state.cellsAroundViewport),
          this.props &&
            (this._maybeCallOnEdgeReached(),
            m !== 0 && this._fillRateHelper.activate(),
            this._computeBlankness(),
            this._scheduleCellsToRenderUpdate());
      }),
      (this._onScrollBeginDrag = (s) => {
        this._nestedChildLists.forEach((l) => {
          l._onScrollBeginDrag(s);
        }),
          this._viewabilityTuples.forEach((l) => {
            l.viewabilityHelper.recordInteraction();
          }),
          (this._hasInteracted = !0),
          this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(s);
      }),
      (this._onScrollEndDrag = (s) => {
        this._nestedChildLists.forEach((h) => {
          h._onScrollEndDrag(s);
        });
        var l = s.nativeEvent.velocity;
        l && (this._scrollMetrics.velocity = this._selectOffset(l)),
          this._computeBlankness(),
          this.props.onScrollEndDrag && this.props.onScrollEndDrag(s);
      }),
      (this._onMomentumScrollBegin = (s) => {
        this._nestedChildLists.forEach((l) => {
          l._onMomentumScrollBegin(s);
        }),
          this.props.onMomentumScrollBegin &&
            this.props.onMomentumScrollBegin(s);
      }),
      (this._onMomentumScrollEnd = (s) => {
        this._nestedChildLists.forEach((l) => {
          l._onMomentumScrollEnd(s);
        }),
          (this._scrollMetrics.velocity = 0),
          this._computeBlankness(),
          this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(s);
      }),
      (this._updateCellsToRender = () => {
        this._updateViewableItems(this.props, this.state.cellsAroundViewport),
          this.setState((s, l) => {
            var h = this._adjustCellsAroundViewport(l, s.cellsAroundViewport),
              u = G._createRenderMask(
                l,
                h,
                this._getNonViewportRenderRegions(l)
              );
            return h.first === s.cellsAroundViewport.first &&
              h.last === s.cellsAroundViewport.last &&
              u.equals(s.renderMask)
              ? null
              : { cellsAroundViewport: h, renderMask: u };
          });
      }),
      (this._createViewToken = (s, l, h) => {
        var u = h.data,
          d = h.getItem,
          c = d(u, s);
        return {
          index: s,
          item: c,
          key: this._keyExtractor(c, s, h),
          isViewable: l,
        };
      }),
      (this._getOffsetApprox = (s, l) => {
        if (Number.isInteger(s))
          return this.__getFrameMetricsApprox(s, l).offset;
        var h = this.__getFrameMetricsApprox(Math.floor(s), l),
          u = s - Math.floor(s);
        return h.offset + u * h.length;
      }),
      (this.__getFrameMetricsApprox = (s, l) => {
        var h = this._getFrameMetrics(s, l);
        if (h && h.index === s) return h;
        var u = l.data,
          d = l.getItemCount,
          c = l.getItemLayout;
        return (
          v(
            s >= 0 && s < d(u),
            'Tried to get frame for out of range index ' + s
          ),
          v(
            !c,
            'Should not have to estimate frames when a measurement metrics function is provided'
          ),
          {
            length: this._averageCellLength,
            offset: this._averageCellLength * s,
          }
        );
      }),
      (this._getFrameMetrics = (s, l) => {
        var h = l.data,
          u = l.getItem,
          d = l.getItemCount,
          c = l.getItemLayout;
        v(s >= 0 && s < d(h), 'Tried to get frame for out of range index ' + s);
        var f = u(h, s),
          _ = this._frames[this._keyExtractor(f, s, l)];
        return (!_ || _.index !== s) && c ? c(h, s) : _;
      }),
      (this._getNonViewportRenderRegions = (s) => {
        if (
          !(
            this._lastFocusedCellKey && this._cellRefs[this._lastFocusedCellKey]
          )
        )
          return [];
        var l = this._cellRefs[this._lastFocusedCellKey],
          h = l.props.index,
          u = s.getItemCount(s.data);
        if (
          h >= u ||
          this._keyExtractor(s.getItem(s.data, h), h, s) !==
            this._lastFocusedCellKey
        )
          return [];
        for (
          var d = h, c = 0, f = d - 1;
          f >= 0 && c < this._scrollMetrics.visibleLength;
          f--
        )
          d--, (c += this.__getFrameMetricsApprox(f, s).length);
        for (
          var _ = h, m = 0, p = _ + 1;
          p < u && m < this._scrollMetrics.visibleLength;
          p++
        )
          _++, (m += this.__getFrameMetricsApprox(p, s).length);
        return [{ first: d, last: _ }];
      }),
      this._checkProps(e),
      (this._fillRateHelper = new pa(this._getFrameMetrics)),
      (this._updateCellsToRenderBatcher = new fa(
        this._updateCellsToRender,
        (t = this.props.updateCellsBatchingPeriod) !== null && t !== void 0
          ? t
          : 50
      )),
      this.props.viewabilityConfigCallbackPairs)
    )
      this._viewabilityTuples = this.props.viewabilityConfigCallbackPairs.map(
        (s) => ({
          viewabilityHelper: new Er(s.viewabilityConfig),
          onViewableItemsChanged: s.onViewableItemsChanged,
        })
      );
    else {
      var i = this.props,
        a = i.onViewableItemsChanged,
        n = i.viewabilityConfig;
      a &&
        this._viewabilityTuples.push({
          viewabilityHelper: new Er(n),
          onViewableItemsChanged: a,
        });
    }
    var o = G._initialRenderRegion(e);
    (this.state = {
      cellsAroundViewport: o,
      renderMask: G._createRenderMask(e, o),
    }),
      (this.invertedWheelEventHandler = (s) => {
        var l = this.props.horizontal
            ? s.target.scrollLeft
            : s.target.scrollTop,
          h = this.props.horizontal
            ? s.target.scrollWidth
            : s.target.scrollHeight,
          u = this.props.horizontal
            ? s.target.clientWidth
            : s.target.clientHeight,
          d = h > u,
          c = this.props.horizontal
            ? s.deltaX || s.wheelDeltaX
            : s.deltaY || s.wheelDeltaY,
          f = c;
        d && (f = c < 0 ? Math.min(c + l, 0) : Math.max(c - (h - u - l), 0));
        var _ = c - f;
        if (
          this.props.inverted &&
          this._scrollRef &&
          this._scrollRef.getScrollableNode
        ) {
          var m = this._scrollRef.getScrollableNode();
          if (this.props.horizontal) {
            s.target.scrollLeft += _;
            var p = m.scrollLeft - f;
            m.scrollLeft = this.props.getItemLayout
              ? p
              : Math.min(p, this._totalCellLength);
          } else {
            s.target.scrollTop += _;
            var C = m.scrollTop - f;
            m.scrollTop = this.props.getItemLayout
              ? C
              : Math.min(C, this._totalCellLength);
          }
          s.preventDefault();
        }
      });
  }
  _checkProps(e) {
    var t = e.onScroll,
      i = e.windowSize,
      a = e.getItemCount,
      n = e.data,
      o = e.initialScrollIndex;
    v(
      !t || !t.__isNative,
      'Components based on VirtualizedList must be wrapped with Animated.createAnimatedComponent to support native onScroll events with useNativeDriver'
    ),
      v(
        Fr(i) > 0,
        'VirtualizedList: The windowSize prop must be present and set to a value greater than 0.'
      ),
      v(a, 'VirtualizedList: The "getItemCount" prop must be provided');
    var s = a(n);
    o != null &&
      !this._hasTriggeredInitialScrollToIndex &&
      (o < 0 || (s > 0 && o >= s)) &&
      !this._hasWarned.initialScrollIndex &&
      (console.warn(
        'initialScrollIndex "' + o + '" is not valid (list has ' + s + ' items)'
      ),
      (this._hasWarned.initialScrollIndex = !0));
  }
  static _createRenderMask(e, t, i) {
    var a = e.getItemCount(e.data);
    v(
      t.first >= 0 && t.last >= t.first - 1 && t.last < a,
      'Invalid cells around viewport "[' +
        t.first +
        ', ' +
        t.last +
        ']" was passed to VirtualizedList._createRenderMask'
    );
    var n = new ga(a);
    if (a > 0) {
      for (var o = [t, ...(i ?? [])], s = 0, l = o; s < l.length; s++) {
        var h = l[s];
        n.addCells(h);
      }
      if (e.initialScrollIndex == null || e.initialScrollIndex <= 0) {
        var u = G._initialRenderRegion(e);
        n.addCells(u);
      }
      var d = new Set(e.stickyHeaderIndices);
      G._ensureClosestStickyHeader(e, d, n, t.first);
    }
    return n;
  }
  static _initialRenderRegion(e) {
    var t,
      i = e.getItemCount(e.data),
      a = Math.max(
        0,
        Math.min(
          i - 1,
          Math.floor(
            (t = e.initialScrollIndex) !== null && t !== void 0 ? t : 0
          )
        )
      ),
      n = Math.min(i, a + xa(e.initialNumToRender)) - 1;
    return { first: a, last: n };
  }
  static _ensureClosestStickyHeader(e, t, i, a) {
    for (var n = e.ListHeaderComponent ? 1 : 0, o = a - 1; o >= 0; o--)
      if (t.has(o + n)) {
        i.addCells({ first: o, last: o });
        break;
      }
  }
  _adjustCellsAroundViewport(e, t) {
    var i = e.data,
      a = e.getItemCount,
      n = Vr(e.onEndReachedThreshold),
      o = this._scrollMetrics,
      s = o.contentLength,
      l = o.offset,
      h = o.visibleLength,
      u = s - h - l;
    if (h <= 0 || s <= 0)
      return t.last >= a(i) ? G._constrainToItemCount(t, e) : t;
    var d;
    if (e.disableVirtualization) {
      var c = u < n * h ? $t(e.maxToRenderPerBatch) : 0;
      d = { first: 0, last: Math.min(t.last + c, a(i) - 1) };
    } else {
      if (
        e.initialScrollIndex &&
        !this._scrollMetrics.offset &&
        Math.abs(u) >= Number.EPSILON
      )
        return t.last >= a(i) ? G._constrainToItemCount(t, e) : t;
      (d = Na(
        e,
        $t(e.maxToRenderPerBatch),
        Fr(e.windowSize),
        t,
        this.__getFrameMetricsApprox,
        this._scrollMetrics
      )),
        v(
          d.last < a(i),
          'computeWindowedRenderLimits() should return range in-bounds'
        );
    }
    if (this._nestedChildLists.size() > 0) {
      var f = this._findFirstChildWithMore(d.first, d.last);
      d.last = f ?? d.last;
    }
    return d;
  }
  _findFirstChildWithMore(e, t) {
    for (var i = e; i <= t; i++) {
      var a = this._indicesToKeys.get(i);
      if (a != null && this._nestedChildLists.anyInCell(a, (n) => n.hasMore()))
        return i;
    }
    return null;
  }
  componentDidMount() {
    this._isNestedWithSameOrientation() &&
      this.context.registerAsNestedChild({
        ref: this,
        cellKey: this.context.cellKey,
      }),
      this.setupWebWheelHandler();
  }
  componentWillUnmount() {
    this._isNestedWithSameOrientation() &&
      this.context.unregisterAsNestedChild({ ref: this }),
      this._updateCellsToRenderBatcher.dispose({ abort: !0 }),
      this._viewabilityTuples.forEach((e) => {
        e.viewabilityHelper.dispose();
      }),
      this._fillRateHelper.deactivateAndFlush(),
      this.teardownWebWheelHandler();
  }
  setupWebWheelHandler() {
    if (this._scrollRef && this._scrollRef.getScrollableNode)
      this._scrollRef
        .getScrollableNode()
        .addEventListener('wheel', this.invertedWheelEventHandler);
    else {
      setTimeout(() => this.setupWebWheelHandler(), 50);
      return;
    }
  }
  teardownWebWheelHandler() {
    this._scrollRef &&
      this._scrollRef.getScrollableNode &&
      this._scrollRef
        .getScrollableNode()
        .removeEventListener('wheel', this.invertedWheelEventHandler);
  }
  static getDerivedStateFromProps(e, t) {
    var i = e.getItemCount(e.data);
    if (i === t.renderMask.numCells()) return t;
    var a = G._constrainToItemCount(t.cellsAroundViewport, e);
    return { cellsAroundViewport: a, renderMask: G._createRenderMask(e, a) };
  }
  _pushCells(e, t, i, a, n, o) {
    var s = this,
      l = this.props,
      h = l.CellRendererComponent,
      u = l.ItemSeparatorComponent,
      d = l.ListHeaderComponent,
      c = l.ListItemComponent,
      f = l.data,
      _ = l.debug,
      m = l.getItem,
      p = l.getItemCount,
      C = l.getItemLayout,
      k = l.horizontal,
      L = l.renderItem,
      N = d ? 1 : 0,
      E = p(f) - 1,
      w;
    n = Math.min(E, n);
    for (
      var S = function () {
          var A = m(f, T),
            O = s._keyExtractor(A, T, s.props);
          s._indicesToKeys.set(T, O), i.has(T + N) && t.push(e.length);
          var H = C == null || _ || s._fillRateHelper.enabled();
          e.push(
            g.createElement(
              Sa,
              K(
                {
                  CellRendererComponent: h,
                  ItemSeparatorComponent: T < E ? u : void 0,
                  ListItemComponent: c,
                  cellKey: O,
                  horizontal: k,
                  index: T,
                  inversionStyle: o,
                  item: A,
                  key: O,
                  prevCellKey: w,
                  onUpdateSeparators: s._onUpdateSeparators,
                  onCellFocusCapture: (M) => s._onCellFocusCapture(O),
                  onUnmount: s._onCellUnmount,
                  ref: (M) => {
                    s._cellRefs[O] = M;
                  },
                  renderItem: L,
                },
                H && { onCellLayout: s._onCellLayout }
              )
            )
          ),
            (w = O);
        },
        T = a;
      T <= n;
      T++
    )
      S();
  }
  static _constrainToItemCount(e, t) {
    var i = t.getItemCount(t.data),
      a = Math.min(i - 1, e.last),
      n = $t(t.maxToRenderPerBatch);
    return { first: Lr(0, i - 1 - n, e.first), last: a };
  }
  _isNestedWithSameOrientation() {
    var e = this.context;
    return !!(e && !!e.horizontal === Ne(this.props.horizontal));
  }
  _keyExtractor(e, t, i) {
    if (i.keyExtractor != null) return i.keyExtractor(e, t);
    var a = qe(e, t);
    return (
      a === String(t) &&
        ((Ht = !0), e.type && e.type.displayName && (Dt = e.type.displayName)),
      a
    );
  }
  render() {
    this._checkProps(this.props);
    var e = this.props,
      t = e.ListEmptyComponent,
      i = e.ListFooterComponent,
      a = e.ListHeaderComponent,
      n = this.props,
      o = n.data,
      s = n.horizontal,
      l = this.props.inverted
        ? Ne(this.props.horizontal)
          ? Z.horizontallyInverted
          : Z.verticallyInverted
        : null,
      h = [],
      u = new Set(this.props.stickyHeaderIndices),
      d = [];
    if (a) {
      u.has(0) && d.push(0);
      var c = g.isValidElement(a) ? a : g.createElement(a, null);
      h.push(
        g.createElement(
          Nt,
          { cellKey: this._getCellKey() + '-header', key: '$header' },
          g.createElement(
            U,
            {
              onLayout: this._onLayoutHeader,
              style: [l, this.props.ListHeaderComponentStyle],
            },
            c
          )
        )
      );
    }
    var f = this.props.getItemCount(o);
    if (f === 0 && t) {
      var _ = g.isValidElement(t) ? t : g.createElement(t, null);
      h.push(
        g.createElement(
          Nt,
          { cellKey: this._getCellKey() + '-empty', key: '$empty' },
          g.cloneElement(_, {
            onLayout: (W) => {
              this._onLayoutEmpty(W), _.props.onLayout && _.props.onLayout(W);
            },
            style: [l, _.props.style],
          })
        )
      );
    }
    if (f > 0) {
      (Ht = !1), (Dt = '');
      for (
        var m = this._getSpacerKey(!s),
          p = this.state.renderMask.enumerateRegions(),
          C = Va(p, (W) => W.isSpacer),
          k = se(p),
          L;
        !(L = k()).done;

      ) {
        var N = L.value;
        if (N.isSpacer) {
          if (this.props.disableVirtualization) continue;
          var E = N === C,
            w = E && !this.props.getItemLayout,
            S = w
              ? Lr(N.first - 1, N.last, this._highestMeasuredFrameIndex)
              : N.last,
            T = this.__getFrameMetricsApprox(N.first, this.props),
            R = this.__getFrameMetricsApprox(S, this.props),
            A = R.offset + R.length - T.offset;
          h.push(
            g.createElement(U, { key: '$spacer-' + N.first, style: { [m]: A } })
          );
        } else this._pushCells(h, d, u, N.first, N.last, l);
      }
      !this._hasWarned.keys &&
        Ht &&
        (console.warn(
          'VirtualizedList: missing keys for items, make sure to specify a key or id property on each item or provide a custom keyExtractor.',
          Dt
        ),
        (this._hasWarned.keys = !0));
    }
    if (i) {
      var O = g.isValidElement(i) ? i : g.createElement(i, null);
      h.push(
        g.createElement(
          Nt,
          { cellKey: this._getFooterCellKey(), key: '$footer' },
          g.createElement(
            U,
            {
              onLayout: this._onLayoutFooter,
              style: [l, this.props.ListFooterComponentStyle],
            },
            O
          )
        )
      );
    }
    var H = y(
      y({}, this.props),
      {},
      {
        onContentSizeChange: this._onContentSizeChange,
        onLayout: this._onLayout,
        onScroll: this._onScroll,
        onScrollBeginDrag: this._onScrollBeginDrag,
        onScrollEndDrag: this._onScrollEndDrag,
        onMomentumScrollBegin: this._onMomentumScrollBegin,
        onMomentumScrollEnd: this._onMomentumScrollEnd,
        scrollEventThrottle: Ra(this.props.scrollEventThrottle),
        invertStickyHeaders:
          this.props.invertStickyHeaders !== void 0
            ? this.props.invertStickyHeaders
            : this.props.inverted,
        stickyHeaderIndices: d,
        style: l ? [l, this.props.style] : this.props.style,
      }
    );
    this._hasMore = this.state.cellsAroundViewport.last < f - 1;
    var M = g.createElement(
        wa,
        {
          value: {
            cellKey: null,
            getScrollMetrics: this._getScrollMetrics,
            horizontal: Ne(this.props.horizontal),
            getOutermostParentListRef: this._getOutermostParentListRef,
            registerAsNestedChild: this._registerAsNestedChild,
            unregisterAsNestedChild: this._unregisterAsNestedChild,
          },
        },
        g.cloneElement(
          (
            this.props.renderScrollComponent ||
            this._defaultRenderScrollComponent
          )(H),
          { ref: this._captureScrollRef },
          h
        )
      ),
      V = M;
    return this.props.debug
      ? g.createElement(U, { style: Z.debug }, V, this._renderDebugOverlay())
      : V;
  }
  componentDidUpdate(e) {
    var t = this.props,
      i = t.data,
      a = t.extraData;
    (i !== e.data || a !== e.extraData) &&
      this._viewabilityTuples.forEach((o) => {
        o.viewabilityHelper.resetViewableIndices();
      });
    var n = this._hiPriInProgress;
    this._scheduleCellsToRenderUpdate(), n && (this._hiPriInProgress = !1);
  }
  _computeBlankness() {
    this._fillRateHelper.computeBlankness(
      this.props,
      this.state.cellsAroundViewport,
      this._scrollMetrics
    );
  }
  _onCellFocusCapture(e) {
    (this._lastFocusedCellKey = e), this._updateCellsToRender();
  }
  _triggerRemeasureForChildListsInCell(e) {
    this._nestedChildLists.forEachInCell(e, (t) => {
      t.measureLayoutRelativeToContainingList();
    });
  }
  measureLayoutRelativeToContainingList() {
    try {
      if (!this._scrollRef) return;
      this._scrollRef.measureLayout(
        this.context.getOutermostParentListRef().getScrollRef(),
        (e, t, i, a) => {
          (this._offsetFromParentVirtualizedList = this._selectOffset({
            x: e,
            y: t,
          })),
            (this._scrollMetrics.contentLength = this._selectLength({
              width: i,
              height: a,
            }));
          var n = this._convertParentScrollMetrics(
              this.context.getScrollMetrics()
            ),
            o =
              this._scrollMetrics.visibleLength !== n.visibleLength ||
              this._scrollMetrics.offset !== n.offset;
          o &&
            ((this._scrollMetrics.visibleLength = n.visibleLength),
            (this._scrollMetrics.offset = n.offset),
            this._nestedChildLists.forEach((s) => {
              s.measureLayoutRelativeToContainingList();
            }));
        },
        (e) => {
          console.warn(
            "VirtualizedList: Encountered an error while measuring a list's offset from its containing VirtualizedList."
          );
        }
      );
    } catch (e) {
      console.warn(
        'measureLayoutRelativeToContainingList threw an error',
        e.stack
      );
    }
  }
  _getFooterCellKey() {
    return this._getCellKey() + '-footer';
  }
  _renderDebugOverlay() {
    for (
      var e =
          this._scrollMetrics.visibleLength /
          (this._scrollMetrics.contentLength || 1),
        t = [],
        i = this.props.getItemCount(this.props.data),
        a = 0;
      a < i;
      a++
    ) {
      var n = this.__getFrameMetricsApprox(a, this.props);
      n.inLayout && t.push(n);
    }
    var o = this.__getFrameMetricsApprox(
        this.state.cellsAroundViewport.first,
        this.props
      ).offset,
      s = this.__getFrameMetricsApprox(
        this.state.cellsAroundViewport.last,
        this.props
      ),
      l = s.offset + s.length - o,
      h = this._scrollMetrics.offset,
      u = this._scrollMetrics.visibleLength;
    return g.createElement(
      U,
      { style: [Z.debugOverlayBase, Z.debugOverlay] },
      t.map((d, c) =>
        g.createElement(U, {
          key: 'f' + c,
          style: [
            Z.debugOverlayBase,
            Z.debugOverlayFrame,
            { top: d.offset * e, height: d.length * e },
          ],
        })
      ),
      g.createElement(U, {
        style: [
          Z.debugOverlayBase,
          Z.debugOverlayFrameLast,
          { top: o * e, height: l * e },
        ],
      }),
      g.createElement(U, {
        style: [
          Z.debugOverlayBase,
          Z.debugOverlayFrameVis,
          { top: h * e, height: u * e },
        ],
      })
    );
  }
  _selectLength(e) {
    return Ne(this.props.horizontal) ? e.width : e.height;
  }
  _selectOffset(e) {
    return Ne(this.props.horizontal) ? e.x : e.y;
  }
  _maybeCallOnEdgeReached() {
    var e = this.props,
      t = e.data,
      i = e.getItemCount,
      a = e.onStartReached,
      n = e.onStartReachedThreshold,
      o = e.onEndReached,
      s = e.onEndReachedThreshold,
      l = e.initialScrollIndex,
      h = this._scrollMetrics,
      u = h.contentLength,
      d = h.visibleLength,
      c = h.offset,
      f = c,
      _ = u - d - c;
    f < Rr && (f = 0), _ < Rr && (_ = 0);
    var m = 2,
      p = n != null ? n * d : m,
      C = s != null ? s * d : m,
      k = f <= p,
      L = _ <= C;
    o &&
    this.state.cellsAroundViewport.last === i(t) - 1 &&
    L &&
    this._scrollMetrics.contentLength !== this._sentEndForContentLength
      ? ((this._sentEndForContentLength = this._scrollMetrics.contentLength),
        o({ distanceFromEnd: _ }))
      : a != null &&
          this.state.cellsAroundViewport.first === 0 &&
          k &&
          this._scrollMetrics.contentLength !== this._sentStartForContentLength
        ? (!l || this._scrollMetrics.timestamp !== 0) &&
          ((this._sentStartForContentLength =
            this._scrollMetrics.contentLength),
          a({ distanceFromStart: f }))
        : ((this._sentStartForContentLength = k
            ? this._sentStartForContentLength
            : 0),
          (this._sentEndForContentLength = L
            ? this._sentEndForContentLength
            : 0));
  }
  _scheduleCellsToRenderUpdate() {
    var e = this.state.cellsAroundViewport,
      t = e.first,
      i = e.last,
      a = this._scrollMetrics,
      n = a.offset,
      o = a.visibleLength,
      s = a.velocity,
      l = this.props.getItemCount(this.props.data),
      h = !1,
      u = Ea(this.props.onStartReachedThreshold),
      d = Vr(this.props.onEndReachedThreshold);
    if (t > 0) {
      var c = n - this.__getFrameMetricsApprox(t, this.props).offset;
      h = c < 0 || (s < -2 && c < Pr(u, o));
    }
    if (!h && i >= 0 && i < l - 1) {
      var f = this.__getFrameMetricsApprox(i, this.props).offset - (n + o);
      h = f < 0 || (s > 2 && f < Pr(d, o));
    }
    if (
      h &&
      (this._averageCellLength || this.props.getItemLayout) &&
      !this._hiPriInProgress
    ) {
      (this._hiPriInProgress = !0),
        this._updateCellsToRenderBatcher.dispose({ abort: !0 }),
        this._updateCellsToRender();
      return;
    } else this._updateCellsToRenderBatcher.schedule();
  }
  _updateViewableItems(e, t) {
    this._viewabilityTuples.forEach((i) => {
      i.viewabilityHelper.onUpdate(
        e,
        this._scrollMetrics.offset,
        this._scrollMetrics.visibleLength,
        this._getFrameMetrics,
        this._createViewToken,
        i.onViewableItemsChanged,
        t
      );
    });
  }
}
G.contextType = Lt;
var Z = de.create({
    verticallyInverted: { transform: 'scaleY(-1)' },
    horizontallyInverted: { transform: 'scaleX(-1)' },
    debug: { flex: 1 },
    debugOverlayBase: { position: 'absolute', top: 0, right: 0 },
    debugOverlay: { bottom: 0, width: 20, borderColor: 'blue', borderWidth: 1 },
    debugOverlayFrame: { left: 0, backgroundColor: 'orange' },
    debugOverlayFrameLast: { left: 0, borderColor: 'green', borderWidth: 2 },
    debugOverlayFrameVis: { left: 0, borderColor: 'red', borderWidth: 2 },
  }),
  Mr =
    Number.isNaN ||
    function (e) {
      return typeof e == 'number' && e !== e;
    };
function Pa(r, e) {
  return !!(r === e || (Mr(r) && Mr(e)));
}
function Fa(r, e) {
  if (r.length !== e.length) return !1;
  for (var t = 0; t < r.length; t++) if (!Pa(r[t], e[t])) return !1;
  return !0;
}
function Ma(r, e) {
  e === void 0 && (e = Fa);
  var t = null;
  function i() {
    for (var a = [], n = 0; n < arguments.length; n++) a[n] = arguments[n];
    if (t && t.lastThis === this && e(a, t.lastArgs)) return t.lastResult;
    var o = r.apply(this, a);
    return (t = { lastResult: o, lastArgs: a, lastThis: this }), o;
  }
  return (
    (i.clear = function () {
      t = null;
    }),
    i
  );
}
var Oa = [
  'numColumns',
  'columnWrapperStyle',
  'removeClippedSubviews',
  'strictMode',
];
function za(r) {
  return r ?? ur.OS === 'android';
}
function Le(r) {
  return r ?? 1;
}
function Ha(r) {
  return typeof Object(r).length == 'number';
}
let Da = class extends g.PureComponent {
  scrollToEnd(e) {
    this._listRef && this._listRef.scrollToEnd(e);
  }
  scrollToIndex(e) {
    this._listRef && this._listRef.scrollToIndex(e);
  }
  scrollToItem(e) {
    this._listRef && this._listRef.scrollToItem(e);
  }
  scrollToOffset(e) {
    this._listRef && this._listRef.scrollToOffset(e);
  }
  recordInteraction() {
    this._listRef && this._listRef.recordInteraction();
  }
  flashScrollIndicators() {
    this._listRef && this._listRef.flashScrollIndicators();
  }
  getScrollResponder() {
    if (this._listRef) return this._listRef.getScrollResponder();
  }
  getNativeScrollRef() {
    if (this._listRef) return this._listRef.getScrollRef();
  }
  getScrollableNode() {
    if (this._listRef) return this._listRef.getScrollableNode();
  }
  constructor(e) {
    super(e),
      (this._virtualizedListPairs = []),
      (this._captureRef = (t) => {
        this._listRef = t;
      }),
      (this._getItem = (t, i) => {
        var a = Le(this.props.numColumns);
        if (a > 1) {
          for (var n = [], o = 0; o < a; o++) {
            var s = i * a + o;
            if (s < t.length) {
              var l = t[s];
              n.push(l);
            }
          }
          return n;
        } else return t[i];
      }),
      (this._getItemCount = (t) => {
        if (t != null && Ha(t)) {
          var i = Le(this.props.numColumns);
          return i > 1 ? Math.ceil(t.length / i) : t.length;
        } else return 0;
      }),
      (this._keyExtractor = (t, i) => {
        var a,
          n = Le(this.props.numColumns),
          o = (a = this.props.keyExtractor) !== null && a !== void 0 ? a : qe;
        return n > 1
          ? (v(
              Array.isArray(t),
              'FlatList: Encountered internal consistency error, expected each item to consist of an array with 1-%s columns; instead, received a single item.',
              n
            ),
            t.map((s, l) => o(s, i * n + l)).join(':'))
          : o(t, i);
      }),
      (this._renderer = (t, i, a, n, o) => {
        var s = Le(n),
          l = (u) => (t ? g.createElement(t, u) : i ? i(u) : null),
          h = (u) => {
            if (s > 1) {
              var d = u.item,
                c = u.index;
              return (
                v(
                  Array.isArray(d),
                  'Expected array of items with numColumns > 1'
                ),
                g.createElement(
                  U,
                  { style: [$a.row, a] },
                  d.map((f, _) => {
                    var m = l({
                      item: f,
                      index: c * s + _,
                      separators: u.separators,
                    });
                    return m != null
                      ? g.createElement(g.Fragment, { key: _ }, m)
                      : null;
                  })
                )
              );
            } else return l(u);
          };
        return t ? { ListItemComponent: h } : { renderItem: h };
      }),
      (this._memoizedRenderer = Ma(this._renderer)),
      this._checkProps(this.props),
      this.props.viewabilityConfigCallbackPairs
        ? (this._virtualizedListPairs =
            this.props.viewabilityConfigCallbackPairs.map((t) => ({
              viewabilityConfig: t.viewabilityConfig,
              onViewableItemsChanged: this._createOnViewableItemsChanged(
                t.onViewableItemsChanged
              ),
            })))
        : this.props.onViewableItemsChanged &&
          this._virtualizedListPairs.push({
            viewabilityConfig: this.props.viewabilityConfig,
            onViewableItemsChanged: this._createOnViewableItemsChanged(
              this.props.onViewableItemsChanged
            ),
          });
  }
  componentDidUpdate(e) {
    v(
      e.numColumns === this.props.numColumns,
      'Changing numColumns on the fly is not supported. Change the key prop on FlatList when changing the number of columns to force a fresh render of the component.'
    ),
      v(
        e.onViewableItemsChanged === this.props.onViewableItemsChanged,
        'Changing onViewableItemsChanged on the fly is not supported'
      ),
      v(
        !ua(e.viewabilityConfig, this.props.viewabilityConfig),
        'Changing viewabilityConfig on the fly is not supported'
      ),
      v(
        e.viewabilityConfigCallbackPairs ===
          this.props.viewabilityConfigCallbackPairs,
        'Changing viewabilityConfigCallbackPairs on the fly is not supported'
      ),
      this._checkProps(this.props);
  }
  _checkProps(e) {
    var t = e.getItem,
      i = e.getItemCount,
      a = e.horizontal,
      n = e.columnWrapperStyle,
      o = e.onViewableItemsChanged,
      s = e.viewabilityConfigCallbackPairs,
      l = Le(this.props.numColumns);
    v(!t && !i, 'FlatList does not support custom data formats.'),
      l > 1
        ? v(!a, 'numColumns does not support horizontal.')
        : v(!n, 'columnWrapperStyle not supported for single column lists'),
      v(
        !(o && s),
        'FlatList does not support setting both onViewableItemsChanged and viewabilityConfigCallbackPairs.'
      );
  }
  _pushMultiColumnViewable(e, t) {
    var i,
      a = Le(this.props.numColumns),
      n = (i = this.props.keyExtractor) !== null && i !== void 0 ? i : qe;
    t.item.forEach((o, s) => {
      v(t.index != null, 'Missing index!');
      var l = t.index * a + s;
      e.push(y(y({}, t), {}, { item: o, key: n(o, l), index: l }));
    });
  }
  _createOnViewableItemsChanged(e) {
    return (t) => {
      var i = Le(this.props.numColumns);
      if (e)
        if (i > 1) {
          var a = [],
            n = [];
          t.viewableItems.forEach((o) => this._pushMultiColumnViewable(n, o)),
            t.changed.forEach((o) => this._pushMultiColumnViewable(a, o)),
            e({ viewableItems: n, changed: a });
        } else e(t);
    };
  }
  render() {
    var e = this.props,
      t = e.numColumns,
      i = e.columnWrapperStyle,
      a = e.removeClippedSubviews,
      n = e.strictMode,
      o = n === void 0 ? !1 : n,
      s = Fe(e, Oa),
      l = o ? this._memoizedRenderer : this._renderer;
    return g.createElement(
      G,
      K(
        {},
        s,
        {
          getItem: this._getItem,
          getItemCount: this._getItemCount,
          keyExtractor: this._keyExtractor,
          ref: this._captureRef,
          viewabilityConfigCallbackPairs: this._virtualizedListPairs,
          removeClippedSubviews: za(a),
        },
        l(
          this.props.ListItemComponent,
          this.props.renderItem,
          i,
          t,
          this.props.extraData
        )
      )
    );
  }
};
var $a = de.create({ row: { flexDirection: 'row' } });
function Ba(r) {
  return null;
}
const ja = Ba(),
  He = new ra();
class Ua {
  constructor(e) {}
  addListener(e, t, i) {
    var a;
    (a = this._nativeModule) == null || a.addListener(e);
    var n = He.addListener(e, t, i);
    return {
      remove: () => {
        if (n != null) {
          var o;
          (o = this._nativeModule) == null || o.removeListeners(1),
            n.remove(),
            (n = null);
        }
      },
    };
  }
  removeListener(e, t) {
    var i;
    (i = this._nativeModule) == null || i.removeListeners(1),
      He.removeListener(e, t);
  }
  emit(e) {
    for (
      var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), a = 1;
      a < t;
      a++
    )
      i[a - 1] = arguments[a];
    He.emit(e, ...i);
  }
  removeAllListeners(e) {
    var t;
    v(
      e != null,
      '`NativeEventEmitter.removeAllListener()` requires a non-null argument.'
    ),
      (t = this._nativeModule) == null ||
        t.removeListeners(this.listenerCount(e)),
      He.removeAllListeners(e);
  }
  listenerCount(e) {
    return He.listenerCount(e);
  }
}
var dr = ja,
  Wa = 1,
  qa = 1,
  Bt,
  jt = new Set(),
  Ut = !1,
  Or = [],
  I = dr,
  z = {
    getValue: function (e, t) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.getValue, e, t);
    },
    setWaitingForIdentifier: function (e) {
      jt.add(e), (Ut = !0);
    },
    unsetWaitingForIdentifier: function (e) {
      jt.delete(e), jt.size === 0 && ((Ut = !1), z.disableQueue());
    },
    disableQueue: function () {
      v(I, 'Native animated module is not available');
    },
    flushQueue: function () {},
    queueOperation: function (e) {
      for (
        var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), a = 1;
        a < t;
        a++
      )
        i[a - 1] = arguments[a];
      Ut || Or.length !== 0 ? Or.push(() => e(...i)) : e(...i);
    },
    createAnimatedNode: function (e, t) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.createAnimatedNode, e, t);
    },
    updateAnimatedNodeConfig: function (e, t) {
      v(I, 'Native animated module is not available');
    },
    startListeningToAnimatedNodeValue: function (e) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.startListeningToAnimatedNodeValue, e);
    },
    stopListeningToAnimatedNodeValue: function (e) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.stopListeningToAnimatedNodeValue, e);
    },
    connectAnimatedNodes: function (e, t) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.connectAnimatedNodes, e, t);
    },
    disconnectAnimatedNodes: function (e, t) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.disconnectAnimatedNodes, e, t);
    },
    startAnimatingNode: function (e, t, i, a) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.startAnimatingNode, e, t, i, a);
    },
    stopAnimation: function (e) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.stopAnimation, e);
    },
    setAnimatedNodeValue: function (e, t) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.setAnimatedNodeValue, e, t);
    },
    setAnimatedNodeOffset: function (e, t) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.setAnimatedNodeOffset, e, t);
    },
    flattenAnimatedNodeOffset: function (e) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.flattenAnimatedNodeOffset, e);
    },
    extractAnimatedNodeOffset: function (e) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.extractAnimatedNodeOffset, e);
    },
    connectAnimatedNodeToView: function (e, t) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.connectAnimatedNodeToView, e, t);
    },
    disconnectAnimatedNodeFromView: function (e, t) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.disconnectAnimatedNodeFromView, e, t);
    },
    restoreDefaultValues: function (e) {
      v(I, 'Native animated module is not available'),
        I.restoreDefaultValues != null &&
          z.queueOperation(I.restoreDefaultValues, e);
    },
    dropAnimatedNode: function (e) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.dropAnimatedNode, e);
    },
    addAnimatedEventToView: function (e, t, i) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.addAnimatedEventToView, e, t, i);
    },
    removeAnimatedEventFromView(r, e, t) {
      v(I, 'Native animated module is not available'),
        z.queueOperation(I.removeAnimatedEventFromView, r, e, t);
    },
  },
  pi = {
    backgroundColor: !0,
    borderBottomColor: !0,
    borderColor: !0,
    borderEndColor: !0,
    borderLeftColor: !0,
    borderRightColor: !0,
    borderStartColor: !0,
    borderTopColor: !0,
    color: !0,
    tintColor: !0,
  },
  bi = y(
    y({}, pi),
    {},
    {
      borderBottomEndRadius: !0,
      borderBottomLeftRadius: !0,
      borderBottomRightRadius: !0,
      borderBottomStartRadius: !0,
      borderRadius: !0,
      borderTopEndRadius: !0,
      borderTopLeftRadius: !0,
      borderTopRightRadius: !0,
      borderTopStartRadius: !0,
      elevation: !0,
      opacity: !0,
      transform: !0,
      zIndex: !0,
      shadowOpacity: !0,
      shadowRadius: !0,
      scaleX: !0,
      scaleY: !0,
      translateX: !0,
      translateY: !0,
    }
  ),
  yi = {
    translateX: !0,
    translateY: !0,
    scale: !0,
    scaleX: !0,
    scaleY: !0,
    rotate: !0,
    rotateX: !0,
    rotateY: !0,
    rotateZ: !0,
    perspective: !0,
  },
  Ci = {
    inputRange: !0,
    outputRange: !0,
    extrapolate: !0,
    extrapolateRight: !0,
    extrapolateLeft: !0,
  };
function Ka(r) {
  bi[r] = !0;
}
function Ga(r) {
  yi[r] = !0;
}
function Ya(r) {
  Ci[r] = !0;
}
function Ja(r) {
  return pi.hasOwnProperty(r);
}
function ki(r) {
  return bi.hasOwnProperty(r);
}
function wi(r) {
  return yi.hasOwnProperty(r);
}
function Si(r) {
  return Ci.hasOwnProperty(r);
}
function Qa(r) {
  r.forEach((e) => {
    if (!wi(e.property))
      throw new Error(
        "Property '" +
          e.property +
          "' is not supported by native animated module"
      );
  });
}
function Xa(r) {
  for (var e in r)
    if (!ki(e))
      throw new Error(
        "Style property '" + e + "' is not supported by native animated module"
      );
}
function Za(r) {
  for (var e in r)
    if (!Si(e))
      throw new Error(
        "Interpolation property '" +
          e +
          "' is not supported by native animated module"
      );
}
function es() {
  return Wa++;
}
function Ti() {
  return qa++;
}
function ts() {
  v(dr, 'Native animated module is not available');
}
var zr = !1;
function Me(r) {
  return (
    r.useNativeDriver == null &&
      console.warn(
        'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`'
      ),
    r.useNativeDriver === !0 && !dr
      ? (zr ||
          (console.warn(
            'Animated: `useNativeDriver` is not supported because the native animated module is missing. Falling back to JS-based animation. To resolve this, add `RCTAnimation` module to this app, or remove `useNativeDriver`. Make sure to run `bundle exec pod install` first. Read more about autolinking: https://github.com/react-native-community/cli/blob/master/docs/autolinking.md'
          ),
          (zr = !0)),
        !1)
      : r.useNativeDriver || !1
  );
}
function rs(r) {
  if (typeof r != 'string') return r;
  if (/deg$/.test(r)) {
    var e = parseFloat(r) || 0,
      t = (e * Math.PI) / 180;
    return t;
  } else return r;
}
const P = {
  API: z,
  isSupportedColorStyleProp: Ja,
  isSupportedStyleProp: ki,
  isSupportedTransformProp: wi,
  isSupportedInterpolationParam: Si,
  addWhitelistedStyleProp: Ka,
  addWhitelistedTransformProp: Ga,
  addWhitelistedInterpolationParam: Ya,
  validateStyles: Xa,
  validateTransform: Qa,
  validateInterpolation: Za,
  generateNewNodeTag: es,
  generateNewAnimationId: Ti,
  assertNativeAnimatedModule: ts,
  shouldUseNativeDriver: Me,
  transformDataType: rs,
  get nativeEventEmitter() {
    return Bt || (Bt = new Ua(null)), Bt;
  },
};
var Hr = P.API,
  is = 1;
class x {
  __attach() {}
  __detach() {
    this.__isNative &&
      this.__nativeTag != null &&
      (P.API.dropAnimatedNode(this.__nativeTag), (this.__nativeTag = void 0));
  }
  __getValue() {}
  __getAnimatedValue() {
    return this.__getValue();
  }
  __addChild(e) {}
  __removeChild(e) {}
  __getChildren() {
    return [];
  }
  constructor() {
    this._listeners = {};
  }
  __makeNative(e) {
    if (!this.__isNative)
      throw new Error('This node cannot be made a "native" animated node');
    (this._platformConfig = e),
      this.hasListeners() && this._startListeningToNativeValueUpdates();
  }
  addListener(e) {
    var t = String(is++);
    return (
      (this._listeners[t] = e),
      this.__isNative && this._startListeningToNativeValueUpdates(),
      t
    );
  }
  removeListener(e) {
    delete this._listeners[e],
      this.__isNative &&
        !this.hasListeners() &&
        this._stopListeningForNativeValueUpdates();
  }
  removeAllListeners() {
    (this._listeners = {}),
      this.__isNative && this._stopListeningForNativeValueUpdates();
  }
  hasListeners() {
    return !!Object.keys(this._listeners).length;
  }
  _startListeningToNativeValueUpdates() {
    (this.__nativeAnimatedValueListener &&
      !this.__shouldUpdateListenersForNewNativeTag) ||
      (this.__shouldUpdateListenersForNewNativeTag &&
        ((this.__shouldUpdateListenersForNewNativeTag = !1),
        this._stopListeningForNativeValueUpdates()),
      Hr.startListeningToAnimatedNodeValue(this.__getNativeTag()),
      (this.__nativeAnimatedValueListener = P.nativeEventEmitter.addListener(
        'onAnimatedValueUpdate',
        (e) => {
          e.tag === this.__getNativeTag() &&
            this.__onAnimatedValueUpdateReceived(e.value);
        }
      )));
  }
  __onAnimatedValueUpdateReceived(e) {
    this.__callListeners(e);
  }
  __callListeners(e) {
    for (var t in this._listeners) this._listeners[t]({ value: e });
  }
  _stopListeningForNativeValueUpdates() {
    this.__nativeAnimatedValueListener &&
      (this.__nativeAnimatedValueListener.remove(),
      (this.__nativeAnimatedValueListener = null),
      Hr.stopListeningToAnimatedNodeValue(this.__getNativeTag()));
  }
  __getNativeTag() {
    var e;
    P.assertNativeAnimatedModule(),
      v(
        this.__isNative,
        'Attempt to get native tag from node not marked as "native"'
      );
    var t =
      (e = this.__nativeTag) !== null && e !== void 0
        ? e
        : P.generateNewNodeTag();
    if (this.__nativeTag == null) {
      this.__nativeTag = t;
      var i = this.__getNativeConfig();
      this._platformConfig && (i.platformConfig = this._platformConfig),
        P.API.createAnimatedNode(t, i),
        (this.__shouldUpdateListenersForNewNativeTag = !0);
    }
    return t;
  }
  __getNativeConfig() {
    throw new Error(
      'This JS animated node type cannot be used as native animated node'
    );
  }
  toJSON() {
    return this.__getValue();
  }
  __getPlatformConfig() {
    return this._platformConfig;
  }
  __setPlatformConfig(e) {
    this._platformConfig = e;
  }
}
class J extends x {
  constructor() {
    super(), (this._children = []);
  }
  __makeNative(e) {
    if (!this.__isNative) {
      this.__isNative = !0;
      for (var t = se(this._children), i; !(i = t()).done; ) {
        var a = i.value;
        a.__makeNative(e),
          P.API.connectAnimatedNodes(this.__getNativeTag(), a.__getNativeTag());
      }
    }
    super.__makeNative(e);
  }
  __addChild(e) {
    this._children.length === 0 && this.__attach(),
      this._children.push(e),
      this.__isNative &&
        (e.__makeNative(this.__getPlatformConfig()),
        P.API.connectAnimatedNodes(this.__getNativeTag(), e.__getNativeTag()));
  }
  __removeChild(e) {
    var t = this._children.indexOf(e);
    if (t === -1) {
      console.warn("Trying to remove a child that doesn't exist");
      return;
    }
    this.__isNative &&
      e.__isNative &&
      P.API.disconnectAnimatedNodes(this.__getNativeTag(), e.__getNativeTag()),
      this._children.splice(t, 1),
      this._children.length === 0 && this.__detach();
  }
  __getChildren() {
    return this._children;
  }
  __callListeners(e) {
    if ((super.__callListeners(e), !this.__isNative))
      for (var t = se(this._children), i; !(i = t()).done; ) {
        var a = i.value;
        a.__getValue && a.__callListeners(a.__getValue());
      }
  }
}
var as = (r) => r;
function cr(r) {
  if (r.outputRange && typeof r.outputRange[0] == 'string') return os(r);
  var e = r.outputRange,
    t = r.inputRange,
    i = r.easing || as,
    a = 'extend';
  r.extrapolateLeft !== void 0
    ? (a = r.extrapolateLeft)
    : r.extrapolate !== void 0 && (a = r.extrapolate);
  var n = 'extend';
  return (
    r.extrapolateRight !== void 0
      ? (n = r.extrapolateRight)
      : r.extrapolate !== void 0 && (n = r.extrapolate),
    (o) => {
      v(
        typeof o == 'number',
        'Cannot interpolation an input which is not a number'
      );
      var s = us(o, t);
      return ss(o, t[s], t[s + 1], e[s], e[s + 1], i, a, n);
    }
  );
}
function ss(r, e, t, i, a, n, o, s) {
  var l = r;
  if (l < e) {
    if (o === 'identity') return l;
    o === 'clamp' && (l = e);
  }
  if (l > t) {
    if (s === 'identity') return l;
    s === 'clamp' && (l = t);
  }
  return i === a
    ? i
    : e === t
      ? r <= e
        ? i
        : a
      : (e === -1 / 0
          ? (l = -l)
          : t === 1 / 0
            ? (l = l - e)
            : (l = (l - e) / (t - e)),
        (l = n(l)),
        i === -1 / 0
          ? (l = -l)
          : a === 1 / 0
            ? (l = l + i)
            : (l = l * (a - i) + i),
        l);
}
function ns(r) {
  var e = gi(r);
  if (e === null || typeof e != 'number') return r;
  e = e || 0;
  var t = (e & 4278190080) >>> 24,
    i = (e & 16711680) >>> 16,
    a = (e & 65280) >>> 8,
    n = (e & 255) / 255;
  return 'rgba(' + t + ', ' + i + ', ' + a + ', ' + n + ')';
}
var Re = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g;
function os(r) {
  var e = r.outputRange;
  v(e.length >= 2, 'Bad output range'), (e = e.map(ns)), hs(e);
  var t = e[0].match(Re).map(() => []);
  e.forEach((n) => {
    n.match(Re).forEach((o, s) => {
      t[s].push(+o);
    });
  });
  var i = e[0]
      .match(Re)
      .map((n, o) => cr(y(y({}, r), {}, { outputRange: t[o] }))),
    a = ls(e[0]);
  return (n) => {
    var o = 0;
    return e[0].replace(Re, () => {
      var s = +i[o++](n);
      return (
        a && (s = o < 4 ? Math.round(s) : Math.round(s * 1e3) / 1e3), String(s)
      );
    });
  };
}
function ls(r) {
  return typeof r == 'string' && r.startsWith('rgb');
}
function hs(r) {
  for (var e = r[0].replace(Re, ''), t = 1; t < r.length; ++t)
    v(e === r[t].replace(Re, ''), 'invalid pattern ' + r[0] + ' and ' + r[t]);
}
function us(r, e) {
  var t;
  for (t = 1; t < e.length - 1 && !(e[t] >= r); ++t);
  return t - 1;
}
class Q extends J {
  constructor(e, t) {
    super(),
      (this._parent = e),
      (this._config = t),
      (this._interpolation = cr(t));
  }
  __makeNative(e) {
    this._parent.__makeNative(e), super.__makeNative(e);
  }
  __getValue() {
    var e = this._parent.__getValue();
    return (
      v(
        typeof e == 'number',
        'Cannot interpolate an input which is not a number.'
      ),
      this._interpolation(e)
    );
  }
  interpolate(e) {
    return new Q(this, e);
  }
  __attach() {
    this._parent.__addChild(this);
  }
  __detach() {
    this._parent.__removeChild(this), super.__detach();
  }
  __transformDataType(e) {
    return e.map(P.transformDataType);
  }
  __getNativeConfig() {
    return {
      inputRange: this._config.inputRange,
      outputRange: this.__transformDataType(this._config.outputRange),
      extrapolateLeft:
        this._config.extrapolateLeft || this._config.extrapolate || 'extend',
      extrapolateRight:
        this._config.extrapolateRight || this._config.extrapolate || 'extend',
      type: 'interpolation',
    };
  }
}
Q.__createInterpolation = cr;
var he = P.API;
function ds(r) {
  var e = new Set();
  function t(i) {
    typeof i.update == 'function' ? e.add(i) : i.__getChildren().forEach(t);
  }
  t(r), e.forEach((i) => i.update());
}
function cs(r, e) {
  he.setWaitingForIdentifier(r), e(), he.unsetWaitingForIdentifier(r);
}
class F extends J {
  constructor(e, t) {
    if ((super(), typeof e != 'number'))
      throw new Error('AnimatedValue: Attempting to set value to undefined');
    (this._startingValue = this._value = e),
      (this._offset = 0),
      (this._animation = null),
      t && t.useNativeDriver && this.__makeNative();
  }
  __detach() {
    this.__isNative &&
      he.getValue(this.__getNativeTag(), (e) => {
        this._value = e - this._offset;
      }),
      this.stopAnimation(),
      super.__detach();
  }
  __getValue() {
    return this._value + this._offset;
  }
  setValue(e) {
    this._animation && (this._animation.stop(), (this._animation = null)),
      this._updateValue(e, !this.__isNative),
      this.__isNative &&
        cs(this.__getNativeTag().toString(), () =>
          he.setAnimatedNodeValue(this.__getNativeTag(), e)
        );
  }
  setOffset(e) {
    (this._offset = e),
      this.__isNative && he.setAnimatedNodeOffset(this.__getNativeTag(), e);
  }
  flattenOffset() {
    (this._value += this._offset),
      (this._offset = 0),
      this.__isNative && he.flattenAnimatedNodeOffset(this.__getNativeTag());
  }
  extractOffset() {
    (this._offset += this._value),
      (this._value = 0),
      this.__isNative && he.extractAnimatedNodeOffset(this.__getNativeTag());
  }
  stopAnimation(e) {
    this.stopTracking(),
      this._animation && this._animation.stop(),
      (this._animation = null),
      e &&
        (this.__isNative
          ? he.getValue(this.__getNativeTag(), e)
          : e(this.__getValue()));
  }
  resetAnimation(e) {
    this.stopAnimation(e),
      (this._value = this._startingValue),
      this.__isNative &&
        he.setAnimatedNodeValue(this.__getNativeTag(), this._startingValue);
  }
  __onAnimatedValueUpdateReceived(e) {
    this._updateValue(e, !1);
  }
  interpolate(e) {
    return new Q(this, e);
  }
  animate(e, t) {
    var i = null;
    e.__isInteraction && (i = sr.createInteractionHandle());
    var a = this._animation;
    this._animation && this._animation.stop(),
      (this._animation = e),
      e.start(
        this._value,
        (n) => {
          this._updateValue(n, !0);
        },
        (n) => {
          (this._animation = null),
            i !== null && sr.clearInteractionHandle(i),
            t && t(n);
        },
        a,
        this
      );
  }
  stopTracking() {
    this._tracking && this._tracking.__detach(), (this._tracking = null);
  }
  track(e) {
    this.stopTracking(),
      (this._tracking = e),
      this._tracking && this._tracking.update();
  }
  _updateValue(e, t) {
    if (e === void 0)
      throw new Error('AnimatedValue: Attempting to set value to undefined');
    (this._value = e), t && ds(this), super.__callListeners(this.__getValue());
  }
  __getNativeConfig() {
    return { type: 'value', value: this._value, offset: this._offset };
  }
}
function _r(r, e, t) {
  var i = [],
    a = (n, o) => {
      if (n instanceof F)
        n.__makeNative(),
          i.push({ nativeEventPath: o, animatedValueTag: n.__getNativeTag() });
      else if (typeof n == 'object') for (var s in n) a(n[s], o.concat(s));
    };
  return (
    v(
      t[0] && t[0].nativeEvent,
      'Native driven events only support animated values contained inside `nativeEvent`.'
    ),
    a(t[0].nativeEvent, []),
    r != null &&
      i.forEach((n) => {
        P.API.addAnimatedEventToView(r, e, n);
      }),
    {
      detach() {
        r != null &&
          i.forEach((n) => {
            P.API.removeAnimatedEventFromView(r, e, n.animatedValueTag);
          });
      },
    }
  );
}
class Ae {
  constructor(e, t) {
    (this._listeners = []),
      (this._argMapping = e),
      t == null &&
        (console.warn(
          'Animated.event now requires a second argument for options'
        ),
        (t = { useNativeDriver: !1 })),
      t.listener && this.__addListener(t.listener),
      (this._callListeners = this._callListeners.bind(this)),
      (this._attachedEvent = null),
      (this.__isNative = Me(t));
  }
  __addListener(e) {
    this._listeners.push(e);
  }
  __removeListener(e) {
    this._listeners = this._listeners.filter((t) => t !== e);
  }
  __attach(e, t) {
    v(this.__isNative, 'Only native driven events need to be attached.'),
      (this._attachedEvent = _r(e, t, this._argMapping));
  }
  __detach(e, t) {
    v(this.__isNative, 'Only native driven events need to be detached.'),
      this._attachedEvent && this._attachedEvent.detach();
  }
  __getHandler() {
    var e = this;
    return this.__isNative
      ? this._callListeners
      : function () {
          for (var t = arguments.length, i = new Array(t), a = 0; a < t; a++)
            i[a] = arguments[a];
          var n = (o, s, l) => {
            if (o instanceof F) typeof s == 'number' && o.setValue(s);
            else if (typeof o == 'object') for (var h in o) n(o[h], s[h]);
          };
          e._argMapping.forEach((o, s) => {
            n(o, i[s]);
          }),
            e._callListeners(...i);
        };
  }
  _callListeners() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    this._listeners.forEach((a) => a(...t));
  }
}
class _s extends J {
  constructor(e) {
    super(), (this._transforms = e);
  }
  __makeNative() {
    this._transforms.forEach((e) => {
      for (var t in e) {
        var i = e[t];
        i instanceof x && i.__makeNative();
      }
    }),
      super.__makeNative();
  }
  __getValue() {
    return this._transforms.map((e) => {
      var t = {};
      for (var i in e) {
        var a = e[i];
        a instanceof x ? (t[i] = a.__getValue()) : (t[i] = a);
      }
      return t;
    });
  }
  __getAnimatedValue() {
    return this._transforms.map((e) => {
      var t = {};
      for (var i in e) {
        var a = e[i];
        a instanceof x ? (t[i] = a.__getAnimatedValue()) : (t[i] = a);
      }
      return t;
    });
  }
  __attach() {
    this._transforms.forEach((e) => {
      for (var t in e) {
        var i = e[t];
        i instanceof x && i.__addChild(this);
      }
    });
  }
  __detach() {
    this._transforms.forEach((e) => {
      for (var t in e) {
        var i = e[t];
        i instanceof x && i.__removeChild(this);
      }
    }),
      super.__detach();
  }
  __getNativeConfig() {
    var e = [];
    return (
      this._transforms.forEach((t) => {
        for (var i in t) {
          var a = t[i];
          a instanceof x
            ? e.push({
                type: 'animated',
                property: i,
                nodeTag: a.__getNativeTag(),
              })
            : e.push({
                type: 'static',
                property: i,
                value: P.transformDataType(a),
              });
        }
      }),
      P.validateTransform(e),
      { type: 'transform', transforms: e }
    );
  }
}
var fs = de.flatten;
function Ii(r) {
  var e = fs(r),
    t = {};
  for (var i in e) {
    var a = e[i];
    i === 'transform' && Array.isArray(a)
      ? (t[i] = new _s(a))
      : a instanceof x
        ? (t[i] = a)
        : a && !Array.isArray(a) && typeof a == 'object' && (t[i] = Ii(a));
  }
  return t;
}
class Dr extends J {
  constructor(e) {
    super(), (this._inputStyle = e), (this._style = Ii(e));
  }
  _walkStyleAndGetValues(e) {
    var t = {};
    for (var i in e) {
      var a = e[i];
      a instanceof x
        ? a.__isNative || (t[i] = a.__getValue())
        : a && !Array.isArray(a) && typeof a == 'object'
          ? (t[i] = this._walkStyleAndGetValues(a))
          : (t[i] = a);
    }
    return t;
  }
  __getValue() {
    return [this._inputStyle, this._walkStyleAndGetValues(this._style)];
  }
  _walkStyleAndGetAnimatedValues(e) {
    var t = {};
    for (var i in e) {
      var a = e[i];
      a instanceof x
        ? (t[i] = a.__getAnimatedValue())
        : a &&
          !Array.isArray(a) &&
          typeof a == 'object' &&
          (t[i] = this._walkStyleAndGetAnimatedValues(a));
    }
    return t;
  }
  __getAnimatedValue() {
    return this._walkStyleAndGetAnimatedValues(this._style);
  }
  __attach() {
    for (var e in this._style) {
      var t = this._style[e];
      t instanceof x && t.__addChild(this);
    }
  }
  __detach() {
    for (var e in this._style) {
      var t = this._style[e];
      t instanceof x && t.__removeChild(this);
    }
    super.__detach();
  }
  __makeNative() {
    for (var e in this._style) {
      var t = this._style[e];
      t instanceof x && t.__makeNative();
    }
    super.__makeNative();
  }
  __getNativeConfig() {
    var e = {};
    for (var t in this._style)
      if (this._style[t] instanceof x) {
        var i = this._style[t];
        i.__makeNative(), (e[t] = i.__getNativeTag());
      }
    return P.validateStyles(e), { type: 'style', style: e };
  }
}
class ms extends x {
  constructor(e, t) {
    super(),
      e.style && (e = y(y({}, e), {}, { style: new Dr(e.style) })),
      (this._props = e),
      (this._callback = t),
      this.__attach();
  }
  __getValue() {
    var e = {};
    for (var t in this._props) {
      var i = this._props[t];
      i instanceof x
        ? (!i.__isNative || i instanceof Dr) && (e[t] = i.__getValue())
        : i instanceof Ae
          ? (e[t] = i.__getHandler())
          : (e[t] = i);
    }
    return e;
  }
  __getAnimatedValue() {
    var e = {};
    for (var t in this._props) {
      var i = this._props[t];
      i instanceof x && (e[t] = i.__getAnimatedValue());
    }
    return e;
  }
  __attach() {
    for (var e in this._props) {
      var t = this._props[e];
      t instanceof x && t.__addChild(this);
    }
  }
  __detach() {
    this.__isNative && this._animatedView && this.__disconnectAnimatedView(),
      (this._animatedView = null);
    for (var e in this._props) {
      var t = this._props[e];
      t instanceof x && t.__removeChild(this);
    }
    super.__detach();
  }
  update() {
    this._callback();
  }
  __makeNative() {
    if (!this.__isNative) {
      this.__isNative = !0;
      for (var e in this._props) {
        var t = this._props[e];
        t instanceof x && t.__makeNative();
      }
      this._animatedView && this.__connectAnimatedView();
    }
  }
  setNativeView(e) {
    this._animatedView !== e &&
      ((this._animatedView = e),
      this.__isNative && this.__connectAnimatedView());
  }
  __connectAnimatedView() {
    v(this.__isNative, 'Expected node to be marked as "native"');
    var e = this._animatedView;
    v(e != null, 'Unable to locate attached view in the native tree'),
      P.API.connectAnimatedNodeToView(this.__getNativeTag(), e);
  }
  __disconnectAnimatedView() {
    v(this.__isNative, 'Expected node to be marked as "native"');
    var e = this._animatedView;
    v(e != null, 'Unable to locate attached view in the native tree'),
      P.API.disconnectAnimatedNodeFromView(this.__getNativeTag(), e);
  }
  __restoreDefaultValues() {
    this.__isNative && P.API.restoreDefaultValues(this.__getNativeTag());
  }
  __getNativeConfig() {
    var e = {};
    for (var t in this._props) {
      var i = this._props[t];
      i instanceof x && (i.__makeNative(), (e[t] = i.__getNativeTag()));
    }
    return { type: 'props', props: e };
  }
}
function gs(r) {
  var e = g.useRef(void 0);
  return g.useCallback(
    (t) => {
      e.current && (e.current(), (e.current = void 0)),
        t != null && (e.current = r(t));
    },
    [r]
  );
}
function vs(r) {
  var e = g.useReducer((s) => s + 1, 0),
    t = e[1],
    i = g.useRef(null),
    a = g.useMemo(
      () => new ms(r, () => (i.current == null ? void 0 : i.current())),
      [r]
    );
  bs(a);
  var n = g.useCallback(
      (s) => {
        a.setNativeView(s),
          (i.current = () => {
            t();
          });
        var l = ys(s),
          h = [];
        for (var u in r) {
          var d = r[u];
          d instanceof Ae && d.__isNative && (d.__attach(l, u), h.push([u, d]));
        }
        return () => {
          i.current = null;
          for (var c = 0, f = h; c < f.length; c++) {
            var _ = f[c],
              m = _[0],
              p = _[1];
            p.__detach(l, m);
          }
        };
      },
      [r, a]
    ),
    o = gs(n);
  return [ps(a), o];
}
function ps(r) {
  return y(y({}, r.__getValue()), {}, { collapsable: !1 });
}
function bs(r) {
  var e = g.useRef(null),
    t = g.useRef(!1);
  g.useEffect(() => {}),
    Tr(
      () => (
        (t.current = !1),
        () => {
          t.current = !0;
        }
      ),
      []
    ),
    Tr(() => {
      if ((r.__attach(), e.current != null)) {
        var i = e.current;
        i.__restoreDefaultValues(), i.__detach(), (e.current = null);
      }
      return () => {
        t.current ? r.__detach() : (e.current = r);
      };
    }, [r]);
}
function ys(r) {
  return typeof r == 'object' &&
    typeof (r == null ? void 0 : r.getScrollableNode) == 'function'
    ? r.getScrollableNode()
    : r;
}
function Cs() {
  for (var r = arguments.length, e = new Array(r), t = 0; t < r; t++)
    e[t] = arguments[t];
  return g.useCallback(
    (i) => {
      for (var a = 0, n = e; a < n.length; a++) {
        var o = n[a];
        o != null && (typeof o == 'function' ? o(i) : (o.current = i));
      }
    },
    [...e]
  );
}
var ks = ['style'];
function Ie(r) {
  return g.forwardRef((e, t) => {
    var i = vs(e),
      a = i[0],
      n = i[1],
      o = Cs(n, t),
      s = a.passthroughAnimatedPropExplicitValues,
      l = a.style,
      h = s ?? {},
      u = h.style,
      d = Fe(h, ks),
      c = [l, u];
    return g.createElement(r, K({}, a, d, { style: c, ref: o }));
  });
}
var ws = g.forwardRef((r, e) =>
  g.createElement(Da, K({ scrollEventThrottle: 1e-4 }, r, { ref: e }))
);
const Ss = Ie(ws);
var Ts = [];
function Ni(r) {
  return Ts[r - 1];
}
var Is = /^data:/;
class Y {
  static has(e) {
    var t = Y._entries,
      i = Is.test(e);
    return i || !!t[e];
  }
  static add(e) {
    var t = Y._entries,
      i = Date.now();
    t[e]
      ? ((t[e].lastUsedTimestamp = i), (t[e].refCount += 1))
      : (t[e] = { lastUsedTimestamp: i, refCount: 1 });
  }
  static remove(e) {
    var t = Y._entries;
    t[e] && (t[e].refCount -= 1), Y._cleanUpIfNeeded();
  }
  static _cleanUpIfNeeded() {
    var e = Y._entries,
      t = Object.keys(e);
    if (t.length + 1 > Y._maximumEntries) {
      var i, a;
      t.forEach((n) => {
        var o = e[n];
        (!a || o.lastUsedTimestamp < a.lastUsedTimestamp) &&
          o.refCount === 0 &&
          ((i = n), (a = o));
      }),
        i && delete e[i];
    }
  }
}
Y._maximumEntries = 256;
Y._entries = {};
var Wt = 0,
  Xe = {},
  ne = {
    abort(r) {
      var e = Xe['' + r];
      e &&
        ((e.onerror = null), (e.onload = null), (e = null), delete Xe['' + r]);
    },
    getSize(r, e, t) {
      var i = !1,
        a = setInterval(o, 16),
        n = ne.load(r, o, s);
      function o() {
        var l = Xe['' + n];
        if (l) {
          var h = l.naturalHeight,
            u = l.naturalWidth;
          h && u && (e(u, h), (i = !0));
        }
        i && (ne.abort(n), clearInterval(a));
      }
      function s() {
        typeof t == 'function' && t(), ne.abort(n), clearInterval(a);
      }
    },
    has(r) {
      return Y.has(r);
    },
    load(r, e, t) {
      Wt += 1;
      var i = new window.Image();
      return (
        (i.onerror = t),
        (i.onload = (a) => {
          var n = () => e({ nativeEvent: a });
          typeof i.decode == 'function'
            ? i.decode().then(n, n)
            : setTimeout(n, 0);
        }),
        (i.src = r),
        (Xe['' + Wt] = i),
        Wt
      );
    },
    prefetch(r) {
      return new Promise((e, t) => {
        ne.load(
          r,
          () => {
            Y.add(r), Y.remove(r), e();
          },
          t
        );
      });
    },
    queryCache(r) {
      var e = {};
      return (
        r.forEach((t) => {
          Y.has(t) && (e[t] = 'disk/memory');
        }),
        Promise.resolve(e)
      );
    },
  };
class Ue {
  static get() {
    return Ir.get('window').scale;
  }
  static getFontScale() {
    return Ir.get('window').fontScale || Ue.get();
  }
  static getPixelSizeForLayoutSize(e) {
    return Math.round(e * Ue.get());
  }
  static roundToNearestPixel(e) {
    var t = Ue.get();
    return Math.round(e * t) / t;
  }
}
var Ns = [
    'aria-label',
    'accessibilityLabel',
    'blurRadius',
    'defaultSource',
    'draggable',
    'onError',
    'onLayout',
    'onLoad',
    'onLoadEnd',
    'onLoadStart',
    'pointerEvents',
    'source',
    'style',
  ],
  Ls = 'ERRORED',
  qt = 'LOADED',
  $r = 'LOADING',
  As = 'IDLE',
  xs = 0,
  Es = /^(data:image\/svg\+xml;utf8,)(.*)/;
function Rs(r, e) {
  return r && e != null
    ? g.createElement(
        'svg',
        {
          style: {
            position: 'absolute',
            height: 0,
            visibility: 'hidden',
            width: 0,
          },
        },
        g.createElement(
          'defs',
          null,
          g.createElement(
            'filter',
            { id: 'tint-' + e, suppressHydrationWarning: !0 },
            g.createElement('feFlood', { floodColor: '' + r, key: r }),
            g.createElement('feComposite', {
              in2: 'SourceAlpha',
              operator: 'in',
            })
          )
        )
      )
    : null;
}
function Vs(r, e, t, i) {
  var a = de.flatten(r),
    n = a.filter,
    o = a.resizeMode,
    s = a.shadowOffset,
    l = a.tintColor;
  a.resizeMode, a.tintColor;
  var h = [],
    u = null;
  if ((n && h.push(n), e && h.push('blur(' + e + 'px)'), s)) {
    var d = la(a);
    d && h.push('drop-shadow(' + d + ')');
  }
  return (
    (i || l) && t != null && h.push('url(#tint-' + t + ')'),
    h.length > 0 && (u = h.join(' ')),
    [o, u, l]
  );
}
function Ps(r) {
  if (typeof r == 'number') {
    var e = Ni(r),
      t = e.height,
      i = e.width;
    return { height: t, width: i };
  } else if (r != null && !Array.isArray(r) && typeof r == 'object') {
    var a = r.height,
      n = r.width;
    return { height: a, width: n };
  }
}
function Kt(r) {
  var e = null;
  if (typeof r == 'number') {
    var t = Ni(r);
    if (t == null)
      throw new Error(
        'Image: asset with ID "' +
          r +
          '" could not be found. Please check the image source or packager.'
      );
    var i = t.scales[0];
    if (t.scales.length > 1) {
      var a = Ue.get();
      i = t.scales.reduce((u, d) =>
        Math.abs(d - a) < Math.abs(u - a) ? d : u
      );
    }
    var n = i !== 1 ? '@' + i + 'x' : '';
    e = t ? t.httpServerLocation + '/' + t.name + n + '.' + t.type : '';
  } else
    typeof r == 'string'
      ? (e = r)
      : r && typeof r.uri == 'string' && (e = r.uri);
  if (e) {
    var o = e.match(Es);
    if (o) {
      var s = o[1],
        l = o[2],
        h = encodeURIComponent(l);
      return '' + s + h;
    }
  }
  return e;
}
var Li = g.forwardRef((r, e) => {
  var t = r['aria-label'],
    i = r.accessibilityLabel,
    a = r.blurRadius,
    n = r.defaultSource,
    o = r.draggable,
    s = r.onError,
    l = r.onLayout,
    h = r.onLoad,
    u = r.onLoadEnd,
    d = r.onLoadStart,
    c = r.pointerEvents,
    f = r.source,
    _ = r.style,
    m = Fe(r, Ns),
    p = t || i,
    C = g.useState(() => {
      var X = Kt(f);
      if (X != null) {
        var le = ne.has(X);
        if (le) return qt;
      }
      return As;
    }),
    k = C[0],
    L = C[1],
    N = g.useState({}),
    E = N[0],
    w = N[1],
    S = g.useContext(na),
    T = g.useRef(null),
    R = g.useRef(xs++),
    A = g.useRef(null),
    O = k === qt || (k === $r && n == null),
    H = Vs(_, a, R.current, r.tintColor),
    M = H[0],
    V = H[1],
    W = H[2],
    ee = r.resizeMode || M || 'cover',
    Ge = r.tintColor || W,
    Ye = O ? f : n,
    oe = Kt(Ye),
    Mt = Ps(Ye),
    qi = oe ? 'url("' + oe + '")' : null,
    Cr = Gi(),
    Ki = oe
      ? oa('img', {
          alt: p || '',
          style: De.accessibilityImage$raw,
          draggable: o || !1,
          ref: T,
          src: oe,
        })
      : null;
  function Gi() {
    if (T.current != null && (ee === 'center' || ee === 'repeat')) {
      var X = T.current,
        le = X.naturalHeight,
        ze = X.naturalWidth,
        kr = E.height,
        wr = E.width;
      if (le && ze && kr && wr) {
        var Sr = Math.min(1, wr / ze, kr / le),
          Ji = Math.ceil(Sr * ze),
          Qi = Math.ceil(Sr * le);
        return Ji + 'px ' + Qi + 'px';
      }
    }
  }
  function Yi(X) {
    if (ee === 'center' || ee === 'repeat' || l) {
      var le = X.nativeEvent.layout;
      l && l(X), w(le);
    }
  }
  var Je = Kt(f);
  return (
    g.useEffect(() => {
      X(),
        Je != null &&
          (L($r),
          d && d(),
          (A.current = ne.load(
            Je,
            function (ze) {
              L(qt), h && h(ze), u && u();
            },
            function () {
              L(Ls),
                s &&
                  s({
                    nativeEvent: { error: 'Failed to load resource ' + Je },
                  }),
                u && u();
            }
          )));
      function X() {
        A.current != null && (ne.abort(A.current), (A.current = null));
      }
      return X;
    }, [Je, A, L, s, h, u, d]),
    g.createElement(
      U,
      K({}, m, {
        'aria-label': p,
        onLayout: Yi,
        pointerEvents: c,
        ref: e,
        style: [De.root, S && De.inline, Mt, _, De.undo, { boxShadow: null }],
      }),
      g.createElement(U, {
        style: [
          De.image,
          Fs[ee],
          { backgroundImage: qi, filter: V },
          Cr != null && { backgroundSize: Cr },
        ],
        suppressHydrationWarning: !0,
      }),
      Ki,
      Rs(Ge, R.current)
    )
  );
});
Li.displayName = 'Image';
var Ft = Li;
Ft.getSize = function (r, e, t) {
  ne.getSize(r, e, t);
};
Ft.prefetch = function (r) {
  return ne.prefetch(r);
};
Ft.queryCache = function (r) {
  return ne.queryCache(r);
};
var De = de.create({
    root: { flexBasis: 'auto', overflow: 'hidden', zIndex: 0 },
    inline: { display: 'inline-flex' },
    undo: {
      blurRadius: null,
      shadowColor: null,
      shadowOpacity: null,
      shadowOffset: null,
      shadowRadius: null,
      tintColor: null,
      overlayColor: null,
      resizeMode: null,
    },
    image: y(
      y({}, de.absoluteFillObject),
      {},
      {
        backgroundColor: 'transparent',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%',
        width: '100%',
        zIndex: -1,
      }
    ),
    accessibilityImage$raw: y(
      y({}, de.absoluteFillObject),
      {},
      { height: '100%', opacity: 0, width: '100%', zIndex: -1 }
    ),
  }),
  Fs = de.create({
    center: { backgroundSize: 'auto' },
    contain: { backgroundSize: 'contain' },
    cover: { backgroundSize: 'cover' },
    none: { backgroundPosition: '0', backgroundSize: 'auto' },
    repeat: {
      backgroundPosition: '0',
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
    },
    stretch: { backgroundSize: '100% 100%' },
  });
const Ms = Ie(Ft);
var Os = g.forwardRef((r, e) =>
  g.createElement(nr, K({ scrollEventThrottle: 1e-4 }, r, { ref: e }))
);
const zs = Ie(Os);
var Hs = [
  'ItemSeparatorComponent',
  'SectionSeparatorComponent',
  'renderItem',
  'renderSectionFooter',
  'renderSectionHeader',
  'sections',
  'stickySectionHeadersEnabled',
];
class Ds extends g.PureComponent {
  constructor() {
    super(...arguments),
      (this._keyExtractor = (e, t) => {
        var i = this._subExtractor(t);
        return (i && i.key) || String(t);
      }),
      (this._convertViewable = (e) => {
        var t;
        v(e.index != null, 'Received a broken ViewToken');
        var i = this._subExtractor(e.index);
        if (!i) return null;
        var a = i.section.keyExtractor,
          n = this.props.keyExtractor || qe,
          o =
            a != null
              ? a(e.item, i.index)
              : n(e.item, (t = i.index) !== null && t !== void 0 ? t : 0);
        return y(y({}, e), {}, { index: i.index, key: o, section: i.section });
      }),
      (this._onViewableItemsChanged = (e) => {
        var t = e.viewableItems,
          i = e.changed,
          a = this.props.onViewableItemsChanged;
        a != null &&
          a({
            viewableItems: t.map(this._convertViewable, this).filter(Boolean),
            changed: i.map(this._convertViewable, this).filter(Boolean),
          });
      }),
      (this._renderItem = (e) => (t) => {
        var i = t.item,
          a = t.index,
          n = this._subExtractor(a);
        if (!n) return null;
        var o = n.index;
        if (o == null) {
          var s = n.section;
          if (n.header === !0) {
            var l = this.props.renderSectionHeader;
            return l ? l({ section: s }) : null;
          } else {
            var h = this.props.renderSectionFooter;
            return h ? h({ section: s }) : null;
          }
        } else {
          var u = n.section.renderItem || this.props.renderItem,
            d = this._getSeparatorComponent(a, n, e);
          return (
            v(u, 'no renderItem!'),
            g.createElement($s, {
              SeparatorComponent: d,
              LeadingSeparatorComponent:
                o === 0 ? this.props.SectionSeparatorComponent : void 0,
              cellKey: n.key,
              index: o,
              item: i,
              leadingItem: n.leadingItem,
              leadingSection: n.leadingSection,
              prevCellKey: (this._subExtractor(a - 1) || {}).key,
              setSelfHighlightCallback: this._setUpdateHighlightFor,
              setSelfUpdatePropsCallback: this._setUpdatePropsFor,
              updateHighlightFor: this._updateHighlightFor,
              updatePropsFor: this._updatePropsFor,
              renderItem: u,
              section: n.section,
              trailingItem: n.trailingItem,
              trailingSection: n.trailingSection,
              inverted: !!this.props.inverted,
            })
          );
        }
      }),
      (this._updatePropsFor = (e, t) => {
        var i = this._updatePropsMap[e];
        i != null && i(t);
      }),
      (this._updateHighlightFor = (e, t) => {
        var i = this._updateHighlightMap[e];
        i != null && i(t);
      }),
      (this._setUpdateHighlightFor = (e, t) => {
        t != null
          ? (this._updateHighlightMap[e] = t)
          : delete this._updateHighlightFor[e];
      }),
      (this._setUpdatePropsFor = (e, t) => {
        t != null
          ? (this._updatePropsMap[e] = t)
          : delete this._updatePropsMap[e];
      }),
      (this._updateHighlightMap = {}),
      (this._updatePropsMap = {}),
      (this._captureRef = (e) => {
        this._listRef = e;
      });
  }
  scrollToLocation(e) {
    for (var t = e.itemIndex, i = 0; i < e.sectionIndex; i++)
      t += this.props.getItemCount(this.props.sections[i].data) + 2;
    var a = e.viewOffset || 0;
    if (this._listRef != null) {
      if (e.itemIndex > 0 && this.props.stickySectionHeadersEnabled) {
        var n = this._listRef.__getFrameMetricsApprox(
          t - e.itemIndex,
          this._listRef.props
        );
        a += n.length;
      }
      var o = y(y({}, e), {}, { viewOffset: a, index: t });
      this._listRef.scrollToIndex(o);
    }
  }
  getListRef() {
    return this._listRef;
  }
  render() {
    var e = this.props;
    e.ItemSeparatorComponent,
      e.SectionSeparatorComponent,
      e.renderItem,
      e.renderSectionFooter,
      e.renderSectionHeader,
      e.sections,
      e.stickySectionHeadersEnabled;
    for (
      var t = Fe(e, Hs),
        i = this.props.ListHeaderComponent ? 1 : 0,
        a = this.props.stickySectionHeadersEnabled ? [] : void 0,
        n = 0,
        o = se(this.props.sections),
        s;
      !(s = o()).done;

    ) {
      var l = s.value;
      a != null && a.push(n + i),
        (n += 2),
        (n += this.props.getItemCount(l.data));
    }
    var h = this._renderItem(n);
    return g.createElement(
      G,
      K({}, t, {
        keyExtractor: this._keyExtractor,
        stickyHeaderIndices: a,
        renderItem: h,
        data: this.props.sections,
        getItem: (u, d) => this._getItem(this.props, u, d),
        getItemCount: () => n,
        onViewableItemsChanged: this.props.onViewableItemsChanged
          ? this._onViewableItemsChanged
          : void 0,
        ref: this._captureRef,
      })
    );
  }
  _getItem(e, t, i) {
    if (!t) return null;
    for (var a = i - 1, n = 0; n < t.length; n++) {
      var o = t[n],
        s = o.data,
        l = e.getItemCount(s);
      if (a === -1 || a === l) return o;
      if (a < l) return e.getItem(s, a);
      a -= l + 2;
    }
    return null;
  }
  _subExtractor(e) {
    for (
      var t = e,
        i = this.props,
        a = i.getItem,
        n = i.getItemCount,
        o = i.keyExtractor,
        s = i.sections,
        l = 0;
      l < s.length;
      l++
    ) {
      var h = s[l],
        u = h.data,
        d = h.key || String(l);
      if (((t -= 1), t >= n(u) + 1)) t -= n(u) + 1;
      else {
        if (t === -1)
          return {
            section: h,
            key: d + ':header',
            index: null,
            header: !0,
            trailingSection: s[l + 1],
          };
        if (t === n(u))
          return {
            section: h,
            key: d + ':footer',
            index: null,
            header: !1,
            trailingSection: s[l + 1],
          };
        var c = h.keyExtractor || o || qe;
        return {
          section: h,
          key: d + ':' + c(a(u, t), t),
          index: t,
          leadingItem: a(u, t - 1),
          leadingSection: s[l - 1],
          trailingItem: a(u, t + 1),
          trailingSection: s[l + 1],
        };
      }
    }
  }
  _getSeparatorComponent(e, t, i) {
    if (((t = t || this._subExtractor(e)), !t)) return null;
    var a =
        t.section.ItemSeparatorComponent || this.props.ItemSeparatorComponent,
      n = this.props.SectionSeparatorComponent,
      o = e === i - 1,
      s = t.index === this.props.getItemCount(t.section.data) - 1;
    return n && s ? n : a && !s && !o ? a : null;
  }
}
function $s(r) {
  var e = r.LeadingSeparatorComponent,
    t = r.SeparatorComponent,
    i = r.cellKey,
    a = r.prevCellKey,
    n = r.setSelfHighlightCallback,
    o = r.updateHighlightFor,
    s = r.setSelfUpdatePropsCallback,
    l = r.updatePropsFor,
    h = r.item,
    u = r.index,
    d = r.section,
    c = r.inverted,
    f = g.useState(!1),
    _ = f[0],
    m = f[1],
    p = g.useState(!1),
    C = p[0],
    k = p[1],
    L = g.useState({
      leadingItem: r.leadingItem,
      leadingSection: r.leadingSection,
      section: r.section,
      trailingItem: r.item,
      trailingSection: r.trailingSection,
    }),
    N = L[0],
    E = L[1],
    w = g.useState({
      leadingItem: r.item,
      leadingSection: r.leadingSection,
      section: r.section,
      trailingItem: r.trailingItem,
      trailingSection: r.trailingSection,
    }),
    S = w[0],
    T = w[1];
  g.useEffect(
    () => (
      n(i, k),
      s(i, T),
      () => {
        s(i, null), n(i, null);
      }
    ),
    [i, n, T, s]
  );
  var R = {
      highlight: () => {
        m(!0), k(!0), a != null && o(a, !0);
      },
      unhighlight: () => {
        m(!1), k(!1), a != null && o(a, !1);
      },
      updateProps: (M, V) => {
        M === 'leading'
          ? e != null
            ? E(y(y({}, N), V))
            : a != null && l(a, y(y({}, N), V))
          : M === 'trailing' && t != null && T(y(y({}, S), V));
      },
    },
    A = r.renderItem({ item: h, index: u, section: d, separators: R }),
    O = e != null && g.createElement(e, K({ highlighted: _ }, N)),
    H = t != null && g.createElement(t, K({ highlighted: C }, S));
  return O || H
    ? g.createElement(U, null, c === !1 ? O : H, A, c === !1 ? H : O)
    : A;
}
var Bs = ['stickySectionHeadersEnabled'];
let js = class extends g.PureComponent {
  constructor() {
    super(...arguments),
      (this._captureRef = (e) => {
        this._wrapperListRef = e;
      });
  }
  scrollToLocation(e) {
    this._wrapperListRef != null && this._wrapperListRef.scrollToLocation(e);
  }
  recordInteraction() {
    var e = this._wrapperListRef && this._wrapperListRef.getListRef();
    e && e.recordInteraction();
  }
  flashScrollIndicators() {
    var e = this._wrapperListRef && this._wrapperListRef.getListRef();
    e && e.flashScrollIndicators();
  }
  getScrollResponder() {
    var e = this._wrapperListRef && this._wrapperListRef.getListRef();
    if (e) return e.getScrollResponder();
  }
  getScrollableNode() {
    var e = this._wrapperListRef && this._wrapperListRef.getListRef();
    if (e) return e.getScrollableNode();
  }
  render() {
    var e = this.props,
      t = e.stickySectionHeadersEnabled,
      i = Fe(e, Bs),
      a = t ?? ur.OS === 'ios';
    return g.createElement(
      Ds,
      K({}, i, {
        stickySectionHeadersEnabled: a,
        ref: this._captureRef,
        getItemCount: (n) => n.length,
        getItem: (n, o) => n[o],
      })
    );
  }
};
var Us = g.forwardRef((r, e) =>
  g.createElement(js, K({ scrollEventThrottle: 1e-4 }, r, { ref: e }))
);
const Ws = Ie(Us),
  qs = Ie(ha),
  Ks = Ie(U);
class Gs extends J {
  constructor(e, t) {
    super(),
      (this._a = typeof e == 'number' ? new F(e) : e),
      (this._b = typeof t == 'number' ? new F(t) : t);
  }
  __makeNative(e) {
    this._a.__makeNative(e), this._b.__makeNative(e), super.__makeNative(e);
  }
  __getValue() {
    return this._a.__getValue() + this._b.__getValue();
  }
  interpolate(e) {
    return new Q(this, e);
  }
  __attach() {
    this._a.__addChild(this), this._b.__addChild(this);
  }
  __detach() {
    this._a.__removeChild(this), this._b.__removeChild(this), super.__detach();
  }
  __getNativeConfig() {
    return {
      type: 'addition',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()],
    };
  }
}
class Ys extends J {
  constructor(e, t, i) {
    super(),
      (this._a = e),
      (this._min = t),
      (this._max = i),
      (this._value = this._lastValue = this._a.__getValue());
  }
  __makeNative(e) {
    this._a.__makeNative(e), super.__makeNative(e);
  }
  interpolate(e) {
    return new Q(this, e);
  }
  __getValue() {
    var e = this._a.__getValue(),
      t = e - this._lastValue;
    return (
      (this._lastValue = e),
      (this._value = Math.min(Math.max(this._value + t, this._min), this._max)),
      this._value
    );
  }
  __attach() {
    this._a.__addChild(this);
  }
  __detach() {
    this._a.__removeChild(this), super.__detach();
  }
  __getNativeConfig() {
    return {
      type: 'diffclamp',
      input: this._a.__getNativeTag(),
      min: this._min,
      max: this._max,
    };
  }
}
class Js extends J {
  constructor(e, t) {
    super(),
      (this._warnedAboutDivideByZero = !1),
      (t === 0 || (t instanceof x && t.__getValue() === 0)) &&
        console.error(
          'Detected potential division by zero in AnimatedDivision'
        ),
      (this._a = typeof e == 'number' ? new F(e) : e),
      (this._b = typeof t == 'number' ? new F(t) : t);
  }
  __makeNative(e) {
    this._a.__makeNative(e), this._b.__makeNative(e), super.__makeNative(e);
  }
  __getValue() {
    var e = this._a.__getValue(),
      t = this._b.__getValue();
    return t === 0
      ? (this._warnedAboutDivideByZero ||
          (console.error('Detected division by zero in AnimatedDivision'),
          (this._warnedAboutDivideByZero = !0)),
        0)
      : ((this._warnedAboutDivideByZero = !1), e / t);
  }
  interpolate(e) {
    return new Q(this, e);
  }
  __attach() {
    this._a.__addChild(this), this._b.__addChild(this);
  }
  __detach() {
    this._a.__removeChild(this), this._b.__removeChild(this), super.__detach();
  }
  __getNativeConfig() {
    return {
      type: 'division',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()],
    };
  }
}
class Qs extends J {
  constructor(e, t) {
    super(), (this._a = e), (this._modulus = t);
  }
  __makeNative(e) {
    this._a.__makeNative(e), super.__makeNative(e);
  }
  __getValue() {
    return (
      ((this._a.__getValue() % this._modulus) + this._modulus) % this._modulus
    );
  }
  interpolate(e) {
    return new Q(this, e);
  }
  __attach() {
    this._a.__addChild(this);
  }
  __detach() {
    this._a.__removeChild(this), super.__detach();
  }
  __getNativeConfig() {
    return {
      type: 'modulus',
      input: this._a.__getNativeTag(),
      modulus: this._modulus,
    };
  }
}
class Xs extends J {
  constructor(e, t) {
    super(),
      (this._a = typeof e == 'number' ? new F(e) : e),
      (this._b = typeof t == 'number' ? new F(t) : t);
  }
  __makeNative(e) {
    this._a.__makeNative(e), this._b.__makeNative(e), super.__makeNative(e);
  }
  __getValue() {
    return this._a.__getValue() * this._b.__getValue();
  }
  interpolate(e) {
    return new Q(this, e);
  }
  __attach() {
    this._a.__addChild(this), this._b.__addChild(this);
  }
  __detach() {
    this._a.__removeChild(this), this._b.__removeChild(this), super.__detach();
  }
  __getNativeConfig() {
    return {
      type: 'multiplication',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()],
    };
  }
}
class Zs extends J {
  constructor(e, t) {
    super(),
      (this._a = typeof e == 'number' ? new F(e) : e),
      (this._b = typeof t == 'number' ? new F(t) : t);
  }
  __makeNative(e) {
    this._a.__makeNative(e), this._b.__makeNative(e), super.__makeNative(e);
  }
  __getValue() {
    return this._a.__getValue() - this._b.__getValue();
  }
  interpolate(e) {
    return new Q(this, e);
  }
  __attach() {
    this._a.__addChild(this), this._b.__addChild(this);
  }
  __detach() {
    this._a.__removeChild(this), this._b.__removeChild(this), super.__detach();
  }
  __getNativeConfig() {
    return {
      type: 'subtraction',
      input: [this._a.__getNativeTag(), this._b.__getNativeTag()],
    };
  }
}
class Ai extends x {
  constructor(e, t, i, a, n) {
    super(),
      (this._value = e),
      (this._parent = t),
      (this._animationClass = i),
      (this._animationConfig = a),
      (this._useNativeDriver = Me(a)),
      (this._callback = n),
      this.__attach();
  }
  __makeNative() {
    (this.__isNative = !0),
      this._parent.__makeNative(),
      super.__makeNative(),
      this._value.__makeNative();
  }
  __getValue() {
    return this._parent.__getValue();
  }
  __attach() {
    this._parent.__addChild(this), this._useNativeDriver && this.__makeNative();
  }
  __detach() {
    this._parent.__removeChild(this), super.__detach();
  }
  update() {
    this._value.animate(
      new this._animationClass(
        y(
          y({}, this._animationConfig),
          {},
          { toValue: this._animationConfig.toValue.__getValue() }
        )
      ),
      this._callback
    );
  }
  __getNativeConfig() {
    var e = new this._animationClass(
        y(y({}, this._animationConfig), {}, { toValue: void 0 })
      ),
      t = e.__getNativeAnimationConfig();
    return {
      type: 'tracking',
      animationId: Ti(),
      animationConfig: t,
      toValue: this._parent.__getNativeTag(),
      value: this._value.__getNativeTag(),
    };
  }
}
var en = 1;
class fr extends J {
  constructor(e) {
    super();
    var t = e || { x: 0, y: 0 };
    typeof t.x == 'number' && typeof t.y == 'number'
      ? ((this.x = new F(t.x)), (this.y = new F(t.y)))
      : (v(
          t.x instanceof F && t.y instanceof F,
          'AnimatedValueXY must be initialized with an object of numbers or AnimatedValues.'
        ),
        (this.x = t.x),
        (this.y = t.y)),
      (this._listeners = {});
  }
  setValue(e) {
    this.x.setValue(e.x), this.y.setValue(e.y);
  }
  setOffset(e) {
    this.x.setOffset(e.x), this.y.setOffset(e.y);
  }
  flattenOffset() {
    this.x.flattenOffset(), this.y.flattenOffset();
  }
  extractOffset() {
    this.x.extractOffset(), this.y.extractOffset();
  }
  __getValue() {
    return { x: this.x.__getValue(), y: this.y.__getValue() };
  }
  resetAnimation(e) {
    this.x.resetAnimation(), this.y.resetAnimation(), e && e(this.__getValue());
  }
  stopAnimation(e) {
    this.x.stopAnimation(), this.y.stopAnimation(), e && e(this.__getValue());
  }
  addListener(e) {
    var t = String(en++),
      i = (a) => {
        a.value, e(this.__getValue());
      };
    return (
      (this._listeners[t] = {
        x: this.x.addListener(i),
        y: this.y.addListener(i),
      }),
      t
    );
  }
  removeListener(e) {
    this.x.removeListener(this._listeners[e].x),
      this.y.removeListener(this._listeners[e].y),
      delete this._listeners[e];
  }
  removeAllListeners() {
    this.x.removeAllListeners(),
      this.y.removeAllListeners(),
      (this._listeners = {});
  }
  getLayout() {
    return { left: this.x, top: this.y };
  }
  getTranslateTransform() {
    return [{ translateX: this.x }, { translateY: this.y }];
  }
}
var Br = 1;
class mr {
  start(e, t, i, a, n) {}
  stop() {
    this.__nativeId && P.API.stopAnimation(this.__nativeId);
  }
  __getNativeAnimationConfig() {
    throw new Error('This animation type cannot be offloaded to native');
  }
  __debouncedOnEnd(e) {
    var t = this.__onEnd;
    (this.__onEnd = null), t && t(e);
  }
  __startNativeAnimation(e) {
    var t = Br + ':startAnimation';
    (Br += 1), P.API.setWaitingForIdentifier(t);
    try {
      var i = this.__getNativeAnimationConfig();
      e.__makeNative(i.platformConfig),
        (this.__nativeId = P.generateNewAnimationId()),
        P.API.startAnimatingNode(
          this.__nativeId,
          e.__getNativeTag(),
          i,
          this.__debouncedOnEnd.bind(this)
        );
    } catch (a) {
      throw a;
    } finally {
      P.API.unsetWaitingForIdentifier(t);
    }
  }
}
class tn extends mr {
  constructor(e) {
    var t, i, a;
    super(),
      (this._deceleration =
        (t = e.deceleration) !== null && t !== void 0 ? t : 0.998),
      (this._velocity = e.velocity),
      (this._useNativeDriver = Me(e)),
      (this.__isInteraction =
        (i = e.isInteraction) !== null && i !== void 0
          ? i
          : !this._useNativeDriver),
      (this.__iterations = (a = e.iterations) !== null && a !== void 0 ? a : 1);
  }
  __getNativeAnimationConfig() {
    return {
      type: 'decay',
      deceleration: this._deceleration,
      velocity: this._velocity,
      iterations: this.__iterations,
    };
  }
  start(e, t, i, a, n) {
    (this.__active = !0),
      (this._lastValue = e),
      (this._fromValue = e),
      (this._onUpdate = t),
      (this.__onEnd = i),
      (this._startTime = Date.now()),
      this._useNativeDriver
        ? this.__startNativeAnimation(n)
        : (this._animationFrame = requestAnimationFrame(
            this.onUpdate.bind(this)
          ));
  }
  onUpdate() {
    var e = Date.now(),
      t =
        this._fromValue +
        (this._velocity / (1 - this._deceleration)) *
          (1 - Math.exp(-(1 - this._deceleration) * (e - this._startTime)));
    if ((this._onUpdate(t), Math.abs(this._lastValue - t) < 0.1)) {
      this.__debouncedOnEnd({ finished: !0 });
      return;
    }
    (this._lastValue = t),
      this.__active &&
        (this._animationFrame = requestAnimationFrame(
          this.onUpdate.bind(this)
        ));
  }
  stop() {
    super.stop(),
      (this.__active = !1),
      globalThis.cancelAnimationFrame(this._animationFrame),
      this.__debouncedOnEnd({ finished: !1 });
  }
}
function xi(r) {
  return (r - 30) * 3.62 + 194;
}
function Ei(r) {
  return (r - 8) * 3 + 25;
}
function rn(r, e) {
  return { stiffness: xi(r), damping: Ei(e) };
}
function an(r, e) {
  function t(_, m, p) {
    return (_ - m) / (p - m);
  }
  function i(_, m, p) {
    return m + _ * (p - m);
  }
  function a(_, m, p) {
    return _ * p + (1 - _) * m;
  }
  function n(_, m, p) {
    return a(2 * _ - _ * _, m, p);
  }
  function o(_) {
    return 7e-4 * Math.pow(_, 3) - 0.031 * Math.pow(_, 2) + 0.64 * _ + 1.28;
  }
  function s(_) {
    return 44e-6 * Math.pow(_, 3) - 0.006 * Math.pow(_, 2) + 0.36 * _ + 2;
  }
  function l(_) {
    return 45e-8 * Math.pow(_, 3) - 332e-6 * Math.pow(_, 2) + 0.1078 * _ + 5.84;
  }
  function h(_) {
    return _ <= 18 ? o(_) : _ > 18 && _ <= 44 ? s(_) : l(_);
  }
  var u = t(r / 1.7, 0, 20);
  u = i(u, 0, 0.8);
  var d = t(e / 1.7, 0, 20),
    c = i(d, 0.5, 200),
    f = n(u, h(c), 0.01);
  return { stiffness: xi(c), damping: Ei(f) };
}
const jr = { fromOrigamiTensionAndFriction: rn, fromBouncinessAndSpeed: an };
var Gt = P.API,
  Ze = { r: 0, g: 0, b: 0, a: 1 },
  sn = 1,
  nn = (r) => r;
function Ur(r) {
  if (r == null) return null;
  if (or(r)) return r;
  var e = gi(r);
  if (e == null) return null;
  if (typeof e == 'object') {
    var t = nn(e);
    if (t != null) return t;
  } else if (typeof e == 'number') {
    var i = (e & 4278190080) >>> 24,
      a = (e & 16711680) >>> 16,
      n = (e & 65280) >>> 8,
      o = (e & 255) / 255;
    return { r: i, g: a, b: n, a: o };
  }
  return null;
}
function or(r) {
  return (
    r &&
    typeof r.r == 'number' &&
    typeof r.g == 'number' &&
    typeof r.b == 'number' &&
    typeof r.a == 'number'
  );
}
function on(r) {
  return (
    r &&
    r.r instanceof F &&
    r.g instanceof F &&
    r.b instanceof F &&
    r.a instanceof F
  );
}
class gr extends J {
  constructor(e, t) {
    super(), (this._listeners = {});
    var i = e ?? Ze;
    if (on(i)) {
      var a = i;
      (this.r = a.r), (this.g = a.g), (this.b = a.b), (this.a = a.a);
    } else {
      var n,
        o = (n = Ur(i)) !== null && n !== void 0 ? n : Ze,
        s = Ze;
      or(o) ? (s = o) : (this.nativeColor = o),
        (this.r = new F(s.r)),
        (this.g = new F(s.g)),
        (this.b = new F(s.b)),
        (this.a = new F(s.a));
    }
    (this.nativeColor || (t && t.useNativeDriver)) && this.__makeNative();
  }
  setValue(e) {
    var t,
      i = !1;
    if (this.__isNative) {
      var a = this.__getNativeTag();
      Gt.setWaitingForIdentifier(a.toString());
    }
    var n = (t = Ur(e)) !== null && t !== void 0 ? t : Ze;
    if (or(n)) {
      var o = n;
      this.r.setValue(o.r),
        this.g.setValue(o.g),
        this.b.setValue(o.b),
        this.a.setValue(o.a),
        this.nativeColor != null && ((this.nativeColor = null), (i = !0));
    } else {
      var s = n;
      this.nativeColor !== s && ((this.nativeColor = s), (i = !0));
    }
    if (this.__isNative) {
      var l = this.__getNativeTag();
      i && Gt.updateAnimatedNodeConfig(l, this.__getNativeConfig()),
        Gt.unsetWaitingForIdentifier(l.toString());
    }
  }
  setOffset(e) {
    this.r.setOffset(e.r),
      this.g.setOffset(e.g),
      this.b.setOffset(e.b),
      this.a.setOffset(e.a);
  }
  flattenOffset() {
    this.r.flattenOffset(),
      this.g.flattenOffset(),
      this.b.flattenOffset(),
      this.a.flattenOffset();
  }
  extractOffset() {
    this.r.extractOffset(),
      this.g.extractOffset(),
      this.b.extractOffset(),
      this.a.extractOffset();
  }
  addListener(e) {
    var t = String(sn++),
      i = (a) => {
        a.value, e(this.__getValue());
      };
    return (
      (this._listeners[t] = {
        r: this.r.addListener(i),
        g: this.g.addListener(i),
        b: this.b.addListener(i),
        a: this.a.addListener(i),
      }),
      t
    );
  }
  removeListener(e) {
    this.r.removeListener(this._listeners[e].r),
      this.g.removeListener(this._listeners[e].g),
      this.b.removeListener(this._listeners[e].b),
      this.a.removeListener(this._listeners[e].a),
      delete this._listeners[e];
  }
  removeAllListeners() {
    this.r.removeAllListeners(),
      this.g.removeAllListeners(),
      this.b.removeAllListeners(),
      this.a.removeAllListeners(),
      (this._listeners = {});
  }
  stopAnimation(e) {
    this.r.stopAnimation(),
      this.g.stopAnimation(),
      this.b.stopAnimation(),
      this.a.stopAnimation(),
      e && e(this.__getValue());
  }
  resetAnimation(e) {
    this.r.resetAnimation(),
      this.g.resetAnimation(),
      this.b.resetAnimation(),
      this.a.resetAnimation(),
      e && e(this.__getValue());
  }
  __getValue() {
    return this.nativeColor != null
      ? this.nativeColor
      : 'rgba(' +
          this.r.__getValue() +
          ', ' +
          this.g.__getValue() +
          ', ' +
          this.b.__getValue() +
          ', ' +
          this.a.__getValue() +
          ')';
  }
  __attach() {
    this.r.__addChild(this),
      this.g.__addChild(this),
      this.b.__addChild(this),
      this.a.__addChild(this),
      super.__attach();
  }
  __detach() {
    this.r.__removeChild(this),
      this.g.__removeChild(this),
      this.b.__removeChild(this),
      this.a.__removeChild(this),
      super.__detach();
  }
  __makeNative(e) {
    this.r.__makeNative(e),
      this.g.__makeNative(e),
      this.b.__makeNative(e),
      this.a.__makeNative(e),
      super.__makeNative(e);
  }
  __getNativeConfig() {
    return {
      type: 'color',
      r: this.r.__getNativeTag(),
      g: this.g.__getNativeTag(),
      b: this.b.__getNativeTag(),
      a: this.a.__getNativeTag(),
      nativeColor: this.nativeColor,
    };
  }
}
class At extends mr {
  constructor(e) {
    var t, i, a, n, o, s, l, h;
    if (
      (super(),
      (this._overshootClamping =
        (t = e.overshootClamping) !== null && t !== void 0 ? t : !1),
      (this._restDisplacementThreshold =
        (i = e.restDisplacementThreshold) !== null && i !== void 0 ? i : 0.001),
      (this._restSpeedThreshold =
        (a = e.restSpeedThreshold) !== null && a !== void 0 ? a : 0.001),
      (this._initialVelocity =
        (n = e.velocity) !== null && n !== void 0 ? n : 0),
      (this._lastVelocity = (o = e.velocity) !== null && o !== void 0 ? o : 0),
      (this._toValue = e.toValue),
      (this._delay = (s = e.delay) !== null && s !== void 0 ? s : 0),
      (this._useNativeDriver = Me(e)),
      (this._platformConfig = e.platformConfig),
      (this.__isInteraction =
        (l = e.isInteraction) !== null && l !== void 0
          ? l
          : !this._useNativeDriver),
      (this.__iterations = (h = e.iterations) !== null && h !== void 0 ? h : 1),
      e.stiffness !== void 0 || e.damping !== void 0 || e.mass !== void 0)
    ) {
      var u, d, c;
      v(
        e.bounciness === void 0 &&
          e.speed === void 0 &&
          e.tension === void 0 &&
          e.friction === void 0,
        'You can define one of bounciness/speed, tension/friction, or stiffness/damping/mass, but not more than one'
      ),
        (this._stiffness =
          (u = e.stiffness) !== null && u !== void 0 ? u : 100),
        (this._damping = (d = e.damping) !== null && d !== void 0 ? d : 10),
        (this._mass = (c = e.mass) !== null && c !== void 0 ? c : 1);
    } else if (e.bounciness !== void 0 || e.speed !== void 0) {
      var f, _;
      v(
        e.tension === void 0 &&
          e.friction === void 0 &&
          e.stiffness === void 0 &&
          e.damping === void 0 &&
          e.mass === void 0,
        'You can define one of bounciness/speed, tension/friction, or stiffness/damping/mass, but not more than one'
      );
      var m = jr.fromBouncinessAndSpeed(
        (f = e.bounciness) !== null && f !== void 0 ? f : 8,
        (_ = e.speed) !== null && _ !== void 0 ? _ : 12
      );
      (this._stiffness = m.stiffness),
        (this._damping = m.damping),
        (this._mass = 1);
    } else {
      var p,
        C,
        k = jr.fromOrigamiTensionAndFriction(
          (p = e.tension) !== null && p !== void 0 ? p : 40,
          (C = e.friction) !== null && C !== void 0 ? C : 7
        );
      (this._stiffness = k.stiffness),
        (this._damping = k.damping),
        (this._mass = 1);
    }
    v(this._stiffness > 0, 'Stiffness value must be greater than 0'),
      v(this._damping > 0, 'Damping value must be greater than 0'),
      v(this._mass > 0, 'Mass value must be greater than 0');
  }
  __getNativeAnimationConfig() {
    var e;
    return {
      type: 'spring',
      overshootClamping: this._overshootClamping,
      restDisplacementThreshold: this._restDisplacementThreshold,
      restSpeedThreshold: this._restSpeedThreshold,
      stiffness: this._stiffness,
      damping: this._damping,
      mass: this._mass,
      initialVelocity:
        (e = this._initialVelocity) !== null && e !== void 0
          ? e
          : this._lastVelocity,
      toValue: this._toValue,
      iterations: this.__iterations,
      platformConfig: this._platformConfig,
    };
  }
  start(e, t, i, a, n) {
    if (
      ((this.__active = !0),
      (this._startPosition = e),
      (this._lastPosition = this._startPosition),
      (this._onUpdate = t),
      (this.__onEnd = i),
      (this._lastTime = Date.now()),
      (this._frameTime = 0),
      a instanceof At)
    ) {
      var o = a.getInternalState();
      (this._lastPosition = o.lastPosition),
        (this._lastVelocity = o.lastVelocity),
        (this._initialVelocity = this._lastVelocity),
        (this._lastTime = o.lastTime);
    }
    var s = () => {
      this._useNativeDriver ? this.__startNativeAnimation(n) : this.onUpdate();
    };
    this._delay ? (this._timeout = setTimeout(s, this._delay)) : s();
  }
  getInternalState() {
    return {
      lastPosition: this._lastPosition,
      lastVelocity: this._lastVelocity,
      lastTime: this._lastTime,
    };
  }
  onUpdate() {
    var e = 64,
      t = Date.now();
    t > this._lastTime + e && (t = this._lastTime + e);
    var i = (t - this._lastTime) / 1e3;
    this._frameTime += i;
    var a = this._damping,
      n = this._mass,
      o = this._stiffness,
      s = -this._initialVelocity,
      l = a / (2 * Math.sqrt(o * n)),
      h = Math.sqrt(o / n),
      u = h * Math.sqrt(1 - l * l),
      d = this._toValue - this._startPosition,
      c = 0,
      f = 0,
      _ = this._frameTime;
    if (l < 1) {
      var m = Math.exp(-l * h * _);
      (c =
        this._toValue -
        m * (((s + l * h * d) / u) * Math.sin(u * _) + d * Math.cos(u * _))),
        (f =
          l *
            h *
            m *
            ((Math.sin(u * _) * (s + l * h * d)) / u + d * Math.cos(u * _)) -
          m * (Math.cos(u * _) * (s + l * h * d) - u * d * Math.sin(u * _)));
    } else {
      var p = Math.exp(-h * _);
      (c = this._toValue - p * (d + (s + h * d) * _)),
        (f = p * (s * (_ * h - 1) + _ * d * (h * h)));
    }
    if (
      ((this._lastTime = t),
      (this._lastPosition = c),
      (this._lastVelocity = f),
      this._onUpdate(c),
      !!this.__active)
    ) {
      var C = !1;
      this._overshootClamping &&
        this._stiffness !== 0 &&
        (this._startPosition < this._toValue
          ? (C = c > this._toValue)
          : (C = c < this._toValue));
      var k = Math.abs(f) <= this._restSpeedThreshold,
        L = !0;
      if (
        (this._stiffness !== 0 &&
          (L = Math.abs(this._toValue - c) <= this._restDisplacementThreshold),
        C || (k && L))
      ) {
        this._stiffness !== 0 &&
          ((this._lastPosition = this._toValue),
          (this._lastVelocity = 0),
          this._onUpdate(this._toValue)),
          this.__debouncedOnEnd({ finished: !0 });
        return;
      }
      this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
    }
  }
  stop() {
    super.stop(),
      (this.__active = !1),
      clearTimeout(this._timeout),
      globalThis.cancelAnimationFrame(this._animationFrame),
      this.__debouncedOnEnd({ finished: !1 });
  }
}
var ln = 4,
  hn = 0.001,
  un = 1e-7,
  dn = 10,
  Be = 11,
  et = 1 / (Be - 1),
  cn = typeof Float32Array == 'function';
function Ri(r, e) {
  return 1 - 3 * e + 3 * r;
}
function Vi(r, e) {
  return 3 * e - 6 * r;
}
function Pi(r) {
  return 3 * r;
}
function xt(r, e, t) {
  return ((Ri(e, t) * r + Vi(e, t)) * r + Pi(e)) * r;
}
function Fi(r, e, t) {
  return 3 * Ri(e, t) * r * r + 2 * Vi(e, t) * r + Pi(e);
}
function _n(r, e, t, i, a) {
  var n,
    o,
    s = 0,
    l = e,
    h = t;
  do (o = l + (h - l) / 2), (n = xt(o, i, a) - r), n > 0 ? (h = o) : (l = o);
  while (Math.abs(n) > un && ++s < dn);
  return o;
}
function fn(r, e, t, i) {
  for (var a = e, n = 0; n < ln; ++n) {
    var o = Fi(a, t, i);
    if (o === 0) return a;
    var s = xt(a, t, i) - r;
    a -= s / o;
  }
  return a;
}
function mn(r, e, t, i) {
  if (!(r >= 0 && r <= 1 && t >= 0 && t <= 1))
    throw new Error('bezier x values must be in [0, 1] range');
  var a = cn ? new Float32Array(Be) : new Array(Be);
  if (r !== e || t !== i) for (var n = 0; n < Be; ++n) a[n] = xt(n * et, r, t);
  function o(s) {
    for (var l = 0, h = 1, u = Be - 1; h !== u && a[h] <= s; ++h) l += et;
    --h;
    var d = (s - a[h]) / (a[h + 1] - a[h]),
      c = l + d * et,
      f = Fi(c, r, t);
    return f >= hn ? fn(s, c, r, t) : f === 0 ? c : _n(s, l, l + et, r, t);
  }
  return function (l) {
    return r === e && t === i ? l : l === 0 ? 0 : l === 1 ? 1 : xt(o(l), e, i);
  };
}
var Yt;
class Et {
  static step0(e) {
    return e > 0 ? 1 : 0;
  }
  static step1(e) {
    return e >= 1 ? 1 : 0;
  }
  static linear(e) {
    return e;
  }
  static ease(e) {
    return Yt || (Yt = Et.bezier(0.42, 0, 1, 1)), Yt(e);
  }
  static quad(e) {
    return e * e;
  }
  static cubic(e) {
    return e * e * e;
  }
  static poly(e) {
    return (t) => Math.pow(t, e);
  }
  static sin(e) {
    return 1 - Math.cos((e * Math.PI) / 2);
  }
  static circle(e) {
    return 1 - Math.sqrt(1 - e * e);
  }
  static exp(e) {
    return Math.pow(2, 10 * (e - 1));
  }
  static elastic(e) {
    e === void 0 && (e = 1);
    var t = e * Math.PI;
    return (i) =>
      1 - Math.pow(Math.cos((i * Math.PI) / 2), 3) * Math.cos(i * t);
  }
  static back(e) {
    return e === void 0 && (e = 1.70158), (t) => t * t * ((e + 1) * t - e);
  }
  static bounce(e) {
    if (e < 1 / 2.75) return 7.5625 * e * e;
    if (e < 2 / 2.75) {
      var t = e - 0.5454545454545454;
      return 7.5625 * t * t + 0.75;
    }
    if (e < 2.5 / 2.75) {
      var i = e - 0.8181818181818182;
      return 7.5625 * i * i + 0.9375;
    }
    var a = e - 2.625 / 2.75;
    return 7.5625 * a * a + 0.984375;
  }
  static bezier(e, t, i, a) {
    return mn(e, t, i, a);
  }
  static in(e) {
    return e;
  }
  static out(e) {
    return (t) => 1 - e(1 - t);
  }
  static inOut(e) {
    return (t) => (t < 0.5 ? e(t * 2) / 2 : 1 - e((1 - t) * 2) / 2);
  }
}
var Jt;
function gn() {
  return Jt || (Jt = Et.inOut(Et.ease)), Jt;
}
class Wr extends mr {
  constructor(e) {
    var t, i, a, n, o;
    super(),
      (this._toValue = e.toValue),
      (this._easing = (t = e.easing) !== null && t !== void 0 ? t : gn()),
      (this._duration = (i = e.duration) !== null && i !== void 0 ? i : 500),
      (this._delay = (a = e.delay) !== null && a !== void 0 ? a : 0),
      (this.__iterations = (n = e.iterations) !== null && n !== void 0 ? n : 1),
      (this._useNativeDriver = Me(e)),
      (this._platformConfig = e.platformConfig),
      (this.__isInteraction =
        (o = e.isInteraction) !== null && o !== void 0
          ? o
          : !this._useNativeDriver);
  }
  __getNativeAnimationConfig() {
    for (
      var e = 16.666666666666668,
        t = [],
        i = Math.round(this._duration / e),
        a = 0;
      a < i;
      a++
    )
      t.push(this._easing(a / i));
    return (
      t.push(this._easing(1)),
      {
        type: 'frames',
        frames: t,
        toValue: this._toValue,
        iterations: this.__iterations,
        platformConfig: this._platformConfig,
      }
    );
  }
  start(e, t, i, a, n) {
    (this.__active = !0),
      (this._fromValue = e),
      (this._onUpdate = t),
      (this.__onEnd = i);
    var o = () => {
      this._duration === 0 && !this._useNativeDriver
        ? (this._onUpdate(this._toValue),
          this.__debouncedOnEnd({ finished: !0 }))
        : ((this._startTime = Date.now()),
          this._useNativeDriver
            ? this.__startNativeAnimation(n)
            : (this._animationFrame = requestAnimationFrame(
                this.onUpdate.bind(this)
              )));
    };
    this._delay ? (this._timeout = setTimeout(o, this._delay)) : o();
  }
  onUpdate() {
    var e = Date.now();
    if (e >= this._startTime + this._duration) {
      this._duration === 0
        ? this._onUpdate(this._toValue)
        : this._onUpdate(
            this._fromValue +
              this._easing(1) * (this._toValue - this._fromValue)
          ),
        this.__debouncedOnEnd({ finished: !0 });
      return;
    }
    this._onUpdate(
      this._fromValue +
        this._easing((e - this._startTime) / this._duration) *
          (this._toValue - this._fromValue)
    ),
      this.__active &&
        (this._animationFrame = requestAnimationFrame(
          this.onUpdate.bind(this)
        ));
  }
  stop() {
    super.stop(),
      (this.__active = !1),
      clearTimeout(this._timeout),
      globalThis.cancelAnimationFrame(this._animationFrame),
      this.__debouncedOnEnd({ finished: !1 });
  }
}
var vn = function (e, t) {
    return new Gs(e, t);
  },
  pn = function (e, t) {
    return new Zs(e, t);
  },
  bn = function (e, t) {
    return new Js(e, t);
  },
  yn = function (e, t) {
    return new Xs(e, t);
  },
  Cn = function (e, t) {
    return new Qs(e, t);
  },
  kn = function (e, t, i) {
    return new Ys(e, t, i);
  },
  vr = function (e, t) {
    return e && t.onComplete
      ? function () {
          t.onComplete && t.onComplete(...arguments), e && e(...arguments);
        }
      : e || t.onComplete;
  },
  pr = function (e, t, i) {
    if (e instanceof fr) {
      var a = y({}, t),
        n = y({}, t);
      for (var o in t) {
        var s = t[o],
          l = s.x,
          h = s.y;
        l !== void 0 && h !== void 0 && ((a[o] = l), (n[o] = h));
      }
      var u = i(e.x, a),
        d = i(e.y, n);
      return Rt([u, d], { stopTogether: !1 });
    } else if (e instanceof gr) {
      var c = y({}, t),
        f = y({}, t),
        _ = y({}, t),
        m = y({}, t);
      for (var p in t) {
        var C = t[p],
          k = C.r,
          L = C.g,
          N = C.b,
          E = C.a;
        k !== void 0 &&
          L !== void 0 &&
          N !== void 0 &&
          E !== void 0 &&
          ((c[p] = k), (f[p] = L), (_[p] = N), (m[p] = E));
      }
      var w = i(e.r, c),
        S = i(e.g, f),
        T = i(e.b, _),
        R = i(e.a, m);
      return Rt([w, S, T, R], { stopTogether: !1 });
    }
    return null;
  },
  wn = function r(e, t) {
    var i = function (n, o, s) {
      s = vr(s, o);
      var l = n,
        h = o;
      l.stopTracking(),
        o.toValue instanceof x
          ? l.track(new Ai(l, o.toValue, At, h, s))
          : l.animate(new At(h), s);
    };
    return (
      pr(e, t, r) || {
        start: function (n) {
          i(e, t, n);
        },
        stop: function () {
          e.stopAnimation();
        },
        reset: function () {
          e.resetAnimation();
        },
        _startNativeLoop: function (n) {
          var o = y(y({}, t), {}, { iterations: n });
          i(e, o);
        },
        _isUsingNativeDriver: function () {
          return t.useNativeDriver || !1;
        },
      }
    );
  },
  Mi = function r(e, t) {
    var i = function (n, o, s) {
      s = vr(s, o);
      var l = n,
        h = o;
      l.stopTracking(),
        o.toValue instanceof x
          ? l.track(new Ai(l, o.toValue, Wr, h, s))
          : l.animate(new Wr(h), s);
    };
    return (
      pr(e, t, r) || {
        start: function (n) {
          i(e, t, n);
        },
        stop: function () {
          e.stopAnimation();
        },
        reset: function () {
          e.resetAnimation();
        },
        _startNativeLoop: function (n) {
          var o = y(y({}, t), {}, { iterations: n });
          i(e, o);
        },
        _isUsingNativeDriver: function () {
          return t.useNativeDriver || !1;
        },
      }
    );
  },
  Sn = function r(e, t) {
    var i = function (n, o, s) {
      s = vr(s, o);
      var l = n,
        h = o;
      l.stopTracking(), l.animate(new tn(h), s);
    };
    return (
      pr(e, t, r) || {
        start: function (n) {
          i(e, t, n);
        },
        stop: function () {
          e.stopAnimation();
        },
        reset: function () {
          e.resetAnimation();
        },
        _startNativeLoop: function (n) {
          var o = y(y({}, t), {}, { iterations: n });
          i(e, o);
        },
        _isUsingNativeDriver: function () {
          return t.useNativeDriver || !1;
        },
      }
    );
  },
  Oi = function (e) {
    var t = 0;
    return {
      start: function (a) {
        var n = function o(s) {
          if (!s.finished) {
            a && a(s);
            return;
          }
          if ((t++, t === e.length)) {
            (t = 0), a && a(s);
            return;
          }
          e[t].start(o);
        };
        e.length === 0 ? a && a({ finished: !0 }) : e[t].start(n);
      },
      stop: function () {
        t < e.length && e[t].stop();
      },
      reset: function () {
        e.forEach((a, n) => {
          n <= t && a.reset();
        }),
          (t = 0);
      },
      _startNativeLoop: function () {
        throw new Error(
          'Loops run using the native driver cannot contain Animated.sequence animations'
        );
      },
      _isUsingNativeDriver: function () {
        return !1;
      },
    };
  },
  Rt = function (e, t) {
    var i = 0,
      a = {},
      n = !(t && t.stopTogether === !1),
      o = {
        start: function (l) {
          if (i === e.length) {
            l && l({ finished: !0 });
            return;
          }
          e.forEach((h, u) => {
            var d = function (f) {
              if (((a[u] = !0), i++, i === e.length)) {
                (i = 0), l && l(f);
                return;
              }
              !f.finished && n && o.stop();
            };
            h ? h.start(d) : d({ finished: !0 });
          });
        },
        stop: function () {
          e.forEach((l, h) => {
            !a[h] && l.stop(), (a[h] = !0);
          });
        },
        reset: function () {
          e.forEach((l, h) => {
            l.reset(), (a[h] = !1), (i = 0);
          });
        },
        _startNativeLoop: function () {
          throw new Error(
            'Loops run using the native driver cannot contain Animated.parallel animations'
          );
        },
        _isUsingNativeDriver: function () {
          return !1;
        },
      };
    return o;
  },
  zi = function (e) {
    return Mi(new F(0), {
      toValue: 0,
      delay: e,
      duration: 0,
      useNativeDriver: !1,
    });
  },
  Tn = function (e, t) {
    return Rt(t.map((i, a) => Oi([zi(e * a), i])));
  },
  In = function (e, t) {
    var i = t === void 0 ? {} : t,
      a = i.iterations,
      n = a === void 0 ? -1 : a,
      o = i.resetBeforeIteration,
      s = o === void 0 ? !0 : o,
      l = !1,
      h = 0;
    return {
      start: function (d) {
        var c = function f(_) {
          _ === void 0 && (_ = { finished: !0 }),
            l || h === n || _.finished === !1
              ? d && d(_)
              : (h++, s && e.reset(), e.start(f));
        };
        !e || n === 0
          ? d && d({ finished: !0 })
          : e._isUsingNativeDriver()
            ? e._startNativeLoop(n)
            : c();
      },
      stop: function () {
        (l = !0), e.stop();
      },
      reset: function () {
        (h = 0), (l = !1), e.reset();
      },
      _startNativeLoop: function () {
        throw new Error(
          'Loops run using the native driver cannot contain Animated.loop animations'
        );
      },
      _isUsingNativeDriver: function () {
        return e._isUsingNativeDriver();
      },
    };
  };
function Nn(r, e) {
  return r
    ? r instanceof Ae
      ? (r.__addListener(e), r)
      : function () {
          typeof r == 'function' && r(...arguments), e(...arguments);
        }
    : e;
}
function Ln(r, e) {
  r && r instanceof Ae && r.__removeListener(e);
}
var An = function (e, t) {
  var i = new Ae(e, t);
  return i.__isNative ? i : i.__getHandler();
};
const re = {
  Value: F,
  ValueXY: fr,
  Color: gr,
  Interpolation: Q,
  Node: x,
  decay: Sn,
  timing: Mi,
  spring: wn,
  add: vn,
  subtract: pn,
  divide: bn,
  multiply: yn,
  modulo: Cn,
  diffClamp: kn,
  delay: zi,
  sequence: Oi,
  parallel: Rt,
  stagger: Tn,
  loop: In,
  event: An,
  createAnimatedComponent: Ie,
  attachNativeEvent: _r,
  forkEvent: Nn,
  unforkEvent: Ln,
  Event: Ae,
};
var Qt = !1;
function br(r) {
  return (e) => {
    var t =
      e == null
        ? e
        : function () {
            if (Qt) {
              console.warn(
                'Ignoring recursive animation callback when running mock animations'
              );
              return;
            }
            Qt = !0;
            try {
              e(...arguments);
            } finally {
              Qt = !1;
            }
          };
    r(t);
  };
}
var Oe = {
    start: () => {},
    stop: () => {},
    reset: () => {},
    _startNativeLoop: () => {},
    _isUsingNativeDriver: () => !1,
  },
  yr = (r) =>
    y(
      y({}, Oe),
      {},
      {
        start: br((e) => {
          r.forEach((t) => t.start()), e == null || e({ finished: !0 });
        }),
      }
    ),
  xn = function (e, t) {
    var i = e;
    return y(
      y({}, Oe),
      {},
      {
        start: br((a) => {
          i.setValue(t.toValue), a == null || a({ finished: !0 });
        }),
      }
    );
  },
  En = function (e, t) {
    var i = e;
    return y(
      y({}, Oe),
      {},
      {
        start: br((a) => {
          i.setValue(t.toValue), a == null || a({ finished: !0 });
        }),
      }
    );
  },
  Rn = function (e, t) {
    return Oe;
  },
  Vn = function (e) {
    return yr(e);
  },
  Pn = function (e, t) {
    return yr(e);
  },
  Fn = function (e) {
    return Oe;
  },
  Mn = function (e, t) {
    return yr(t);
  },
  On = function (e, t) {
    var i = t === void 0 ? {} : t;
    return i.iterations, Oe;
  };
const zn = {
  Value: F,
  ValueXY: fr,
  Color: gr,
  Interpolation: Q,
  Node: x,
  decay: Rn,
  timing: En,
  spring: xn,
  add: re.add,
  subtract: re.subtract,
  divide: re.divide,
  multiply: re.multiply,
  modulo: re.modulo,
  diffClamp: re.diffClamp,
  delay: Fn,
  sequence: Vn,
  parallel: Pn,
  stagger: Mn,
  loop: On,
  event: re.event,
  createAnimatedComponent: Ie,
  attachNativeEvent: _r,
  forkEvent: re.forkEvent,
  unforkEvent: re.unforkEvent,
  Event: Ae,
};
var Hn = ur.isTesting ? zn : re;
const ue = y(
  {
    FlatList: Ss,
    Image: Ms,
    ScrollView: zs,
    SectionList: Ws,
    Text: qs,
    View: Ks,
  },
  Hn
);
function Hi() {
  const r = g.useContext(ia);
  if (!r) return [!0, null, r];
  const { id: e, isPresent: t, onExitComplete: i, register: a } = r;
  return (
    g.useEffect(() => a(e), []),
    !t && i ? [!1, () => (i == null ? void 0 : i(e)), r] : [!0, void 0, r]
  );
}
const Dn = ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  $n = (r, e, t) => {
    if (typeof r == 'string') return r;
    const i = Object.keys(r);
    let a = r[i[0]];
    return Object.fromEntries(
      [...new Set([...e, ...i])].map((n) => {
        const o = r[n] ?? t ?? a;
        return (a = o), (t = o), [n, o];
      })
    );
  },
  Bn = (r) => {
    const e = Object.keys(r.size || {}),
      t = Object.fromEntries(
        Object.entries(r).map(([i, a]) => [
          i,
          $n(
            a,
            i === 'face' ? Dn : e,
            i === 'face' ? { normal: r.family } : void 0
          ),
        ])
      );
    return Object.freeze(t);
  },
  jn = Xi,
  Di = {
    text: 'textAlign',
    b: 'bottom',
    bg: 'backgroundColor',
    content: 'alignContent',
    grow: 'flexGrow',
    items: 'alignItems',
    justify: 'justifyContent',
    l: 'left',
    m: 'margin',
    maxH: 'maxHeight',
    maxW: 'maxWidth',
    mb: 'marginBottom',
    minH: 'minHeight',
    minW: 'minWidth',
    ml: 'marginLeft',
    mr: 'marginRight',
    mt: 'marginTop',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    p: 'padding',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    pr: 'paddingRight',
    pt: 'paddingTop',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    r: 'right',
    rounded: 'borderRadius',
    select: 'userSelect',
    self: 'alignSelf',
    shrink: 'flexShrink',
    t: 'top',
    z: 'zIndex',
  },
  Un = [
    ['fd', 'flexDirection'],
    ['fb', 'flexBasis'],
    ['bblr', 'borderBottomLeftRadius'],
    ['bbrr', 'borderBottomRightRadius'],
    ['fwr', 'flexWrap'],
    ['col', 'color'],
    ['ff', 'fontFamily'],
    ['fst', 'fontStyle'],
    ['tr', 'transform'],
    ['tt', 'textTransform'],
    ['td', 'textDecorationLine'],
    ['va', 'verticalAlign'],
    ['ws', 'whiteSpace'],
    ['wb', 'wordBreak'],
    ['ww', 'wordWrap'],
    ['brc', 'borderRightColor'],
    ['brw', 'borderRightWidth'],
    ['bs', 'borderStyle'],
    ['btc', 'borderTopColor'],
    ['btlr', 'borderTopLeftRadius'],
    ['btrr', 'borderTopRightRadius'],
    ['btw', 'borderTopWidth'],
    ['bw', 'borderWidth'],
    ['o', 'opacity'],
    ['cur', 'cursor'],
    ['pe', 'pointerEvents'],
    ['ov', 'overflow'],
    ['pos', 'position'],
    ['dsp', 'display'],
    ['fw', 'fontWeight'],
    ['fs', 'fontSize'],
    ['ls', 'letterSpacing'],
    ['lh', 'lineHeight'],
    ['bxs', 'boxSizing'],
    ['bxsh', 'boxShadow'],
    ['ox', 'overflowX'],
    ['oy', 'overflowY'],
  ];
Object.assign(Di, Object.fromEntries(Un));
function Wn(r) {
  return r === 0
    ? 0
    : r === 2
      ? 0.5
      : r === 4
        ? 1
        : r === 8
          ? 1.5
          : r <= 16
            ? Math.round(r * 0.333)
            : Math.floor(r * 0.7 - 12);
}
const $i = {
    $0: 0,
    '$0.25': 2,
    '$0.5': 4,
    '$0.75': 8,
    $1: 20,
    '$1.5': 24,
    $2: 28,
    '$2.5': 32,
    $3: 36,
    '$3.5': 40,
    $4: 44,
    $true: 44,
    '$4.5': 48,
    $5: 52,
    $6: 64,
    $7: 74,
    $8: 84,
    $9: 94,
    $10: 104,
    $11: 124,
    $12: 144,
    $13: 164,
    $14: 184,
    $15: 204,
    $16: 224,
    $17: 224,
    $18: 244,
    $19: 264,
    $20: 284,
  },
  Bi = Object.entries($i).map(([r, e]) => [r, Wn(e)]),
  qn = Bi.slice(1).map(([r, e]) => [`-${r.slice(1)}`, -e]),
  Kn = { ...Object.fromEntries(Bi), ...Object.fromEntries(qn) },
  Gn = { 0: 0, 1: 100, 2: 200, 3: 300, 4: 400, 5: 500 },
  Yn = {
    0: 0,
    1: 3,
    2: 5,
    3: 7,
    4: 9,
    true: 9,
    5: 10,
    6: 16,
    7: 19,
    8: 22,
    9: 26,
    10: 34,
    11: 42,
    12: 50,
  },
  Jn = { radius: Yn, zIndex: Gn, space: Kn, size: $i };
function ji(r) {
  return 1 / r === Number.NEGATIVE_INFINITY;
}
const lr = new Map(),
  Qn = (r, e) => lr.get(e || JSON.stringify(r)),
  Xn = (r, e) => {
    const t = { ...e, cache: new Map() };
    lr.set(e.name || JSON.stringify(r), t),
      lr.set(JSON.stringify(e.definition), t);
  },
  Xt = new Map();
function Zn(r, e, t, i, a = !1) {
  const n = a ? '' : JSON.stringify([i, r, e, t]);
  if (!a && Xt.has(n)) return Xt.get(n);
  const o = {
    ...Object.fromEntries(Object.entries(e).map(([s, l]) => [s, eo(r, l)])),
    ...(t == null ? void 0 : t.nonInheritedValues),
  };
  return (
    Xn(o, { palette: r, definition: e, options: t, name: i }),
    n && Xt.set(n, o),
    o
  );
}
const eo = (r, e) => {
  if (!r) throw new Error('No palette!');
  if (typeof e == 'string') return e;
  const t = r.length - 1,
    i = (e === 0 ? !ji(e) : e >= 0) ? e : t + e,
    a = Math.min(Math.max(0, i), t);
  return r[a];
};
function to(r) {
  return Object.entries(r);
}
function ro(r) {
  return Object.fromEntries(r);
}
const $e = (r) =>
    typeof r == 'function' ? { name: r.name || 'unnamed', mask: r } : r,
  Vt = {
    name: 'skip-mask',
    mask: (r, e) => {
      const { skip: t } = e;
      return Object.fromEntries(
        Object.entries(r)
          .filter(([i]) => !t || !(i in t))
          .map(([i, a]) => [i, io(i, a, e)])
      );
    },
  };
function io(r, e, t) {
  var o, s, l;
  let i,
    a = t.overrideStrategy;
  const n = (o = t.overrideSwap) == null ? void 0 : o[r];
  if (typeof n < 'u') (i = n), (a = 'swap');
  else {
    const h = (s = t.overrideShift) == null ? void 0 : s[r];
    if (typeof h < 'u') (i = h), (a = 'shift');
    else {
      const u = (l = t.override) == null ? void 0 : l[r];
      typeof u < 'u' && ((i = u), (a = t.overrideStrategy));
    }
  }
  return typeof i > 'u' || typeof i == 'string' ? e : a === 'swap' ? i : e;
}
const tt = () => ({
    name: 'inverse-mask',
    mask: (r, e) => {
      const t = ro(to(r).map(([i, a]) => [i, -a]));
      return Vt.mask(t, e);
    },
  }),
  Ui = ({ inverse: r } = {}, e) => ({
    name: 'shift-mask',
    mask: (t, i) => {
      const {
          override: a,
          overrideStrategy: n = 'shift',
          max: o,
          palette: s,
          min: l = 0,
          strength: h = 1,
        } = { ...e, ...i },
        u = Object.entries(t),
        d = o ?? (s ? Object.values(s).length - 1 : Number.POSITIVE_INFINITY),
        c = {};
      for (const [f, _] of u) {
        if (typeof _ == 'string') continue;
        if (typeof (a == null ? void 0 : a[f]) == 'number') {
          const N = a[f];
          c[f] = n === 'shift' ? _ + N : N;
          continue;
        }
        if (typeof (a == null ? void 0 : a[f]) == 'string') {
          c[f] = a[f];
          continue;
        }
        const m = _ === 0 ? !ji(_) : _ >= 0,
          p = m ? 1 : -1,
          C = r ? -1 : 1,
          k = _ + h * p * C,
          L = m ? Math.max(l, Math.min(d, k)) : Math.min(-l, Math.max(-d, k));
        c[f] = L;
      }
      return Vt.mask(c, i);
    },
  }),
  ao = (r) => ({ name: 'soften-mask', mask: Ui({}, r).mask }),
  te = ao,
  qr = (r) => ({ name: 'strengthen-mask', mask: Ui({ inverse: !0 }, r).mask });
function so(r, e, t = {}, i) {
  var l;
  const a = { ...t.skip };
  if ((l = r.options) != null && l.nonInheritedValues)
    for (const h in r.options.nonInheritedValues) a[h] = 1;
  const n = { parentName: i, palette: r.palette, ...t, skip: a },
    o = e.mask(r.definition, n),
    s = Zn(r.palette, o);
  return { ...r, cache: new Map(), definition: o, theme: s };
}
const rt = (...r) => ({
  name: 'combine-mask',
  mask: (e, t) => {
    let i = Qn(e, t.parentName),
      a;
    for (const n of r) {
      if (!i)
        throw new Error(
          `Nothing returned from mask: ${i}, for template: ${e} and mask: ${n.toString()}, given opts ${JSON.stringify(t, null, 2)}`
        );
      const o = so(i, n, t);
      (i = o), (a = o.theme);
    }
    return a;
  },
});
function We(r, e, t) {
  return Math.min(Math.max(r, t), e);
}
class no extends Error {
  constructor(e) {
    super(`Failed to parse color: "${e}"`);
  }
}
var je = no;
function oo(r) {
  if (typeof r != 'string') throw new je(r);
  if (r.trim().toLowerCase() === 'transparent') return [0, 0, 0, 0];
  let e = r.trim();
  e = go.test(r) ? uo(r) : r;
  const t = co.exec(e);
  if (t) {
    const o = Array.from(t).slice(1);
    return [
      ...o.slice(0, 3).map((s) => parseInt(Ke(s, 2), 16)),
      parseInt(Ke(o[3] || 'f', 2), 16) / 255,
    ];
  }
  const i = _o.exec(e);
  if (i) {
    const o = Array.from(i).slice(1);
    return [
      ...o.slice(0, 3).map((s) => parseInt(s, 16)),
      parseInt(o[3] || 'ff', 16) / 255,
    ];
  }
  const a = fo.exec(e);
  if (a) {
    const o = Array.from(a).slice(1);
    return [
      ...o.slice(0, 3).map((s) => parseInt(s, 10)),
      parseFloat(o[3] || '1'),
    ];
  }
  const n = mo.exec(e);
  if (n) {
    const [o, s, l, h] = Array.from(n).slice(1).map(parseFloat);
    if (We(0, 100, s) !== s) throw new je(r);
    if (We(0, 100, l) !== l) throw new je(r);
    return [...vo(o, s, l), Number.isNaN(h) ? 1 : h];
  }
  throw new je(r);
}
function lo(r) {
  let e = 5381,
    t = r.length;
  for (; t; ) e = (e * 33) ^ r.charCodeAt(--t);
  return (e >>> 0) % 2341;
}
const Kr = (r) => parseInt(r.replace(/_/g, ''), 36),
  ho =
    '1q29ehhb 1n09sgk7 1kl1ekf_ _yl4zsno 16z9eiv3 1p29lhp8 _bd9zg04 17u0____ _iw9zhe5 _to73___ _r45e31e _7l6g016 _jh8ouiv _zn3qba8 1jy4zshs 11u87k0u 1ro9yvyo 1aj3xael 1gz9zjz0 _3w8l4xo 1bf1ekf_ _ke3v___ _4rrkb__ 13j776yz _646mbhl _nrjr4__ _le6mbhl 1n37ehkb _m75f91n _qj3bzfz 1939yygw 11i5z6x8 _1k5f8xs 1509441m 15t5lwgf _ae2th1n _tg1ugcv 1lp1ugcv 16e14up_ _h55rw7n _ny9yavn _7a11xb_ 1ih442g9 _pv442g9 1mv16xof 14e6y7tu 1oo9zkds 17d1cisi _4v9y70f _y98m8kc 1019pq0v 12o9zda8 _348j4f4 1et50i2o _8epa8__ _ts6senj 1o350i2o 1mi9eiuo 1259yrp0 1ln80gnw _632xcoy 1cn9zldc _f29edu4 1n490c8q _9f9ziet 1b94vk74 _m49zkct 1kz6s73a 1eu9dtog _q58s1rz 1dy9sjiq __u89jo3 _aj5nkwg _ld89jo3 13h9z6wx _qa9z2ii _l119xgq _bs5arju 1hj4nwk9 1qt4nwk9 1ge6wau6 14j9zlcw 11p1edc_ _ms1zcxe _439shk6 _jt9y70f _754zsow 1la40eju _oq5p___ _x279qkz 1fa5r3rv _yd2d9ip _424tcku _8y1di2_ _zi2uabw _yy7rn9h 12yz980_ __39ljp6 1b59zg0x _n39zfzp 1fy9zest _b33k___ _hp9wq92 1il50hz4 _io472ub _lj9z3eo 19z9ykg0 _8t8iu3a 12b9bl4a 1ak5yw0o _896v4ku _tb8k8lv _s59zi6t _c09ze0p 1lg80oqn 1id9z8wb _238nba5 1kq6wgdi _154zssg _tn3zk49 _da9y6tc 1sg7cv4f _r12jvtt 1gq5fmkz 1cs9rvci _lp9jn1c _xw1tdnb 13f9zje6 16f6973h _vo7ir40 _bt5arjf _rc45e4t _hr4e100 10v4e100 _hc9zke2 _w91egv_ _sj2r1kk 13c87yx8 _vqpds__ _ni8ggk8 _tj9yqfb 1ia2j4r4 _7x9b10u 1fc9ld4j 1eq9zldr _5j9lhpx _ez9zl6o _md61fzm'
      .split(' ')
      .reduce((r, e) => {
        const t = Kr(e.substring(0, 3)),
          i = Kr(e.substring(3)).toString(16);
        let a = '';
        for (let n = 0; n < 6 - i.length; n++) a += '0';
        return (r[t] = `${a}${i}`), r;
      }, {});
function uo(r) {
  const e = r.toLowerCase().trim(),
    t = ho[lo(e)];
  if (!t) throw new je(r);
  return `#${t}`;
}
const Ke = (r, e) =>
    Array.from(Array(e))
      .map(() => r)
      .join(''),
  co = new RegExp(`^#${Ke('([a-f0-9])', 3)}([a-f0-9])?$`, 'i'),
  _o = new RegExp(`^#${Ke('([a-f0-9]{2})', 3)}([a-f0-9]{2})?$`, 'i'),
  fo = new RegExp(
    `^rgba?\\(\\s*(\\d+)\\s*${Ke(',\\s*(\\d+)\\s*', 2)}(?:,\\s*([\\d.]+))?\\s*\\)$`,
    'i'
  ),
  mo =
    /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i,
  go = /^[a-z]+$/i,
  Gr = (r) => Math.round(r * 255),
  vo = (r, e, t) => {
    let i = t / 100;
    if (e === 0) return [i, i, i].map(Gr);
    const a = (((r % 360) + 360) % 360) / 60,
      n = (1 - Math.abs(2 * i - 1)) * (e / 100),
      o = n * (1 - Math.abs((a % 2) - 1));
    let s = 0,
      l = 0,
      h = 0;
    a >= 0 && a < 1
      ? ((s = n), (l = o))
      : a >= 1 && a < 2
        ? ((s = o), (l = n))
        : a >= 2 && a < 3
          ? ((l = n), (h = o))
          : a >= 3 && a < 4
            ? ((l = o), (h = n))
            : a >= 4 && a < 5
              ? ((s = o), (h = n))
              : a >= 5 && a < 6 && ((s = n), (h = o));
    const u = i - n / 2,
      d = s + u,
      c = l + u,
      f = h + u;
    return [d, c, f].map(Gr);
  };
function hr(r) {
  const [e, t, i, a] = oo(r).map((d, c) => (c === 3 ? d : d / 255)),
    n = Math.max(e, t, i),
    o = Math.min(e, t, i),
    s = (n + o) / 2;
  if (n === o) return [0, 0, s, a];
  const l = n - o,
    h = s > 0.5 ? l / (2 - n - o) : l / (n + o);
  return [
    60 *
      (e === n
        ? (t - i) / l + (t < i ? 6 : 0)
        : t === n
          ? (i - e) / l + 2
          : (e - t) / l + 4),
    h,
    s,
    a,
  ];
}
function xe(r, e, t, i) {
  return `hsla(${(r % 360).toFixed()}, ${We(0, 100, e * 100).toFixed()}%, ${We(0, 100, t * 100).toFixed()}%, ${parseFloat(We(0, 1, i).toFixed(3))})`;
}
const Ve = (r) => Object.keys(r);
function Pe(r) {
  return Object.fromEntries(r);
}
const po = () => {
    const r = Yr('light'),
      e = Yr('dark');
    return {
      ...Pe(Ve(r).map((t) => [`light_${t}`, r[t]])),
      ...Pe(Ve(e).map((t) => [`dark_${t}`, e[t]])),
    };
  },
  Yr = (r) => {
    const e = r === 'light',
      t = 6,
      i = e ? -1 : 1,
      a = -i,
      n = t + 3,
      o = {
        color: -t,
        colorHover: -t - 1,
        colorPress: -t,
        colorFocus: -t - 1,
        placeholderColor: -t - 3,
        outlineColor: -2,
      },
      s = {
        accentBackground: 0,
        accentColor: -0,
        background0: 1,
        background02: 2,
        background04: 3,
        background06: 4,
        background08: 5,
        color1: t,
        color2: t + 1,
        color3: t + 2,
        color4: t + 3,
        color5: t + 4,
        color6: t + 5,
        color7: t + 6,
        color8: t + 7,
        color9: t + 8,
        color10: t + 9,
        color11: t + 10,
        color12: t + 11,
        color0: -1,
        color02: -2,
        color04: -3,
        color06: -4,
        color08: -5,
        background: t,
        backgroundHover: t + i,
        backgroundPress: t + a,
        backgroundFocus: t + a,
        borderColor: n,
        borderColorHover: n + i,
        borderColorPress: n + a,
        borderColorFocus: n,
        ...o,
        colorTransparent: -1,
      },
      l = {
        ...o,
        background: s.background + 1,
        backgroundHover: s.backgroundHover + 1,
        backgroundPress: s.backgroundPress + 1,
        backgroundFocus: s.backgroundFocus + 1,
        borderColor: s.borderColor + 1,
        borderColorHover: s.borderColorHover + 1,
        borderColorFocus: s.borderColorFocus + 1,
        borderColorPress: s.borderColorPress + 1,
      },
      h = {
        ...o,
        background: s.background + 2,
        backgroundHover: s.backgroundHover + 2,
        backgroundPress: s.backgroundPress + 2,
        backgroundFocus: s.backgroundFocus + 2,
        borderColor: s.borderColor + 2,
        borderColorHover: s.borderColorHover + 2,
        borderColorFocus: s.borderColorFocus + 2,
        borderColorPress: s.borderColorPress + 2,
      },
      u = {
        ...o,
        background: s.background + 3,
        backgroundHover: s.backgroundHover + 3,
        backgroundPress: s.backgroundPress + 3,
        backgroundFocus: s.backgroundFocus + 3,
        borderColor: s.borderColor + 3,
        borderColorHover: s.borderColorHover + 3,
        borderColorFocus: s.borderColorFocus + 3,
        borderColorPress: s.borderColorPress + 3,
      },
      d = {
        color: s.color - 1,
        colorHover: s.colorHover - 1,
        colorPress: s.colorPress - 1,
        colorFocus: s.colorFocus - 1,
      },
      c = {
        color: s.color - 2,
        colorHover: s.colorHover - 2,
        colorPress: s.colorPress - 2,
        colorFocus: s.colorFocus - 2,
      },
      f = Object.fromEntries(Object.entries(s).map(([_, m]) => [_, -m]));
    return {
      base: s,
      surface1: l,
      surface2: h,
      surface3: u,
      alt1: d,
      alt2: c,
      inverse: f,
    };
  };
po();
const Jr = 12,
  Qr = ({ palette: r, scheme: e }) => {
    if (!r) return [];
    const { anchors: t } = r;
    let i = [];
    const a = (u, d, c) => {
        i.push(xe(u, d, c, 1));
      },
      n = Object.keys(t).length;
    for (const [u, d] of t.entries()) {
      const [c, f, _] = [d.hue[e], d.sat[e], d.lum[e]];
      if (u !== 0) {
        const m = t[u - 1],
          p = d.index - m.index,
          C = m.hue[e],
          k = m.sat[e],
          L = m.lum[e],
          N = (C - c) / p,
          E = (k - f) / p,
          w = (L - _) / p;
        for (let S = m.index + 1; S < d.index; S++) {
          const T = d.index - S;
          a(c + N * T, f + E * T, _ + w * T);
        }
      }
      if ((a(c, f, _), u === n - 1 && i.length < Jr))
        for (let m = d.index + 1; m < Jr; m++) a(c, f, _);
    }
    const o = i[0],
      s = i[i.length - 1],
      l = [o, s].map((u) => {
        const [d, c, f] = hr(u);
        return [
          xe(d, c, f, 0),
          xe(d, c, f, 0.2),
          xe(d, c, f, 0.4),
          xe(d, c, f, 0.6),
          xe(d, c, f, 0.8),
        ];
      }),
      h = [...l[1]].reverse();
    return (i = [...l[0], ...i, ...h]), i;
  };
function Zt(r) {
  return {
    light: Qr({ palette: r, scheme: 'light' }),
    dark: Qr({ palette: r, scheme: 'dark' }),
  };
}
ko(
  Co({
    base: { palette: ['#fff', '#000'] },
    accent: { palette: ['#ff0000', '#ff9999'] },
  })
);
function bo(r) {
  return { light: r, dark: [...r].reverse() };
}
function er(r) {
  const e = r.light.length;
  return r.light.map((t, i) => {
    const a = r.dark[i],
      [n, o, s] = hr(t),
      [l, h, u] = hr(a);
    return {
      index: yo(11, e, i),
      hue: { light: n, dark: l },
      sat: { light: o, dark: h },
      lum: { light: s, dark: u },
    };
  });
}
function yo(r, e, t) {
  return Math.round((t / (e - 1)) * r);
}
function tr(r) {
  return Array.isArray(r) ? bo(r) : r;
}
function Co(r) {
  const e = tr(r.base.palette),
    t = r.accent ? tr(r.accent.palette) : null,
    i = er(e);
  function a(n) {
    return Object.fromEntries(
      Object.entries(n).map(([o, s]) => [
        o,
        { name: o, anchors: s.palette ? er(tr(s.palette)) : i },
      ])
    );
  }
  return {
    base: { name: 'base', anchors: i },
    ...(t && { accent: { name: 'accent', anchors: er(t) } }),
    ...(r.childrenThemes && a(r.childrenThemes)),
    ...(r.grandChildrenThemes && a(r.grandChildrenThemes)),
  };
}
function ko(r) {
  const e = r.accent ? Zt(r.accent) : null,
    t = Zt(r.base);
  return Object.fromEntries(
    Object.entries(r).flatMap(([i, a]) => {
      const n = Zt(a),
        o = i.startsWith('accent') ? t : e || t;
      if (!o) return [];
      const s = o.light,
        l = o.dark,
        h = 7;
      return [
        [
          i === 'base' ? 'light' : `light_${i}`,
          [s[h], ...n.light, s[s.length - h - 1]],
        ],
        [
          i === 'base' ? 'dark' : `dark_${i}`,
          [l[l.length - h - 1], ...n.dark, l[h]],
        ],
      ];
    })
  );
}
const wo = () => {
    const r = Xr('light'),
      e = Xr('dark');
    return {
      ...Pe(Ve(r).map((t) => [`light_${t}`, r[t]])),
      ...Pe(Ve(e).map((t) => [`dark_${t}`, e[t]])),
    };
  },
  Xr = (r) => {
    const e = r === 'light',
      t = 6,
      i = e ? -1 : 1,
      a = -i,
      n = t + 3,
      o = {
        color: -t,
        colorHover: -t - 1,
        colorPress: -t,
        colorFocus: -t - 1,
        placeholderColor: -t - 3,
        outlineColor: -2,
      },
      s = {
        accentBackground: 0,
        accentColor: -0,
        background0: 1,
        background02: 2,
        background04: 3,
        background06: 4,
        background08: 5,
        color1: t,
        color2: t + 1,
        color3: t + 2,
        color4: t + 3,
        color5: t + 4,
        color6: t + 5,
        color7: t + 6,
        color8: t + 7,
        color9: t + 8,
        color10: t + 9,
        color11: t + 10,
        color12: t + 11,
        color0: -1,
        color02: -2,
        color04: -3,
        color06: -4,
        color08: -5,
        background: t,
        backgroundHover: t + i,
        backgroundPress: t + a,
        backgroundFocus: t + a,
        borderColor: n,
        borderColorHover: n + i,
        borderColorPress: n + a,
        borderColorFocus: n,
        ...o,
        colorTransparent: -1,
      },
      l = {
        ...o,
        background: s.background + 2,
        backgroundHover: s.backgroundHover + 2,
        backgroundPress: s.backgroundPress + 2,
        backgroundFocus: s.backgroundFocus + 2,
        borderColor: s.borderColor + 2,
        borderColorHover: s.borderColorHover + 2,
        borderColorFocus: s.borderColorFocus + 2,
        borderColorPress: s.borderColorPress + 2,
      },
      h = {
        ...o,
        background: s.background + 3,
        backgroundHover: s.backgroundHover + 3,
        backgroundPress: s.backgroundPress + 3,
        backgroundFocus: s.backgroundFocus + 3,
        borderColor: s.borderColor + 3,
        borderColorHover: s.borderColorHover + 3,
        borderColorFocus: s.borderColorFocus + 3,
        borderColorPress: s.borderColorPress + 3,
      },
      u = {
        ...o,
        background: s.background + 4,
        backgroundHover: s.backgroundHover + 4,
        backgroundPress: s.backgroundPress + 4,
        backgroundFocus: s.backgroundFocus + 4,
        borderColor: s.borderColor + 4,
        borderColorHover: s.borderColorHover + 4,
        borderColorFocus: s.borderColorFocus + 4,
        borderColorPress: s.borderColorPress + 4,
      },
      d = {
        color: s.color - 1,
        colorHover: s.colorHover - 1,
        colorPress: s.colorPress - 1,
        colorFocus: s.colorFocus - 1,
      },
      c = {
        color: s.color - 2,
        colorHover: s.colorHover - 2,
        colorPress: s.colorPress - 2,
        colorFocus: s.colorFocus - 2,
      },
      f = Object.fromEntries(Object.entries(s).map(([_, m]) => [_, -m]));
    return {
      base: s,
      surface1: l,
      surface2: h,
      surface3: u,
      alt1: d,
      alt2: c,
      inverse: f,
    };
  };
wo();
const So = () => {
    const r = Zr('light'),
      e = Zr('dark');
    return {
      ...Pe(Ve(r).map((t) => [`light_${t}`, r[t]])),
      ...Pe(Ve(e).map((t) => [`dark_${t}`, e[t]])),
    };
  },
  Zr = (r) => {
    const e = r === 'light',
      t = 6,
      i = e ? -1 : 1,
      a = -i,
      n = t + 3,
      o = {
        color: -t,
        colorHover: -t - 1,
        colorPress: -t,
        colorFocus: -t - 1,
        placeholderColor: -t - 3,
        outlineColor: -2,
      },
      s = {
        accentBackground: 0,
        accentColor: -0,
        background0: 1,
        background02: 2,
        background04: 3,
        background06: 4,
        background08: 5,
        color1: t,
        color2: t + 1,
        color3: t + 2,
        color4: t + 3,
        color5: t + 4,
        color6: t + 5,
        color7: t + 6,
        color8: t + 7,
        color9: t + 8,
        color10: t + 9,
        color11: t + 10,
        color12: t + 11,
        color0: -1,
        color02: -2,
        color04: -3,
        color06: -4,
        color08: -5,
        background: t,
        backgroundHover: t + i,
        backgroundPress: t + a,
        backgroundFocus: t + a,
        borderColor: n,
        borderColorHover: n + i,
        borderColorPress: n + a,
        borderColorFocus: n,
        ...o,
        colorTransparent: -1,
      },
      l = {
        ...o,
        background: s.background + 3,
        backgroundHover: s.backgroundHover + 3,
        backgroundPress: s.backgroundPress + 3,
        backgroundFocus: s.backgroundFocus + 3,
        borderColor: s.borderColor + 3,
        borderColorHover: s.borderColorHover + 3,
        borderColorFocus: s.borderColorFocus + 3,
        borderColorPress: s.borderColorPress + 3,
      },
      h = {
        ...o,
        background: s.background + 4,
        backgroundHover: s.backgroundHover + 4,
        backgroundPress: s.backgroundPress + 4,
        backgroundFocus: s.backgroundFocus + 4,
        borderColor: s.borderColor + 4,
        borderColorHover: s.borderColorHover + 4,
        borderColorFocus: s.borderColorFocus + 4,
        borderColorPress: s.borderColorPress + 4,
      },
      u = {
        ...o,
        background: s.background + 5,
        backgroundHover: s.backgroundHover + 5,
        backgroundPress: s.backgroundPress + 5,
        backgroundFocus: s.backgroundFocus + 5,
        borderColor: s.borderColor + 5,
        borderColorHover: s.borderColorHover + 5,
        borderColorFocus: s.borderColorFocus + 5,
        borderColorPress: s.borderColorPress + 5,
      },
      d = {
        color: s.color - 1,
        colorHover: s.colorHover - 1,
        colorPress: s.colorPress - 1,
        colorFocus: s.colorFocus - 1,
      },
      c = {
        color: s.color - 2,
        colorHover: s.colorHover - 2,
        colorPress: s.colorPress - 2,
        colorFocus: s.colorFocus - 2,
      },
      f = Object.fromEntries(Object.entries(s).map(([_, m]) => [_, -m]));
    return {
      base: s,
      surface1: l,
      surface2: h,
      surface3: u,
      alt1: d,
      alt2: c,
      inverse: f,
    };
  };
So();
rt(tt(), te({ strength: 2 })),
  rt(tt(), te({ strength: 3 })),
  rt(tt(), te({ strength: 4 })),
  rt(tt(), qr({ strength: 2 })),
  $e((r, e) => {
    const t = qr().mask(r, e),
      i = te().mask(r, e);
    return {
      ...t,
      borderColor: i.borderColor,
      borderColorHover: i.borderColorHover,
      borderColorPress: i.borderColorPress,
      borderColorFocus: i.borderColorFocus,
    };
  }),
  $e((r, e) => {
    const t = te({ strength: 2 }).mask(r, e),
      i = te({ strength: 1 }).mask(r, e);
    return {
      ...t,
      borderColor: i.borderColor,
      borderColorHover: i.borderColorHover,
      borderColorPress: i.borderColorPress,
      borderColorFocus: i.borderColorFocus,
    };
  }),
  $e((r, e) => {
    const t = te({ strength: 2 }).mask(r, e);
    return {
      ...te({ strength: 3 }).mask(r, e),
      borderColor: t.borderColor,
      borderColorHover: t.borderColorHover,
      borderColorPress: t.borderColorPress,
      borderColorFocus: t.borderColorFocus,
    };
  }),
  $e((r, e) => {
    const t = Vt.mask(r, e),
      i = te().mask(r, e);
    return {
      ...t,
      borderColor: i.borderColor,
      borderColorHover: i.borderColorHover,
      borderColorPress: i.borderColorPress,
      borderColorFocus: i.borderColorFocus,
    };
  }),
  $e((r, e) => {
    const t = Vt.mask(r, e),
      i = te({ strength: 2 }).mask(r, e);
    return {
      ...t,
      borderColor: i.borderColor,
      borderColorHover: i.borderColorHover,
      borderColorPress: i.borderColorPress,
      borderColorFocus: i.borderColorFocus,
    };
  });
function b(r) {
  let e = {};
  for (const [t, i] of r) e[Io[t]] = To[i];
  return e;
}
const To = [
    'hsla(0, 0%, 10%, 1)',
    'hsla(0, 0%, 38%, 1)',
    'hsla(0, 0%, 100%, 0)',
    'hsla(0, 0%, 100%, 0.2)',
    'hsla(0, 0%, 100%, 0.4)',
    'hsla(0, 0%, 100%, 0.6)',
    'hsla(0, 0%, 100%, 0.8)',
    'hsla(0, 0%, 100%, 1)',
    'hsla(0, 0%, 95%, 1)',
    'hsla(0, 0%, 93%, 1)',
    'hsla(0, 0%, 91%, 1)',
    'hsla(0, 0%, 88%, 1)',
    'hsla(0, 0%, 85%, 1)',
    'hsla(0, 0%, 82%, 1)',
    'hsla(0, 0%, 76%, 1)',
    'hsla(0, 0%, 56%, 1)',
    'hsla(0, 0%, 50%, 1)',
    'hsla(0, 0%, 42%, 1)',
    'hsla(0, 0%, 9%, 1)',
    'hsla(0, 0%, 9%, 0)',
    'hsla(0, 0%, 9%, 0.2)',
    'hsla(0, 0%, 9%, 0.4)',
    'hsla(0, 0%, 9%, 0.6)',
    'hsla(0, 0%, 9%, 0.8)',
    'hsl(206, 100%, 99.2%)',
    'hsl(210, 100%, 98.0%)',
    'hsl(209, 100%, 96.5%)',
    'hsl(210, 98.8%, 94.0%)',
    'hsl(209, 95.0%, 90.1%)',
    'hsl(209, 81.2%, 84.5%)',
    'hsl(208, 77.5%, 76.9%)',
    'hsl(206, 81.9%, 65.3%)',
    'hsl(206, 100%, 50.0%)',
    'hsl(208, 100%, 47.3%)',
    'hsl(211, 100%, 43.2%)',
    'hsl(211, 100%, 15.0%)',
    'hsl(136, 50.0%, 98.9%)',
    'hsl(138, 62.5%, 96.9%)',
    'hsl(139, 55.2%, 94.5%)',
    'hsl(140, 48.7%, 91.0%)',
    'hsl(141, 43.7%, 86.0%)',
    'hsl(143, 40.3%, 79.0%)',
    'hsl(146, 38.5%, 69.0%)',
    'hsl(151, 40.2%, 54.1%)',
    'hsl(151, 55.0%, 41.5%)',
    'hsl(152, 57.5%, 37.6%)',
    'hsl(153, 67.0%, 28.5%)',
    'hsl(155, 40.0%, 14.0%)',
    'hsl(359, 100%, 99.4%)',
    'hsl(359, 100%, 98.6%)',
    'hsl(360, 100%, 96.8%)',
    'hsl(360, 97.9%, 94.8%)',
    'hsl(360, 90.2%, 91.9%)',
    'hsl(360, 81.7%, 87.8%)',
    'hsl(359, 74.2%, 81.7%)',
    'hsl(359, 69.5%, 74.3%)',
    'hsl(358, 75.0%, 59.0%)',
    'hsl(358, 69.4%, 55.2%)',
    'hsl(358, 65.0%, 48.7%)',
    'hsl(354, 50.0%, 14.6%)',
    'hsl(60, 54.0%, 98.5%)',
    'hsl(52, 100%, 95.5%)',
    'hsl(55, 100%, 90.9%)',
    'hsl(54, 100%, 86.6%)',
    'hsl(52, 97.9%, 82.0%)',
    'hsl(50, 89.4%, 76.1%)',
    'hsl(47, 80.4%, 68.0%)',
    'hsl(48, 100%, 46.1%)',
    'hsl(53, 92.0%, 50.0%)',
    'hsl(50, 100%, 48.5%)',
    'hsl(42, 100%, 29.0%)',
    'hsl(40, 55.0%, 13.5%)',
    'rgba(0,0,0,0.04)',
    'rgba(0,0,0,0.08)',
    'rgba(0,0,0,0.16)',
    'rgba(0,0,0,0.24)',
    'rgba(0,0,0,0.32)',
    'rgba(0,0,0,0.4)',
    '#050505',
    '#151515',
    '#191919',
    '#232323',
    '#282828',
    '#323232',
    '#424242',
    '#494949',
    '#545454',
    '#626262',
    '#a5a5a5',
    '#fff',
    '#f2f2f2',
    'hsl(0, 0%, 93%)',
    'hsl(0, 0%, 91%)',
    'hsl(0, 0%, 88%)',
    'hsl(0, 0%, 85%)',
    'hsl(0, 0%, 82%)',
    'hsl(0, 0%, 76%)',
    'hsl(0, 0%, 56%)',
    'hsl(0, 0%, 50%)',
    'hsl(0, 0%, 42%)',
    'hsl(0, 0%, 9%)',
    'hsla(0, 0%, 2%, 1)',
    'hsla(0, 0%, 8%, 1)',
    'hsla(0, 0%, 14%, 1)',
    'hsla(0, 0%, 16%, 1)',
    'hsla(0, 0%, 20%, 1)',
    'hsla(0, 0%, 26%, 1)',
    'hsla(0, 0%, 29%, 1)',
    'hsla(0, 0%, 33%, 1)',
    'hsla(0, 0%, 65%, 1)',
    'hsla(0, 0%, 2%, 0)',
    'hsla(0, 0%, 2%, 0.2)',
    'hsla(0, 0%, 2%, 0.4)',
    'hsla(0, 0%, 2%, 0.6)',
    'hsla(0, 0%, 2%, 0.8)',
    'hsl(212, 35.0%, 9.2%)',
    'hsl(216, 50.0%, 11.8%)',
    'hsl(214, 59.4%, 15.3%)',
    'hsl(214, 65.8%, 17.9%)',
    'hsl(213, 71.2%, 20.2%)',
    'hsl(212, 77.4%, 23.1%)',
    'hsl(211, 85.1%, 27.4%)',
    'hsl(211, 89.7%, 34.1%)',
    'hsl(209, 100%, 60.6%)',
    'hsl(210, 100%, 66.1%)',
    'hsl(206, 98.0%, 95.8%)',
    'hsl(146, 30.0%, 7.4%)',
    'hsl(155, 44.2%, 8.4%)',
    'hsl(155, 46.7%, 10.9%)',
    'hsl(154, 48.4%, 12.9%)',
    'hsl(154, 49.7%, 14.9%)',
    'hsl(154, 50.9%, 17.6%)',
    'hsl(153, 51.8%, 21.8%)',
    'hsl(151, 51.7%, 28.4%)',
    'hsl(151, 49.3%, 46.5%)',
    'hsl(151, 50.0%, 53.2%)',
    'hsl(137, 72.0%, 94.0%)',
    'hsl(353, 23.0%, 9.8%)',
    'hsl(357, 34.4%, 12.0%)',
    'hsl(356, 43.4%, 16.4%)',
    'hsl(356, 47.6%, 19.2%)',
    'hsl(356, 51.1%, 21.9%)',
    'hsl(356, 55.2%, 25.9%)',
    'hsl(357, 60.2%, 31.8%)',
    'hsl(358, 65.0%, 40.4%)',
    'hsl(358, 85.3%, 64.0%)',
    'hsl(358, 100%, 69.5%)',
    'hsl(351, 89.0%, 96.0%)',
    'hsl(45, 100%, 5.5%)',
    'hsl(46, 100%, 6.7%)',
    'hsl(45, 100%, 8.7%)',
    'hsl(45, 100%, 10.4%)',
    'hsl(47, 100%, 12.1%)',
    'hsl(49, 100%, 14.3%)',
    'hsl(49, 90.3%, 18.4%)',
    'hsl(50, 100%, 22.0%)',
    'hsl(54, 100%, 68.0%)',
    'hsl(48, 100%, 47.0%)',
    'hsl(53, 100%, 91.0%)',
    'rgba(0,0,0,0.2)',
    'rgba(0,0,0,0.3)',
    'rgba(0,0,0,0.5)',
    'rgba(0,0,0,0.6)',
    'rgba(0,0,0,0.7)',
    'hsla(216, 100%, 99%, 0)',
    'hsla(216, 100%, 99%, 0.2)',
    'hsla(216, 100%, 99%, 0.4)',
    'hsla(216, 100%, 99%, 0.6)',
    'hsla(216, 100%, 99%, 0.8)',
    'hsla(210, 100%, 99%, 1)',
    'hsla(210, 100%, 98%, 1)',
    'hsla(210, 100%, 96%, 1)',
    'hsla(210, 100%, 94%, 1)',
    'hsla(209, 96%, 90%, 1)',
    'hsla(209, 82%, 85%, 1)',
    'hsla(208, 78%, 77%, 1)',
    'hsla(206, 82%, 65%, 1)',
    'hsla(206, 100%, 50%, 1)',
    'hsla(208, 100%, 47%, 1)',
    'hsla(211, 100%, 43%, 1)',
    'hsla(211, 100%, 15%, 1)',
    'hsla(211, 100%, 15%, 0)',
    'hsla(211, 100%, 15%, 0.2)',
    'hsla(211, 100%, 15%, 0.4)',
    'hsla(211, 100%, 15%, 0.6)',
    'hsla(211, 100%, 15%, 0.8)',
    'hsla(0, 100%, 99%, 0)',
    'hsla(0, 100%, 99%, 0.2)',
    'hsla(0, 100%, 99%, 0.4)',
    'hsla(0, 100%, 99%, 0.6)',
    'hsla(0, 100%, 99%, 0.8)',
    'hsla(0, 100%, 99%, 1)',
    'hsla(0, 100%, 97%, 1)',
    'hsla(0, 100%, 95%, 1)',
    'hsla(0, 90%, 92%, 1)',
    'hsla(0, 81%, 88%, 1)',
    'hsla(359, 74%, 82%, 1)',
    'hsla(359, 69%, 74%, 1)',
    'hsla(358, 75%, 59%, 1)',
    'hsla(358, 69%, 55%, 1)',
    'hsla(358, 65%, 49%, 1)',
    'hsla(355, 49%, 15%, 1)',
    'hsla(355, 48%, 15%, 0)',
    'hsla(355, 48%, 15%, 0.2)',
    'hsla(355, 48%, 15%, 0.4)',
    'hsla(355, 48%, 15%, 0.6)',
    'hsla(355, 48%, 15%, 0.8)',
    'hsla(60, 45%, 98%, 0)',
    'hsla(60, 45%, 98%, 0.2)',
    'hsla(60, 45%, 98%, 0.4)',
    'hsla(60, 45%, 98%, 0.6)',
    'hsla(60, 45%, 98%, 0.8)',
    'hsla(60, 50%, 98%, 1)',
    'hsla(52, 100%, 95%, 1)',
    'hsla(55, 100%, 91%, 1)',
    'hsla(54, 100%, 87%, 1)',
    'hsla(52, 98%, 82%, 1)',
    'hsla(50, 90%, 76%, 1)',
    'hsla(47, 80%, 68%, 1)',
    'hsla(48, 100%, 46%, 1)',
    'hsla(53, 92%, 50%, 1)',
    'hsla(50, 100%, 48%, 1)',
    'hsla(42, 100%, 29%, 1)',
    'hsla(41, 56%, 13%, 1)',
    'hsla(41, 55%, 13%, 0)',
    'hsla(41, 55%, 13%, 0.2)',
    'hsla(41, 55%, 13%, 0.4)',
    'hsla(41, 55%, 13%, 0.6)',
    'hsla(41, 55%, 13%, 0.8)',
    'hsla(140, 60%, 99%, 0)',
    'hsla(140, 60%, 99%, 0.2)',
    'hsla(140, 60%, 99%, 0.4)',
    'hsla(140, 60%, 99%, 0.6)',
    'hsla(140, 60%, 99%, 0.8)',
    'hsla(140, 60%, 99%, 1)',
    'hsla(138, 63%, 97%, 1)',
    'hsla(139, 57%, 95%, 1)',
    'hsla(139, 48%, 91%, 1)',
    'hsla(141, 44%, 86%, 1)',
    'hsla(142, 40%, 79%, 1)',
    'hsla(146, 38%, 69%, 1)',
    'hsla(151, 40%, 54%, 1)',
    'hsla(151, 55%, 42%, 1)',
    'hsla(152, 57%, 38%, 1)',
    'hsla(153, 67%, 28%, 1)',
    'hsla(155, 41%, 14%, 1)',
    'hsla(155, 41%, 14%, 0)',
    'hsla(155, 41%, 14%, 0.2)',
    'hsla(155, 41%, 14%, 0.4)',
    'hsla(155, 41%, 14%, 0.6)',
    'hsla(155, 41%, 14%, 0.8)',
    'hsla(214, 35%, 9%, 0)',
    'hsla(214, 35%, 9%, 0.2)',
    'hsla(214, 35%, 9%, 0.4)',
    'hsla(214, 35%, 9%, 0.6)',
    'hsla(214, 35%, 9%, 0.8)',
    'hsla(212, 36%, 9%, 1)',
    'hsla(216, 50%, 12%, 1)',
    'hsla(214, 59%, 15%, 1)',
    'hsla(214, 65%, 18%, 1)',
    'hsla(213, 71%, 20%, 1)',
    'hsla(212, 78%, 23%, 1)',
    'hsla(211, 86%, 27%, 1)',
    'hsla(211, 90%, 34%, 1)',
    'hsla(209, 100%, 61%, 1)',
    'hsla(210, 100%, 66%, 1)',
    'hsla(206, 100%, 96%, 1)',
    'hsla(207, 100%, 96%, 0)',
    'hsla(207, 100%, 96%, 0.2)',
    'hsla(207, 100%, 96%, 0.4)',
    'hsla(207, 100%, 96%, 0.6)',
    'hsla(207, 100%, 96%, 0.8)',
    'hsla(351, 25%, 10%, 0)',
    'hsla(351, 25%, 10%, 0.2)',
    'hsla(351, 25%, 10%, 0.4)',
    'hsla(351, 25%, 10%, 0.6)',
    'hsla(351, 25%, 10%, 0.8)',
    'hsla(350, 24%, 10%, 1)',
    'hsla(357, 34%, 12%, 1)',
    'hsla(357, 43%, 16%, 1)',
    'hsla(356, 47%, 19%, 1)',
    'hsla(356, 51%, 22%, 1)',
    'hsla(357, 55%, 26%, 1)',
    'hsla(357, 60%, 32%, 1)',
    'hsla(358, 65%, 40%, 1)',
    'hsla(358, 86%, 64%, 1)',
    'hsla(358, 100%, 69%, 1)',
    'hsla(353, 90%, 96%, 1)',
    'hsla(353, 90%, 96%, 0)',
    'hsla(353, 90%, 96%, 0.2)',
    'hsla(353, 90%, 96%, 0.4)',
    'hsla(353, 90%, 96%, 0.6)',
    'hsla(353, 90%, 96%, 0.8)',
    'hsla(46, 100%, 5%, 0)',
    'hsla(46, 100%, 5%, 0.2)',
    'hsla(46, 100%, 5%, 0.4)',
    'hsla(46, 100%, 5%, 0.6)',
    'hsla(46, 100%, 5%, 0.8)',
    'hsla(45, 100%, 5%, 1)',
    'hsla(46, 100%, 7%, 1)',
    'hsla(45, 100%, 9%, 1)',
    'hsla(45, 100%, 10%, 1)',
    'hsla(46, 100%, 12%, 1)',
    'hsla(49, 100%, 14%, 1)',
    'hsla(49, 89%, 18%, 1)',
    'hsla(50, 100%, 22%, 1)',
    'hsla(54, 100%, 68%, 1)',
    'hsla(48, 100%, 47%, 1)',
    'hsla(53, 100%, 91%, 1)',
    'hsla(53, 100%, 91%, 0)',
    'hsla(53, 100%, 91%, 0.2)',
    'hsla(53, 100%, 91%, 0.4)',
    'hsla(53, 100%, 91%, 0.6)',
    'hsla(53, 100%, 91%, 0.8)',
    'hsla(145, 33%, 7%, 0)',
    'hsla(145, 33%, 7%, 0.2)',
    'hsla(145, 33%, 7%, 0.4)',
    'hsla(145, 33%, 7%, 0.6)',
    'hsla(145, 33%, 7%, 0.8)',
    'hsla(145, 32%, 7%, 1)',
    'hsla(155, 44%, 8%, 1)',
    'hsla(155, 46%, 11%, 1)',
    'hsla(154, 48%, 13%, 1)',
    'hsla(155, 50%, 15%, 1)',
    'hsla(154, 51%, 18%, 1)',
    'hsla(153, 51%, 22%, 1)',
    'hsla(151, 52%, 28%, 1)',
    'hsla(151, 49%, 46%, 1)',
    'hsla(151, 50%, 53%, 1)',
    'hsla(136, 73%, 94%, 1)',
    'hsla(134, 73%, 94%, 0)',
    'hsla(134, 73%, 94%, 0.2)',
    'hsla(134, 73%, 94%, 0.4)',
    'hsla(134, 73%, 94%, 0.6)',
    'hsla(134, 73%, 94%, 0.8)',
  ],
  Io = [
    'accentBackground',
    'accentColor',
    'background0',
    'background02',
    'background04',
    'background06',
    'background08',
    'color1',
    'color2',
    'color3',
    'color4',
    'color5',
    'color6',
    'color7',
    'color8',
    'color9',
    'color10',
    'color11',
    'color12',
    'color0',
    'color02',
    'color04',
    'color06',
    'color08',
    'background',
    'backgroundHover',
    'backgroundPress',
    'backgroundFocus',
    'borderColor',
    'borderColorHover',
    'borderColorPress',
    'borderColorFocus',
    'color',
    'colorHover',
    'colorPress',
    'colorFocus',
    'placeholderColor',
    'outlineColor',
    'colorTransparent',
    'blue1',
    'blue2',
    'blue3',
    'blue4',
    'blue5',
    'blue6',
    'blue7',
    'blue8',
    'blue9',
    'blue10',
    'blue11',
    'blue12',
    'green1',
    'green2',
    'green3',
    'green4',
    'green5',
    'green6',
    'green7',
    'green8',
    'green9',
    'green10',
    'green11',
    'green12',
    'red1',
    'red2',
    'red3',
    'red4',
    'red5',
    'red6',
    'red7',
    'red8',
    'red9',
    'red10',
    'red11',
    'red12',
    'yellow1',
    'yellow2',
    'yellow3',
    'yellow4',
    'yellow5',
    'yellow6',
    'yellow7',
    'yellow8',
    'yellow9',
    'yellow10',
    'yellow11',
    'yellow12',
    'shadow1',
    'shadow2',
    'shadow3',
    'shadow4',
    'shadow5',
    'shadow6',
    'black1',
    'black2',
    'black3',
    'black4',
    'black5',
    'black6',
    'black7',
    'black8',
    'black9',
    'black10',
    'black11',
    'black12',
    'white1',
    'white2',
    'white3',
    'white4',
    'white5',
    'white6',
    'white7',
    'white8',
    'white9',
    'white10',
    'white11',
    'white12',
    'shadowColor',
    'accent1',
    'accent2',
    'accent3',
    'accent4',
    'accent5',
    'accent6',
    'accent7',
    'accent8',
    'accent9',
    'accent10',
    'accent11',
    'accent12',
  ],
  No = b([
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8],
    [9, 9],
    [10, 10],
    [11, 11],
    [12, 12],
    [13, 13],
    [14, 14],
    [15, 15],
    [16, 16],
    [17, 17],
    [18, 18],
    [19, 19],
    [20, 20],
    [21, 21],
    [22, 22],
    [23, 23],
    [24, 7],
    [25, 6],
    [26, 8],
    [27, 8],
    [28, 10],
    [29, 9],
    [30, 11],
    [31, 10],
    [32, 18],
    [33, 17],
    [34, 18],
    [35, 17],
    [36, 15],
    [37, 20],
    [38, 19],
    [39, 24],
    [40, 25],
    [41, 26],
    [42, 27],
    [43, 28],
    [44, 29],
    [45, 30],
    [46, 31],
    [47, 32],
    [48, 33],
    [49, 34],
    [50, 35],
    [51, 36],
    [52, 37],
    [53, 38],
    [54, 39],
    [55, 40],
    [56, 41],
    [57, 42],
    [58, 43],
    [59, 44],
    [60, 45],
    [61, 46],
    [62, 47],
    [63, 48],
    [64, 49],
    [65, 50],
    [66, 51],
    [67, 52],
    [68, 53],
    [69, 54],
    [70, 55],
    [71, 56],
    [72, 57],
    [73, 58],
    [74, 59],
    [75, 60],
    [76, 61],
    [77, 62],
    [78, 63],
    [79, 64],
    [80, 65],
    [81, 66],
    [82, 67],
    [83, 68],
    [84, 69],
    [85, 70],
    [86, 71],
    [87, 72],
    [88, 73],
    [89, 74],
    [90, 75],
    [91, 76],
    [92, 77],
    [93, 78],
    [94, 79],
    [95, 80],
    [96, 81],
    [97, 82],
    [98, 83],
    [99, 84],
    [100, 85],
    [101, 86],
    [102, 87],
    [103, 88],
    [104, 89],
    [105, 89],
    [106, 90],
    [107, 91],
    [108, 92],
    [109, 93],
    [110, 94],
    [111, 95],
    [112, 96],
    [113, 97],
    [114, 98],
    [115, 99],
    [116, 100],
    [117, 72],
    [118, 101],
    [119, 102],
    [120, 0],
    [121, 103],
    [122, 104],
    [123, 105],
    [124, 106],
    [125, 107],
    [126, 108],
    [127, 1],
    [128, 109],
    [129, 7],
  ]),
  Lo = b([
    [0, 16],
    [1, 9],
    [2, 110],
    [3, 111],
    [4, 112],
    [5, 113],
    [6, 114],
    [7, 101],
    [8, 102],
    [9, 0],
    [10, 103],
    [11, 104],
    [12, 105],
    [13, 106],
    [14, 107],
    [15, 108],
    [16, 1],
    [17, 109],
    [18, 7],
    [19, 2],
    [20, 3],
    [21, 4],
    [22, 5],
    [23, 6],
    [24, 101],
    [25, 102],
    [26, 114],
    [27, 114],
    [28, 103],
    [29, 104],
    [30, 0],
    [31, 103],
    [32, 7],
    [33, 109],
    [34, 7],
    [35, 109],
    [36, 108],
    [37, 3],
    [38, 2],
    [39, 115],
    [40, 116],
    [41, 117],
    [42, 118],
    [43, 119],
    [44, 120],
    [45, 121],
    [46, 122],
    [47, 32],
    [48, 123],
    [49, 124],
    [50, 125],
    [51, 126],
    [52, 127],
    [53, 128],
    [54, 129],
    [55, 130],
    [56, 131],
    [57, 132],
    [58, 133],
    [59, 44],
    [60, 134],
    [61, 135],
    [62, 136],
    [63, 137],
    [64, 138],
    [65, 139],
    [66, 140],
    [67, 141],
    [68, 142],
    [69, 143],
    [70, 144],
    [71, 56],
    [72, 145],
    [73, 146],
    [74, 147],
    [75, 148],
    [76, 149],
    [77, 150],
    [78, 151],
    [79, 152],
    [80, 153],
    [81, 154],
    [82, 155],
    [83, 68],
    [84, 156],
    [85, 157],
    [86, 158],
    [87, 159],
    [88, 160],
    [89, 77],
    [90, 161],
    [91, 162],
    [92, 163],
    [93, 78],
    [94, 79],
    [95, 80],
    [96, 81],
    [97, 82],
    [98, 83],
    [99, 84],
    [100, 85],
    [101, 86],
    [102, 87],
    [103, 88],
    [104, 89],
    [105, 89],
    [106, 90],
    [107, 91],
    [108, 92],
    [109, 93],
    [110, 94],
    [111, 95],
    [112, 96],
    [113, 97],
    [114, 98],
    [115, 99],
    [116, 100],
    [117, 159],
    [118, 7],
    [119, 8],
    [120, 9],
    [121, 10],
    [122, 11],
    [123, 12],
    [124, 13],
    [125, 14],
    [126, 15],
    [127, 16],
    [128, 17],
    [129, 18],
  ]),
  Ao = b([
    [0, 9],
    [1, 16],
    [2, 110],
    [3, 111],
    [4, 112],
    [5, 113],
    [6, 114],
    [7, 101],
    [8, 102],
    [9, 0],
    [10, 103],
    [11, 104],
    [12, 105],
    [13, 106],
    [14, 107],
    [15, 108],
    [16, 1],
    [17, 109],
    [18, 7],
    [19, 2],
    [20, 3],
    [21, 4],
    [22, 5],
    [23, 6],
    [24, 101],
    [25, 114],
    [26, 102],
    [27, 102],
    [28, 103],
    [29, 0],
    [30, 104],
    [31, 103],
    [32, 7],
    [33, 109],
    [34, 7],
    [35, 109],
    [36, 108],
    [37, 3],
    [38, 2],
  ]),
  xo = b([
    [0, 1],
    [1, 0],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8],
    [9, 9],
    [10, 10],
    [11, 11],
    [12, 12],
    [13, 13],
    [14, 14],
    [15, 15],
    [16, 16],
    [17, 17],
    [18, 18],
    [19, 19],
    [20, 20],
    [21, 21],
    [22, 22],
    [23, 23],
    [24, 7],
    [25, 8],
    [26, 6],
    [27, 6],
    [28, 10],
    [29, 11],
    [30, 9],
    [31, 10],
    [32, 18],
    [33, 17],
    [34, 18],
    [35, 17],
    [36, 15],
    [37, 20],
    [38, 19],
  ]),
  Eo = b([
    [0, 0],
    [1, 1],
    [2, 110],
    [3, 111],
    [4, 112],
    [5, 113],
    [6, 114],
    [7, 101],
    [8, 102],
    [9, 0],
    [10, 103],
    [11, 104],
    [12, 105],
    [13, 106],
    [14, 107],
    [15, 108],
    [16, 1],
    [17, 109],
    [18, 7],
    [19, 2],
    [20, 3],
    [21, 4],
    [22, 5],
    [23, 6],
    [24, 101],
    [25, 114],
    [26, 102],
    [27, 102],
    [28, 103],
    [29, 0],
    [30, 104],
    [31, 103],
    [32, 7],
    [33, 109],
    [34, 7],
    [35, 109],
    [36, 108],
    [37, 3],
    [38, 2],
  ]),
  Ro = b([
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8],
    [9, 9],
    [10, 10],
    [11, 11],
    [12, 12],
    [13, 13],
    [14, 14],
    [15, 15],
    [16, 16],
    [17, 17],
    [18, 18],
    [19, 19],
    [20, 20],
    [21, 21],
    [22, 22],
    [23, 23],
    [24, 7],
    [25, 6],
    [26, 8],
    [27, 8],
    [28, 10],
    [29, 9],
    [30, 11],
    [31, 10],
    [32, 18],
    [33, 17],
    [34, 18],
    [35, 17],
    [36, 15],
    [37, 20],
    [38, 19],
  ]),
  Vo = b([
    [0, 0],
    [1, 1],
    [2, 164],
    [3, 165],
    [4, 166],
    [5, 167],
    [6, 168],
    [7, 169],
    [8, 170],
    [9, 171],
    [10, 172],
    [11, 173],
    [12, 174],
    [13, 175],
    [14, 176],
    [15, 177],
    [16, 178],
    [17, 179],
    [18, 180],
    [19, 181],
    [20, 182],
    [21, 183],
    [22, 184],
    [23, 185],
    [24, 169],
    [25, 168],
    [26, 170],
    [27, 170],
    [28, 172],
    [29, 171],
    [30, 173],
    [31, 172],
    [32, 180],
    [33, 179],
    [34, 180],
    [35, 179],
    [36, 177],
    [37, 182],
    [38, 181],
  ]),
  Po = b([
    [0, 0],
    [1, 1],
    [2, 186],
    [3, 187],
    [4, 188],
    [5, 189],
    [6, 190],
    [7, 191],
    [8, 191],
    [9, 192],
    [10, 193],
    [11, 194],
    [12, 195],
    [13, 196],
    [14, 197],
    [15, 198],
    [16, 199],
    [17, 200],
    [18, 201],
    [19, 202],
    [20, 203],
    [21, 204],
    [22, 205],
    [23, 206],
    [24, 191],
    [25, 190],
    [26, 191],
    [27, 191],
    [28, 193],
    [29, 192],
    [30, 194],
    [31, 193],
    [32, 201],
    [33, 200],
    [34, 201],
    [35, 200],
    [36, 198],
    [37, 203],
    [38, 202],
  ]),
  Fo = b([
    [0, 0],
    [1, 1],
    [2, 207],
    [3, 208],
    [4, 209],
    [5, 210],
    [6, 211],
    [7, 212],
    [8, 213],
    [9, 214],
    [10, 215],
    [11, 216],
    [12, 217],
    [13, 218],
    [14, 219],
    [15, 220],
    [16, 221],
    [17, 222],
    [18, 223],
    [19, 224],
    [20, 225],
    [21, 226],
    [22, 227],
    [23, 228],
    [24, 212],
    [25, 211],
    [26, 213],
    [27, 213],
    [28, 215],
    [29, 214],
    [30, 216],
    [31, 215],
    [32, 223],
    [33, 222],
    [34, 223],
    [35, 222],
    [36, 220],
    [37, 225],
    [38, 224],
  ]),
  Mo = b([
    [0, 0],
    [1, 1],
    [2, 229],
    [3, 230],
    [4, 231],
    [5, 232],
    [6, 233],
    [7, 234],
    [8, 235],
    [9, 236],
    [10, 237],
    [11, 238],
    [12, 239],
    [13, 240],
    [14, 241],
    [15, 242],
    [16, 243],
    [17, 244],
    [18, 245],
    [19, 246],
    [20, 247],
    [21, 248],
    [22, 249],
    [23, 250],
    [24, 234],
    [25, 233],
    [26, 235],
    [27, 235],
    [28, 237],
    [29, 236],
    [30, 238],
    [31, 237],
    [32, 245],
    [33, 244],
    [34, 245],
    [35, 244],
    [36, 242],
    [37, 247],
    [38, 246],
  ]),
  Oo = b([
    [0, 16],
    [1, 9],
    [2, 110],
    [3, 111],
    [4, 112],
    [5, 113],
    [6, 114],
    [7, 101],
    [8, 102],
    [9, 0],
    [10, 103],
    [11, 104],
    [12, 105],
    [13, 106],
    [14, 107],
    [15, 108],
    [16, 1],
    [17, 109],
    [18, 7],
    [19, 2],
    [20, 3],
    [21, 4],
    [22, 5],
    [23, 6],
    [24, 101],
    [25, 102],
    [26, 114],
    [27, 114],
    [28, 103],
    [29, 104],
    [30, 0],
    [31, 103],
    [32, 7],
    [33, 109],
    [34, 7],
    [35, 109],
    [36, 108],
    [37, 3],
    [38, 2],
  ]),
  zo = b([
    [0, 16],
    [1, 9],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8],
    [9, 9],
    [10, 10],
    [11, 11],
    [12, 12],
    [13, 13],
    [14, 14],
    [15, 15],
    [16, 16],
    [17, 17],
    [18, 18],
    [19, 19],
    [20, 20],
    [21, 21],
    [22, 22],
    [23, 23],
    [24, 7],
    [25, 8],
    [26, 6],
    [27, 6],
    [28, 10],
    [29, 11],
    [30, 9],
    [31, 10],
    [32, 18],
    [33, 17],
    [34, 18],
    [35, 17],
    [36, 15],
    [37, 20],
    [38, 19],
  ]),
  Ho = b([
    [0, 16],
    [1, 9],
    [2, 251],
    [3, 252],
    [4, 253],
    [5, 254],
    [6, 255],
    [7, 256],
    [8, 257],
    [9, 258],
    [10, 259],
    [11, 260],
    [12, 261],
    [13, 262],
    [14, 263],
    [15, 177],
    [16, 264],
    [17, 265],
    [18, 266],
    [19, 267],
    [20, 268],
    [21, 269],
    [22, 270],
    [23, 271],
    [24, 256],
    [25, 257],
    [26, 255],
    [27, 255],
    [28, 259],
    [29, 260],
    [30, 258],
    [31, 259],
    [32, 266],
    [33, 265],
    [34, 266],
    [35, 265],
    [36, 177],
    [37, 268],
    [38, 267],
  ]),
  Do = b([
    [0, 16],
    [1, 9],
    [2, 272],
    [3, 273],
    [4, 274],
    [5, 275],
    [6, 276],
    [7, 277],
    [8, 278],
    [9, 279],
    [10, 280],
    [11, 281],
    [12, 282],
    [13, 283],
    [14, 284],
    [15, 198],
    [16, 285],
    [17, 286],
    [18, 287],
    [19, 288],
    [20, 289],
    [21, 290],
    [22, 291],
    [23, 292],
    [24, 277],
    [25, 278],
    [26, 276],
    [27, 276],
    [28, 280],
    [29, 281],
    [30, 279],
    [31, 280],
    [32, 287],
    [33, 286],
    [34, 287],
    [35, 286],
    [36, 198],
    [37, 289],
    [38, 288],
  ]),
  $o = b([
    [0, 16],
    [1, 9],
    [2, 293],
    [3, 294],
    [4, 295],
    [5, 296],
    [6, 297],
    [7, 298],
    [8, 299],
    [9, 300],
    [10, 301],
    [11, 302],
    [12, 303],
    [13, 304],
    [14, 305],
    [15, 220],
    [16, 306],
    [17, 307],
    [18, 308],
    [19, 309],
    [20, 310],
    [21, 311],
    [22, 312],
    [23, 313],
    [24, 298],
    [25, 299],
    [26, 297],
    [27, 297],
    [28, 301],
    [29, 302],
    [30, 300],
    [31, 301],
    [32, 308],
    [33, 307],
    [34, 308],
    [35, 307],
    [36, 220],
    [37, 310],
    [38, 309],
  ]),
  Bo = b([
    [0, 16],
    [1, 9],
    [2, 314],
    [3, 315],
    [4, 316],
    [5, 317],
    [6, 318],
    [7, 319],
    [8, 320],
    [9, 321],
    [10, 322],
    [11, 323],
    [12, 324],
    [13, 325],
    [14, 326],
    [15, 242],
    [16, 327],
    [17, 328],
    [18, 329],
    [19, 330],
    [20, 331],
    [21, 332],
    [22, 333],
    [23, 334],
    [24, 319],
    [25, 320],
    [26, 318],
    [27, 318],
    [28, 322],
    [29, 323],
    [30, 321],
    [31, 322],
    [32, 329],
    [33, 328],
    [34, 329],
    [35, 328],
    [36, 242],
    [37, 331],
    [38, 330],
  ]),
  D = b([
    [32, 18],
    [33, 17],
    [34, 18],
    [35, 17],
    [36, 15],
    [37, 20],
    [24, 8],
    [25, 7],
    [26, 9],
    [27, 9],
    [28, 11],
    [29, 10],
    [31, 11],
    [30, 12],
  ]),
  it = b([
    [32, 18],
    [33, 17],
    [34, 18],
    [35, 17],
    [36, 15],
    [37, 20],
    [24, 10],
    [25, 9],
    [26, 11],
    [27, 11],
    [28, 13],
    [29, 12],
    [31, 13],
    [30, 14],
  ]),
  ce = b([
    [32, 18],
    [33, 17],
    [34, 18],
    [35, 17],
    [36, 15],
    [37, 20],
    [24, 9],
    [25, 8],
    [26, 10],
    [27, 10],
    [28, 12],
    [29, 11],
    [31, 12],
    [30, 13],
  ]),
  _e = b([
    [0, 1],
    [1, 0],
    [2, 19],
    [3, 20],
    [4, 21],
    [5, 22],
    [6, 23],
    [7, 18],
    [8, 17],
    [9, 16],
    [10, 15],
    [11, 14],
    [12, 13],
    [13, 12],
    [14, 11],
    [15, 10],
    [16, 9],
    [17, 8],
    [18, 7],
    [19, 2],
    [20, 3],
    [21, 4],
    [22, 5],
    [23, 6],
    [24, 18],
    [25, 23],
    [26, 17],
    [27, 17],
    [28, 15],
    [29, 16],
    [30, 14],
    [31, 15],
    [32, 7],
    [33, 8],
    [34, 7],
    [35, 8],
    [36, 10],
    [37, 3],
    [38, 2],
  ]),
  $ = b([
    [32, 7],
    [33, 109],
    [34, 7],
    [35, 109],
    [36, 108],
    [37, 3],
    [24, 102],
    [25, 0],
    [26, 101],
    [27, 101],
    [28, 104],
    [29, 105],
    [31, 104],
    [30, 103],
  ]),
  at = b([
    [32, 7],
    [33, 109],
    [34, 7],
    [35, 109],
    [36, 108],
    [37, 3],
    [24, 103],
    [25, 104],
    [26, 0],
    [27, 0],
    [28, 106],
    [29, 107],
    [31, 106],
    [30, 105],
  ]),
  fe = b([
    [32, 7],
    [33, 109],
    [34, 7],
    [35, 109],
    [36, 108],
    [37, 3],
    [24, 0],
    [25, 103],
    [26, 102],
    [27, 102],
    [28, 105],
    [29, 106],
    [31, 105],
    [30, 104],
  ]),
  me = b([
    [0, 9],
    [1, 16],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 109],
    [9, 1],
    [10, 108],
    [11, 107],
    [12, 106],
    [13, 105],
    [14, 104],
    [15, 103],
    [16, 0],
    [17, 102],
    [18, 101],
    [19, 110],
    [20, 111],
    [21, 112],
    [22, 113],
    [23, 114],
    [24, 7],
    [25, 109],
    [26, 6],
    [27, 6],
    [28, 108],
    [29, 107],
    [30, 1],
    [31, 108],
    [32, 101],
    [33, 102],
    [34, 101],
    [35, 102],
    [36, 103],
    [37, 111],
    [38, 110],
  ]),
  B = b([
    [32, 7],
    [33, 109],
    [34, 7],
    [35, 109],
    [36, 108],
    [37, 3],
    [24, 102],
    [25, 101],
    [26, 0],
    [27, 0],
    [28, 104],
    [29, 103],
    [31, 104],
    [30, 105],
  ]),
  st = b([
    [32, 7],
    [33, 109],
    [34, 7],
    [35, 109],
    [36, 108],
    [37, 3],
    [24, 103],
    [25, 0],
    [26, 104],
    [27, 104],
    [28, 106],
    [29, 105],
    [31, 106],
    [30, 107],
  ]),
  ge = b([
    [32, 7],
    [33, 109],
    [34, 7],
    [35, 109],
    [36, 108],
    [37, 3],
    [24, 0],
    [25, 102],
    [26, 103],
    [27, 103],
    [28, 105],
    [29, 104],
    [31, 105],
    [30, 106],
  ]),
  nt = b([
    [0, 16],
    [1, 9],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 109],
    [9, 1],
    [10, 108],
    [11, 107],
    [12, 106],
    [13, 105],
    [14, 104],
    [15, 103],
    [16, 0],
    [17, 102],
    [18, 101],
    [19, 110],
    [20, 111],
    [21, 112],
    [22, 113],
    [23, 114],
    [24, 7],
    [25, 6],
    [26, 109],
    [27, 109],
    [28, 108],
    [29, 1],
    [30, 107],
    [31, 108],
    [32, 101],
    [33, 102],
    [34, 101],
    [35, 102],
    [36, 103],
    [37, 111],
    [38, 110],
  ]),
  j = b([
    [32, 18],
    [33, 17],
    [34, 18],
    [35, 17],
    [36, 15],
    [37, 20],
    [24, 8],
    [25, 9],
    [26, 7],
    [27, 7],
    [28, 11],
    [29, 12],
    [31, 11],
    [30, 10],
  ]),
  ot = b([
    [32, 18],
    [33, 17],
    [34, 18],
    [35, 17],
    [36, 15],
    [37, 20],
    [24, 10],
    [25, 11],
    [26, 9],
    [27, 9],
    [28, 13],
    [29, 14],
    [31, 13],
    [30, 12],
  ]),
  ve = b([
    [32, 18],
    [33, 17],
    [34, 18],
    [35, 17],
    [36, 15],
    [37, 20],
    [24, 9],
    [25, 10],
    [26, 8],
    [27, 8],
    [28, 12],
    [29, 13],
    [31, 12],
    [30, 11],
  ]),
  lt = b([
    [0, 0],
    [1, 1],
    [2, 19],
    [3, 20],
    [4, 21],
    [5, 22],
    [6, 23],
    [7, 18],
    [8, 17],
    [9, 16],
    [10, 15],
    [11, 14],
    [12, 13],
    [13, 12],
    [14, 11],
    [15, 10],
    [16, 9],
    [17, 8],
    [18, 7],
    [19, 2],
    [20, 3],
    [21, 4],
    [22, 5],
    [23, 6],
    [24, 18],
    [25, 17],
    [26, 23],
    [27, 23],
    [28, 15],
    [29, 14],
    [30, 16],
    [31, 15],
    [32, 7],
    [33, 8],
    [34, 7],
    [35, 8],
    [36, 10],
    [37, 3],
    [38, 2],
  ]),
  ht = b([
    [0, 1],
    [1, 0],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 109],
    [9, 1],
    [10, 108],
    [11, 107],
    [12, 106],
    [13, 105],
    [14, 104],
    [15, 103],
    [16, 0],
    [17, 102],
    [18, 101],
    [19, 110],
    [20, 111],
    [21, 112],
    [22, 113],
    [23, 114],
    [24, 7],
    [25, 6],
    [26, 109],
    [27, 109],
    [28, 108],
    [29, 1],
    [30, 107],
    [31, 108],
    [32, 101],
    [33, 102],
    [34, 101],
    [35, 102],
    [36, 103],
    [37, 111],
    [38, 110],
  ]),
  pe = b([
    [32, 180],
    [33, 179],
    [34, 180],
    [35, 179],
    [36, 177],
    [37, 182],
    [24, 170],
    [25, 169],
    [26, 171],
    [27, 171],
    [28, 173],
    [29, 172],
    [31, 173],
    [30, 174],
  ]),
  ei = b([
    [32, 180],
    [33, 179],
    [34, 180],
    [35, 179],
    [36, 177],
    [37, 182],
    [24, 172],
    [25, 171],
    [26, 173],
    [27, 173],
    [28, 175],
    [29, 174],
    [31, 175],
    [30, 176],
  ]),
  ut = b([
    [32, 180],
    [33, 179],
    [34, 180],
    [35, 179],
    [36, 177],
    [37, 182],
    [24, 171],
    [25, 170],
    [26, 172],
    [27, 172],
    [28, 174],
    [29, 173],
    [31, 174],
    [30, 175],
  ]),
  dt = b([
    [0, 1],
    [1, 0],
    [2, 181],
    [3, 182],
    [4, 183],
    [5, 184],
    [6, 185],
    [7, 180],
    [8, 179],
    [9, 178],
    [10, 177],
    [11, 176],
    [12, 175],
    [13, 174],
    [14, 173],
    [15, 172],
    [16, 171],
    [17, 170],
    [18, 169],
    [19, 164],
    [20, 165],
    [21, 166],
    [22, 167],
    [23, 168],
    [24, 180],
    [25, 185],
    [26, 179],
    [27, 179],
    [28, 177],
    [29, 178],
    [30, 176],
    [31, 177],
    [32, 169],
    [33, 170],
    [34, 169],
    [35, 170],
    [36, 172],
    [37, 165],
    [38, 164],
  ]),
  be = b([
    [32, 201],
    [33, 200],
    [34, 201],
    [35, 200],
    [36, 198],
    [37, 203],
    [24, 191],
    [25, 191],
    [26, 192],
    [27, 192],
    [28, 194],
    [29, 193],
    [31, 194],
    [30, 195],
  ]),
  ti = b([
    [32, 201],
    [33, 200],
    [34, 201],
    [35, 200],
    [36, 198],
    [37, 203],
    [24, 193],
    [25, 192],
    [26, 194],
    [27, 194],
    [28, 196],
    [29, 195],
    [31, 196],
    [30, 197],
  ]),
  ct = b([
    [32, 201],
    [33, 200],
    [34, 201],
    [35, 200],
    [36, 198],
    [37, 203],
    [24, 192],
    [25, 191],
    [26, 193],
    [27, 193],
    [28, 195],
    [29, 194],
    [31, 195],
    [30, 196],
  ]),
  _t = b([
    [0, 1],
    [1, 0],
    [2, 202],
    [3, 203],
    [4, 204],
    [5, 205],
    [6, 206],
    [7, 201],
    [8, 200],
    [9, 199],
    [10, 198],
    [11, 197],
    [12, 196],
    [13, 195],
    [14, 194],
    [15, 193],
    [16, 192],
    [17, 191],
    [18, 191],
    [19, 186],
    [20, 187],
    [21, 188],
    [22, 189],
    [23, 190],
    [24, 201],
    [25, 206],
    [26, 200],
    [27, 200],
    [28, 198],
    [29, 199],
    [30, 197],
    [31, 198],
    [32, 191],
    [33, 191],
    [34, 191],
    [35, 191],
    [36, 193],
    [37, 187],
    [38, 186],
  ]),
  ye = b([
    [32, 223],
    [33, 222],
    [34, 223],
    [35, 222],
    [36, 220],
    [37, 225],
    [24, 213],
    [25, 212],
    [26, 214],
    [27, 214],
    [28, 216],
    [29, 215],
    [31, 216],
    [30, 217],
  ]),
  ri = b([
    [32, 223],
    [33, 222],
    [34, 223],
    [35, 222],
    [36, 220],
    [37, 225],
    [24, 215],
    [25, 214],
    [26, 216],
    [27, 216],
    [28, 218],
    [29, 217],
    [31, 218],
    [30, 219],
  ]),
  ft = b([
    [32, 223],
    [33, 222],
    [34, 223],
    [35, 222],
    [36, 220],
    [37, 225],
    [24, 214],
    [25, 213],
    [26, 215],
    [27, 215],
    [28, 217],
    [29, 216],
    [31, 217],
    [30, 218],
  ]),
  mt = b([
    [0, 1],
    [1, 0],
    [2, 224],
    [3, 225],
    [4, 226],
    [5, 227],
    [6, 228],
    [7, 223],
    [8, 222],
    [9, 221],
    [10, 220],
    [11, 219],
    [12, 218],
    [13, 217],
    [14, 216],
    [15, 215],
    [16, 214],
    [17, 213],
    [18, 212],
    [19, 207],
    [20, 208],
    [21, 209],
    [22, 210],
    [23, 211],
    [24, 223],
    [25, 228],
    [26, 222],
    [27, 222],
    [28, 220],
    [29, 221],
    [30, 219],
    [31, 220],
    [32, 212],
    [33, 213],
    [34, 212],
    [35, 213],
    [36, 215],
    [37, 208],
    [38, 207],
  ]),
  Ce = b([
    [32, 245],
    [33, 244],
    [34, 245],
    [35, 244],
    [36, 242],
    [37, 247],
    [24, 235],
    [25, 234],
    [26, 236],
    [27, 236],
    [28, 238],
    [29, 237],
    [31, 238],
    [30, 239],
  ]),
  ii = b([
    [32, 245],
    [33, 244],
    [34, 245],
    [35, 244],
    [36, 242],
    [37, 247],
    [24, 237],
    [25, 236],
    [26, 238],
    [27, 238],
    [28, 240],
    [29, 239],
    [31, 240],
    [30, 241],
  ]),
  gt = b([
    [32, 245],
    [33, 244],
    [34, 245],
    [35, 244],
    [36, 242],
    [37, 247],
    [24, 236],
    [25, 235],
    [26, 237],
    [27, 237],
    [28, 239],
    [29, 238],
    [31, 239],
    [30, 240],
  ]),
  vt = b([
    [0, 1],
    [1, 0],
    [2, 246],
    [3, 247],
    [4, 248],
    [5, 249],
    [6, 250],
    [7, 245],
    [8, 244],
    [9, 243],
    [10, 242],
    [11, 241],
    [12, 240],
    [13, 239],
    [14, 238],
    [15, 237],
    [16, 236],
    [17, 235],
    [18, 234],
    [19, 229],
    [20, 230],
    [21, 231],
    [22, 232],
    [23, 233],
    [24, 245],
    [25, 250],
    [26, 244],
    [27, 244],
    [28, 242],
    [29, 243],
    [30, 241],
    [31, 242],
    [32, 234],
    [33, 235],
    [34, 234],
    [35, 235],
    [36, 237],
    [37, 230],
    [38, 229],
  ]),
  pt = b([
    [0, 9],
    [1, 16],
    [2, 19],
    [3, 20],
    [4, 21],
    [5, 22],
    [6, 23],
    [7, 18],
    [8, 17],
    [9, 16],
    [10, 15],
    [11, 14],
    [12, 13],
    [13, 12],
    [14, 11],
    [15, 10],
    [16, 9],
    [17, 8],
    [18, 7],
    [19, 2],
    [20, 3],
    [21, 4],
    [22, 5],
    [23, 6],
    [24, 18],
    [25, 17],
    [26, 23],
    [27, 23],
    [28, 15],
    [29, 14],
    [30, 16],
    [31, 15],
    [32, 7],
    [33, 8],
    [34, 7],
    [35, 8],
    [36, 10],
    [37, 3],
    [38, 2],
  ]),
  ke = b([
    [32, 266],
    [33, 265],
    [34, 266],
    [35, 265],
    [36, 177],
    [37, 268],
    [24, 257],
    [25, 258],
    [26, 256],
    [27, 256],
    [28, 260],
    [29, 261],
    [31, 260],
    [30, 259],
  ]),
  ai = b([
    [32, 266],
    [33, 265],
    [34, 266],
    [35, 265],
    [36, 177],
    [37, 268],
    [24, 259],
    [25, 260],
    [26, 258],
    [27, 258],
    [28, 262],
    [29, 263],
    [31, 262],
    [30, 261],
  ]),
  bt = b([
    [32, 266],
    [33, 265],
    [34, 266],
    [35, 265],
    [36, 177],
    [37, 268],
    [24, 258],
    [25, 259],
    [26, 257],
    [27, 257],
    [28, 261],
    [29, 262],
    [31, 261],
    [30, 260],
  ]),
  yt = b([
    [0, 9],
    [1, 16],
    [2, 267],
    [3, 268],
    [4, 269],
    [5, 270],
    [6, 271],
    [7, 266],
    [8, 265],
    [9, 264],
    [10, 177],
    [11, 263],
    [12, 262],
    [13, 261],
    [14, 260],
    [15, 259],
    [16, 258],
    [17, 257],
    [18, 256],
    [19, 251],
    [20, 252],
    [21, 253],
    [22, 254],
    [23, 255],
    [24, 266],
    [25, 265],
    [26, 271],
    [27, 271],
    [28, 177],
    [29, 263],
    [30, 264],
    [31, 177],
    [32, 256],
    [33, 257],
    [34, 256],
    [35, 257],
    [36, 259],
    [37, 252],
    [38, 251],
  ]),
  we = b([
    [32, 287],
    [33, 286],
    [34, 287],
    [35, 286],
    [36, 198],
    [37, 289],
    [24, 278],
    [25, 279],
    [26, 277],
    [27, 277],
    [28, 281],
    [29, 282],
    [31, 281],
    [30, 280],
  ]),
  si = b([
    [32, 287],
    [33, 286],
    [34, 287],
    [35, 286],
    [36, 198],
    [37, 289],
    [24, 280],
    [25, 281],
    [26, 279],
    [27, 279],
    [28, 283],
    [29, 284],
    [31, 283],
    [30, 282],
  ]),
  Ct = b([
    [32, 287],
    [33, 286],
    [34, 287],
    [35, 286],
    [36, 198],
    [37, 289],
    [24, 279],
    [25, 280],
    [26, 278],
    [27, 278],
    [28, 282],
    [29, 283],
    [31, 282],
    [30, 281],
  ]),
  kt = b([
    [0, 9],
    [1, 16],
    [2, 288],
    [3, 289],
    [4, 290],
    [5, 291],
    [6, 292],
    [7, 287],
    [8, 286],
    [9, 285],
    [10, 198],
    [11, 284],
    [12, 283],
    [13, 282],
    [14, 281],
    [15, 280],
    [16, 279],
    [17, 278],
    [18, 277],
    [19, 272],
    [20, 273],
    [21, 274],
    [22, 275],
    [23, 276],
    [24, 287],
    [25, 286],
    [26, 292],
    [27, 292],
    [28, 198],
    [29, 284],
    [30, 285],
    [31, 198],
    [32, 277],
    [33, 278],
    [34, 277],
    [35, 278],
    [36, 280],
    [37, 273],
    [38, 272],
  ]),
  Se = b([
    [32, 308],
    [33, 307],
    [34, 308],
    [35, 307],
    [36, 220],
    [37, 310],
    [24, 299],
    [25, 300],
    [26, 298],
    [27, 298],
    [28, 302],
    [29, 303],
    [31, 302],
    [30, 301],
  ]),
  ni = b([
    [32, 308],
    [33, 307],
    [34, 308],
    [35, 307],
    [36, 220],
    [37, 310],
    [24, 301],
    [25, 302],
    [26, 300],
    [27, 300],
    [28, 304],
    [29, 305],
    [31, 304],
    [30, 303],
  ]),
  wt = b([
    [32, 308],
    [33, 307],
    [34, 308],
    [35, 307],
    [36, 220],
    [37, 310],
    [24, 300],
    [25, 301],
    [26, 299],
    [27, 299],
    [28, 303],
    [29, 304],
    [31, 303],
    [30, 302],
  ]),
  St = b([
    [0, 9],
    [1, 16],
    [2, 309],
    [3, 310],
    [4, 311],
    [5, 312],
    [6, 313],
    [7, 308],
    [8, 307],
    [9, 306],
    [10, 220],
    [11, 305],
    [12, 304],
    [13, 303],
    [14, 302],
    [15, 301],
    [16, 300],
    [17, 299],
    [18, 298],
    [19, 293],
    [20, 294],
    [21, 295],
    [22, 296],
    [23, 297],
    [24, 308],
    [25, 307],
    [26, 313],
    [27, 313],
    [28, 220],
    [29, 305],
    [30, 306],
    [31, 220],
    [32, 298],
    [33, 299],
    [34, 298],
    [35, 299],
    [36, 301],
    [37, 294],
    [38, 293],
  ]),
  Te = b([
    [32, 329],
    [33, 328],
    [34, 329],
    [35, 328],
    [36, 242],
    [37, 331],
    [24, 320],
    [25, 321],
    [26, 319],
    [27, 319],
    [28, 323],
    [29, 324],
    [31, 323],
    [30, 322],
  ]),
  oi = b([
    [32, 329],
    [33, 328],
    [34, 329],
    [35, 328],
    [36, 242],
    [37, 331],
    [24, 322],
    [25, 323],
    [26, 321],
    [27, 321],
    [28, 325],
    [29, 326],
    [31, 325],
    [30, 324],
  ]),
  Tt = b([
    [32, 329],
    [33, 328],
    [34, 329],
    [35, 328],
    [36, 242],
    [37, 331],
    [24, 321],
    [25, 322],
    [26, 320],
    [27, 320],
    [28, 324],
    [29, 325],
    [31, 324],
    [30, 323],
  ]),
  It = b([
    [0, 9],
    [1, 16],
    [2, 330],
    [3, 331],
    [4, 332],
    [5, 333],
    [6, 334],
    [7, 329],
    [8, 328],
    [9, 327],
    [10, 242],
    [11, 326],
    [12, 325],
    [13, 324],
    [14, 323],
    [15, 322],
    [16, 321],
    [17, 320],
    [18, 319],
    [19, 314],
    [20, 315],
    [21, 316],
    [22, 317],
    [23, 318],
    [24, 329],
    [25, 328],
    [26, 334],
    [27, 334],
    [28, 242],
    [29, 326],
    [30, 327],
    [31, 242],
    [32, 319],
    [33, 320],
    [34, 319],
    [35, 320],
    [36, 322],
    [37, 315],
    [38, 314],
  ]),
  jo = {
    light: No,
    dark: Lo,
    light_accent: Ao,
    dark_accent: xo,
    light_black: Eo,
    light_white: Ro,
    light_blue: Vo,
    light_red: Po,
    light_yellow: Fo,
    light_green: Mo,
    dark_black: Oo,
    dark_white: zo,
    dark_blue: Ho,
    dark_red: Do,
    dark_yellow: $o,
    dark_green: Bo,
    light_ListItem: D,
    light_SelectTrigger: D,
    light_Card: D,
    light_Progress: D,
    light_TooltipArrow: D,
    light_SliderTrack: D,
    light_Input: D,
    light_TextArea: D,
    light_white_ListItem: D,
    light_white_SelectTrigger: D,
    light_white_Card: D,
    light_white_Progress: D,
    light_white_TooltipArrow: D,
    light_white_SliderTrack: D,
    light_white_Input: D,
    light_white_TextArea: D,
    light_Button: it,
    light_SliderTrackActive: it,
    light_white_Button: it,
    light_white_SliderTrackActive: it,
    light_Checkbox: ce,
    light_Switch: ce,
    light_TooltipContent: ce,
    light_RadioGroupItem: ce,
    light_white_Checkbox: ce,
    light_white_Switch: ce,
    light_white_TooltipContent: ce,
    light_white_RadioGroupItem: ce,
    light_SwitchThumb: _e,
    light_SliderThumb: _e,
    light_Tooltip: _e,
    light_ProgressIndicator: _e,
    light_white_SwitchThumb: _e,
    light_white_SliderThumb: _e,
    light_white_Tooltip: _e,
    light_white_ProgressIndicator: _e,
    dark_ListItem: $,
    dark_SelectTrigger: $,
    dark_Card: $,
    dark_Progress: $,
    dark_TooltipArrow: $,
    dark_SliderTrack: $,
    dark_Input: $,
    dark_TextArea: $,
    dark_black_ListItem: $,
    dark_black_SelectTrigger: $,
    dark_black_Card: $,
    dark_black_Progress: $,
    dark_black_TooltipArrow: $,
    dark_black_SliderTrack: $,
    dark_black_Input: $,
    dark_black_TextArea: $,
    dark_Button: at,
    dark_SliderTrackActive: at,
    dark_black_Button: at,
    dark_black_SliderTrackActive: at,
    dark_Checkbox: fe,
    dark_Switch: fe,
    dark_TooltipContent: fe,
    dark_RadioGroupItem: fe,
    dark_black_Checkbox: fe,
    dark_black_Switch: fe,
    dark_black_TooltipContent: fe,
    dark_black_RadioGroupItem: fe,
    dark_SwitchThumb: me,
    dark_SliderThumb: me,
    dark_Tooltip: me,
    dark_ProgressIndicator: me,
    dark_black_SwitchThumb: me,
    dark_black_SliderThumb: me,
    dark_black_Tooltip: me,
    dark_black_ProgressIndicator: me,
    light_accent_ListItem: B,
    light_accent_SelectTrigger: B,
    light_accent_Card: B,
    light_accent_Progress: B,
    light_accent_TooltipArrow: B,
    light_accent_SliderTrack: B,
    light_accent_Input: B,
    light_accent_TextArea: B,
    light_black_ListItem: B,
    light_black_SelectTrigger: B,
    light_black_Card: B,
    light_black_Progress: B,
    light_black_TooltipArrow: B,
    light_black_SliderTrack: B,
    light_black_Input: B,
    light_black_TextArea: B,
    light_accent_Button: st,
    light_accent_SliderTrackActive: st,
    light_black_Button: st,
    light_black_SliderTrackActive: st,
    light_accent_Checkbox: ge,
    light_accent_Switch: ge,
    light_accent_TooltipContent: ge,
    light_accent_RadioGroupItem: ge,
    light_black_Checkbox: ge,
    light_black_Switch: ge,
    light_black_TooltipContent: ge,
    light_black_RadioGroupItem: ge,
    light_accent_SwitchThumb: nt,
    light_accent_SliderThumb: nt,
    light_accent_Tooltip: nt,
    light_accent_ProgressIndicator: nt,
    dark_accent_ListItem: j,
    dark_accent_SelectTrigger: j,
    dark_accent_Card: j,
    dark_accent_Progress: j,
    dark_accent_TooltipArrow: j,
    dark_accent_SliderTrack: j,
    dark_accent_Input: j,
    dark_accent_TextArea: j,
    dark_white_ListItem: j,
    dark_white_SelectTrigger: j,
    dark_white_Card: j,
    dark_white_Progress: j,
    dark_white_TooltipArrow: j,
    dark_white_SliderTrack: j,
    dark_white_Input: j,
    dark_white_TextArea: j,
    dark_accent_Button: ot,
    dark_accent_SliderTrackActive: ot,
    dark_white_Button: ot,
    dark_white_SliderTrackActive: ot,
    dark_accent_Checkbox: ve,
    dark_accent_Switch: ve,
    dark_accent_TooltipContent: ve,
    dark_accent_RadioGroupItem: ve,
    dark_white_Checkbox: ve,
    dark_white_Switch: ve,
    dark_white_TooltipContent: ve,
    dark_white_RadioGroupItem: ve,
    dark_accent_SwitchThumb: lt,
    dark_accent_SliderThumb: lt,
    dark_accent_Tooltip: lt,
    dark_accent_ProgressIndicator: lt,
    light_black_SwitchThumb: ht,
    light_black_SliderThumb: ht,
    light_black_Tooltip: ht,
    light_black_ProgressIndicator: ht,
    light_blue_ListItem: pe,
    light_blue_SelectTrigger: pe,
    light_blue_Card: pe,
    light_blue_Progress: pe,
    light_blue_TooltipArrow: pe,
    light_blue_SliderTrack: pe,
    light_blue_Input: pe,
    light_blue_TextArea: pe,
    light_blue_Button: ei,
    light_blue_SliderTrackActive: ei,
    light_blue_Checkbox: ut,
    light_blue_Switch: ut,
    light_blue_TooltipContent: ut,
    light_blue_RadioGroupItem: ut,
    light_blue_SwitchThumb: dt,
    light_blue_SliderThumb: dt,
    light_blue_Tooltip: dt,
    light_blue_ProgressIndicator: dt,
    light_red_ListItem: be,
    light_red_SelectTrigger: be,
    light_red_Card: be,
    light_red_Progress: be,
    light_red_TooltipArrow: be,
    light_red_SliderTrack: be,
    light_red_Input: be,
    light_red_TextArea: be,
    light_red_Button: ti,
    light_red_SliderTrackActive: ti,
    light_red_Checkbox: ct,
    light_red_Switch: ct,
    light_red_TooltipContent: ct,
    light_red_RadioGroupItem: ct,
    light_red_SwitchThumb: _t,
    light_red_SliderThumb: _t,
    light_red_Tooltip: _t,
    light_red_ProgressIndicator: _t,
    light_yellow_ListItem: ye,
    light_yellow_SelectTrigger: ye,
    light_yellow_Card: ye,
    light_yellow_Progress: ye,
    light_yellow_TooltipArrow: ye,
    light_yellow_SliderTrack: ye,
    light_yellow_Input: ye,
    light_yellow_TextArea: ye,
    light_yellow_Button: ri,
    light_yellow_SliderTrackActive: ri,
    light_yellow_Checkbox: ft,
    light_yellow_Switch: ft,
    light_yellow_TooltipContent: ft,
    light_yellow_RadioGroupItem: ft,
    light_yellow_SwitchThumb: mt,
    light_yellow_SliderThumb: mt,
    light_yellow_Tooltip: mt,
    light_yellow_ProgressIndicator: mt,
    light_green_ListItem: Ce,
    light_green_SelectTrigger: Ce,
    light_green_Card: Ce,
    light_green_Progress: Ce,
    light_green_TooltipArrow: Ce,
    light_green_SliderTrack: Ce,
    light_green_Input: Ce,
    light_green_TextArea: Ce,
    light_green_Button: ii,
    light_green_SliderTrackActive: ii,
    light_green_Checkbox: gt,
    light_green_Switch: gt,
    light_green_TooltipContent: gt,
    light_green_RadioGroupItem: gt,
    light_green_SwitchThumb: vt,
    light_green_SliderThumb: vt,
    light_green_Tooltip: vt,
    light_green_ProgressIndicator: vt,
    dark_white_SwitchThumb: pt,
    dark_white_SliderThumb: pt,
    dark_white_Tooltip: pt,
    dark_white_ProgressIndicator: pt,
    dark_blue_ListItem: ke,
    dark_blue_SelectTrigger: ke,
    dark_blue_Card: ke,
    dark_blue_Progress: ke,
    dark_blue_TooltipArrow: ke,
    dark_blue_SliderTrack: ke,
    dark_blue_Input: ke,
    dark_blue_TextArea: ke,
    dark_blue_Button: ai,
    dark_blue_SliderTrackActive: ai,
    dark_blue_Checkbox: bt,
    dark_blue_Switch: bt,
    dark_blue_TooltipContent: bt,
    dark_blue_RadioGroupItem: bt,
    dark_blue_SwitchThumb: yt,
    dark_blue_SliderThumb: yt,
    dark_blue_Tooltip: yt,
    dark_blue_ProgressIndicator: yt,
    dark_red_ListItem: we,
    dark_red_SelectTrigger: we,
    dark_red_Card: we,
    dark_red_Progress: we,
    dark_red_TooltipArrow: we,
    dark_red_SliderTrack: we,
    dark_red_Input: we,
    dark_red_TextArea: we,
    dark_red_Button: si,
    dark_red_SliderTrackActive: si,
    dark_red_Checkbox: Ct,
    dark_red_Switch: Ct,
    dark_red_TooltipContent: Ct,
    dark_red_RadioGroupItem: Ct,
    dark_red_SwitchThumb: kt,
    dark_red_SliderThumb: kt,
    dark_red_Tooltip: kt,
    dark_red_ProgressIndicator: kt,
    dark_yellow_ListItem: Se,
    dark_yellow_SelectTrigger: Se,
    dark_yellow_Card: Se,
    dark_yellow_Progress: Se,
    dark_yellow_TooltipArrow: Se,
    dark_yellow_SliderTrack: Se,
    dark_yellow_Input: Se,
    dark_yellow_TextArea: Se,
    dark_yellow_Button: ni,
    dark_yellow_SliderTrackActive: ni,
    dark_yellow_Checkbox: wt,
    dark_yellow_Switch: wt,
    dark_yellow_TooltipContent: wt,
    dark_yellow_RadioGroupItem: wt,
    dark_yellow_SwitchThumb: St,
    dark_yellow_SliderThumb: St,
    dark_yellow_Tooltip: St,
    dark_yellow_ProgressIndicator: St,
    dark_green_ListItem: Te,
    dark_green_SelectTrigger: Te,
    dark_green_Card: Te,
    dark_green_Progress: Te,
    dark_green_TooltipArrow: Te,
    dark_green_SliderTrack: Te,
    dark_green_Input: Te,
    dark_green_TextArea: Te,
    dark_green_Button: oi,
    dark_green_SliderTrackActive: oi,
    dark_green_Checkbox: Tt,
    dark_green_Switch: Tt,
    dark_green_TooltipContent: Tt,
    dark_green_RadioGroupItem: Tt,
    dark_green_SwitchThumb: It,
    dark_green_SliderThumb: It,
    dark_green_Tooltip: It,
    dark_green_ProgressIndicator: It,
  };
function Uo(r) {
  const e = r.match(/(\d+(?:\.\d+)?)\s*ms/);
  if (e) return Number.parseInt(e[1], 10);
  const t = r.match(/(\d+(?:\.\d+)?)\s*s/);
  return t ? Math.round(Number.parseFloat(t[1]) * 1e3) : 300;
}
function Wo(r) {
  const e = new WeakMap();
  return {
    animations: r,
    usePresence: Hi,
    ResetPresence: mi,
    supportsCSS: !0,
    useAnimatedNumber(t) {
      const [i, a] = ae.useState(t),
        [n, o] = g.useState();
      return (
        ir(() => {
          n && (n == null || n(), o(void 0));
        }, [n]),
        {
          getInstance() {
            return a;
          },
          getValue() {
            return i;
          },
          setValue(s, l, h) {
            a(s), o(h);
          },
          stop() {},
        }
      );
    },
    useAnimatedNumberReaction({ value: t }, i) {
      ae.useEffect(() => {
        const a = t.getInstance();
        let n = e.get(a);
        if (!n) {
          const o = new Set();
          e.set(a, o), (n = o);
        }
        return (
          n.add(i),
          () => {
            n == null || n.delete(i);
          }
        );
      }, []);
    },
    useAnimatedNumberStyle(t, i) {
      return i(t.getValue());
    },
    useAnimations: ({
      props: t,
      presence: i,
      style: a,
      componentState: n,
      stateRef: o,
    }) => {
      const s = !!n.unmounted,
        l = (i == null ? void 0 : i[0]) === !1,
        h = i == null ? void 0 : i[1],
        [u, d] = Array.isArray(t.animation) ? t.animation : [t.animation],
        c = r[u],
        f = t.animateOnly ?? ['all'];
      return (
        ir(() => {
          const _ = o.current.host;
          if (!h || !l || !_) return;
          const m = _,
            p = c ? Uo(c) : 200,
            C = setTimeout(() => {
              h == null || h();
            }, p),
            k = () => {
              clearTimeout(C), h == null || h();
            };
          return (
            m.addEventListener('transitionend', k),
            m.addEventListener('transitioncancel', k),
            () => {
              clearTimeout(C),
                m.removeEventListener('transitionend', k),
                m.removeEventListener('transitioncancel', k);
            }
          );
        }, [h, l]),
        c &&
          (Array.isArray(a.transform) && (a.transform = Zi(a.transform)),
          (a.transition = f
            .map((_) => {
              const m = r[d == null ? void 0 : d[_]] ?? c;
              return `${_} ${m}`;
            })
            .join(', '))),
        c ? { style: a, className: s ? 't_unmounted' : '' } : null
      );
    },
  };
}
const rr = 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
  qo = Wo({
    '75ms': 'ease-in 75ms',
    '100ms': 'ease-in 100ms',
    '200ms': 'ease-in 200ms',
    bouncy: 'ease-in 200ms',
    superBouncy: 'ease-in 500ms',
    lazy: 'ease-in 1000ms',
    medium: 'ease-in 300ms',
    slow: 'ease-in 500ms',
    quick: `${rr} 400ms`,
    quicker: `${rr} 300ms`,
    quickest: `${rr} 200ms`,
    tooltip: 'ease-in 400ms',
  }),
  li = ({
    font: r = {},
    sizeLineHeight: e = (i) => i + 10,
    sizeSize: t = (i) => i * 1,
  } = {}) => {
    const i = Object.fromEntries(
      Object.entries({ ...Ko, ...r.size }).map(([a, n]) => [a, t(+n)])
    );
    return Bn({
      family:
        '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      lineHeight: Object.fromEntries(
        Object.entries(i).map(([a, n]) => [a, e(ea(n))])
      ),
      weight: { 4: '300' },
      letterSpacing: { 4: 0 },
      ...r,
      size: i,
    });
  },
  Ko = {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    true: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 23,
    9: 30,
    10: 46,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134,
  },
  Go = { body: li(), heading: li({ sizeSize: (r) => r * 1.4 }) },
  q = {
    '2xl': 1536,
    xl: 1280,
    lg: 1024,
    md: 768,
    sm: 640,
    xs: 460,
    '2xs': 340,
  },
  Yo = {
    maxXs: { maxWidth: q.xs },
    max2xs: { maxWidth: q['2xs'] },
    maxSm: { maxWidth: q.sm },
    maxMd: { maxWidth: q.md },
    maxLg: { maxWidth: q.lg },
    maxXl: { maxWidth: q.xl },
    max2Xl: { maxWidth: q['2xl'] },
    '2xl': { minWidth: q['2xl'] },
    xl: { minWidth: q.xl },
    lg: { minWidth: q.lg },
    md: { minWidth: q.md },
    sm: { minWidth: q.sm },
    xs: { minWidth: q.xs },
    '2xs': { minWidth: q['2xs'] },
  },
  Jo = { '2xl': !1, xl: !1, lg: !1, md: !1, sm: !1, xs: !0, '2xs': !0 },
  Qo = (r) =>
    r.color5 ? { backgroundColor: r.color5, color: r.color11 } : null,
  Xo = {
    mediaQueryDefaultActive: Jo,
    defaultFont: 'body',
    fastSchemeChange: !0,
    shouldAddPrefersColorThemes: !0,
    allowedStyleValues: 'somewhat-strict-web',
    themeClassNameOnRoot: !0,
    onlyAllowShorthands: !0,
    maxDarkLightNesting: 2,
  },
  ie = {
    animations: qo,
    media: Yo,
    shorthands: Di,
    themes: jo,
    tokens: Jn,
    fonts: Go,
    selectionStyles: Qo,
    settings: Xo,
  },
  Zo = { transform: !0, opacity: !0 },
  Wi = {
    backgroundColor: !0,
    color: !0,
    borderColor: !0,
    borderLeftColor: !0,
    borderRightColor: !0,
    borderTopColor: !0,
    borderBottomColor: !0,
  },
  el = {
    borderRadius: !0,
    borderTopLeftRadius: !0,
    borderTopRightRadius: !0,
    borderBottomLeftRadius: !0,
    borderBottomRightRadius: !0,
    borderWidth: !0,
    borderLeftWidth: !0,
    borderRightWidth: !0,
    borderTopWidth: !0,
    borderBottomWidth: !0,
    ...Wi,
  },
  tl = ue.View,
  rl = ue.Text;
function il(r) {
  const e = ae.useRef(null);
  return (
    e.current ||
      (e.current = {
        composite: null,
        val: new ue.Value(r),
        strategy: { type: 'spring' },
      }),
    {
      getInstance() {
        return e.current.val;
      },
      getValue() {
        return e.current.val._value;
      },
      stop() {
        var t;
        (t = e.current.composite) == null || t.stop(),
          (e.current.composite = null);
      },
      setValue(t, { type: i, ...a } = { type: 'spring' }, n) {
        var l, h;
        const o = e.current.val,
          s = n ? ({ finished: u }) => (u ? n() : null) : void 0;
        if (i === 'direct') o.setValue(t);
        else if (i === 'spring') {
          (l = e.current.composite) == null || l.stop();
          const u = ue.spring(o, { ...a, toValue: t, useNativeDriver: !ar });
          u.start(s), (e.current.composite = u);
        } else {
          (h = e.current.composite) == null || h.stop();
          const u = ue.timing(o, { ...a, toValue: t, useNativeDriver: !ar });
          u.start(s), (e.current.composite = u);
        }
      },
    }
  );
}
const al = ({ value: r }, e) => {
    const t = aa((i) => {
      e(i.value);
    });
    ae.useEffect(() => {
      const i = r.getInstance().addListener(t);
      return () => {
        r.getInstance().removeListener(i);
      };
    }, [r, t]);
  },
  sl = (r, e) => e(r.getInstance());
function nl(r) {
  return {
    isReactNative: !0,
    animations: r,
    View: tl,
    Text: rl,
    useAnimatedNumber: il,
    useAnimatedNumberReaction: al,
    useAnimatedNumberStyle: sl,
    usePresence: Hi,
    ResetPresence: mi,
    useAnimations: ({
      props: e,
      onDidAnimate: t,
      style: i,
      componentState: a,
      presence: n,
    }) => {
      const o = a.unmounted === !0,
        s = (n == null ? void 0 : n[0]) === !1,
        l = n == null ? void 0 : n[1],
        h = ae.useRef({}),
        u = ae.useRef([]),
        d = ae.useRef(new WeakMap()),
        c = e.animateOnly || [],
        f = !!e.animateOnly,
        _ = [JSON.stringify(i), a, s, !!t];
      ae.useMemo(() => !0, _);
      const m = ae.useMemo(() => {
        var E;
        const p = [],
          C = [],
          k = {};
        for (const w in i) {
          const S = i[w];
          if (!o) {
            if (Zo[w] == null && !el[w]) {
              k[w] = S;
              continue;
            }
            if (f && !c.includes(w)) {
              k[w] = S;
              continue;
            }
            if (w !== 'transform') {
              h.current[w] = N(w, h.current[w], S);
              continue;
            }
            if (S) {
              if (typeof S == 'string') {
                console.warn(
                  "Warning: Tamagui can't animate string transforms yet!"
                );
                continue;
              }
              for (const [T, R] of S.entries()) {
                if (!R) continue;
                const A = Object.keys(R)[0],
                  O = (E = u.current[T]) == null ? void 0 : E[A];
                (u.current[T] = { [A]: N(A, O, R[A]) }),
                  (u.current = [...u.current]);
              }
            }
          }
        }
        const L = {
          ...Object.fromEntries(
            Object.entries(h.current).map(([w, S]) => {
              var T;
              return [
                w,
                ((T = d.current.get(S)) == null ? void 0 : T.interpolation) ||
                  S,
              ];
            })
          ),
          transform: u.current.map((w) => {
            var R;
            const S = Object.keys(w)[0],
              T =
                ((R = d.current.get(w[S])) == null
                  ? void 0
                  : R.interpolation) || w[S];
            return { [S]: T };
          }),
        };
        return { runners: p, completions: C, style: [k, L] };
        function N(w, S, T) {
          const R = Wi[w],
            [A, O] = R ? [0, void 0] : dl(T);
          let H = A;
          const M = S || new ue.Value(A),
            V = d.current.get(M);
          let W;
          if (
            (O &&
              ((W = ll((V == null ? void 0 : V.current) ?? M._value, A, O)),
              d.current.set(M, {
                interpolation: M.interpolate(W),
                current: A,
              })),
            R &&
              ((H = V != null && V.animateToValue ? 0 : 1),
              (W = ol(V == null ? void 0 : V.current, T, H)),
              d.current.set(M, {
                current: T,
                interpolation: M.interpolate(W),
                animateToValue: V != null && V.animateToValue ? 0 : 1,
              })),
            M)
          ) {
            const ee = hl(w, r, e.animation);
            let Ge;
            const Ye = new Promise((oe) => {
              Ge = oe;
            });
            C.push(Ye),
              p.push(() => {
                M.stopAnimation();
                function oe() {
                  return ue[ee.type || 'spring'](M, {
                    toValue: H,
                    useNativeDriver: !ar,
                    ...ee,
                  });
                }
                (ee.delay
                  ? ue.sequence([ue.delay(ee.delay), oe()])
                  : oe()
                ).start(({ finished: Mt }) => {
                  Mt && Ge();
                });
              });
          }
          return M;
        }
      }, _);
      return (
        ir(() => {
          m.runners.forEach((C) => C());
          let p = !1;
          return (
            Promise.all(m.completions).then(() => {
              p || (t == null || t(), s && (l == null || l()));
            }),
            () => {
              p = !0;
            }
          );
        }, _),
        m
      );
    },
  };
}
function ol(r, e, t) {
  const i = [0, 1],
    a = [r || e, e];
  return t === 0 && a.reverse(), { inputRange: i, outputRange: a };
}
function ll(r, e, t = 'deg') {
  e === r && (r = e - 1e-9);
  const i = [r, e],
    a = [`${r}${t}`, `${e}${t}`];
  return e < r && (i.reverse(), a.reverse()), { inputRange: i, outputRange: a };
}
function hl(r, e, t) {
  var o, s;
  if (typeof t == 'string') return e[t];
  let i = '',
    a;
  const n = ul[r];
  if (Array.isArray(t)) {
    i = t[0];
    const l =
      ((o = t[1]) == null ? void 0 : o[r]) ??
      ((s = t[1]) == null ? void 0 : s[n]);
    l && (typeof l == 'string' ? (i = l) : ((i = l.type || i), (a = l)));
  } else {
    const l = (t == null ? void 0 : t[r]) ?? (t == null ? void 0 : t[n]);
    (i = l == null ? void 0 : l.type), (a = l);
  }
  return { ...e[i], ...a };
}
const ul = {
  x: 'translateX',
  y: 'translateY',
  translateX: 'x',
  translateY: 'y',
};
function dl(r, e = !1) {
  if (typeof r != 'string') return [r];
  const [t, i, a] = r.match(/([-0-9]+)(deg|%|px)/) ?? [];
  return [+i, a];
}
const hi = (r) => ({
    background: r.colors.background,
    backgroundStrong: r.colors.surface,
    color: r.colors.text,
    colorPress: r.colors.textSecondary,
    primary: r.colors.primary,
    primaryPress: r.colors.primary,
    secondary: r.colors.secondary,
    secondaryPress: r.colors.secondary,
    accent: r.colors.accent,
    accentPress: r.colors.accent,
    success: r.colors.success,
    warning: r.colors.warning,
    danger: r.colors.danger,
    info: r.colors.info,
    backgroundTransparent:
      r.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(26, 31, 46, 0.8)',
    backgroundBlur:
      r.mode === 'light' ? 'rgba(250,251,255,0.9)' : 'rgba(10, 14, 26, 0.9)',
    borderColor: r.colors.border,
    borderColorFocus: r.colors.borderFocus,
    borderColorHover: r.mode === 'light' ? '#42A5F5' : '#4FC3F7',
    shadowColor: r.shadows.level1,
    shadowColorStrong: r.shadows.level2,
  }),
  ui = (r) => ta(r),
  cl = nl({
    quick: { type: 'timing', duration: 150 },
    fade: { type: 'timing', duration: 180 },
    slide: { type: 'spring', stiffness: 300, damping: 25, mass: 1 },
    bouncy: { type: 'spring', damping: 10, mass: 0.9, stiffness: 250 },
    lazy: { type: 'spring', damping: 20, stiffness: 60 },
    tooltip: { type: 'spring', damping: 10, mass: 0.9, stiffness: 100 },
  }),
  Ee = {
    blue: '#0D47A1',
    indigo: '#5E35B1',
    success: '#388E3C',
    warning: '#F57C00',
    danger: '#D32F2F',
    info: '#1976D2',
  },
  _l = {
    ...ie.themes,
    tapango_light: { ...ie.themes.light, ...hi(ui('light')) },
    tapango_dark: { ...ie.themes.dark, ...hi(ui('dark')) },
  };
var di, ci, _i, fi;
const fl = {
    ...ie.tokens,
    color: {
      ...((di = ie.tokens) == null ? void 0 : di.color),
      danger: Ee.danger,
      success: Ee.success,
      warning: Ee.warning,
      info: Ee.info,
      primary: Ee.blue,
      secondary: Ee.indigo,
    },
    radius: {
      ...ie.tokens.radius,
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      '2xl': 24,
      '3xl': 32,
      full: 9999,
    },
    size: {
      ...((ci = ie.tokens) == null ? void 0 : ci.size),
      caption: 12,
      subtitle: 14,
      body: 16,
      section: 18,
      title: 24,
      headline: 32,
      display: 40,
      buttonSm: 36,
      buttonMd: 44,
      buttonLg: 52,
      buttonXl: 60,
      iconXs: 16,
      iconSm: 20,
      iconMd: 24,
      iconLg: 32,
      iconXl: 40,
    },
    fontSize: {
      ...((_i = ie.tokens) == null ? void 0 : _i.fontSize),
      caption: 12,
      subtitle: 14,
      body: 16,
      section: 18,
      title: 24,
      headline: 32,
      display: 40,
    },
    space: {
      ...((fi = ie.tokens) == null ? void 0 : fi.space),
      0: 0,
      0.5: 2,
      1: 4,
      1.5: 6,
      2: 8,
      2.5: 10,
      3: 12,
      3.5: 14,
      4: 16,
      5: 20,
      6: 24,
      7: 28,
      8: 32,
      9: 36,
      10: 40,
      11: 44,
      12: 48,
      14: 56,
      16: 64,
      20: 80,
      24: 96,
      28: 112,
      32: 128,
    },
  },
  kl = jn({ ...ie, animations: cl, themes: _l, tokens: fl });
export { ue as A, Et as E, _a as R, kl as t };
