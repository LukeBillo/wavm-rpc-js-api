// Generated by purs version 0.12.3
"use strict";
var $foreign = require("./foreign.js");
var Control_Alt = require("../Control.Alt/index.js");
var Control_Alternative = require("../Control.Alternative/index.js");
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Apply = require("../Control.Apply/index.js");
var Control_Bind = require("../Control.Bind/index.js");
var Control_Category = require("../Control.Category/index.js");
var Control_Lazy = require("../Control.Lazy/index.js");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
var Control_Monad_ST = require("../Control.Monad.ST/index.js");
var Control_Monad_ST_Internal = require("../Control.Monad.ST.Internal/index.js");
var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");
var Data_Array_NonEmpty_Internal = require("../Data.Array.NonEmpty.Internal/index.js");
var Data_Array_ST = require("../Data.Array.ST/index.js");
var Data_Array_ST_Iterator = require("../Data.Array.ST.Iterator/index.js");
var Data_Boolean = require("../Data.Boolean/index.js");
var Data_Eq = require("../Data.Eq/index.js");
var Data_Foldable = require("../Data.Foldable/index.js");
var Data_Function = require("../Data.Function/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Data_Ord = require("../Data.Ord/index.js");
var Data_Ordering = require("../Data.Ordering/index.js");
var Data_Ring = require("../Data.Ring/index.js");
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Data_Semiring = require("../Data.Semiring/index.js");
var Data_Traversable = require("../Data.Traversable/index.js");
var Data_Tuple = require("../Data.Tuple/index.js");
var Data_Unfoldable = require("../Data.Unfoldable/index.js");
var Partial_Unsafe = require("../Partial.Unsafe/index.js");
var Prelude = require("../Prelude/index.js");
var Unsafe_Coerce = require("../Unsafe.Coerce/index.js");
var zipWithA = function (dictApplicative) {
    return function (f) {
        return function (xs) {
            return function (ys) {
                return Data_Traversable.sequence(Data_Traversable.traversableArray)(dictApplicative)($foreign.zipWith(f)(xs)(ys));
            };
        };
    };
};
var zip = $foreign.zipWith(Data_Tuple.Tuple.create);
var updateAtIndices = function (dictFoldable) {
    return function (us) {
        return function (xs) {
            return Data_Array_ST.withArray(function (res) {
                return Data_Foldable.traverse_(Control_Monad_ST_Internal.applicativeST)(dictFoldable)(function (v) {
                    return Data_Array_ST.poke(v.value0)(v.value1)(res);
                })(us);
            })(xs)();
        };
    };
};
var updateAt = $foreign["_updateAt"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var unsafeIndex = function (dictPartial) {
    return $foreign.unsafeIndexImpl;
};
var uncons = $foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (x) {
    return function (xs) {
        return new Data_Maybe.Just({
            head: x,
            tail: xs
        });
    };
});
var toUnfoldable = function (dictUnfoldable) {
    return function (xs) {
        var len = $foreign.length(xs);
        var f = function (i) {
            if (i < len) {
                return new Data_Maybe.Just(new Data_Tuple.Tuple(unsafeIndex()(xs)(i), i + 1 | 0));
            };
            if (Data_Boolean.otherwise) {
                return Data_Maybe.Nothing.value;
            };
            throw new Error("Failed pattern match at Data.Array (line 143, column 3 - line 145, column 26): " + [ i.constructor.name ]);
        };
        return Data_Unfoldable.unfoldr(dictUnfoldable)(f)(0);
    };
};
var takeEnd = function (n) {
    return function (xs) {
        return $foreign.drop($foreign.length(xs) - n | 0)(xs);
    };
};
var tail = $foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (v) {
    return function (xs) {
        return new Data_Maybe.Just(xs);
    };
});
var sortBy = function (comp) {
    return function (xs) {
        var comp$prime = function (x) {
            return function (y) {
                var v = comp(x)(y);
                if (v instanceof Data_Ordering.GT) {
                    return 1;
                };
                if (v instanceof Data_Ordering.EQ) {
                    return 0;
                };
                if (v instanceof Data_Ordering.LT) {
                    return -1 | 0;
                };
                throw new Error("Failed pattern match at Data.Array (line 702, column 15 - line 707, column 1): " + [ v.constructor.name ]);
            };
        };
        return $foreign.sortImpl(comp$prime)(xs);
    };
};
var sortWith = function (dictOrd) {
    return function (f) {
        return sortBy(Data_Ord.comparing(dictOrd)(f));
    };
};
var sort = function (dictOrd) {
    return function (xs) {
        return sortBy(Data_Ord.compare(dictOrd))(xs);
    };
};
var singleton = function (a) {
    return [ a ];
};
var $$null = function (xs) {
    return $foreign.length(xs) === 0;
};
var nubByEq = function (eq) {
    return function (xs) {
        var v = uncons(xs);
        if (v instanceof Data_Maybe.Just) {
            return $foreign.cons(v.value0.head)(nubByEq(eq)($foreign.filter(function (y) {
                return !eq(v.value0.head)(y);
            })(v.value0.tail)));
        };
        if (v instanceof Data_Maybe.Nothing) {
            return [  ];
        };
        throw new Error("Failed pattern match at Data.Array (line 930, column 3 - line 932, column 18): " + [ v.constructor.name ]);
    };
};
var nubEq = function (dictEq) {
    return nubByEq(Data_Eq.eq(dictEq));
};
var modifyAtIndices = function (dictFoldable) {
    return function (is) {
        return function (f) {
            return function (xs) {
                return Data_Array_ST.withArray(function (res) {
                    return Data_Foldable.traverse_(Control_Monad_ST_Internal.applicativeST)(dictFoldable)(function (i) {
                        return Data_Array_ST.modify(i)(f)(res);
                    })(is);
                })(xs)();
            };
        };
    };
};
var mapWithIndex = function (f) {
    return function (xs) {
        return $foreign.zipWith(f)($foreign.range(0)($foreign.length(xs) - 1 | 0))(xs);
    };
};
var some = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return Control_Apply.apply((dictAlternative.Applicative0()).Apply0())(Data_Functor.map(((dictAlternative.Plus1()).Alt0()).Functor0())($foreign.cons)(v))(Control_Lazy.defer(dictLazy)(function (v1) {
                return many(dictAlternative)(dictLazy)(v);
            }));
        };
    };
};
var many = function (dictAlternative) {
    return function (dictLazy) {
        return function (v) {
            return Control_Alt.alt((dictAlternative.Plus1()).Alt0())(some(dictAlternative)(dictLazy)(v))(Control_Applicative.pure(dictAlternative.Applicative0())([  ]));
        };
    };
};
var insertAt = $foreign["_insertAt"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var init = function (xs) {
    if ($$null(xs)) {
        return Data_Maybe.Nothing.value;
    };
    if (Data_Boolean.otherwise) {
        return new Data_Maybe.Just($foreign.slice(0)($foreign.length(xs) - 1 | 0)(xs));
    };
    throw new Error("Failed pattern match at Data.Array (line 323, column 1 - line 323, column 45): " + [ xs.constructor.name ]);
};
var index = $foreign.indexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var last = function (xs) {
    return index(xs)($foreign.length(xs) - 1 | 0);
};
var unsnoc = function (xs) {
    return Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(function (v) {
        return function (v1) {
            return {
                init: v,
                last: v1
            };
        };
    })(init(xs)))(last(xs));
};
var modifyAt = function (i) {
    return function (f) {
        return function (xs) {
            var go = function (x) {
                return updateAt(i)(f(x))(xs);
            };
            return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
        };
    };
};
var span = function (p) {
    return function (arr) {
        var go = function ($copy_i) {
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(i) {
                var v = index(arr)(i);
                if (v instanceof Data_Maybe.Just) {
                    var $75 = p(v.value0);
                    if ($75) {
                        $copy_i = i + 1 | 0;
                        return;
                    };
                    $tco_done = true;
                    return new Data_Maybe.Just(i);
                };
                if (v instanceof Data_Maybe.Nothing) {
                    $tco_done = true;
                    return Data_Maybe.Nothing.value;
                };
                throw new Error("Failed pattern match at Data.Array (line 834, column 5 - line 836, column 25): " + [ v.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($copy_i);
            };
            return $tco_result;
        };
        var breakIndex = go(0);
        if (breakIndex instanceof Data_Maybe.Just && breakIndex.value0 === 0) {
            return {
                init: [  ],
                rest: arr
            };
        };
        if (breakIndex instanceof Data_Maybe.Just) {
            return {
                init: $foreign.slice(0)(breakIndex.value0)(arr),
                rest: $foreign.slice(breakIndex.value0)($foreign.length(arr))(arr)
            };
        };
        if (breakIndex instanceof Data_Maybe.Nothing) {
            return {
                init: arr,
                rest: [  ]
            };
        };
        throw new Error("Failed pattern match at Data.Array (line 821, column 3 - line 827, column 30): " + [ breakIndex.constructor.name ]);
    };
};
var takeWhile = function (p) {
    return function (xs) {
        return (span(p)(xs)).init;
    };
};
var unzip = function (xs) {
    return (function __do() {
        var v = Data_Array_ST.empty();
        var v1 = Data_Array_ST.empty();
        var v2 = Data_Array_ST_Iterator.iterator(function (v2) {
            return index(xs)(v2);
        })();
        Data_Array_ST_Iterator.iterate(v2)(function (v3) {
            return function __do() {
                Data_Functor["void"](Control_Monad_ST_Internal.functorST)(Data_Array_ST.push(v3.value0)(v))();
                return Data_Functor["void"](Control_Monad_ST_Internal.functorST)(Data_Array_ST.push(v3.value1)(v1))();
            };
        })();
        var v3 = Data_Array_ST.unsafeFreeze(v)();
        var v4 = Data_Array_ST.unsafeFreeze(v1)();
        return new Data_Tuple.Tuple(v3, v4);
    })();
};
var head = function (xs) {
    return index(xs)(0);
};
var nubBy = function (comp) {
    return function (xs) {
        var indexedAndSorted = sortBy(function (x) {
            return function (y) {
                return comp(Data_Tuple.snd(x))(Data_Tuple.snd(y));
            };
        })(mapWithIndex(Data_Tuple.Tuple.create)(xs));
        var v = head(indexedAndSorted);
        if (v instanceof Data_Maybe.Nothing) {
            return [  ];
        };
        if (v instanceof Data_Maybe.Just) {
            return Data_Functor.map(Data_Functor.functorArray)(Data_Tuple.snd)(sortWith(Data_Ord.ordInt)(Data_Tuple.fst)((function __do() {
                var v1 = Data_Array_ST.unsafeThaw(singleton(v.value0))();
                Control_Monad_ST_Internal.foreach(indexedAndSorted)(function (v2) {
                    return function __do() {
                        var v3 = Data_Functor.map(Control_Monad_ST_Internal.functorST)(function ($111) {
                            return Data_Tuple.snd((function ($112) {
                                return Data_Maybe.fromJust()(last($112));
                            })($111));
                        })(Data_Array_ST.unsafeFreeze(v1))();
                        return Control_Applicative.when(Control_Monad_ST_Internal.applicativeST)(Data_Eq.notEq(Data_Ordering.eqOrdering)(comp(v3)(v2.value1))(Data_Ordering.EQ.value))(Data_Functor["void"](Control_Monad_ST_Internal.functorST)(Data_Array_ST.push(v2)(v1)))();
                    };
                })();
                return Data_Array_ST.unsafeFreeze(v1)();
            })()));
        };
        throw new Error("Failed pattern match at Data.Array (line 903, column 17 - line 911, column 29): " + [ v.constructor.name ]);
    };
};
var nub = function (dictOrd) {
    return nubBy(Data_Ord.compare(dictOrd));
};
var groupBy = function (op) {
    return function (xs) {
        return (function __do() {
            var v = Data_Array_ST.empty();
            var v1 = Data_Array_ST_Iterator.iterator(function (v1) {
                return index(xs)(v1);
            })();
            Data_Array_ST_Iterator.iterate(v1)(function (x) {
                return Data_Functor["void"](Control_Monad_ST_Internal.functorST)(function __do() {
                    var v2 = Data_Array_ST.empty();
                    var v3 = Data_Array_ST.push(x)(v2)();
                    Data_Array_ST_Iterator.pushWhile(op(x))(v1)(v2)();
                    var v4 = Data_Array_ST.unsafeFreeze(v2)();
                    return Data_Array_ST.push(v4)(v)();
                });
            })();
            return Data_Array_ST.unsafeFreeze(v)();
        })();
    };
};
var group = function (dictEq) {
    return function (xs) {
        return groupBy(Data_Eq.eq(dictEq))(xs);
    };
};
var group$prime = function (dictOrd) {
    return function ($113) {
        return group(dictOrd.Eq0())(sort(dictOrd)($113));
    };
};
var fromFoldable = function (dictFoldable) {
    return $foreign.fromFoldableImpl(Data_Foldable.foldr(dictFoldable));
};
var foldRecM = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (array) {
                var go = function (res) {
                    return function (i) {
                        if (i >= $foreign.length(array)) {
                            return Control_Applicative.pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Done(res));
                        };
                        if (Data_Boolean.otherwise) {
                            return Control_Bind.bind((dictMonadRec.Monad0()).Bind1())(f(res)(unsafeIndex()(array)(i)))(function (v) {
                                return Control_Applicative.pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Loop({
                                    a: v,
                                    b: i + 1 | 0
                                }));
                            });
                        };
                        throw new Error("Failed pattern match at Data.Array (line 1099, column 3 - line 1103, column 42): " + [ res.constructor.name, i.constructor.name ]);
                    };
                };
                return Control_Monad_Rec_Class.tailRecM2(dictMonadRec)(go)(a)(0);
            };
        };
    };
};
var foldM = function (dictMonad) {
    return function (f) {
        return function (a) {
            return $foreign["uncons'"](function (v) {
                return Control_Applicative.pure(dictMonad.Applicative0())(a);
            })(function (b) {
                return function (bs) {
                    return Control_Bind.bind(dictMonad.Bind1())(f(a)(b))(function (a$prime) {
                        return foldM(dictMonad)(f)(a$prime)(bs);
                    });
                };
            });
        };
    };
};
var findLastIndex = $foreign.findLastIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var insertBy = function (cmp) {
    return function (x) {
        return function (ys) {
            var i = Data_Maybe.maybe(0)(function (v) {
                return v + 1 | 0;
            })(findLastIndex(function (y) {
                return Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(x)(y))(Data_Ordering.GT.value);
            })(ys));
            return Data_Maybe.fromJust()(insertAt(i)(x)(ys));
        };
    };
};
var insert = function (dictOrd) {
    return insertBy(Data_Ord.compare(dictOrd));
};
var findIndex = $foreign.findIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var intersectBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return $foreign.filter(function (x) {
                return Data_Maybe.isJust(findIndex(eq(x))(ys));
            })(xs);
        };
    };
};
var intersect = function (dictEq) {
    return intersectBy(Data_Eq.eq(dictEq));
};
var elemLastIndex = function (dictEq) {
    return function (x) {
        return findLastIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
var elemIndex = function (dictEq) {
    return function (x) {
        return findIndex(function (v) {
            return Data_Eq.eq(dictEq)(v)(x);
        });
    };
};
var dropWhile = function (p) {
    return function (xs) {
        return (span(p)(xs)).rest;
    };
};
var dropEnd = function (n) {
    return function (xs) {
        return $foreign.take($foreign.length(xs) - n | 0)(xs);
    };
};
var deleteAt = $foreign["_deleteAt"](Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
var deleteBy = function (v) {
    return function (v1) {
        return function (v2) {
            if (v2.length === 0) {
                return [  ];
            };
            return Data_Maybe.maybe(v2)(function (i) {
                return Data_Maybe.fromJust()(deleteAt(i)(v2));
            })(findIndex(v(v1))(v2));
        };
    };
};
var unionBy = function (eq) {
    return function (xs) {
        return function (ys) {
            return Data_Semigroup.append(Data_Semigroup.semigroupArray)(xs)(Data_Foldable.foldl(Data_Foldable.foldableArray)(Data_Function.flip(deleteBy(eq)))(nubByEq(eq)(ys))(xs));
        };
    };
};
var union = function (dictEq) {
    return unionBy(Data_Eq.eq(dictEq));
};
var $$delete = function (dictEq) {
    return deleteBy(Data_Eq.eq(dictEq));
};
var difference = function (dictEq) {
    return Data_Foldable.foldr(Data_Foldable.foldableArray)($$delete(dictEq));
};
var concatMap = Data_Function.flip(Control_Bind.bind(Control_Bind.bindArray));
var mapMaybe = function (f) {
    return concatMap(function ($114) {
        return Data_Maybe.maybe([  ])(singleton)(f($114));
    });
};
var filterA = function (dictApplicative) {
    return function (p) {
        return function ($115) {
            return Data_Functor.map((dictApplicative.Apply0()).Functor0())(mapMaybe(function (v) {
                if (v.value1) {
                    return new Data_Maybe.Just(v.value0);
                };
                return Data_Maybe.Nothing.value;
            }))(Data_Traversable.traverse(Data_Traversable.traversableArray)(dictApplicative)(function (x) {
                return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Tuple.Tuple.create(x))(p(x));
            })($115));
        };
    };
};
var catMaybes = mapMaybe(Control_Category.identity(Control_Category.categoryFn));
var alterAt = function (i) {
    return function (f) {
        return function (xs) {
            var go = function (x) {
                var v = f(x);
                if (v instanceof Data_Maybe.Nothing) {
                    return deleteAt(i)(xs);
                };
                if (v instanceof Data_Maybe.Just) {
                    return updateAt(i)(v.value0)(xs);
                };
                throw new Error("Failed pattern match at Data.Array (line 544, column 10 - line 546, column 32): " + [ v.constructor.name ]);
            };
            return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
        };
    };
};
module.exports = {
    fromFoldable: fromFoldable,
    toUnfoldable: toUnfoldable,
    singleton: singleton,
    some: some,
    many: many,
    "null": $$null,
    insert: insert,
    insertBy: insertBy,
    head: head,
    last: last,
    tail: tail,
    init: init,
    uncons: uncons,
    unsnoc: unsnoc,
    index: index,
    elemIndex: elemIndex,
    elemLastIndex: elemLastIndex,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    insertAt: insertAt,
    deleteAt: deleteAt,
    updateAt: updateAt,
    updateAtIndices: updateAtIndices,
    modifyAt: modifyAt,
    modifyAtIndices: modifyAtIndices,
    alterAt: alterAt,
    concatMap: concatMap,
    filterA: filterA,
    mapMaybe: mapMaybe,
    catMaybes: catMaybes,
    mapWithIndex: mapWithIndex,
    sort: sort,
    sortBy: sortBy,
    sortWith: sortWith,
    takeEnd: takeEnd,
    takeWhile: takeWhile,
    dropEnd: dropEnd,
    dropWhile: dropWhile,
    span: span,
    group: group,
    "group'": group$prime,
    groupBy: groupBy,
    nub: nub,
    nubEq: nubEq,
    nubBy: nubBy,
    nubByEq: nubByEq,
    union: union,
    unionBy: unionBy,
    "delete": $$delete,
    deleteBy: deleteBy,
    difference: difference,
    intersect: intersect,
    intersectBy: intersectBy,
    zipWithA: zipWithA,
    zip: zip,
    unzip: unzip,
    foldM: foldM,
    foldRecM: foldRecM,
    unsafeIndex: unsafeIndex,
    range: $foreign.range,
    replicate: $foreign.replicate,
    length: $foreign.length,
    cons: $foreign.cons,
    snoc: $foreign.snoc,
    reverse: $foreign.reverse,
    concat: $foreign.concat,
    filter: $foreign.filter,
    partition: $foreign.partition,
    slice: $foreign.slice,
    take: $foreign.take,
    drop: $foreign.drop,
    zipWith: $foreign.zipWith
};
