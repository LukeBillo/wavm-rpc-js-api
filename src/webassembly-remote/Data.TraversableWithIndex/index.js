// Generated by purs version 0.12.3
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid/index.js");
var Data_FoldableWithIndex = require("../Data.FoldableWithIndex/index.js");
var Data_Function = require("../Data.Function/index.js");
var Data_FunctorWithIndex = require("../Data.FunctorWithIndex/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Data_Maybe_First = require("../Data.Maybe.First/index.js");
var Data_Maybe_Last = require("../Data.Maybe.Last/index.js");
var Data_Monoid_Additive = require("../Data.Monoid.Additive/index.js");
var Data_Monoid_Conj = require("../Data.Monoid.Conj/index.js");
var Data_Monoid_Disj = require("../Data.Monoid.Disj/index.js");
var Data_Monoid_Dual = require("../Data.Monoid.Dual/index.js");
var Data_Monoid_Multiplicative = require("../Data.Monoid.Multiplicative/index.js");
var Data_Traversable = require("../Data.Traversable/index.js");
var Data_Traversable_Accum = require("../Data.Traversable.Accum/index.js");
var Data_Traversable_Accum_Internal = require("../Data.Traversable.Accum.Internal/index.js");
var Data_Unit = require("../Data.Unit/index.js");
var Prelude = require("../Prelude/index.js");
var TraversableWithIndex = function (FoldableWithIndex1, FunctorWithIndex0, Traversable2, traverseWithIndex) {
    this.FoldableWithIndex1 = FoldableWithIndex1;
    this.FunctorWithIndex0 = FunctorWithIndex0;
    this.Traversable2 = Traversable2;
    this.traverseWithIndex = traverseWithIndex;
};
var traverseWithIndexDefault = function (dictTraversableWithIndex) {
    return function (dictApplicative) {
        return function (f) {
            return function ($19) {
                return Data_Traversable.sequence(dictTraversableWithIndex.Traversable2())(dictApplicative)(Data_FunctorWithIndex.mapWithIndex(dictTraversableWithIndex.FunctorWithIndex0())(f)($19));
            };
        };
    };
};
var traverseWithIndex = function (dict) {
    return dict.traverseWithIndex;
};
var traverseDefault = function (dictTraversableWithIndex) {
    return function (dictApplicative) {
        return function (f) {
            return traverseWithIndex(dictTraversableWithIndex)(dictApplicative)(Data_Function["const"](f));
        };
    };
};
var traversableWithIndexMultiplicative = new TraversableWithIndex(function () {
    return Data_FoldableWithIndex.foldableWithIndexMultiplicative;
}, function () {
    return Data_FunctorWithIndex.functorWithIndexMultiplicative;
}, function () {
    return Data_Traversable.traversableMultiplicative;
}, function (dictApplicative) {
    return function (f) {
        return Data_Traversable.traverse(Data_Traversable.traversableMultiplicative)(dictApplicative)(f(Data_Unit.unit));
    };
});
var traversableWithIndexMaybe = new TraversableWithIndex(function () {
    return Data_FoldableWithIndex.foldableWithIndexMaybe;
}, function () {
    return Data_FunctorWithIndex.functorWithIndexMaybe;
}, function () {
    return Data_Traversable.traversableMaybe;
}, function (dictApplicative) {
    return function (f) {
        return Data_Traversable.traverse(Data_Traversable.traversableMaybe)(dictApplicative)(f(Data_Unit.unit));
    };
});
var traversableWithIndexLast = new TraversableWithIndex(function () {
    return Data_FoldableWithIndex.foldableWithIndexLast;
}, function () {
    return Data_FunctorWithIndex.functorWithIndexLast;
}, function () {
    return Data_Traversable.traversableLast;
}, function (dictApplicative) {
    return function (f) {
        return Data_Traversable.traverse(Data_Traversable.traversableLast)(dictApplicative)(f(Data_Unit.unit));
    };
});
var traversableWithIndexFirst = new TraversableWithIndex(function () {
    return Data_FoldableWithIndex.foldableWithIndexFirst;
}, function () {
    return Data_FunctorWithIndex.functorWithIndexFirst;
}, function () {
    return Data_Traversable.traversableFirst;
}, function (dictApplicative) {
    return function (f) {
        return Data_Traversable.traverse(Data_Traversable.traversableFirst)(dictApplicative)(f(Data_Unit.unit));
    };
});
var traversableWithIndexDual = new TraversableWithIndex(function () {
    return Data_FoldableWithIndex.foldableWithIndexDual;
}, function () {
    return Data_FunctorWithIndex.functorWithIndexDual;
}, function () {
    return Data_Traversable.traversableDual;
}, function (dictApplicative) {
    return function (f) {
        return Data_Traversable.traverse(Data_Traversable.traversableDual)(dictApplicative)(f(Data_Unit.unit));
    };
});
var traversableWithIndexDisj = new TraversableWithIndex(function () {
    return Data_FoldableWithIndex.foldableWithIndexDisj;
}, function () {
    return Data_FunctorWithIndex.functorWithIndexDisj;
}, function () {
    return Data_Traversable.traversableDisj;
}, function (dictApplicative) {
    return function (f) {
        return Data_Traversable.traverse(Data_Traversable.traversableDisj)(dictApplicative)(f(Data_Unit.unit));
    };
});
var traversableWithIndexConj = new TraversableWithIndex(function () {
    return Data_FoldableWithIndex.foldableWithIndexConj;
}, function () {
    return Data_FunctorWithIndex.functorWithIndexConj;
}, function () {
    return Data_Traversable.traversableConj;
}, function (dictApplicative) {
    return function (f) {
        return Data_Traversable.traverse(Data_Traversable.traversableConj)(dictApplicative)(f(Data_Unit.unit));
    };
});
var traversableWithIndexArray = new TraversableWithIndex(function () {
    return Data_FoldableWithIndex.foldableWithIndexArray;
}, function () {
    return Data_FunctorWithIndex.functorWithIndexArray;
}, function () {
    return Data_Traversable.traversableArray;
}, function (dictApplicative) {
    return traverseWithIndexDefault(traversableWithIndexArray)(dictApplicative);
});
var traversableWithIndexAdditive = new TraversableWithIndex(function () {
    return Data_FoldableWithIndex.foldableWithIndexAdditive;
}, function () {
    return Data_FunctorWithIndex.functorWithIndexAdditive;
}, function () {
    return Data_Traversable.traversableAdditive;
}, function (dictApplicative) {
    return function (f) {
        return Data_Traversable.traverse(Data_Traversable.traversableAdditive)(dictApplicative)(f(Data_Unit.unit));
    };
});
var mapAccumRWithIndex = function (dictTraversableWithIndex) {
    return function (f) {
        return function (s0) {
            return function (xs) {
                return Data_Traversable_Accum_Internal.stateR(traverseWithIndex(dictTraversableWithIndex)(Data_Traversable_Accum_Internal.applicativeStateR)(function (i) {
                    return function (a) {
                        return function (s) {
                            return f(i)(s)(a);
                        };
                    };
                })(xs))(s0);
            };
        };
    };
};
var scanrWithIndex = function (dictTraversableWithIndex) {
    return function (f) {
        return function (b0) {
            return function (xs) {
                return (mapAccumRWithIndex(dictTraversableWithIndex)(function (i) {
                    return function (b) {
                        return function (a) {
                            var b$prime = f(i)(a)(b);
                            return {
                                accum: b$prime,
                                value: b$prime
                            };
                        };
                    };
                })(b0)(xs)).value;
            };
        };
    };
};
var mapAccumLWithIndex = function (dictTraversableWithIndex) {
    return function (f) {
        return function (s0) {
            return function (xs) {
                return Data_Traversable_Accum_Internal.stateL(traverseWithIndex(dictTraversableWithIndex)(Data_Traversable_Accum_Internal.applicativeStateL)(function (i) {
                    return function (a) {
                        return function (s) {
                            return f(i)(s)(a);
                        };
                    };
                })(xs))(s0);
            };
        };
    };
};
var scanlWithIndex = function (dictTraversableWithIndex) {
    return function (f) {
        return function (b0) {
            return function (xs) {
                return (mapAccumLWithIndex(dictTraversableWithIndex)(function (i) {
                    return function (b) {
                        return function (a) {
                            var b$prime = f(i)(b)(a);
                            return {
                                accum: b$prime,
                                value: b$prime
                            };
                        };
                    };
                })(b0)(xs)).value;
            };
        };
    };
};
var forWithIndex = function (dictApplicative) {
    return function (dictTraversableWithIndex) {
        return Data_Function.flip(traverseWithIndex(dictTraversableWithIndex)(dictApplicative));
    };
};
module.exports = {
    TraversableWithIndex: TraversableWithIndex,
    traverseWithIndex: traverseWithIndex,
    traverseWithIndexDefault: traverseWithIndexDefault,
    forWithIndex: forWithIndex,
    scanlWithIndex: scanlWithIndex,
    mapAccumLWithIndex: mapAccumLWithIndex,
    scanrWithIndex: scanrWithIndex,
    mapAccumRWithIndex: mapAccumRWithIndex,
    traverseDefault: traverseDefault,
    traversableWithIndexArray: traversableWithIndexArray,
    traversableWithIndexMaybe: traversableWithIndexMaybe,
    traversableWithIndexFirst: traversableWithIndexFirst,
    traversableWithIndexLast: traversableWithIndexLast,
    traversableWithIndexAdditive: traversableWithIndexAdditive,
    traversableWithIndexDual: traversableWithIndexDual,
    traversableWithIndexConj: traversableWithIndexConj,
    traversableWithIndexDisj: traversableWithIndexDisj,
    traversableWithIndexMultiplicative: traversableWithIndexMultiplicative
};
