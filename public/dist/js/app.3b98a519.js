(function () {
  "use strict";
  var e = {
      2975: function (e, t, n) {
        var o = n(9242),
          r = n(1913),
          u = (n(4415), n(3396)),
          a = n(4870),
          l = n(7139),
          i = n(65),
          s = n(9423);
        const c = (0, u._)(
            "div",
            { style: { padding: "10px" } },
            [
              (0, u._)(
                "p",
                {
                  style: {
                    "font-size": "20px",
                    "font-weight": "900",
                    margin: "10px",
                  },
                },
                "WAOJ"
              ),
            ],
            -1
          ),
          d = { key: 0, class: "log" },
          f = { key: 1, class: "log" },
          p = { style: { "font-size": "23px" } };
        var m = (0, u.aZ)({
          __name: "App",
          setup(e) {
            const t = (0, a.iH)(!1),
              n = (0, i.oR)();
            (0, u.bv)(() => {
              let e = localStorage.getItem("info"),
                t = JSON.parse(e);
              null != t &&
                (console.log(t.islogin),
                t.islogin && n.dispatch("user/getuserinfo", t.username));
            });
            const o = () => {
                console.log("click buttom login"), (t.value = !0);
              },
              r = () => {
                localStorage.clear(), n.dispatch("user/getuserinfo", "nouser");
              };
            return (e, i) => {
              const m = (0, u.up)("router-link"),
                g = (0, u.up)("el-menu-item"),
                v = (0, u.up)("el-button"),
                h = (0, u.up)("el-menu"),
                w = (0, u.up)("el-dialog"),
                b = (0, u.up)("router-view");
              return (
                (0, u.wg)(),
                (0, u.iD)(
                  u.HY,
                  null,
                  [
                    (0, u._)("div", null, [
                      (0, u.Wm)(
                        h,
                        { mode: "horizontal" },
                        {
                          default: (0, u.w5)(() => [
                            c,
                            (0, u.Wm)(
                              g,
                              { index: "1" },
                              {
                                default: (0, u.w5)(() => [
                                  (0, u.Wm)(
                                    m,
                                    { to: "/" },
                                    {
                                      default: (0, u.w5)(() => [
                                        (0, u.Uk)("Home"),
                                      ]),
                                      _: 1,
                                    }
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            (0, u.Wm)(
                              g,
                              { index: "2" },
                              {
                                default: (0, u.w5)(() => [
                                  (0, u.Wm)(
                                    m,
                                    { to: "/problem" },
                                    {
                                      default: (0, u.w5)(() => [
                                        (0, u.Uk)("Problem"),
                                      ]),
                                      _: 1,
                                    }
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            (0, u.Wm)(
                              g,
                              { index: "3" },
                              {
                                default: (0, u.w5)(() => [
                                  (0, u.Wm)(
                                    m,
                                    { to: "/status" },
                                    {
                                      default: (0, u.w5)(() => [
                                        (0, u.Uk)("Status"),
                                      ]),
                                      _: 1,
                                    }
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            "nouser" == (0, a.SU)(n).state.user.username
                              ? ((0, u.wg)(),
                                (0, u.iD)("div", d, [
                                  (0, u.Wm)(
                                    v,
                                    { type: "primary", plain: "", onClick: o },
                                    {
                                      default: (0, u.w5)(() => [
                                        (0, u.Uk)("Login"),
                                      ]),
                                      _: 1,
                                    }
                                  ),
                                  (0, u.Wm)(
                                    v,
                                    { type: "primary", plain: "" },
                                    {
                                      default: (0, u.w5)(() => [
                                        (0, u.Uk)("Register"),
                                      ]),
                                      _: 1,
                                    }
                                  ),
                                ]))
                              : ((0, u.wg)(),
                                (0, u.iD)("div", f, [
                                  (0, u._)(
                                    "p",
                                    p,
                                    (0, l.zw)((0, a.SU)(n).state.user.username),
                                    1
                                  ),
                                  (0, u.Wm)(
                                    v,
                                    {
                                      type: "primary",
                                      plain: "",
                                      style: { "margin-left": "8px" },
                                      onClick: r,
                                    },
                                    {
                                      default: (0, u.w5)(() => [
                                        (0, u.Uk)("Logout"),
                                      ]),
                                      _: 1,
                                    }
                                  ),
                                ])),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                    "nouser" == (0, a.SU)(n).state.user.username
                      ? ((0, u.wg)(),
                        (0, u.j4)(
                          w,
                          {
                            key: 0,
                            modelValue: t.value,
                            "onUpdate:modelValue":
                              i[0] || (i[0] = (e) => (t.value = e)),
                            title: "LOGIN",
                            center: "",
                            width: "30%",
                          },
                          {
                            default: (0, u.w5)(() => [(0, u.Wm)(s["default"])]),
                            _: 1,
                          },
                          8,
                          ["modelValue"]
                        ))
                      : (0, u.kq)("", !0),
                    (0, u.Wm)(b),
                  ],
                  64
                )
              );
            };
          },
        });
        const g = m;
        var v = g,
          h = n(2483);
        const w = (e) => (
            (0, u.dD)("data-v-72e60fe1"), (e = e()), (0, u.Cn)(), e
          ),
          b = { class: "bottom" },
          y = w(() => (0, u._)("div", null, null, -1)),
          _ = [y];
        function k(e, t) {
          return (0, u.wg)(), (0, u.iD)("div", b, _);
        }
        var W = n(89);
        const O = {},
          S = (0, W.Z)(O, [
            ["render", k],
            ["__scopeId", "data-v-72e60fe1"],
          ]);
        var C = S;
        const j = [
            { path: "/", name: "home", component: C },
            {
              path: "/problem",
              name: "problem",
              component: () => n.e(443).then(n.bind(n, 4551)),
            },
            {
              path: "/status",
              name: "status",
              component: () => n.e(443).then(n.bind(n, 7051)),
            },
            {
              path: "/login",
              name: "login",
              component: () => n.e(443).then(n.bind(n, 9423)),
            },
          ],
          x = (0, h.p7)({ history: (0, h.r5)(), routes: j });
        var U = x,
          N = {
            namespaced: !0,
            state: () => ({ username: "nouser" }),
            actions: {
              getuserinfo({ commit: e }, t) {
                e("updatauser", t);
              },
            },
            mutations: {
              updatauser(e, t) {
                e.username = t;
              },
            },
          },
          A = (0, i.MT)({ mutations: {}, actions: {}, modules: { user: N } });
        const E = (0, o.ri)(v);
        E.use(A), E.use(r.Z).use(U).mount("#app");
      },
      9423: function (e, t, n) {
        n.r(t),
          n.d(t, {
            default: function () {
              return f;
            },
          });
        var o = n(3396),
          r = n(4870),
          u = n(1076),
          a = n(65);
        const l = { id: "breakgd" },
          i = (0, o._)("p", null, "用户名", -1),
          s = (0, o._)("p", null, "密码", -1);
        var c = (0, o.aZ)({
          __name: "LoGin",
          setup(e) {
            const t = (0, r.iH)(),
              n = (0, r.iH)(),
              c = (0, a.oR)(),
              d = () => {
                console.log(t.value),
                  console.log(n.value),
                  u.Z.get(
                    "http://127.0.0.1:8001/wronganswer_app/login/?account=" +
                      t.value +
                      "&password=" +
                      n.value
                  )
                    .then((e) => {
                      console.log(e.data),
                        "OK" === e.data.state
                          ? (c.dispatch("user/getuserinfo", t.value),
                            localStorage.setItem(
                              "info",
                              JSON.stringify({ islogin: !0, username: t.value })
                            ))
                          : ((t.value = ""), (n.value = ""));
                    })
                    .catch((e) => {
                      console.log(e);
                    });
              };
            return (e, r) => {
              const u = (0, o.up)("el-col"),
                a = (0, o.up)("el-input"),
                c = (0, o.up)("el-row"),
                f = (0, o.up)("el-button");
              return (
                (0, o.wg)(),
                (0, o.iD)(
                  o.HY,
                  null,
                  [
                    (0, o._)("div", l, [
                      (0, o.Wm)(
                        c,
                        { gutter: 20 },
                        {
                          default: (0, o.w5)(() => [
                            (0, o.Wm)(
                              u,
                              { span: 4 },
                              { default: (0, o.w5)(() => [i]), _: 1 }
                            ),
                            (0, o.Wm)(
                              u,
                              { span: 20 },
                              {
                                default: (0, o.w5)(() => [
                                  (0, o.Wm)(
                                    a,
                                    {
                                      class: "input",
                                      modelValue: t.value,
                                      "onUpdate:modelValue":
                                        r[0] || (r[0] = (e) => (t.value = e)),
                                      placeholder: "Please input accout",
                                    },
                                    null,
                                    8,
                                    ["modelValue"]
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                      (0, o.Wm)(
                        c,
                        { gutter: 20 },
                        {
                          default: (0, o.w5)(() => [
                            (0, o.Wm)(
                              u,
                              { span: 4 },
                              { default: (0, o.w5)(() => [s]), _: 1 }
                            ),
                            (0, o.Wm)(
                              u,
                              { span: 20 },
                              {
                                default: (0, o.w5)(() => [
                                  (0, o.Wm)(
                                    a,
                                    {
                                      class: "input",
                                      modelValue: n.value,
                                      "onUpdate:modelValue":
                                        r[1] || (r[1] = (e) => (n.value = e)),
                                      placeholder: "Please input password",
                                    },
                                    null,
                                    8,
                                    ["modelValue"]
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                    (0, o.Wm)(
                      f,
                      {
                        type: "primary",
                        onClick: d,
                        style: { display: "block", margin: "0 auto" },
                      },
                      { default: (0, o.w5)(() => [(0, o.Uk)("Login")]), _: 1 }
                    ),
                  ],
                  64
                )
              );
            };
          },
        });
        const d = c;
        var f = d;
      },
    },
    t = {};
  function n(o) {
    var r = t[o];
    if (void 0 !== r) return r.exports;
    var u = (t[o] = { exports: {} });
    return e[o].call(u.exports, u, u.exports, n), u.exports;
  }
  (n.m = e),
    (function () {
      var e = [];
      n.O = function (t, o, r, u) {
        if (!o) {
          var a = 1 / 0;
          for (c = 0; c < e.length; c++) {
            (o = e[c][0]), (r = e[c][1]), (u = e[c][2]);
            for (var l = !0, i = 0; i < o.length; i++)
              (!1 & u || a >= u) &&
              Object.keys(n.O).every(function (e) {
                return n.O[e](o[i]);
              })
                ? o.splice(i--, 1)
                : ((l = !1), u < a && (a = u));
            if (l) {
              e.splice(c--, 1);
              var s = r();
              void 0 !== s && (t = s);
            }
          }
          return t;
        }
        u = u || 0;
        for (var c = e.length; c > 0 && e[c - 1][2] > u; c--) e[c] = e[c - 1];
        e[c] = [o, r, u];
      };
    })(),
    (function () {
      n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e["default"];
              }
            : function () {
                return e;
              };
        return n.d(t, { a: t }), t;
      };
    })(),
    (function () {
      n.d = function (e, t) {
        for (var o in t)
          n.o(t, o) &&
            !n.o(e, o) &&
            Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
      };
    })(),
    (function () {
      (n.f = {}),
        (n.e = function (e) {
          return Promise.all(
            Object.keys(n.f).reduce(function (t, o) {
              return n.f[o](e, t), t;
            }, [])
          );
        });
    })(),
    (function () {
      n.u = function (e) {
        return "js/about.07674cb0.js";
      };
    })(),
    (function () {
      n.miniCssF = function (e) {
        return "css/about.610aa62d.css";
      };
    })(),
    (function () {
      n.g = (function () {
        if ("object" === typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e) {
          if ("object" === typeof window) return window;
        }
      })();
    })(),
    (function () {
      n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      };
    })(),
    (function () {
      var e = {},
        t = "waoj:";
      n.l = function (o, r, u, a) {
        if (e[o]) e[o].push(r);
        else {
          var l, i;
          if (void 0 !== u)
            for (
              var s = document.getElementsByTagName("script"), c = 0;
              c < s.length;
              c++
            ) {
              var d = s[c];
              if (
                d.getAttribute("src") == o ||
                d.getAttribute("data-webpack") == t + u
              ) {
                l = d;
                break;
              }
            }
          l ||
            ((i = !0),
            (l = document.createElement("script")),
            (l.charset = "utf-8"),
            (l.timeout = 120),
            n.nc && l.setAttribute("nonce", n.nc),
            l.setAttribute("data-webpack", t + u),
            (l.src = o)),
            (e[o] = [r]);
          var f = function (t, n) {
              (l.onerror = l.onload = null), clearTimeout(p);
              var r = e[o];
              if (
                (delete e[o],
                l.parentNode && l.parentNode.removeChild(l),
                r &&
                  r.forEach(function (e) {
                    return e(n);
                  }),
                t)
              )
                return t(n);
            },
            p = setTimeout(
              f.bind(null, void 0, { type: "timeout", target: l }),
              12e4
            );
          (l.onerror = f.bind(null, l.onerror)),
            (l.onload = f.bind(null, l.onload)),
            i && document.head.appendChild(l);
        }
      };
    })(),
    (function () {
      n.r = function (e) {
        "undefined" !== typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      };
    })(),
    (function () {
      n.p = "/";
    })(),
    (function () {
      if ("undefined" !== typeof document) {
        var e = function (e, t, n, o, r) {
            var u = document.createElement("link");
            (u.rel = "stylesheet"), (u.type = "text/css");
            var a = function (n) {
              if (((u.onerror = u.onload = null), "load" === n.type)) o();
              else {
                var a = n && ("load" === n.type ? "missing" : n.type),
                  l = (n && n.target && n.target.href) || t,
                  i = new Error(
                    "Loading CSS chunk " + e + " failed.\n(" + l + ")"
                  );
                (i.code = "CSS_CHUNK_LOAD_FAILED"),
                  (i.type = a),
                  (i.request = l),
                  u.parentNode && u.parentNode.removeChild(u),
                  r(i);
              }
            };
            return (
              (u.onerror = u.onload = a),
              (u.href = t),
              n
                ? n.parentNode.insertBefore(u, n.nextSibling)
                : document.head.appendChild(u),
              u
            );
          },
          t = function (e, t) {
            for (
              var n = document.getElementsByTagName("link"), o = 0;
              o < n.length;
              o++
            ) {
              var r = n[o],
                u = r.getAttribute("data-href") || r.getAttribute("href");
              if ("stylesheet" === r.rel && (u === e || u === t)) return r;
            }
            var a = document.getElementsByTagName("style");
            for (o = 0; o < a.length; o++) {
              (r = a[o]), (u = r.getAttribute("data-href"));
              if (u === e || u === t) return r;
            }
          },
          o = function (o) {
            return new Promise(function (r, u) {
              var a = n.miniCssF(o),
                l = n.p + a;
              if (t(a, l)) return r();
              e(o, l, null, r, u);
            });
          },
          r = { 143: 0 };
        n.f.miniCss = function (e, t) {
          var n = { 443: 1 };
          r[e]
            ? t.push(r[e])
            : 0 !== r[e] &&
              n[e] &&
              t.push(
                (r[e] = o(e).then(
                  function () {
                    r[e] = 0;
                  },
                  function (t) {
                    throw (delete r[e], t);
                  }
                ))
              );
        };
      }
    })(),
    (function () {
      var e = { 143: 0 };
      (n.f.j = function (t, o) {
        var r = n.o(e, t) ? e[t] : void 0;
        if (0 !== r)
          if (r) o.push(r[2]);
          else {
            var u = new Promise(function (n, o) {
              r = e[t] = [n, o];
            });
            o.push((r[2] = u));
            var a = n.p + n.u(t),
              l = new Error(),
              i = function (o) {
                if (n.o(e, t) && ((r = e[t]), 0 !== r && (e[t] = void 0), r)) {
                  var u = o && ("load" === o.type ? "missing" : o.type),
                    a = o && o.target && o.target.src;
                  (l.message =
                    "Loading chunk " + t + " failed.\n(" + u + ": " + a + ")"),
                    (l.name = "ChunkLoadError"),
                    (l.type = u),
                    (l.request = a),
                    r[1](l);
                }
              };
            n.l(a, i, "chunk-" + t, t);
          }
      }),
        (n.O.j = function (t) {
          return 0 === e[t];
        });
      var t = function (t, o) {
          var r,
            u,
            a = o[0],
            l = o[1],
            i = o[2],
            s = 0;
          if (
            a.some(function (t) {
              return 0 !== e[t];
            })
          ) {
            for (r in l) n.o(l, r) && (n.m[r] = l[r]);
            if (i) var c = i(n);
          }
          for (t && t(o); s < a.length; s++)
            (u = a[s]), n.o(e, u) && e[u] && e[u][0](), (e[u] = 0);
          return n.O(c);
        },
        o = (self["webpackChunkwaoj"] = self["webpackChunkwaoj"] || []);
      o.forEach(t.bind(null, 0)), (o.push = t.bind(null, o.push.bind(o)));
    })();
  var o = n.O(void 0, [998], function () {
    return n(2975);
  });
  o = n.O(o);
})();
//# sourceMappingURL=app.3b98a519.js.map
