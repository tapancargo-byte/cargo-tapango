try {
  (() => {
    var me = Object.create;
    var K = Object.defineProperty;
    var he = Object.getOwnPropertyDescriptor;
    var fe = Object.getOwnPropertyNames;
    var ge = Object.getPrototypeOf,
      be = Object.prototype.hasOwnProperty;
    var T = ((e) =>
      typeof require < 'u'
        ? require
        : typeof Proxy < 'u'
          ? new Proxy(e, {
              get: (t, a) => (typeof require < 'u' ? require : t)[a],
            })
          : e)(function (e) {
      if (typeof require < 'u') return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    var D = (e, t) => () => (e && (t = e((e = 0))), t);
    var we = (e, t) => () => (
      t || e((t = { exports: {} }).exports, t), t.exports
    );
    var ye = (e, t, a, s) => {
      if ((t && typeof t == 'object') || typeof t == 'function')
        for (let c of fe(t))
          !be.call(e, c) &&
            c !== a &&
            K(e, c, {
              get: () => t[c],
              enumerable: !(s = he(t, c)) || s.enumerable,
            });
      return e;
    };
    var Se = (e, t, a) => (
      (a = e != null ? me(ge(e)) : {}),
      ye(
        t || !e || !e.__esModule
          ? K(a, 'default', { value: e, enumerable: !0 })
          : a,
        e
      )
    );
    var f = D(() => {});
    var g = D(() => {});
    var b = D(() => {});
    var le = we((ce, J) => {
      f();
      g();
      b();
      (function (e) {
        if (typeof ce == 'object' && typeof J < 'u') J.exports = e();
        else if (typeof define == 'function' && define.amd) define([], e);
        else {
          var t;
          typeof window < 'u' || typeof window < 'u'
            ? (t = window)
            : typeof self < 'u'
              ? (t = self)
              : (t = this),
            (t.memoizerific = e());
        }
      })(function () {
        var e, t, a;
        return (function s(c, w, p) {
          function o(n, d) {
            if (!w[n]) {
              if (!c[n]) {
                var r = typeof T == 'function' && T;
                if (!d && r) return r(n, !0);
                if (i) return i(n, !0);
                var I = new Error("Cannot find module '" + n + "'");
                throw ((I.code = 'MODULE_NOT_FOUND'), I);
              }
              var u = (w[n] = { exports: {} });
              c[n][0].call(
                u.exports,
                function (h) {
                  var y = c[n][1][h];
                  return o(y || h);
                },
                u,
                u.exports,
                s,
                c,
                w,
                p
              );
            }
            return w[n].exports;
          }
          for (var i = typeof T == 'function' && T, m = 0; m < p.length; m++)
            o(p[m]);
          return o;
        })(
          {
            1: [
              function (s, c, w) {
                c.exports = function (p) {
                  if (typeof Map != 'function' || p) {
                    var o = s('./similar');
                    return new o();
                  } else return new Map();
                };
              },
              { './similar': 2 },
            ],
            2: [
              function (s, c, w) {
                function p() {
                  return (
                    (this.list = []),
                    (this.lastItem = void 0),
                    (this.size = 0),
                    this
                  );
                }
                (p.prototype.get = function (o) {
                  var i;
                  if (this.lastItem && this.isEqual(this.lastItem.key, o))
                    return this.lastItem.val;
                  if (((i = this.indexOf(o)), i >= 0))
                    return (this.lastItem = this.list[i]), this.list[i].val;
                }),
                  (p.prototype.set = function (o, i) {
                    var m;
                    return this.lastItem && this.isEqual(this.lastItem.key, o)
                      ? ((this.lastItem.val = i), this)
                      : ((m = this.indexOf(o)),
                        m >= 0
                          ? ((this.lastItem = this.list[m]),
                            (this.list[m].val = i),
                            this)
                          : ((this.lastItem = { key: o, val: i }),
                            this.list.push(this.lastItem),
                            this.size++,
                            this));
                  }),
                  (p.prototype.delete = function (o) {
                    var i;
                    if (
                      (this.lastItem &&
                        this.isEqual(this.lastItem.key, o) &&
                        (this.lastItem = void 0),
                      (i = this.indexOf(o)),
                      i >= 0)
                    )
                      return this.size--, this.list.splice(i, 1)[0];
                  }),
                  (p.prototype.has = function (o) {
                    var i;
                    return this.lastItem && this.isEqual(this.lastItem.key, o)
                      ? !0
                      : ((i = this.indexOf(o)),
                        i >= 0 ? ((this.lastItem = this.list[i]), !0) : !1);
                  }),
                  (p.prototype.forEach = function (o, i) {
                    var m;
                    for (m = 0; m < this.size; m++)
                      o.call(
                        i || this,
                        this.list[m].val,
                        this.list[m].key,
                        this
                      );
                  }),
                  (p.prototype.indexOf = function (o) {
                    var i;
                    for (i = 0; i < this.size; i++)
                      if (this.isEqual(this.list[i].key, o)) return i;
                    return -1;
                  }),
                  (p.prototype.isEqual = function (o, i) {
                    return o === i || (o !== o && i !== i);
                  }),
                  (c.exports = p);
              },
              {},
            ],
            3: [
              function (s, c, w) {
                var p = s('map-or-similar');
                c.exports = function (n) {
                  var d = new p(!1),
                    r = [];
                  return function (I) {
                    var u = function () {
                      var h = d,
                        y,
                        R,
                        S = arguments.length - 1,
                        M = Array(S + 1),
                        O = !0,
                        C;
                      if ((u.numArgs || u.numArgs === 0) && u.numArgs !== S + 1)
                        throw new Error(
                          'Memoizerific functions should always be called with the same number of arguments'
                        );
                      for (C = 0; C < S; C++) {
                        if (
                          ((M[C] = { cacheItem: h, arg: arguments[C] }),
                          h.has(arguments[C]))
                        ) {
                          h = h.get(arguments[C]);
                          continue;
                        }
                        (O = !1),
                          (y = new p(!1)),
                          h.set(arguments[C], y),
                          (h = y);
                      }
                      return (
                        O &&
                          (h.has(arguments[S])
                            ? (R = h.get(arguments[S]))
                            : (O = !1)),
                        O ||
                          ((R = I.apply(null, arguments)),
                          h.set(arguments[S], R)),
                        n > 0 &&
                          ((M[S] = { cacheItem: h, arg: arguments[S] }),
                          O ? o(r, M) : r.push(M),
                          r.length > n && i(r.shift())),
                        (u.wasMemoized = O),
                        (u.numArgs = S + 1),
                        R
                      );
                    };
                    return (
                      (u.limit = n),
                      (u.wasMemoized = !1),
                      (u.cache = d),
                      (u.lru = r),
                      u
                    );
                  };
                };
                function o(n, d) {
                  var r = n.length,
                    I = d.length,
                    u,
                    h,
                    y;
                  for (h = 0; h < r; h++) {
                    for (u = !0, y = 0; y < I; y++)
                      if (!m(n[h][y].arg, d[y].arg)) {
                        u = !1;
                        break;
                      }
                    if (u) break;
                  }
                  n.push(n.splice(h, 1)[0]);
                }
                function i(n) {
                  var d = n.length,
                    r = n[d - 1],
                    I,
                    u;
                  for (
                    r.cacheItem.delete(r.arg), u = d - 2;
                    u >= 0 &&
                    ((r = n[u]), (I = r.cacheItem.get(r.arg)), !I || !I.size);
                    u--
                  )
                    r.cacheItem.delete(r.arg);
                }
                function m(n, d) {
                  return n === d || (n !== n && d !== d);
                }
              },
              { 'map-or-similar': 1 },
            ],
          },
          {},
          [3]
        )(3);
      });
    });
    f();
    g();
    b();
    f();
    g();
    b();
    f();
    g();
    b();
    f();
    g();
    b();
    var l = __REACT__,
      {
        Children: Ze,
        Component: Ke,
        Fragment: V,
        Profiler: Qe,
        PureComponent: $e,
        StrictMode: et,
        Suspense: tt,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ot,
        cloneElement: nt,
        createContext: rt,
        createElement: U,
        createFactory: it,
        createRef: at,
        forwardRef: ct,
        isValidElement: lt,
        lazy: st,
        memo: Q,
        startTransition: It,
        unstable_act: ut,
        useCallback: $,
        useContext: pt,
        useDebugValue: dt,
        useDeferredValue: mt,
        useEffect: x,
        useId: ht,
        useImperativeHandle: ft,
        useInsertionEffect: gt,
        useLayoutEffect: bt,
        useMemo: wt,
        useReducer: yt,
        useRef: ee,
        useState: z,
        useSyncExternalStore: St,
        useTransition: vt,
        version: Ct,
      } = __REACT__;
    f();
    g();
    b();
    var Rt = __STORYBOOK_API__,
      {
        ActiveTabs: Ot,
        Consumer: kt,
        ManagerContext: Tt,
        Provider: xt,
        RequestResponseError: Lt,
        addons: H,
        combineParameters: Pt,
        controlOrMetaKey: Bt,
        controlOrMetaSymbol: Mt,
        eventMatchesShortcut: Vt,
        eventToShortcut: Nt,
        experimental_MockUniversalStore: Dt,
        experimental_UniversalStore: Ut,
        experimental_requestResponse: zt,
        experimental_useUniversalStore: Ht,
        isMacLike: Ft,
        isShortcutTaken: Gt,
        keyToSymbol: Wt,
        merge: qt,
        mockChannel: Yt,
        optionOrAltSymbol: jt,
        shortcutMatchesShortcut: Xt,
        shortcutToHumanString: Jt,
        types: te,
        useAddonState: Zt,
        useArgTypes: Kt,
        useArgs: Qt,
        useChannel: $t,
        useGlobalTypes: eo,
        useGlobals: F,
        useParameter: G,
        useSharedState: to,
        useStoryPrepared: oo,
        useStorybookApi: oe,
        useStorybookState: no,
      } = __STORYBOOK_API__;
    f();
    g();
    b();
    var lo = __STORYBOOK_COMPONENTS__,
      {
        A: so,
        ActionBar: Io,
        AddonPanel: uo,
        Badge: po,
        Bar: mo,
        Blockquote: ho,
        Button: fo,
        ClipboardCode: go,
        Code: bo,
        DL: wo,
        Div: yo,
        DocumentWrapper: So,
        EmptyTabContent: vo,
        ErrorFormatter: Co,
        FlexBar: Eo,
        Form: _o,
        H1: Ao,
        H2: Ro,
        H3: Oo,
        H4: ko,
        H5: To,
        H6: xo,
        HR: Lo,
        IconButton: L,
        IconButtonSkeleton: Po,
        Icons: Bo,
        Img: Mo,
        LI: Vo,
        Link: No,
        ListItem: Do,
        Loader: Uo,
        Modal: zo,
        OL: Ho,
        P: Fo,
        Placeholder: Go,
        Pre: Wo,
        ProgressSpinner: qo,
        ResetWrapper: Yo,
        ScrollArea: jo,
        Separator: Xo,
        Spaced: Jo,
        Span: Zo,
        StorybookIcon: Ko,
        StorybookLogo: Qo,
        Symbols: $o,
        SyntaxHighlighter: en,
        TT: tn,
        TabBar: on,
        TabButton: nn,
        TabWrapper: rn,
        Table: an,
        Tabs: cn,
        TabsState: ln,
        TooltipLinkList: W,
        TooltipMessage: sn,
        TooltipNote: In,
        UL: un,
        WithTooltip: q,
        WithTooltipPure: pn,
        Zoom: dn,
        codeCommon: mn,
        components: hn,
        createCopyToClipboardFunction: fn,
        getStoryHref: gn,
        icons: bn,
        interleaveSeparators: wn,
        nameSpaceClassNames: yn,
        resetComponents: Sn,
        withReset: vn,
      } = __STORYBOOK_COMPONENTS__;
    f();
    g();
    b();
    var Rn = __STORYBOOK_THEMING__,
      {
        CacheProvider: On,
        ClassNames: kn,
        Global: Y,
        ThemeProvider: Tn,
        background: xn,
        color: Ln,
        convert: Pn,
        create: Bn,
        createCache: Mn,
        createGlobal: Vn,
        createReset: Nn,
        css: Dn,
        darken: Un,
        ensure: zn,
        ignoreSsrWarning: Hn,
        isPropValid: Fn,
        jsx: Gn,
        keyframes: Wn,
        lighten: qn,
        styled: v,
        themes: Yn,
        typography: jn,
        useTheme: Xn,
        withTheme: Jn,
      } = __STORYBOOK_THEMING__;
    f();
    g();
    b();
    var er = __STORYBOOK_ICONS__,
      {
        AccessibilityAltIcon: tr,
        AccessibilityIcon: or,
        AccessibilityIgnoredIcon: nr,
        AddIcon: rr,
        AdminIcon: ir,
        AlertAltIcon: ar,
        AlertIcon: cr,
        AlignLeftIcon: lr,
        AlignRightIcon: sr,
        AppleIcon: Ir,
        ArrowBottomLeftIcon: ur,
        ArrowBottomRightIcon: pr,
        ArrowDownIcon: dr,
        ArrowLeftIcon: mr,
        ArrowRightIcon: hr,
        ArrowSolidDownIcon: fr,
        ArrowSolidLeftIcon: gr,
        ArrowSolidRightIcon: br,
        ArrowSolidUpIcon: wr,
        ArrowTopLeftIcon: yr,
        ArrowTopRightIcon: Sr,
        ArrowUpIcon: vr,
        AzureDevOpsIcon: Cr,
        BackIcon: Er,
        BasketIcon: _r,
        BatchAcceptIcon: Ar,
        BatchDenyIcon: Rr,
        BeakerIcon: Or,
        BellIcon: kr,
        BitbucketIcon: Tr,
        BoldIcon: xr,
        BookIcon: Lr,
        BookmarkHollowIcon: Pr,
        BookmarkIcon: Br,
        BottomBarIcon: Mr,
        BottomBarToggleIcon: Vr,
        BoxIcon: Nr,
        BranchIcon: Dr,
        BrowserIcon: ne,
        ButtonIcon: Ur,
        CPUIcon: zr,
        CalendarIcon: Hr,
        CameraIcon: Fr,
        CameraStabilizeIcon: Gr,
        CategoryIcon: Wr,
        CertificateIcon: qr,
        ChangedIcon: Yr,
        ChatIcon: jr,
        CheckIcon: Xr,
        ChevronDownIcon: Jr,
        ChevronLeftIcon: Zr,
        ChevronRightIcon: Kr,
        ChevronSmallDownIcon: Qr,
        ChevronSmallLeftIcon: $r,
        ChevronSmallRightIcon: ei,
        ChevronSmallUpIcon: ti,
        ChevronUpIcon: oi,
        ChromaticIcon: ni,
        ChromeIcon: ri,
        CircleHollowIcon: ii,
        CircleIcon: ai,
        ClearIcon: ci,
        CloseAltIcon: li,
        CloseIcon: si,
        CloudHollowIcon: Ii,
        CloudIcon: ui,
        CogIcon: pi,
        CollapseIcon: di,
        CommandIcon: mi,
        CommentAddIcon: hi,
        CommentIcon: fi,
        CommentsIcon: gi,
        CommitIcon: bi,
        CompassIcon: wi,
        ComponentDrivenIcon: yi,
        ComponentIcon: Si,
        ContrastIcon: vi,
        ContrastIgnoredIcon: Ci,
        ControlsIcon: Ei,
        CopyIcon: _i,
        CreditIcon: Ai,
        CrossIcon: Ri,
        DashboardIcon: Oi,
        DatabaseIcon: ki,
        DeleteIcon: Ti,
        DiamondIcon: xi,
        DirectionIcon: Li,
        DiscordIcon: Pi,
        DocChartIcon: Bi,
        DocListIcon: Mi,
        DocumentIcon: Vi,
        DownloadIcon: Ni,
        DragIcon: Di,
        EditIcon: Ui,
        EllipsisIcon: zi,
        EmailIcon: Hi,
        ExpandAltIcon: Fi,
        ExpandIcon: Gi,
        EyeCloseIcon: Wi,
        EyeIcon: qi,
        FaceHappyIcon: Yi,
        FaceNeutralIcon: ji,
        FaceSadIcon: Xi,
        FacebookIcon: Ji,
        FailedIcon: Zi,
        FastForwardIcon: Ki,
        FigmaIcon: Qi,
        FilterIcon: $i,
        FlagIcon: ea,
        FolderIcon: ta,
        FormIcon: oa,
        GDriveIcon: na,
        GithubIcon: ra,
        GitlabIcon: ia,
        GlobeIcon: aa,
        GoogleIcon: ca,
        GraphBarIcon: la,
        GraphLineIcon: sa,
        GraphqlIcon: Ia,
        GridAltIcon: ua,
        GridIcon: pa,
        GrowIcon: j,
        HeartHollowIcon: da,
        HeartIcon: ma,
        HomeIcon: ha,
        HourglassIcon: fa,
        InfoIcon: ga,
        ItalicIcon: ba,
        JumpToIcon: wa,
        KeyIcon: ya,
        LightningIcon: Sa,
        LightningOffIcon: va,
        LinkBrokenIcon: Ca,
        LinkIcon: Ea,
        LinkedinIcon: _a,
        LinuxIcon: Aa,
        ListOrderedIcon: Ra,
        ListUnorderedIcon: Oa,
        LocationIcon: ka,
        LockIcon: Ta,
        MarkdownIcon: xa,
        MarkupIcon: La,
        MediumIcon: Pa,
        MemoryIcon: Ba,
        MenuIcon: Ma,
        MergeIcon: Va,
        MirrorIcon: Na,
        MobileIcon: re,
        MoonIcon: Da,
        NutIcon: Ua,
        OutboxIcon: za,
        OutlineIcon: Ha,
        PaintBrushIcon: Fa,
        PaperClipIcon: Ga,
        ParagraphIcon: Wa,
        PassedIcon: qa,
        PhoneIcon: Ya,
        PhotoDragIcon: ja,
        PhotoIcon: Xa,
        PhotoStabilizeIcon: Ja,
        PinAltIcon: Za,
        PinIcon: Ka,
        PlayAllHollowIcon: Qa,
        PlayBackIcon: $a,
        PlayHollowIcon: ec,
        PlayIcon: tc,
        PlayNextIcon: oc,
        PlusIcon: nc,
        PointerDefaultIcon: rc,
        PointerHandIcon: ic,
        PowerIcon: ac,
        PrintIcon: cc,
        ProceedIcon: lc,
        ProfileIcon: sc,
        PullRequestIcon: Ic,
        QuestionIcon: uc,
        RSSIcon: pc,
        RedirectIcon: dc,
        ReduxIcon: mc,
        RefreshIcon: ie,
        ReplyIcon: hc,
        RepoIcon: fc,
        RequestChangeIcon: gc,
        RewindIcon: bc,
        RulerIcon: wc,
        SaveIcon: yc,
        SearchIcon: Sc,
        ShareAltIcon: vc,
        ShareIcon: Cc,
        ShieldIcon: Ec,
        SideBySideIcon: _c,
        SidebarAltIcon: Ac,
        SidebarAltToggleIcon: Rc,
        SidebarIcon: Oc,
        SidebarToggleIcon: kc,
        SpeakerIcon: Tc,
        StackedIcon: xc,
        StarHollowIcon: Lc,
        StarIcon: Pc,
        StatusFailIcon: Bc,
        StatusIcon: Mc,
        StatusPassIcon: Vc,
        StatusWarnIcon: Nc,
        StickerIcon: Dc,
        StopAltHollowIcon: Uc,
        StopAltIcon: zc,
        StopIcon: Hc,
        StorybookIcon: Fc,
        StructureIcon: Gc,
        SubtractIcon: Wc,
        SunIcon: qc,
        SupportIcon: Yc,
        SweepIcon: jc,
        SwitchAltIcon: Xc,
        SyncIcon: Jc,
        TabletIcon: ae,
        ThumbsUpIcon: Zc,
        TimeIcon: Kc,
        TimerIcon: Qc,
        TransferIcon: X,
        TrashIcon: $c,
        TwitterIcon: el,
        TypeIcon: tl,
        UbuntuIcon: ol,
        UndoIcon: nl,
        UnfoldIcon: rl,
        UnlockIcon: il,
        UnpinIcon: al,
        UploadIcon: cl,
        UserAddIcon: ll,
        UserAltIcon: sl,
        UserIcon: Il,
        UsersIcon: ul,
        VSCodeIcon: pl,
        VerifiedIcon: dl,
        VideoIcon: ml,
        WandIcon: hl,
        WatchIcon: fl,
        WindowsIcon: gl,
        WrenchIcon: bl,
        XIcon: wl,
        YoutubeIcon: yl,
        ZoomIcon: Sl,
        ZoomOutIcon: vl,
        ZoomResetIcon: Cl,
        iconList: El,
      } = __STORYBOOK_ICONS__;
    var Z = Se(le()),
      P = 'storybook/viewport',
      k = 'viewport',
      ue = {
        mobile1: {
          name: 'Small mobile',
          styles: { height: '568px', width: '320px' },
          type: 'mobile',
        },
        mobile2: {
          name: 'Large mobile',
          styles: { height: '896px', width: '414px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { height: '1112px', width: '834px' },
          type: 'tablet',
        },
      },
      B = {
        name: 'Reset viewport',
        styles: { height: '100%', width: '100%' },
        type: 'desktop',
      },
      Ce = { [k]: { value: void 0, isRotated: !1 } },
      Ee = { viewport: 'reset', viewportRotated: !1 },
      _e = globalThis.FEATURES?.viewportStoryGlobals ? Ce : Ee,
      pe = (e, t) => e.indexOf(t),
      Ae = (e, t) => {
        let a = pe(e, t);
        return a === e.length - 1 ? e[0] : e[a + 1];
      },
      Re = (e, t) => {
        let a = pe(e, t);
        return a < 1 ? e[e.length - 1] : e[a - 1];
      },
      de = async (e, t, a, s) => {
        await e.setAddonShortcut(P, {
          label: 'Previous viewport',
          defaultShortcut: ['alt', 'shift', 'V'],
          actionName: 'previous',
          action: () => {
            a({ viewport: Re(s, t) });
          },
        }),
          await e.setAddonShortcut(P, {
            label: 'Next viewport',
            defaultShortcut: ['alt', 'V'],
            actionName: 'next',
            action: () => {
              a({ viewport: Ae(s, t) });
            },
          }),
          await e.setAddonShortcut(P, {
            label: 'Reset viewport',
            defaultShortcut: ['alt', 'control', 'V'],
            actionName: 'reset',
            action: () => {
              a(_e);
            },
          });
      },
      Oe = v.div({ display: 'inline-flex', alignItems: 'center' }),
      se = v.div(({ theme: e }) => ({
        display: 'inline-block',
        textDecoration: 'none',
        padding: 10,
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s2 - 1,
        lineHeight: '1',
        height: 40,
        border: 'none',
        borderTop: '3px solid transparent',
        borderBottom: '3px solid transparent',
        background: 'transparent',
      })),
      ke = v(L)(() => ({ display: 'inline-flex', alignItems: 'center' })),
      Te = v.div(({ theme: e }) => ({
        fontSize: e.typography.size.s2 - 1,
        marginLeft: 10,
      })),
      xe = {
        desktop: l.createElement(ne, null),
        mobile: l.createElement(re, null),
        tablet: l.createElement(ae, null),
        other: l.createElement(V, null),
      },
      Le = ({ api: e }) => {
        let t = G(k),
          [a, s, c] = F(),
          [w, p] = z(!1),
          { options: o = ue, disable: i } = t || {},
          m = a?.[k] || {},
          n = m.value,
          d = m.isRotated,
          r = o[n] || B,
          I = w || r !== B,
          u = k in c,
          h = Object.keys(o).length;
        if (
          (x(() => {
            de(e, n, s, Object.keys(o));
          }, [o, n, s, e]),
          r.styles === null || !o || h < 1)
        )
          return null;
        if (typeof r.styles == 'function')
          return (
            console.warn(
              'Addon Viewport no longer supports dynamic styles using a function, use css calc() instead'
            ),
            null
          );
        let y = d ? r.styles.height : r.styles.width,
          R = d ? r.styles.width : r.styles.height;
        return i
          ? null
          : l.createElement(Pe, {
              item: r,
              updateGlobals: s,
              viewportMap: o,
              viewportName: n,
              isRotated: d,
              setIsTooltipVisible: p,
              isLocked: u,
              isActive: I,
              width: y,
              height: R,
            });
      },
      Pe = l.memo(function (e) {
        let {
            item: t,
            viewportMap: a,
            viewportName: s,
            isRotated: c,
            updateGlobals: w,
            setIsTooltipVisible: p,
            isLocked: o,
            isActive: i,
            width: m,
            height: n,
          } = e,
          d = $((r) => w({ [k]: r }), [w]);
        return l.createElement(
          V,
          null,
          l.createElement(
            q,
            {
              placement: 'bottom',
              tooltip: ({ onHide: r }) =>
                l.createElement(W, {
                  links: [
                    ...(length > 0 && t !== B
                      ? [
                          {
                            id: 'reset',
                            title: 'Reset viewport',
                            icon: l.createElement(ie, null),
                            onClick: () => {
                              d({ value: void 0, isRotated: !1 }), r();
                            },
                          },
                        ]
                      : []),
                    ...Object.entries(a).map(([I, u]) => ({
                      id: I,
                      title: u.name,
                      icon: xe[u.type],
                      active: I === s,
                      onClick: () => {
                        d({ value: I, isRotated: !1 }), r();
                      },
                    })),
                  ].flat(),
                }),
              closeOnOutsideClick: !0,
              onVisibleChange: p,
            },
            l.createElement(
              ke,
              {
                disabled: o,
                key: 'viewport',
                title: 'Change the size of the preview',
                active: i,
                onDoubleClick: () => {
                  d({ value: void 0, isRotated: !1 });
                },
              },
              l.createElement(j, null),
              t !== B
                ? l.createElement(Te, null, t.name, ' ', c ? '(L)' : '(P)')
                : null
            )
          ),
          l.createElement(Y, {
            styles: {
              'iframe[data-is-storybook="true"]': { width: m, height: n },
            },
          }),
          t !== B
            ? l.createElement(
                Oe,
                null,
                l.createElement(
                  se,
                  { title: 'Viewport width' },
                  m.replace('px', '')
                ),
                o
                  ? '/'
                  : l.createElement(
                      L,
                      {
                        key: 'viewport-rotate',
                        title: 'Rotate viewport',
                        onClick: () => {
                          d({ value: s, isRotated: !c });
                        },
                      },
                      l.createElement(X, null)
                    ),
                l.createElement(
                  se,
                  { title: 'Viewport height' },
                  n.replace('px', '')
                )
              )
            : null
        );
      }),
      Be = (0, Z.default)(50)((e) => [
        ...Me,
        ...Object.entries(e).map(([t, { name: a, ...s }]) => ({
          ...s,
          id: t,
          title: a,
        })),
      ]),
      N = { id: 'reset', title: 'Reset viewport', styles: null, type: 'other' },
      Me = [N],
      Ve = (0, Z.default)(50)((e, t, a, s) =>
        e
          .filter((c) => c.id !== N.id || t.id !== c.id)
          .map((c) => ({
            ...c,
            onClick: () => {
              a({ viewport: c.id }), s();
            },
          }))
      ),
      Ne = ({ width: e, height: t, ...a }) => ({ ...a, height: e, width: t }),
      De = v.div({ display: 'inline-flex', alignItems: 'center' }),
      Ie = v.div(({ theme: e }) => ({
        display: 'inline-block',
        textDecoration: 'none',
        padding: 10,
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s2 - 1,
        lineHeight: '1',
        height: 40,
        border: 'none',
        borderTop: '3px solid transparent',
        borderBottom: '3px solid transparent',
        background: 'transparent',
      })),
      Ue = v(L)(() => ({ display: 'inline-flex', alignItems: 'center' })),
      ze = v.div(({ theme: e }) => ({
        fontSize: e.typography.size.s2 - 1,
        marginLeft: 10,
      })),
      He = (e, t, a) => {
        if (t === null) return;
        let s = typeof t == 'function' ? t(e) : t;
        return a ? Ne(s) : s;
      },
      Fe = Q(function () {
        let [e, t] = F(),
          {
            viewports: a = ue,
            defaultOrientation: s,
            defaultViewport: c,
            disable: w,
          } = G(k, {}),
          p = Be(a),
          o = oe(),
          [i, m] = z(!1);
        c &&
          !p.find((I) => I.id === c) &&
          console.warn(
            `Cannot find "defaultViewport" of "${c}" in addon-viewport configs, please check the "viewports" setting in the configuration.`
          ),
          x(() => {
            de(o, e, t, Object.keys(a));
          }, [a, e, e.viewport, t, o]),
          x(() => {
            let I = s === 'landscape';
            ((c && e.viewport !== c) || (s && e.viewportRotated !== I)) &&
              t({ viewport: c, viewportRotated: I });
          }, [s, c, t]);
        let n =
            p.find((I) => I.id === e.viewport) ||
            p.find((I) => I.id === c) ||
            p.find((I) => I.default) ||
            N,
          d = ee(),
          r = He(d.current, n.styles, e.viewportRotated);
        return (
          x(() => {
            d.current = r;
          }, [n]),
          w || Object.entries(a).length === 0
            ? null
            : l.createElement(
                V,
                null,
                l.createElement(
                  q,
                  {
                    placement: 'top',
                    tooltip: ({ onHide: I }) =>
                      l.createElement(W, { links: Ve(p, n, t, I) }),
                    closeOnOutsideClick: !0,
                    onVisibleChange: m,
                  },
                  l.createElement(
                    Ue,
                    {
                      key: 'viewport',
                      title: 'Change the size of the preview',
                      active: i || !!r,
                      onDoubleClick: () => {
                        t({ viewport: N.id });
                      },
                    },
                    l.createElement(j, null),
                    r
                      ? l.createElement(
                          ze,
                          null,
                          e.viewportRotated
                            ? `${n.title} (L)`
                            : `${n.title} (P)`
                        )
                      : null
                  )
                ),
                r
                  ? l.createElement(
                      De,
                      null,
                      l.createElement(Y, {
                        styles: {
                          'iframe[data-is-storybook="true"]': {
                            ...(r || { width: '100%', height: '100%' }),
                          },
                        },
                      }),
                      l.createElement(
                        Ie,
                        { title: 'Viewport width' },
                        r.width.replace('px', '')
                      ),
                      l.createElement(
                        L,
                        {
                          key: 'viewport-rotate',
                          title: 'Rotate viewport',
                          onClick: () => {
                            t({ viewportRotated: !e.viewportRotated });
                          },
                        },
                        l.createElement(X, null)
                      ),
                      l.createElement(
                        Ie,
                        { title: 'Viewport height' },
                        r.height.replace('px', '')
                      )
                    )
                  : null
              )
        );
      });
    H.register(P, (e) => {
      H.add(P, {
        title: 'viewport / media-queries',
        type: te.TOOL,
        match: ({ viewMode: t, tabId: a }) => t === 'story' && !a,
        render: () =>
          FEATURES?.viewportStoryGlobals ? U(Le, { api: e }) : U(Fe, null),
      });
    });
  })();
} catch (e) {
  console.error(
    '[Storybook] One of your manager-entries failed: ' + import.meta.url,
    e
  );
}
