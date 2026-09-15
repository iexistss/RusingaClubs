(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/join/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>JoinPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase-browser.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$school$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/school.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function JoinPage() {
    _s();
    const [availableClubs, setAvailableClubs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clubs"]);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectionMessage, setSelectionMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JoinPage.useEffect": ()=>{
            const initial = new URLSearchParams(window.location.search).get("club");
            if (initial) setSelected([
                initial
            ]);
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSupabaseBrowserClient"])();
            if (supabase) supabase.from("clubs").select("*").order("name").then({
                "JoinPage.useEffect": ({ data })=>{
                    if (data?.length) setAvailableClubs(data.map({
                        "JoinPage.useEffect": (club, index)=>({
                                ...club,
                                color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clubs"][index % __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clubs"].length].color,
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clubs"][index % __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clubs"].length].icon,
                                members: 0
                            })
                    }["JoinPage.useEffect"]));
                }
            }["JoinPage.useEffect"]);
        }
    }["JoinPage.useEffect"], []);
    const toggle = (id)=>{
        setSelectionMessage("");
        setSelected((items)=>{
            if (items.includes(id)) return items.filter((item)=>item !== id);
            if (items.length >= 2) {
                setSelectionMessage("You can select up to two clubs for this school year.");
                return items;
            }
            return [
                ...items,
                id
            ];
        });
    };
    const selectedNames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "JoinPage.useMemo[selectedNames]": ()=>availableClubs.filter({
                "JoinPage.useMemo[selectedNames]": (club)=>selected.includes(club.id)
            }["JoinPage.useMemo[selectedNames]"]).map({
                "JoinPage.useMemo[selectedNames]": (club)=>club.name
            }["JoinPage.useMemo[selectedNames]"])
    }["JoinPage.useMemo[selectedNames]"], [
        availableClubs,
        selected
    ]);
    async function submit(event) {
        event.preventDefault();
        setBusy(true);
        const form = new FormData(event.currentTarget);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSupabaseBrowserClient"])();
        if (supabase) {
            const { data: student, error: studentError } = await supabase.from("students").insert({
                name: form.get("name"),
                class_year: form.get("class_year"),
                contact: form.get("contact") || null
            }).select("id").single();
            if (!studentError && student) await supabase.from("registrations").insert(selected.map((clubId)=>({
                    student_id: student.id,
                    club_id: clubId,
                    school_year: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$school$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCHOOL_YEAR"],
                    date_registered: new Date().toISOString()
                })));
        } else await new Promise((resolve)=>window.setTimeout(resolve, 550));
        setBusy(false);
        setSubmitted(true);
    }
    if (submitted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-[calc(100vh-76px)] bg-[#f0f6fb] px-5 py-20 sm:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-xl rounded-[28px] bg-white p-8 text-center shadow-soft sm:p-14",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f4e9] text-shamrock",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        size: 30
                    }, void 0, false, {
                        fileName: "[project]/src/app/join/page.tsx",
                        lineNumber: 45,
                        columnNumber: 302
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/join/page.tsx",
                    lineNumber: 45,
                    columnNumber: 194
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-7 text-[11px] font-bold uppercase tracking-[.2em] text-shamrock",
                    children: "You're in"
                }, void 0, false, {
                    fileName: "[project]/src/app/join/page.tsx",
                    lineNumber: 45,
                    columnNumber: 327
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "mt-3 text-4xl font-bold tracking-tight text-blue-950",
                    children: "Welcome to the club."
                }, void 0, false, {
                    fileName: "[project]/src/app/join/page.tsx",
                    lineNumber: 45,
                    columnNumber: 427
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "serif mt-5 text-sm leading-7 text-slate-500",
                    children: [
                        "Your registration is on its way to the club leaders for the ",
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$school$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCHOOL_YEAR"],
                        " school year."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/join/page.tsx",
                    lineNumber: 45,
                    columnNumber: 521
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 rounded-2xl bg-slate-50 p-4 text-left text-sm font-semibold text-blue-950",
                    children: selectedNames.join(" + ")
                }, void 0, false, {
                    fileName: "[project]/src/app/join/page.tsx",
                    lineNumber: 45,
                    columnNumber: 670
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 flex flex-wrap justify-center gap-5 text-sm font-bold",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/request-change",
                            className: "text-violet underline underline-offset-8",
                            children: "Request a club change"
                        }, void 0, false, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 45,
                            columnNumber: 875
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "text-blue-900 underline underline-offset-8",
                            children: "Back to all clubs"
                        }, void 0, false, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 45,
                            columnNumber: 985
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/join/page.tsx",
                    lineNumber: 45,
                    columnNumber: 799
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/join/page.tsx",
            lineNumber: 45,
            columnNumber: 100
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/join/page.tsx",
        lineNumber: 45,
        columnNumber: 25
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-[calc(100vh-76px)] bg-[#f0f6fb] px-5 py-12 sm:px-8 sm:py-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "inline-flex items-center gap-2 text-xs font-bold text-blue-900",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/src/app/join/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 272
                                }, this),
                                " Back to clubs"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 47,
                            columnNumber: 182
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-12 text-[11px] font-bold uppercase tracking-[.2em] text-violet",
                            children: "Make a start"
                        }, void 0, false, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 47,
                            columnNumber: 316
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-3 text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl",
                            children: [
                                "Join the",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/src/app/join/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 502
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-violet",
                                    children: "conversation."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/join/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 508
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 47,
                            columnNumber: 413
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "serif mt-6 max-w-sm text-sm leading-7 text-slate-500",
                            children: "Tell us a little about yourself and choose up to two clubs to explore this school year."
                        }, void 0, false, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 47,
                            columnNumber: 563
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-10 flex items-center gap-3 text-xs font-semibold text-slate-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex h-7 w-7 items-center justify-center rounded-full bg-blue-900 text-white",
                                    children: "2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/join/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 806
                                }, this),
                                " Club choices per student, per school year"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 47,
                            columnNumber: 722
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/request-change",
                            className: "mt-5 inline-block text-xs font-bold text-violet underline underline-offset-4",
                            children: "Already registered? Request a change"
                        }, void 0, false, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 47,
                            columnNumber: 957
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/join/page.tsx",
                    lineNumber: 47,
                    columnNumber: 177
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: submit,
                    className: "rounded-[26px] bg-white p-6 shadow-soft sm:p-9",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-5 sm:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs font-bold text-blue-950 sm:col-span-2",
                                    children: [
                                        "Your full name",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            required: true,
                                            name: "name",
                                            placeholder: "e.g. Amina Wambui",
                                            className: "outline-ring mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal text-slate-700 placeholder:text-slate-400 focus:border-blue-900 focus:bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/join/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 1329
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/join/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 1250
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs font-bold text-blue-950",
                                    children: [
                                        "Class / year",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            required: true,
                                            name: "class_year",
                                            defaultValue: "",
                                            className: "outline-ring mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal text-slate-700 focus:border-blue-900 focus:bg-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    disabled: true,
                                                    children: "Select your class"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 1872
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Year 7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 1924
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Year 8"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 1947
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Year 9"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 1970
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Year 10"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 1993
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Year 11"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 2017
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Year 12"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 2041
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Year 13"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 2065
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/join/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 1655
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/join/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 1592
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs font-bold text-blue-950",
                                    children: [
                                        "Email or phone ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-normal text-slate-400",
                                            children: "(optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/join/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 2172
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "contact",
                                            placeholder: "How can we reach you?",
                                            className: "outline-ring mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal text-slate-700 placeholder:text-slate-400 focus:border-blue-900 focus:bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/join/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 2234
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/join/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 2106
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 47,
                            columnNumber: 1207
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 border-t border-slate-100 pt-7",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-end justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold text-blue-950",
                                                    children: "Choose your clubs"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 2607
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-[11px] text-slate-400",
                                                    children: "Choose one or two. Subscription clubs may have an extra fee."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 2675
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/join/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 2602
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[11px] font-semibold text-violet",
                                            children: [
                                                selected.length,
                                                " / 2 selected"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/join/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 2792
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/join/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 2554
                                }, this),
                                selectionMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 rounded-lg bg-[#fff8cf] px-3 py-2 text-[11px] font-bold text-[#8b6d00]",
                                    children: selectionMessage
                                }, void 0, false, {
                                    fileName: "[project]/src/app/join/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 2912
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 grid max-h-[520px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2",
                                    children: availableClubs.map((club)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>toggle(club.id),
                                            className: `outline-ring flex items-start gap-3 rounded-xl border p-3.5 text-left transition ${selected.includes(club.id) ? "border-blue-900 bg-[#f0f6fb]" : "border-slate-100 bg-white hover:border-silver"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${selected.includes(club.id) ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-400"}`,
                                                    children: selected.includes(club.id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/join/page.tsx",
                                                        lineNumber: 47,
                                                        columnNumber: 3630
                                                    }, this) : club.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 3415
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-xs font-bold text-blue-950",
                                                            children: club.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/join/page.tsx",
                                                            lineNumber: 47,
                                                            columnNumber: 3675
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "mt-1 block text-[10px] text-slate-400",
                                                            children: [
                                                                club.audience,
                                                                club.subscriptionRequired ? " · Subscription" : ""
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/join/page.tsx",
                                                            lineNumber: 47,
                                                            columnNumber: 3749
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/join/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 3669
                                                }, this)
                                            ]
                                        }, club.id, true, {
                                            fileName: "[project]/src/app/join/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 3139
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/join/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 3026
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 47,
                            columnNumber: 2501
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            disabled: !selected.length || busy,
                            className: "mt-8 flex w-full items-center justify-center rounded-xl bg-blue-900 py-4 text-sm font-bold text-white transition hover:bg-blue-950 disabled:cursor-not-allowed disabled:opacity-40",
                            children: [
                                busy ? "Sending your registration..." : "Send my registration",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    size: 16,
                                    className: "ml-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/join/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 4208
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 47,
                            columnNumber: 3909
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-center text-[10px] leading-5 text-slate-400",
                            children: [
                                "Registration is open for the ",
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$school$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCHOOL_YEAR"],
                                " school year (",
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$school$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TERM_START"],
                                "–",
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$school$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TERM_END"],
                                ")."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/join/page.tsx",
                            lineNumber: 47,
                            columnNumber: 4258
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/join/page.tsx",
                    lineNumber: 47,
                    columnNumber: 1124
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/join/page.tsx",
            lineNumber: 47,
            columnNumber: 94
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/join/page.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
_s(JoinPage, "7dmxE3nHk39rChJHk4nSP5pvb2k=");
_c = JoinPage;
var _c;
__turbopack_context__.k.register(_c, "JoinPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/school.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCHOOL_YEAR",
    ()=>SCHOOL_YEAR,
    "TERM_END",
    ()=>TERM_END,
    "TERM_START",
    ()=>TERM_START,
    "schoolYearFor",
    ()=>schoolYearFor
]);
const SCHOOL_YEAR = "2026/2027";
const TERM_START = "September";
const TERM_END = "June";
function schoolYearFor(date = new Date()) {
    const year = date.getFullYear();
    return date.getMonth() >= 8 ? `${year}/${year + 1}` : `${year - 1}/${year}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase-browser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseBrowserClient",
    ()=>createSupabaseBrowserClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
function createSupabaseBrowserClient() {
    const url = ("TURBOPACK compile-time value", "https://your-project.supabase.co");
    const key = ("TURBOPACK compile-time value", "your-anon-key");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(url, key);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clubs",
    ()=>clubs
]);
const club = (id, name, audience, description, day, color, icon, subscriptionRequired = false)=>({
        id,
        name,
        audience,
        description,
        subscriptionRequired,
        meeting_day: day,
        meeting_time: "3:45 PM",
        leader_name: "To be assigned",
        color,
        icon,
        members: 0
    });
const clubs = [
    club("archery", "Archery", "All years", "Focus, form, and calm under pressure. Subscription required.", "Monday", "orange", "⌁", true),
    club("chess-ks3-4", "Chess", "KS3 & KS4", "Build a sharper game through tactics, patience, and friendly competition.", "Tuesday", "violet", "♞"),
    club("chess-ks5", "Chess", "KS5 Sixth Form", "Advanced chess for Sixth Form students. Subscription required.", "Tuesday", "violet", "♞", true),
    club("world-scholars", "World Scholars", "All years", "Explore global issues, research deeply, and represent Rusinga with confidence.", "Wednesday", "blue", "◎"),
    club("board-games-ks3-4", "Board Games", "KS3 & KS4", "Strategy, teamwork, and a little friendly rivalry around the table.", "Thursday", "yellow", "✦"),
    club("board-games-year-12", "Board Games", "Sixth Form · Year 12", "A relaxed Year 12 space for classic games and new challenges.", "Thursday", "yellow", "✦"),
    club("board-games-year-13", "Board Games", "Sixth Form · Year 13", "A relaxed Year 13 space for classic games and new challenges.", "Thursday", "yellow", "✦"),
    club("art-design", "Art and Design", "All years", "Experiment with materials, develop your eye, and make work you are proud of.", "Monday", "violet", "✺"),
    club("debating", "Debating", "All years", "Find your voice, think on your feet, and make an argument that moves people.", "Tuesday", "violet", "↯"),
    club("photography", "Photography", "KS5 Sixth Form only", "Learn to see differently through composition, light, and visual storytelling.", "Wednesday", "orange", "◉"),
    club("emun-saimun", "EMUN / SAIMUN", "All years", "Prepare for Model United Nations and learn diplomacy through live debate.", "Wednesday", "blue", "◇"),
    club("aviation", "Aviation", "All years", "Discover the science, history, and future of flight. Subscription required.", "Friday", "orange", "⌁", true),
    club("library", "Library", "All years", "Read widely, share recommendations, and make the library your quiet corner.", "Monday", "green", "▤"),
    club("first-aid", "First Aid", "All years", "Build practical skills to stay calm, help others, and respond when it matters.", "Tuesday", "orange", "+"),
    club("soccer-ks3", "Soccer", "KS3", "Train together, compete fairly, and keep the beautiful game moving.", "Wednesday", "green", "◉"),
    club("cookery", "Cookery", "All years", "Learn kitchen confidence, explore flavours, and make something worth sharing. Subscription required.", "Thursday", "orange", "⌂", true),
    club("environment-conservation", "Environment and Conservation", "All years", "Lead practical projects that make our school and community greener.", "Friday", "green", "◌"),
    club("pottery", "Pottery", "All years", "Shape, glaze, and fire your ideas in a hands-on creative studio. Subscription required.", "Monday", "orange", "◒", true),
    club("coding-robotics-hackathon", "Coding / Robotics / Hackathon", "All years", "Build useful things with curious people and turn ideas into working projects.", "Tuesday", "blue", "</>"),
    club("soap-making", "Soap Making", "All years", "Make, test, and package creative soap projects. Subscription required.", "Wednesday", "orange", "✦", true),
    club("knitting", "Knitting (Yarn / Crocheting)", "All years", "A calm, creative space to learn yarn craft and make something useful. Subscription required.", "Thursday", "violet", "⌁", true),
    club("badminton", "Badminton", "All years", "Move fast, play fair, and build your game one rally at a time.", "Friday", "green", "◇"),
    club("table-tennis", "Table Tennis", "All years", "Quick reactions, smart placement, and plenty of matches.", "Monday", "green", "•"),
    club("skating", "Skating", "All years", "Find your balance, build confidence, and enjoy moving together.", "Tuesday", "blue", "◌"),
    club("drama", "Drama", "All years", "Create characters, tell bold stories, and find confidence on stage.", "Wednesday", "violet", "✦"),
    club("modelling", "Modelling", "All years", "Design, build, and present models that bring imagination to life.", "Thursday", "yellow", "△"),
    club("golf", "Golf", "All years", "Learn the fundamentals, practise your swing, and enjoy the course.", "Friday", "green", "◉"),
    club("community-service", "Community Service", "All years", "Turn care into action through projects that support our wider community.", "Monday", "green", "♡"),
    club("rotary", "Rotary (Interact / Bikerthon seasonal)", "All years", "Serve, lead, and take part in seasonal Interact and Bikerthon projects. Select another club too.", "Tuesday", "blue", "✦"),
    club("dance", "Dance", "All years", "Find rhythm, build confidence, and create performances together.", "Wednesday", "violet", "♪"),
    club("basketball", "Basketball", "All years", "Run plays, sharpen your skills, and compete as a team.", "Thursday", "orange", "◉"),
    club("netball", "Netball", "All years", "Develop your passing, movement, and teamwork on court.", "Friday", "blue", "◉")
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0a1qlh_._.js.map