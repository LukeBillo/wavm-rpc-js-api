// Generated by purs version 0.12.3
"use strict";
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Bind = require("../Control.Bind/index.js");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
var Control_Monad_ST = require("../Control.Monad.ST/index.js");
var Control_Monad_ST_Internal = require("../Control.Monad.ST.Internal/index.js");
var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");
var Data_Array = require("../Data.Array/index.js");
var Data_Array_ST = require("../Data.Array.ST/index.js");
var Data_Eq = require("../Data.Eq/index.js");
var Data_Foldable = require("../Data.Foldable/index.js");
var Data_Function = require("../Data.Function/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
var Data_List = require("../Data.List/index.js");
var Data_List_Types = require("../Data.List.Types/index.js");
var Data_Map_Internal = require("../Data.Map.Internal/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Data_Monoid = require("../Data.Monoid/index.js");
var Data_Ord = require("../Data.Ord/index.js");
var Data_Ordering = require("../Data.Ordering/index.js");
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Data_Semiring = require("../Data.Semiring/index.js");
var Data_Show = require("../Data.Show/index.js");
var Data_Unfoldable = require("../Data.Unfoldable/index.js");
var Data_Unit = require("../Data.Unit/index.js");
var Partial_Unsafe = require("../Partial.Unsafe/index.js");
var Prelude = require("../Prelude/index.js");
var $$Set = function (x) {
    return x;
};
var union = function (dictOrd) {
    return function (v) {
        return function (v1) {
            return Data_Map_Internal.union(dictOrd)(v)(v1);
        };
    };
};
var toList = function (v) {
    return Data_Map_Internal.keys(v);
};
var toUnfoldable = function (dictUnfoldable) {
    return function ($64) {
        return Data_List.toUnfoldable(dictUnfoldable)(toList($64));
    };
};
var size = function (v) {
    return Data_Map_Internal.size(v);
};
var singleton = function (a) {
    return Data_Map_Internal.singleton(a)(Data_Unit.unit);
};
var showSet = function (dictShow) {
    return new Data_Show.Show(function (s) {
        return "(fromFoldable " + (Data_Show.show(Data_List_Types.showList(dictShow))(toList(s)) + ")");
    });
};
var semigroupSet = function (dictOrd) {
    return new Data_Semigroup.Semigroup(union(dictOrd));
};
var member = function (dictOrd) {
    return function (a) {
        return function (v) {
            return Data_Map_Internal.member(dictOrd)(a)(v);
        };
    };
};
var isEmpty = function (v) {
    return Data_Map_Internal.isEmpty(v);
};
var insert = function (dictOrd) {
    return function (a) {
        return function (v) {
            return Data_Map_Internal.insert(dictOrd)(a)(Data_Unit.unit)(v);
        };
    };
};
var foldableSet = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return function ($65) {
            return Data_Foldable.foldMap(Data_List_Types.foldableList)(dictMonoid)(f)(toList($65));
        };
    };
}, function (f) {
    return function (x) {
        return function ($66) {
            return Data_Foldable.foldl(Data_List_Types.foldableList)(f)(x)(toList($66));
        };
    };
}, function (f) {
    return function (x) {
        return function ($67) {
            return Data_Foldable.foldr(Data_List_Types.foldableList)(f)(x)(toList($67));
        };
    };
});
var findMin = function (v) {
    return Data_Functor.map(Data_Maybe.functorMaybe)(function (v1) {
        return v1.key;
    })(Data_Map_Internal.findMin(v));
};
var findMax = function (v) {
    return Data_Functor.map(Data_Maybe.functorMaybe)(function (v1) {
        return v1.key;
    })(Data_Map_Internal.findMax(v));
};
var filter = function (dictOrd) {
    return function (f) {
        return function (v) {
            return Data_Map_Internal.filterWithKey(dictOrd)(function (k) {
                return function (v1) {
                    return f(k);
                };
            })(v);
        };
    };
};
var eqSet = function (dictEq) {
    return new Data_Eq.Eq(function (v) {
        return function (v1) {
            return Data_Eq.eq(Data_Map_Internal.eqMap(dictEq)(Data_Eq.eqUnit))(v)(v1);
        };
    });
};
var ordSet = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqSet(dictOrd.Eq0());
    }, function (s1) {
        return function (s2) {
            return Data_Ord.compare(Data_List_Types.ordList(dictOrd))(toList(s1))(toList(s2));
        };
    });
};
var eq1Set = new Data_Eq.Eq1(function (dictEq) {
    return Data_Eq.eq(eqSet(dictEq));
});
var ord1Set = new Data_Ord.Ord1(function () {
    return eq1Set;
}, function (dictOrd) {
    return Data_Ord.compare(ordSet(dictOrd));
});
var empty = Data_Map_Internal.empty;
var fromFoldable = function (dictFoldable) {
    return function (dictOrd) {
        return Data_Foldable.foldl(dictFoldable)(function (m) {
            return function (a) {
                return insert(dictOrd)(a)(m);
            };
        })(empty);
    };
};
var intersection = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            var toArray = function ($68) {
                return Data_Array.fromFoldable(Data_List_Types.foldableList)(toList($68));
            };
            var rs = toArray(s2);
            var rl = Data_Array.length(rs);
            var ls = toArray(s1);
            var ll = Data_Array.length(ls);
            var intersect = function (acc) {
                var go = function (l) {
                    return function (r) {
                        var $59 = l < ll && r < rl;
                        if ($59) {
                            var v = Data_Ord.compare(dictOrd)(ls[l])(rs[r]);
                            if (v instanceof Data_Ordering.EQ) {
                                return function __do() {
                                    var v1 = Data_Array_ST.push(ls[l])(acc)();
                                    return new Control_Monad_Rec_Class.Loop({
                                        a: l + 1 | 0,
                                        b: r + 1 | 0
                                    });
                                };
                            };
                            if (v instanceof Data_Ordering.LT) {
                                return Control_Applicative.pure(Control_Monad_ST_Internal.applicativeST)(new Control_Monad_Rec_Class.Loop({
                                    a: l + 1 | 0,
                                    b: r
                                }));
                            };
                            if (v instanceof Data_Ordering.GT) {
                                return Control_Applicative.pure(Control_Monad_ST_Internal.applicativeST)(new Control_Monad_Rec_Class.Loop({
                                    a: l,
                                    b: r + 1 | 0
                                }));
                            };
                            throw new Error("Failed pattern match at Data.Set (line 176, column 12 - line 181, column 43): " + [ v.constructor.name ]);
                        };
                        return Control_Applicative.pure(Control_Monad_ST_Internal.applicativeST)(new Control_Monad_Rec_Class.Done(acc));
                    };
                };
                return Control_Monad_Rec_Class.tailRecM2(Control_Monad_ST_Internal.monadRecST)(go)(0)(0);
            };
            return fromFoldable(Data_Foldable.foldableArray)(dictOrd)(Control_Bind.bind(Control_Monad_ST_Internal.bindST)(Control_Bind.bind(Control_Monad_ST_Internal.bindST)(Data_Array_ST.empty)(intersect))(Data_Array_ST.unsafeFreeze)());
        };
    };
};
var map = function (dictOrd) {
    return function (f) {
        return Data_Foldable.foldl(foldableSet)(function (m) {
            return function (a) {
                return insert(dictOrd)(f(a))(m);
            };
        })(empty);
    };
};
var mapMaybe = function (dictOrd) {
    return function (f) {
        return Data_Foldable.foldr(foldableSet)(function (a) {
            return function (acc) {
                return Data_Maybe.maybe(acc)(function (b) {
                    return insert(dictOrd)(b)(acc);
                })(f(a));
            };
        })(empty);
    };
};
var monoidSet = function (dictOrd) {
    return new Data_Monoid.Monoid(function () {
        return semigroupSet(dictOrd);
    }, empty);
};
var unions = function (dictFoldable) {
    return function (dictOrd) {
        return Data_Foldable.foldl(dictFoldable)(union(dictOrd))(empty);
    };
};
var $$delete = function (dictOrd) {
    return function (a) {
        return function (v) {
            return Data_Map_Internal["delete"](dictOrd)(a)(v);
        };
    };
};
var difference = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            return Data_Foldable.foldl(Data_List_Types.foldableList)(Data_Function.flip($$delete(dictOrd)))(s1)(toList(s2));
        };
    };
};
var subset = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            return isEmpty(difference(dictOrd)(s1)(s2));
        };
    };
};
var properSubset = function (dictOrd) {
    return function (s1) {
        return function (s2) {
            return subset(dictOrd)(s1)(s2) && Data_Eq.notEq(eqSet(dictOrd.Eq0()))(s1)(s2);
        };
    };
};
var checkValid = function (v) {
    return Data_Map_Internal.checkValid(v);
};
module.exports = {
    fromFoldable: fromFoldable,
    toUnfoldable: toUnfoldable,
    empty: empty,
    isEmpty: isEmpty,
    singleton: singleton,
    map: map,
    checkValid: checkValid,
    insert: insert,
    member: member,
    "delete": $$delete,
    size: size,
    findMin: findMin,
    findMax: findMax,
    union: union,
    unions: unions,
    difference: difference,
    subset: subset,
    properSubset: properSubset,
    intersection: intersection,
    filter: filter,
    mapMaybe: mapMaybe,
    eqSet: eqSet,
    eq1Set: eq1Set,
    showSet: showSet,
    ordSet: ordSet,
    ord1Set: ord1Set,
    monoidSet: monoidSet,
    semigroupSet: semigroupSet,
    foldableSet: foldableSet
};
